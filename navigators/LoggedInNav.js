import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabIcon from '../nav/TabIcon';
import { View } from 'react-native';
import StackNavFactory from '../navigators/StackNavFactory';
import { Ionicons } from '@expo/vector-icons';

const Tabs = createBottomTabNavigator()


export default function LoggedInNav() {
    return <Tabs.Navigator
        screenOptions={{
            tabBarStyle: {
                backgroundColor: "black",
                
            },
            tabBarActiveTintColor: "white",
            tabBarShowLabel: false,
            headerShown: false
            
    }}
    >
        <Tabs.Screen
            name="Feed"
            option={{
                tabBarIcon: ({ focused, color, size }) => (
                    <TabIcon iconName={"home"} color={color} focused={focused} />
                )
        }}
        > 
            {() => <StackNavFactory screenName={"Feed"} />}
        </Tabs.Screen>
        <Tabs.Screen
            name="Search"
            option={{
                tabBarIcon: ({ focused, color, size }) => (
                    <TabIcon iconName="search" color={color} focused={focused} />
                )
            }}
        >
            {() => <StackNavFactory screenName="Search" />}
        </Tabs.Screen>
                    
        <Tabs.Screen 
            name="Camera"
            component={View}
            option={{
                tabBarIcon: ({ focused, color, size }) => (
                    <TabIcon iconName={"camera"} color={color} focused={focused} />
                )
            }}
        />
        <Tabs.Screen 
            name="Notifications"
            option={{
                tabBarIcon: ({ focused, color, size }) => (
                    <TabIcon iconName="heart" color={color} focused={focused} />
                )
            }}
        >
            {() => <StackNavFactory screenName="Notifications" />}
      </Tabs.Screen>
        <Tabs.Screen
            name="Me"
            option={{
                tabBarIcon: ({ focused, color, size }) => (
                    <TabIcon iconName="person" color={color} focused={focused} />
                )
            }}
        >
            {() => <StackNavFactory screenName="Me" />}
      </Tabs.Screen>
            
    </Tabs.Navigator>
}