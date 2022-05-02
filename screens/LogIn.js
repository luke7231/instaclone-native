import { gql, useMutation } from '@apollo/client'
import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { isLoggedInVar, logUserIn, tokenVar } from '../apollo';
import AuthButton from '../components/AuthButton';
import AuthLayout from '../components/AuthLayout';
import { TextInput } from '../components/AuthShared';


const LOGIN_MUTATION = gql`
    mutation login($userName:String!,$password:String!){
        login(userName:$userName, password:$password){
            ok
            token
            error
        }
    }
`

export default function LogIn({ route : { params }}) {

    const { register, handleSubmit, setValue, watch, } = useForm({
        defaultValues: {
            username: params?.username,
            password: params?.password
        }
    });
    const onCompleted = async (data) => {
        const {
            login: { ok, token },
        } = data;
        if (ok) {
            await logUserIn(token)

        }
    }
    
    const [loginMutation, { loading }] = useMutation(LOGIN_MUTATION, {
        onCompleted
    });

    const passwordRef = useRef();
    const onNext = (nextOne) => {
        nextOne?.current?.focus();
    };
    
    useEffect(() => {
        register('username')
        register('password')
    }, [register]);

    const onValid = (data) => {
        if (!loading) {
            loginMutation({
                variables: {
                    userName: data.username,
                    password: data.password,
                }
            })
        }

    }

    return (
        <AuthLayout>
            <TextInput
                value={watch("username")}
                placeholder="Username"
                returnKeyType="next"
                autoCapitalize={"none"}
                placeholderTextColor={"rgba(255,255,255,0.6)"}
                onSubmitEditing={()=> onNext(passwordRef)}
                onChangeText={(text)=> setValue("username",text)}
            />
            
            <TextInput
                value={watch("password")}
                ref={passwordRef}
                placeholder="Password"
                secureTextEntry
                returnKeyType="done"
                lastOne={true}
                placeholderTextColor={"rgba(255,255,255,0.6)"}
                onChangeText={(text)=> setValue("password",text)}
                onSubmitEditting={handleSubmit(onValid)}
            />

            <AuthButton
                loading={loading}
                disabled={!watch("username") || !watch("password")}
                text="Log In"
                onPress={handleSubmit(onValid)}
            />
        </AuthLayout>
    )
}

