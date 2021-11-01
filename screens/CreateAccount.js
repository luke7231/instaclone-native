import React from 'react';
import styled from 'styled-components/native';
import { Text, View } from 'react-native';

const Container = styled.View`
    flex: 1;
    background-color: white;
`

export default function CreateAccount(){
    return <Container>
        <Text>
            CreateAccount
        </Text>
    </Container>
}