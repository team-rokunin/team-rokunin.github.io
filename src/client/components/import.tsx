import * as React from 'react'
import { Global, css } from '@emotion/react'

import OCRFont from '../../asset/font/ocr-a.ttf'
import EurostileFont from '../../asset/font/eurostile.ttf'

const style = css(`
  @font-face {
    font-family: ocr-a;
    src: url('${OCRFont}') format('truetype');
  }
  @font-face {
    font-family: 'Eurostile';
    src: url('${EurostileFont}') format('truetype');
  }
`)
const Import: React.FunctionComponent = () => {
  return <Global styles={style} />
}

export default Import
