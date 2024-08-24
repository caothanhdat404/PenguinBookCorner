import React from 'react'
import { StyleButton } from './style'
const ButtonComponent = ({ size, styleButton, styleTextButton, textButton, ...rests }) => {
    return (
        <StyleButton size={size} style={styleButton} {...rests}>
            <span style={styleTextButton}>{textButton}</span>
        </StyleButton>
    )
}

export default ButtonComponent
