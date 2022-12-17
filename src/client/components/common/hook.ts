import * as React from 'react'

export const useRefCallback = <T extends HTMLElement>(callback: (ref: T) => (() => void) | undefined) => {
  const ref = React.useRef<T | undefined>()
  const [cleanup, setCleanup] = React.useState<ReturnType<typeof callback>>(undefined)
  const setRef = React.useCallback(
    (node: T | null) => {
      cleanup?.()
      if (node) {
        setCleanup(callback(node))
      }
      ref.current = node ?? undefined
    },
    [cleanup]
  )
  return setRef
}
