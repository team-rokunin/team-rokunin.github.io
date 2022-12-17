import * as React from 'react'
import { Global, css } from '@emotion/react'

import OCRFont from '../../asset/font/ocr-a.ttf'
import EurostileFont from '../../asset/font/eurostile.ttf'
import BankGothicFont from '../../asset/font/bank-gothic.ttf'

const style = css(`
  @font-face {
    font-family: ocr-a;
    src: url('${OCRFont}') format('truetype');
  }
  @font-face {
    font-family: 'Eurostile';
    src: url('${EurostileFont}') format('truetype');
  }
  @font-face {
    font-family: 'Bank Gothic';
    src: url('${BankGothicFont}') format('truetype');
  }
  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap')
`)
const Import: React.FunctionComponent = () => {
  return <Global styles={style} />
}

export default Import
