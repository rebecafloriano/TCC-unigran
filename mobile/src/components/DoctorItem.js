import React from 'react';
import styled from 'styled-components/native';
<<<<<<< HEAD
import { useNavigation } from '@react-navigation/native';

import Stars from '../components/Stars';
=======

import Stars from '../components/Stars'
>>>>>>> a8c6851fdbebfbd18e84c6057c591e0eda2a2571

const Area = styled.TouchableOpacity`
    background-color: #FFFFFF;
    margin-bottom: 20px;
    border-radius: 20px;
    padding: 15px;
    flex-direction: row;
`;

const Avatar = styled.Image`
    width: 88px;
    height: 88px;
    border-radius: 20px;
`;

const InfoArea = styled.View`
    margin-left: 20px;
<<<<<<< HEAD
    justify-content: space-between;;
=======
    justify-content: space-between;
>>>>>>> a8c6851fdbebfbd18e84c6057c591e0eda2a2571
`;

const UserName = styled.Text`
    font-size: 17px;
    font-weight: bold;
`;

const SeeProfileButton = styled.View`
    width: 85px;
    height: 26px;
    border: 1px solid #4EADBE;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
`;

const SeeProfileButtonText = styled.Text`
    font-size: 13px;
    color: #268596;
`;

<<<<<<< HEAD
export default ({data}) => {
    const navigation = useNavigation();

    const handleClick = () => {
        navigation.navigate('Doctor', {
            id: data.id,
            avatar: data.avatar,
            name: data.name,
            stars: data.stars
        });
    }

    return (
        <Area onPress={handleClick}>
=======

export default ({data}) => {
    return (
        <Area>
>>>>>>> a8c6851fdbebfbd18e84c6057c591e0eda2a2571
            <Avatar source={{uri: data.avatar}} />
            <InfoArea>
                <UserName>{data.name}</UserName>

                <Stars stars={data.stars} showNumber={true} />
<<<<<<< HEAD

=======
                
>>>>>>> a8c6851fdbebfbd18e84c6057c591e0eda2a2571
                <SeeProfileButton>
                    <SeeProfileButtonText>Ver Perfil</SeeProfileButtonText>
                </SeeProfileButton>
            </InfoArea>
        </Area>
    );
<<<<<<< HEAD
}
=======
}
>>>>>>> a8c6851fdbebfbd18e84c6057c591e0eda2a2571
