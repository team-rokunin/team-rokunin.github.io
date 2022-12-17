import * as React from 'react'

const shuffleText = (text: string) => {
  const [animationFrame, setAnimationFrame] = React.useState<number | undefined>(undefined)
  const [state, setState] = React.useState<TextShufflerState>({
    shufflingText: [],
    placeholder: '',
  })
  const shufflingCharacters = '!<>-_\\/[]{}—=+*^?#________'
  const shuffling = React.useCallback(
    (frame: number, letters: Frame[], resolve: () => void) => () => {
      const mapLetters = (letters: Frame[]) =>
        letters.map((letter) =>
          frame >= letter.start && frame < letter.end && (!letter.current || Math.random() < 0.28)
            ? {
                ...letter,
                current: shufflingCharacters[Math.floor(Math.random() * shufflingCharacters.length)],
              }
            : letter
        )
      const nextLetters = mapLetters(letters)
      const mapShufflingText = (letters: Frame[]) =>
        letters.map((letter) =>
          frame < letter.start
            ? { text: letter.from, shuffling: false }
            : frame >= letter.end
            ? { text: letter.to, shuffling: false }
            : { text: letter.current ?? ' ', shuffling: true }
        )
      const nextShufflingText = mapShufflingText(nextLetters)
      setState((state) => ({
        ...state,
        shufflingText: nextShufflingText,
      }))
      if (letters.map((letter) => letter.to).join('') === nextShufflingText.map((letter) => letter.text).join('')) {
        resolve()
      } else {
        setAnimationFrame(requestAnimationFrame(shuffling(frame + 1, nextLetters, resolve)))
      }
    },
    []
  )
  const textShuffler = React.useCallback(
    (shufflingText: string) => {
      const { shufflingText: oldShufflingText } = state
      if (animationFrame) cancelAnimationFrame(animationFrame)
      let resolve: () => void = () => {}
      const promise = new Promise<void>((r) => (resolve = r))
      setState((state) => ({
        ...state,
        placeholder: shufflingText,
      }))
      const generateFrames = (from: string, to: string) =>
        Array(Math.max(from.length, to.length))
          .fill(undefined)
          .map((_, index) => {
            const start = Math.floor(Math.random() * 40)
            return {
              from: from[index] ?? '',
              to: to[index] ?? '',
              start,
              end: start + Math.floor(Math.random() * 40),
            }
          })
      shuffling(0, generateFrames(oldShufflingText.map((letter) => letter.text).join(''), shufflingText), resolve)()
      return promise
    },
    [animationFrame]
  )
  React.useEffect(() => {
    textShuffler(text)
  }, [text])
  React.useEffect(() => {
    const { shufflingText, placeholder } = state
    if (
      shufflingText.every((text) => !text.shuffling) &&
      shufflingText.map((letter) => letter.text).join('') !== placeholder
    ) {
      textShuffler(placeholder)
    }
  }, [state.shufflingText, state.placeholder])
  return [state.shufflingText, state.placeholder] as const
}
type TextShufflerState = {
  shufflingText: ShufflingText[]
  placeholder: string
}
type Frame = {
  from: string
  to: string
  start: number
  end: number
  current?: string
}
export type ShufflingText = {
  text: string
  shuffling: boolean
}

export default shuffleText
