import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { nativeHaptic } from './native'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function haptic(duration: number = 8) {
  try {
    if (nativeHaptic(duration)) return
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(duration)
    }
  } catch {
    /* ignore */
  }
}
