import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../color';
import AuthButton from '../components/AuthButton';
import AuthLayout from '../components/AuthLayout';



const LoginLink = styled.Text`
    color: ${colors.blue};
    font-weight: 600;
    margin: 0 auto;
    margin-top: 25px;
    
`

export default function Welcome({ navigation }){
    const goToCreateAccount = () => navigation.navigate("CreateAccount")
    const goToLogIn = () => navigation.navigate("LogIn")
    return (
        <AuthLayout>
            <AuthButton 
                text="Create New Account"
                disabled={false}
                onPress={goToCreateAccount}
            />
        
            <TouchableOpacity onPress={goToLogIn}>
                <LoginLink>
                    로그인라고할뻔
                </LoginLink>
            </TouchableOpacity>
        </AuthLayout>
    )
}