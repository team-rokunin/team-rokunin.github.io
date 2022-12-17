export const replaceRGBAlpha = (alpha: number) => {
  return [/rgba?\((\d*),\s?(\d*),\s?(\d*),?\s?\d*\)/, `rgba($1, $2, $3, ${alpha})`] as const
}
