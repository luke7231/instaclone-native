import React from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native'
import styled from 'styled-components/native'

const Container = styled.View`
    flex:1;
    align-items: center;
    justify-content: center;
    background-color: black;
    padding: 0 20px;
`

const Logo = styled.Image` 
    max-width: 50%;
    width: 100%;
    height: 100px;
    margin: 0 auto;
    margin-bottom: 20px;
`



export default function AuthLayout({ children/*이 컴포넌트는 앞으로 감싸게 될 자식들을 받겠다.*/}) {
    
    const dismissKeyboard = () => {
        Keyboard.dismiss();
    }
    return (
        <TouchableWithoutFeedback style={{ flex: 1 }} onPress={dismissKeyboard} disabled={Platform.OS==="web"}>
            <Container>
                <KeyboardAvoidingView /*키보드 떴을 때 가리는 걸 막기 위함임.*/
                    style={{
                        width: "100%",/*박스 속성 땜시 안해주면 쭈그러듬*/
                    }}
                    behavior="position"
                    keyboardVerticalOffset={Platform.OS === "ios" ? 30 : 0} /*기종이 먼지에 따라서도 코드 짜는 게 가능*/
                >
                    <Logo resizeMode="contain" source={require("../assets/logoWhite.png")} />
                    {children}
                </KeyboardAvoidingView>
            </Container>
        </TouchableWithoutFeedback>
    )
}