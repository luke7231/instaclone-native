import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CreateAccount from '../screens/CreateAccount';
import LogIn from '../screens/LogIn';
import Welcome from '../screens/Welcome';

const Stack = createNativeStackNavigator() //스택 선언!

export default function LoggedOutNav(){
    
    return (
        <Stack.Navigator
            screenOptions={{
                headerBackTitleVisible: false,
                headerTransparent: true,
                headerTitleStyle: {
                    color: "transparent"
                },
                headerTintColor: "black",
                
            
        }}>
            <Stack.Screen name="Welcome" component={Welcome} options={{
                headerShown: false,
            }}  />
            <Stack.Screen name="LogIn" component={LogIn}/>
            <Stack.Screen name="CreateAccount" component={CreateAccount} />
        </Stack.Navigator>
    );
}