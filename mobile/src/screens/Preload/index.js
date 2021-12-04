import React, { useEffect } from 'react';
import { Container, LoadingIcon } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import PreloadMedico from '../../assets/preload.svg';
export default () => {

    const navigation = useNavigation();

    useEffect(() => {
        const checkToken = async () => {

            const token = await AsyncStorage.getItem('token');
            if(token) {
                // validar o token

            } else {
                navigation.navigate('SignIn');
            }
        }
        checkToken();
    }, []);

    return (
        <Container>
            <PreloadMedico width="100%" height="160" />
            <LoadingIcon size="large" color="#ffffff" />
        </Container>
    )
}