import React from 'react'
import styled, { keyframes } from 'styled-components'

const blink = keyframes`
0% {
    opacity: 1;
}

50% {
    opacity: 0;
}
`

const Cursor = styled.div`
    animation: 1s step-start 0s infinite normal ${blink};
`

const LogEntries = styled.div`
    max-height: 200px;
`

const UnstyledStatusLog = ({ className, log }) => (
    <div className={className}>
        <LogEntries>
            {log.map((entry, i) => <div key={i}>{entry}</div>)}
        </LogEntries>
        <Cursor>_</Cursor>
    </div>
)

export const StatusLog = styled(UnstyledStatusLog)`
    margin-top: 24px;
`
