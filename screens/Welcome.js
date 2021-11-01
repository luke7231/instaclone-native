import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../color';

const Container = styled.View`
    flex:1;
    align-items: center;
    justify-content: center;
    background-color: black;
    padding: 0 40px;

`

const Logo = styled.Image`
    max-width: 50%;
`;

const CreateAccount = styled.TouchableOpacity`
    padding: 15px 10px;
    background-color: ${colors.blue};
    border-radius: 3px;
    width: 100%;
    
    `
const CreateAccountText = styled.Text`
    color: white;
    font-weight: 600;
    text-align: center;
    `

const LoginLink = styled.Text`
    color: ${colors.blue};
    font-weight: 600;
    margin-top: 10px;
`

export default function Welcome({ navigation }){
    const goToCreateAccount = () => navigation.navigate("CreateAccount")
    const goToLogIn = () => navigation.navigate("LogIn")
    return <Container>
        <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1"/>
        <Logo resizeMode="contain" source={require("../assets/logoWhite.png")} />
        
            <CreateAccount onPress={goToCreateAccount}>
                <CreateAccountText>
                    계정생성
                </CreateAccountText>
            </CreateAccount>
        
    
        <TouchableOpacity onPress={goToLogIn}>
            <LoginLink>
                로그인라고할뻔
            </LoginLink>
        </TouchableOpacity>
    </Container>
}