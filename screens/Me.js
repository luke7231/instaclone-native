import { useNavigation } from '@react-navigation/core';
import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { logUserOut } from '../apollo';
import useMe from '../hooks/useMe'


export default function Me({}) {
  const { data } = useMe()
  const navigation = useNavigation()
  useEffect(() => {
    navigation.setOptions({
      title: data?.me?.useName
    })
  }, [])
  
  return (
    <View 
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity onPress={logUserOut}><Text style={{color:"white"}}>hi</Text></TouchableOpacity>
    </View>
  );
}