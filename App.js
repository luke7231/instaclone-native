import React, { useState } from 'react';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons'
import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';
import LoggedOutNav from './navigators/LoggedOutNav';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloClient, ApolloProvider, makeVar, useReactiveVar } from '@apollo/client';
import client, { isLoggedInVar, tokenVar, cache } from './apollo';
import LoggedInNav from './navigators/LoggedInNav';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorageWrapper, persistCache } from 'apollo3-cache-persist';


export default function App() {

  const [loading, setLoading] = useState(true)
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const onFinish = () => setLoading(false)
  const preloadAssets = () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font))
    const imagesToLoad = [require("./assets/logo.png"),"https://fontmeme.com/images/instagram-new-logo.png"]
    const imagePromises = imagesToLoad.map(img => Asset.loadAsync(img))
    return Promise.all([...fontPromises, ...imagePromises])
  }
  const preload = async () => {
    const token = await AsyncStorage.getItem("authorization");
    if (token) {
      isLoggedInVar(true);
      tokenVar(token)
    }
    await persistCache({
      cache,
      storage: new AsyncStorageWrapper(AsyncStorage),
      serialize: false,
    })
    return preloadAssets;
  }

  if (loading) {
    return <AppLoading
      startAsync={preload}
      onError={console.warn}
      onFinish={onFinish}
    />
  }

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        {isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
      </NavigationContainer>
    </ApolloProvider>
  )
}

