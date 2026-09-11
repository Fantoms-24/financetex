import { openBrowser, FILL_SUBMIT } from './_cdp.mjs'
import { setTimeout as wait } from 'node:timers/promises'
import fs from 'node:fs'
const br = await openBrowser({port:9368,tag:'redesign'})
const origin='http://localhost:3000'
const failures=[]
try {
  await br.goto(origin+'/login')
  await br.evalIn(`Array.from(document.querySelectorAll('button')).find(b=>b.textContent.trim()==='Регистрация').click()`)
  await wait(300)
  await br.evalIn(FILL_SUBMIT(['Дизайн тест',`design${Date.now()}@example.com`,'DesignTest2026!']))
  await wait(3500)
  if(await br.path() !== '/') throw new Error('Registration did not reach overview: '+await br.text())
  await br.evalIn(`window.dispatchEvent(new Event('listok:add'))`)
  await wait(500)
  await br.evalIn(`(() => { const f=document.querySelector('.expense-form');f.elements.amount.value='1250';f.elements.store.value='Тестовая покупка';f.requestSubmit() })()`)
  await wait(2000)
  if(!(await br.text()).includes('Тестовая покупка')) failures.push('Expense not saved')
  fs.mkdirSync('.design-qa',{recursive:true})
  for(const width of [390,768,1440]) {
    await br.send('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:width<768},br.sessionId)
    for(const route of ['/','/receipts','/groups','/bills','/settings','/scan']) {
      await br.goto(origin+route)
      const metrics=(await br.evalIn(`({width:innerWidth,scroll:document.documentElement.scrollWidth,text:document.body.innerText.slice(0,100)})`)).result.value
      console.log(width,route,JSON.stringify(metrics))
      if(metrics.scroll>width+1) failures.push(`Overflow ${width} ${route}: ${metrics.scroll}`)
      if(route==='/') {
        const shot=await br.send('Page.captureScreenshot',{format:'png'},br.sessionId)
        fs.writeFileSync(`.design-qa/overview-${width}.png`,Buffer.from(shot.data,'base64'))
      }
    }
  }
  await br.goto(origin+'/')
  await br.evalIn(`document.querySelector('[aria-label="Тёмная тема"]').click()`)
  await wait(300)
  const shot=await br.send('Page.captureScreenshot',{format:'png'},br.sessionId)
  fs.writeFileSync('.design-qa/overview-dark.png',Buffer.from(shot.data,'base64'))
  console.log('FAILURES',JSON.stringify(failures))
  if(failures.length) process.exitCode=1
} finally {br.close()}
