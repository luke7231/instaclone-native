import React from 'react';
import { Text, View } from 'react-native';

export default function Notifications() {
    return <View
        style={{
            flex: 1,
            backgroundColor: 'black',
            justifyContent: "center",
            alignItems: 'center'
        }}
    >
        <Text style={{color: "white"}}>
            Notifications
        </Text>
    </View>
}