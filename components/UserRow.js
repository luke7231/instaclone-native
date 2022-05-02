import { useNavigation } from '@react-navigation/core';
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components/native";
import { colors } from '../color';

const Column = styled.View`
 flex-direction: row;
 align-items: center;

`;
const Avatar = styled.Image`
width: 40px;
height: 40px;
border-radius: 25px;
margin-right: 10px;
`;
const Username = styled.Text`
font-weight: 600;
color: white;
`;

const Wrapper = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 5px 10px;
`;
const FollowBtn = styled.TouchableOpacity`
    background-color: ${colors.blue};
    justify-content: center;
    padding: 5px 10px;
    border-radius: 4px;
`;
const FollowBtnText = styled.Text`
    color: white;
    font-weight: 600;
`;

export default function UserRow({  id, userName, avatar, isFollowing, isMe }) {
    const navigation = useNavigation()
    
    return (
        <Wrapper>
            <Column onPress={navigation.navigate("Profile", {
                userName,
                id,
        })}>
            <Avatar source={{ uri: avatar }} />
            <Username>{userName}</Username>
        </Column>
        {!isMe ? (
            <FollowBtn>
            <FollowBtnText>{isFollowing ? "Unfollow" : "Follow"}</FollowBtnText>
            </FollowBtn>
        ) : null}
        </Wrapper>
    );
}
    

UserRow.propTypes = {
    id: PropTypes.number.isRequired,
    userName: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    isFollowing: PropTypes.bool,
    isMe: PropTypes.bool.isRequired
};