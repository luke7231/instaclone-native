import { useQuery, gql } from '@apollo/client';
import React, { useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import UserRow from '../components/UserRow';
import { USER_FRAGMENT } from '../Fragment';
import ScreenLayout from '../nav/ScreenLayout';



const LIKES_QUERY = gql`
    query seePhotoLikes($id: Int!) {
        seePhotoLikes(id: $id) {
        ...UserFragment
        }
    }
    ${USER_FRAGMENT}
    `;



export default function Likes({ navigation, route, }) {
    const [refreshing, setRefreshing] = useState(false);
    const { data, loading, refetch } = useQuery(LIKES_QUERY, {
        variables: {
            id: route?.params?.photoId,
        },
        skip: !route?.params?.photoId

        
    })
    
    console.log(data)
    const renderUser = ({ item: user }) => {
        <UserRow {...user}/>
    }
    const onRefresh = async () => {
        setRefreshing(true);
        await refetch;
        setRefreshing(false);
    }
    return (
        <ScreenLayout loading={loading}>
            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor="white"
                        colors="white"
                    />
                }
                data={data?.seePhotoLikes}
                keyExtractor={user=> user.id}
                renderItem={renderUser}
                style={{width: "100%"}}/>
        </ScreenLayout>
    )
}