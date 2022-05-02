import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../screens/Profile";
import Feed from "../screens/Feed";
import Search from "../screens/Search";
import Notifications from "../screens/Notifications";
import Me from "../screens/Me";
import { Image } from 'react-native';
import Likes from '../screens/Likes';
import OnePhoto from '../screens/OnePhoto';

const Stack = createNativeStackNavigator();

export default function StackNavFactory({ screenName }) {
    return (
        <Stack.Navigator
            headerMode="screen"
            screenOptions={{
                headerTintColor: "white",
                headerBackTitleVisible: false,
                headerStyle: {
                    backgroundColor: "black",
                    shadowColor: "white"
                },
        }}>
            {screenName === "Feed" ? (
                <Stack.Screen name={"Feed"} component={Feed} options={{
                    headerTitle: () => <Image
                        style={{
                            maxHeight: 20,
                            maxWidth: 300
                        }}
                        resizeMode="contain" source={require("../assets/logoWhite.png")} />,
                    
                }} />
            ) : null}
            {screenName === "Search" ? (
                <Stack.Screen name={"Search"} component={Search} />
            ) : null}
            {screenName === "Notifications" ? (
                <Stack.Screen name={"Notifications"} component={Notifications} />
            ) : null}
            {screenName === "Me" ? <Stack.Screen name={"Me"} component={Me} /> : null}
            <Stack.Screen name="Likes" component={Likes} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="OnePhoto" component={OnePhoto} />
        </Stack.Navigator>
    )
}