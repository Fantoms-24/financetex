import { getFullLlmConfig, LlmEndpointConfig } from './config'

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: any
}

export interface ChatOptions {
  messages: ChatMessage[]
  temperature?: number
  max_tokens?: number
  timeoutMs?: number
}

export interface ChatResult {
  content: string
  provider: 'primary' | 'fallback'
  model: string
  raw: any
}

/**
 * Выполнить сетевой запрос к OpenAI-совместимому API
 */
async function executeChatRequest(cfg: LlmEndpointConfig, options: ChatOptions): Promise<any> {
  const baseUrl = cfg.baseUrl.replace(/\/+$/, '')
  const endpoint = baseUrl.endsWith('/chat/completions') ? baseUrl : `${baseUrl}/chat/completions`

  const headers: Record<string, string> = {
    'content-type': 'application/json',
    authorization: `Bearer ${cfg.apiKey}`,
    'HTTP-Referer': 'https://financetex.relaxdev.ru',
    'X-Title': 'Listok Finance',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
  }

  const body: any = {
    model: cfg.model,
    messages: options.messages,
    temperature: options.temperature ?? 0,
  }
  if (options.max_tokens) {
    body.max_tokens = options.max_tokens
  }

  const res = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(options.timeoutMs || 25000),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    let parsedMsg = text
    try {
      const j = JSON.parse(text)
      parsedMsg = j?.error?.message || j?.error || j?.message || text
    } catch {
      parsedMsg = text
    }
    throw new Error(`HTTP ${res.status}: ${String(parsedMsg).slice(0, 240)}`)
  }

  return await res.json()
}

/**
 * Универсальный вызов LLM с автоматическим резервным переключением (Failover):
 * Если основной провайдер недоступен (403, 429, таймаут, сбой сети),
 * запрос немедленно перенаправляется на резервного провайдера (Z.AI / GLM и др.).
 */
export async function callChatLlm(options: ChatOptions): Promise<ChatResult> {
  const full = await getFullLlmConfig()
  const errorLog: string[] = []

  // 1. Попытка через основного провайдера
  if (full.primary.apiKey) {
    try {
      const data = await executeChatRequest(full.primary, options)
      const content = data?.choices?.[0]?.message?.content ?? ''
      return {
        content: typeof content === 'string' ? content : JSON.stringify(content),
        provider: 'primary',
        model: full.primary.model,
        raw: data,
      }
    } catch (err: any) {
      const msg = `[Основной ИИ] ${full.primary.model} (${full.primary.baseUrl}) сбой: ${err?.message || err}`
      console.warn(msg)
      errorLog.push(msg)
    }
  }

  // 2. Попытка через резервного провайдера
  if (full.fallback.apiKey) {
    try {
      console.log(`[ИИ Failover] Переключаемся на резервного провайдера: ${full.fallback.model} (${full.fallback.baseUrl})`)
      const data = await executeChatRequest(full.fallback, options)
      const content = data?.choices?.[0]?.message?.content ?? ''
      return {
        content: typeof content === 'string' ? content : JSON.stringify(content),
        provider: 'fallback',
        model: full.fallback.model,
        raw: data,
      }
    } catch (err: any) {
      const msg = `[Резервный ИИ] ${full.fallback.model} (${full.fallback.baseUrl}) сбой: ${err?.message || err}`
      console.error(msg)
      errorLog.push(msg)
    }
  }

  throw new Error(`Все ИИ-провайдеры недоступны:\n${errorLog.join('\n') || 'Ключи ИИ не настроены'}`)
}
