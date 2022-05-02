import React, { useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { gql } from '@apollo/client'
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT, USER_FRAGMENT } from '../Fragment';
import ScreenLayout from '../nav/ScreenLayout';
import { useQuery } from '@apollo/client';
import Photo from '../components/Photo';
const LIKES_QUERY = gql`
    query seePhotoLikes($id: Int!) {
        seePhotoLikes(id: $id) {
        ...UserFragment
        }
    }
    ${USER_FRAGMENT}
    `;


const FEED_QUERY = gql`
    query seeFeed($offset:Int!) {
        seeFeed(offset:$offset) {
            ...PhotoFragment
            user {
                id
                userName
                avatar
            }
            caption
            comments{
                ...CommentFragment
            }
            createAt
            isMine
        }
    }
    ${PHOTO_FRAGMENT},
    ${COMMENT_FRAGMENT}
`
export default function Feed() {
    const { data, loading, refetch, fetchMore } = useQuery(FEED_QUERY, {
        variables: {
            offset: 0
        }
    });
    const jc = useQuery(LIKES_QUERY, {
        variables: {
            id: 19,
        }
    })
    console.log(jc.data)
    const renderPhoto = ({ item: photo }) => {
        return (
            <Photo {...photo}/>
        )
    };
    const [refreshing, setRefreshing] = useState(false);
    const refresh = async () => {
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
                        onRefresh={refresh}
                        tintColor="white"
                        colors="white"
                    />
                }
                onEndReached={() => fetchMore({
                    variables: {
                        offset: data?.seeFeed?.length
                    }
                })}
                onEndReachedThreshold={0.05}
                style={{ width: "100%" }}
                showsVerticalScrollIndicator={false}
                data={data?.seeFeed}
                keyExtractor={photo => photo.id}
                renderItem={renderPhoto}

            />
        </ScreenLayout>
    )
    
}