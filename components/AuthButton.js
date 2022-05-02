import React from 'react'
import styled from 'styled-components/native'
import { colors } from '../color'

const Button = styled.TouchableOpacity`
    padding: 15px 10px;
    background-color: ${colors.blue};
    border-radius: 3px;
    width: 100%;
    
    `
const ButtonText = styled.Text`
    color: white;
    font-weight: 600;
    text-align: center;
`



export default function AuthButton({ onPress, disabled , text }) {
    
    return (
        <Button disabled={disabled} onPress={onPress}>
            <ButtonText>
                {text}
            </ButtonText>
        </Button>
    )
}