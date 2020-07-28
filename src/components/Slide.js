/** @jsx jsx */
// import React from 'react'
import { css, jsx } from '@emotion/core'

const Slide = ({ content, width }) => (
  <div
    css={css`
      height: 100%;
      width: ${width};
      background-image: url('${content}');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    `}
  />
)
// width: ${width}px;
export default Slide