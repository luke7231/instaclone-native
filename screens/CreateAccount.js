import React, { useEffect, useRef } from 'react';
import { gql, useMutation } from '@apollo/client'
import { useForm } from 'react-hook-form';
import { Text } from 'react-native';
import AuthButton from '../components/AuthButton';
import AuthLayout from '../components/AuthLayout';
import { TextInput } from '../components/AuthShared';


const CREATE_ACCOUNT_MUTATION = gql`
    mutation createAccount(
        $firstName: String!
        $lastName: String
        $userName: String!
        $email: String!
        $password: String!
    ) {
        createAccount(
        firstName: $firstName
        lastName: $lastName
        userName: $userName
        email: $email
        password: $password
        ) {
        ok
        error
        }
    }
`;

export default function CreateAccount({navigation}){
    
    const onCompleted = (data) => {
        const { createAccount: { ok } } = data;
        const { username, password } = getValues;
        if (ok) {
            navigation.navigate("LogIn", {
                username,
                password
            })
        }
    }
    const [createAccountMutation, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
        onCompleted,
    });


    const lastNameRef = useRef();
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const onNext = (nextOne) => {
        nextOne?.current?.focus();
    };

    const {register, handleSubmit, setValue, formState:{ errors }, getValues } = useForm()
    const onValid = (data) => {
        
        if (!loading) {
            createAccountMutation({
                variables: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    userName: data.username,
                    email: data.email,
                    password: data.password
                }
            })
        }
    };
    useEffect(() => {
        register("firstName", { required: true })
        register("lastName")
        register("username")
        register("email")
        register("password")
    }, [register])
    return (
        
            <AuthLayout>
                <TextInput
                placeholder="First Name"
                
                placeholderTextColor="gray"
                
                /*????????? ????????? textinput?????? */
                
                returnKeyType="next"/*????????? ???????????? ?????? ?????? ?????????*/
                
                onSubmitEditing={() => onNext(lastNameRef)}/*?????? ????????? ?????? ??????*/
                
                style={{ backgroundColor: "rgba(255,255,255,0.15)", width: "100%" }}
                
                onChangeText={(text) => setValue("firstName", text)}
                
            />
            {errors.firstName && <Text>You should Feel out</Text>}
                <TextInput
                ref={lastNameRef}
                
                placeholder="Last Name"
                
                placeholderTextColor="gray"
                
                returnKeyType="next"
                
                onSubmitEditing={() => onNext(usernameRef)}
                
                style={{ backgroundColor: "rgba(255,255,255,0.15)", width: "100%" }}
                
                onChangeText={(text) => setValue("lastName", text)}
                
                />
                <TextInput
                ref={usernameRef}
                
                placeholder="Username"
                
                placeholderTextColor="gray"
                
                returnKeyType="next"
                
                onSubmitEditing={() => onNext(emailRef)}
                
                style={{ backgroundColor: "rgba(255,255,255,0.15)", width: "100%" }}
                
                onChangeText={(text) => setValue("username", text)}
                
                />
                <TextInput
                ref={emailRef}
                
                placeholder="Email"
                
                placeholderTextColor="gray"
                
                keyboardType="email-address"/*???????????? ?????? ??????, ????????? ?????? ????????? ???*/
                
                returnKeyType="next"
                
                onSubmitEditing={() => onNext(passwordRef)}
                
                style={{ backgroundColor: "rgba(255,255,255,0.15)", width: "100%" }}
                
                onChangeText={(text)=> setValue("email",text)}
                />
                <TextInput
                ref={passwordRef}
                
                placeholder="Password"
                
                placeholderTextColor="gray"
                
                secureTextEntry/*???????????? ?????????*/
                
                returnKeyType="done"
                
                lastOne={true}
                
                style={{ backgroundColor: "rgba(255,255,255,0.15)", width: "100%" }}
                
                onChangeText={(text) => setValue("password", text)}
                
                />
                <AuthButton text="Create Account" disabled={false} onPress={handleSubmit(onValid)} />
            </AuthLayout>
        
    )
}