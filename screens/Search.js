import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Text,TextInput,TouchableOpacity, View } from 'react-native';
import DismissKeyboard from '../shared/DismissKeyboard';

export default function Search({ navigation }) {
    const { setValue, register, } = useForm()
    
    const searchBox = () => (
        <TextInput
            placeholder="SERACH SOMETHING"
            returnKeyLabel="Search"
            returnKeyType="search"
            autoCapitalize="none"
            autoCapitalize={false}
            onChangeText={(text) => setValue("keyword", text)}
        />
    )
    useEffect(() => {
        navigation.setOptions({
            headerTitle: searchBox
        })
        register("keyword")
    }, [])

    
    return (
        <DismissKeyboard>
            <View
                style={{
                    backgroundColor: "black",
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <Text style={{color: "white"}}>Photo</Text>
            </View>
        </DismissKeyboard>
    )
        
    
}