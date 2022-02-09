<<<<<<< HEAD
import React, {useState, useEffect} from 'react';
import { Text } from 'react-native';
import { RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
=======
import React, { useState, useEffect } from 'react';
import { Platform, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { request, PERMISSIONS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
>>>>>>> a8c6851fdbebfbd18e84c6057c591e0eda2a2571

import Api from '../../Api';

import {
     Container,
     Scroller,

     HeaderArea,
     HeaderTitle,
     SearchButton,

<<<<<<< HEAD
     ListArea,

     LoadingIcon,

=======
     LocationArea,
     LocationInput,
     LocationFinder,

     LoadingIcon,
     ListArea
>>>>>>> a8c6851fdbebfbd18e84c6057c591e0eda2a2571

} from './styles';

import DoctorItem from '../../components/DoctorItem';

import SearchIcon from '../../assets/search.svg';
<<<<<<< HEAD

export default () => {
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
=======
import MyLocationIcon from '../../assets/my_location.svg';

export default () => {

    const navigation = useNavigation();

    const [ locationText, setLocationText ] = useState('');
    const [ coords, setCoords ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ list, setList ] = useState([]);
    const [refreshing, setRefreshing ] = useState(false);

    const handleLocationFinder = async () => {
        setCoords(null);
        let result = await request(
            Platform.OS === 'ios' ?
                PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
                :
                PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        );

        if(result == 'granted') {
            setLoading(true);
            setLocationText('');
            setList([]);

            Geolocation.getCurrentPosition((info)=> {
                setCoords(info.coords);
                getDoctors();
            });

        }
    }
>>>>>>> a8c6851fdbebfbd18e84c6057c591e0eda2a2571

    const getDoctors = async () => {
        setLoading(true);
        setList([]);

<<<<<<< HEAD
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
=======
        let lat = null;
        let lng = null;
        if(coords) {
            lat = coords.latitude;
            lng = coords.longitude;
        }

        let res = await Api.getDoctors(lat, lng, locationText);
        console.log(res);
        if(res.error == '') {
            if(res.loc) {
                setLocationText(res.loc);
            }

            setList(res.data);

        } else {
            alert("Erro: "+res.error);
        }

        setLoading(false);
    }

    useEffect(() => {
>>>>>>> a8c6851fdbebfbd18e84c6057c591e0eda2a2571
        getDoctors();
    }, []);

    const onRefresh = () => {
        setRefreshing(false);
        getDoctors();
    }

<<<<<<< HEAD
=======
    const handleLocationSearch = () => {
        setCoords({});
        getDoctors();
    }

>>>>>>> a8c6851fdbebfbd18e84c6057c591e0eda2a2571
    return (
        <Container>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
<<<<<<< HEAD

                <HeaderArea>
                    <HeaderTitle numberOfLines={2}>Encontre o seu médico</HeaderTitle>
                    <SearchButton onPress={()=>navigation.navigate('Search')}>
                        <SearchIcon width="26" height="26" fill="#FFFFFF"/>
                    </SearchButton>
                </HeaderArea>

=======
                <HeaderArea>
                    <HeaderTitle numberOfLines={2}>Encontre o seu médico favorito</HeaderTitle>
                    <SearchButton onPress={()=>navigation.navigate('Search')}>
                        <SearchIcon width="26" height="26" fill="#FFFFFF" />
                    </SearchButton>
                </HeaderArea>

                <LocationArea>
                    <LocationInput
                        placeholder="Onde você está?"
                        placeholderTextColor="#FFFFFF"
                        value={locationText}
                        onChangeText={t=>setLocationText(t)}
                        onEndEditing={handleLocationSearch}
                    />
                    <LocationFinder onPress={handleLocationFinder}>
                        <MyLocationIcon width="24" height="24" fill="#FFFFFF" />
                    </LocationFinder>
                </LocationArea>

                {loading &&
                    <LoadingIcon size="large" color="#FFFFFF" />
                }
                
>>>>>>> a8c6851fdbebfbd18e84c6057c591e0eda2a2571
                <ListArea>
                    {list.map((item, k)=>(
                        <DoctorItem key={k} data={item} />
                    ))}
                </ListArea>

<<<<<<< HEAD
                {loading &&
                <LoadingIcon size="large" color="#ffffff"/>
                }








            </Scroller>

=======

            </Scroller>
>>>>>>> a8c6851fdbebfbd18e84c6057c591e0eda2a2571
        </Container>
    );
}
