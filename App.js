import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons'
import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';
import LoggedOutNav from './navigators/LoggedOutNav';
import { NavigationContainer } from '@react-navigation/native';


export default function App() {

  const [loading, setLoading] = useState(true)

  if (loading) {
    const onFinish = () => setLoading(false)
    const preload = () => {
      const fontsToLoad = [Ionicons.font];
      const fontPromises = fontsToLoad.map(font => Font.loadAsync(font))
      const imagesToLoad = [require("./assets/logo.png"),"https://fontmeme.com/images/instagram-new-logo.png"]
      const imagePromises = imagesToLoad.map(img => Asset.loadAsync(img))
      return Promise.all([...fontPromises, ...imagePromises])
    }

    return <AppLoading
      startAsync={preload}
      onError={console.warn}
      onFinish={onFinish}
    />
  }

  return (
    <NavigationContainer>
      <LoggedOutNav />
    </NavigationContainer>
  )
}

