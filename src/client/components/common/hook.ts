import * as React from 'react'

export const useRefCallback = <T extends HTMLElement>(callback: (ref: T) => (() => void) | void) => {
  const ref = React.useRef<T | undefined>()
  let cleanup: ReturnType<typeof callback> | undefined = undefined
  const setRef = React.useCallback((node: T | null) => {
    cleanup?.()
    if (node) {
      cleanup = callback(node)
    }
    ref.current = node ?? undefined
  }, [])
  return [setRef, ref.current] as const
}
