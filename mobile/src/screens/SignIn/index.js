import React, {useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import { Text } from 'react-native';
import {
     Container,
     InputArea,
     CustomButton,
     CustomButtonText,
     SignMessageButton,
     SignMessageButtonText,
     SignMessageButtonTextBold
} from './styles';

import Api from '../../Api';

import SignInput from '../../components/SignInput';

import PreloadMedico from '../../assets/preload.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';

export default () => {

    const navigation = useNavigation();

    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');

    const handleSignClick = async () => {
        if(emailField != '' && passwordField != '') {

            let json = await Api.signIn(emailField, passwordField);
            console.log(json);
            if(json.token) {
                alert("DEU CERTO");
            } else {
                alert("E-mail e/ou senha errados!");
            }

        } else {
            alert("Preencha os campos!");
        }
    }

    const handleMessageButtonClick = () => {
        navigation.reset({
            routes: [{name: 'SignUp'}]
        });
    }

    return (
        <Container>
            <PreloadMedico width="100%" height="150" />

            <InputArea>
                <SignInput
                 IconSvg={EmailIcon}
                 placeholder="Digite seu e-mail"
                 value={emailField}
                 onChangeText={t=>setEmailField(t)}
                />

                <SignInput
                 IconSvg={LockIcon}
                 placeholder="Digite sua senha"
                 value={passwordField}
                 onChangeText={t=>setPasswordField(t)}
                 password={true}
                />

                <CustomButton onPress={handleSignClick}>
                    <CustomButtonText>LOGIN</CustomButtonText>
                </CustomButton>
            </InputArea>

            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Ainda não possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
            </SignMessageButton>

        </Container>
    );
}