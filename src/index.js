import React from 'react'
import ReactDOM from 'react-dom'
import { injectGlobal } from 'styled-components'

import App from './App'

injectGlobal`
body {
    margin: 0;
    padding: 0;
    background: #000;
}

#root {
    display: flex;
    justify-content: center;
}
`

ReactDOM.render(<App />, document.getElementById('root'))
