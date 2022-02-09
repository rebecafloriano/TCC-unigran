import React, {useState, useEffect} from 'react';
import { Text } from 'react-native';
import { RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Api from '../../Api';

import {
     Container,
     Scroller,

     HeaderArea,
     HeaderTitle,
     SearchButton,

     ListArea,

     LoadingIcon,


} from './styles';

import DoctorItem from '../../components/DoctorItem';

import SearchIcon from '../../assets/search.svg';

export default () => {
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const getDoctors = async () => {
        setLoading(true);
        setList([]);

        let res = await Api.getDoctors();
        console.log(res);
        if(res.error == '') {

            setList(res.data);
        } else {
            alert("Erro: " + res.error);
        }

        setLoading(false);

    }

    useEffect(()=>{
        getDoctors();
    }, []);

    const onRefresh = () => {
        setRefreshing(false);
        getDoctors();
    }

    return (
        <Container>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>

                <HeaderArea>
                    <HeaderTitle numberOfLines={2}>Encontre o seu médico</HeaderTitle>
                    <SearchButton onPress={()=>navigation.navigate('Search')}>
                        <SearchIcon width="26" height="26" fill="#FFFFFF"/>
                    </SearchButton>
                </HeaderArea>

                <ListArea>
                    {list.map((item, k)=>(
                        <DoctorItem key={k} data={item} />
                    ))}
                </ListArea>

                {loading &&
                <LoadingIcon size="large" color="#ffffff"/>
                }








            </Scroller>

        </Container>
    );
}
