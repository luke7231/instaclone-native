import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { Image, TouchableOpacity, useWindowDimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { gql, useMutation } from '@apollo/client'


//좋아요 뮤테이션 꺼내고
const TOGGLE_LIKE_MUTATION = gql`
    mutation toggleLike($id:Int!){
        toggleLike(id:$id){
            ok
            error
        }
    }
`


//
const Container = styled.View``;
const Header = styled.TouchableOpacity`
    padding: 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const UserAvatar = styled.Image`
    margin-bottom: 8px;
    width: 25px;
    height: 25px;
    border-radius: 12.5px;
    
`;
const Username = styled.Text`
    color: white;
    font-weight: 600;
`;
const File = styled.Image``;
const Actions = styled.View`
    flex-direction: row;
    align-items: center;
`;
const Action = styled.TouchableOpacity`
    margin-right: 10px;
`;
const Caption = styled.View`
    flex-direction: row;
`;
const CaptionText = styled.Text`
    color: white;
    margin-left: 5px;
`;
const Likes = styled.Text`
    color: white;
    margin: 7px 0px;
    font-weight: 600;
`;
const ExtraContainer = styled.View`
    padding: 10px;
`;

function Photo({ id, user, caption, file, isLiked, likes }) {
    const navigation = useNavigation()
    const { width, height } = useWindowDimensions();
    const [imageHeight, setImageHeight] = useState(height - 450);
    useEffect(() => {
        Image.getSize(file, (width, height) => {
            setImageHeight(height / 3);
        })
    }, [file]);
    
    const updateToggleLike = (cache, result) => {
        const { data: { toggleLike: { ok } } } = result
        const photoId = `Photo:${id}`
        if (ok) {
            cache.modify({
                id: photoId,
                fields: {
                    isLiked(prev) {
                        return !prev;
                    },
                    likes(prev) {
                        if (isLiked) {
                            return prev - 1;
                        }
                        return prev + 1;
                    }
                }
            })
        }
    }
    const [toggleLikeMutation, { loading }] = useMutation(TOGGLE_LIKE_MUTATION, {
        variables: {
            id: id
        },
        update: updateToggleLike
    })

    const goToProfile = () => {
        navigation.navigate("Profile", {
            userName: user?.userName,
            id: user?.id
        })
    }
    return (
        <Container>
            <Header onPress={()=> goToProfile()}>
              
                <Username>{user.userName}</Username>
            </Header>
            <File
                resizeMode="cover"
                style={{
                    width,
                    height: imageHeight,
                }}
                source={{ uri: file }}
            />
            <ExtraContainer>
                <Actions>
                    <Action onPress={toggleLikeMutation}>
                        <Ionicons name={isLiked ? "heart" : "heart-outline"} size={22} color={ isLiked? "tomato" : "white"} />
                    </Action>
                    <Action>
                        <Ionicons name="chatbubble-outline" size={22} color="white" />                    
                    </Action>
                </Actions>
                <TouchableOpacity>
                    <Likes onPress={() =>
                        navigation.navigate("Likes", {
                            photoId: id,
                    })}>{likes === 1 ? "1 like" : `${likes} likes`}</Likes>
                </TouchableOpacity>
                <Caption>
                    <TouchableOpacity onPress={()=> goToProfile()}>
                        <Username>{user?.userName}</Username>
                    </TouchableOpacity>
                    <CaptionText>{caption}</CaptionText>
                </Caption>
            </ExtraContainer>
        </Container>
    );
}

Photo.propTypes = {
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
        avatar: PropTypes.string,
        userName: PropTypes.string.isRequired,
    }),
    caption: PropTypes.string,
    file: PropTypes.string.isRequired,
    isLiked: PropTypes.bool.isRequired,
    likes: PropTypes.number.isRequired,
    commentNumber: PropTypes.number.isRequired,
};
export default Photo;