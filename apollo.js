import { ApolloClient, createHttpLink, InMemoryCache, makeVar } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setContext} from '@apollo/client/link/context'
import { offsetLimitPagination } from '@apollo/client/utilities';
const TOKEN = "authorization"
export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");
//로그인 함수
export const logUserIn = async (token) => {
  await AsyncStorage.setItem(TOKEN, token);
  isLoggedInVar(true)
  tokenVar(token)
}
//로그아웃 함수
export const logUserOut = async () => {
  await AsyncStorage.removeItem(TOKEN)
  isLoggedInVar(false);
  tokenVar(null);
}

const httpLink = createHttpLink({
  uri: "https://f2a2-118-34-232-180.ngrok.io/graphql",
})
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: tokenVar()
    }
  }
})

export const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          seeFeed: offsetLimitPagination()
        }
      }
    }
  })
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});
export default client;