import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

export default function Profile({ navigation, route }) {
    useEffect(() => {
        if (route?.params?.username) {
            navigation.setOption({
                title: route.params.username
            })
        }
    },[])
    
    return <View
        style={{
            flex: 1,
            backgroundColor: 'black',
            justifyContent: "center",
            alignItems: 'center'
        }}
    >
        <Text style={{ color: "white" }}>Someones Profile</Text>
    </View>
}