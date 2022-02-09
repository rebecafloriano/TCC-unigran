<<<<<<< HEAD
import React, { useContext } from 'react';
=======
import React, {useContext} from "react";
>>>>>>> a8c6851fdbebfbd18e84c6057c591e0eda2a2571
import styled from 'styled-components/native';

import { UserContext } from '../contexts/UserContext';

import HomeIcon from '../assets/home.svg';
import SearchIcon from '../assets/search.svg';
<<<<<<< HEAD
import TodayIcon from '../assets/today.svg';
=======
import CalendarIcon from '../assets/calendar';
>>>>>>> a8c6851fdbebfbd18e84c6057c591e0eda2a2571
import FavoriteIcon from '../assets/favorite.svg';
import AccountIcon from '../assets/account.svg';

const TabArea = styled.View`
    height: 60px;
    background-color: #4EADBE;
    flex-direction: row;
<<<<<<< HEAD
=======

>>>>>>> a8c6851fdbebfbd18e84c6057c591e0eda2a2571
`;

const TabItem = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const TabItemCenter = styled.TouchableOpacity`
    width: 70px;
    height: 70px;
    justify-content: center;
    align-items: center;
    background-color: #FFF;
    border-radius: 35px;
    border: 3px solid #4EADBE;
    margin-top: -20px;
`;

const AvatarIcon = styled.Image`
    width: 24px;
    height: 24px;
    border-radius: 12px;
`;

export default ({ state, navigation}) => {
<<<<<<< HEAD
    const { state:user } = useContext(UserContext);
=======
    const {state:user} = useContext(UserContext);
>>>>>>> a8c6851fdbebfbd18e84c6057c591e0eda2a2571

    const goTo = (screenName) => {
        navigation.navigate(screenName);
    }

    return (
<<<<<<< HEAD
        <TabArea >
            <TabItem onPress={()=>goTo('Home')}>
                <HomeIcon style={{opacity: state.index===0? 1 : 0.5}} width="24" height="24" fill="#FFFFFF"/>
            </TabItem>
            <TabItem onPress={()=>goTo('Search')}>
                <SearchIcon style={{opacity: state.index===1? 1 : 0.5}} width="24" height="24" fill="#FFFFFF"/>
            </TabItem>
            <TabItemCenter onPress={()=>goTo('Appointments')}>
                <TodayIcon width="32" height="32" fill="#4EADBE"/>
            </TabItemCenter>
            <TabItem onPress={()=>goTo('Favorites')}>
                <FavoriteIcon style={{opacity: state.index===3? 1 : 0.5}} width="24" height="24" fill="#FFFFFF"/>
            </TabItem>
            <TabItem onPress={()=>goTo('Profile')}>
                {user.avatar != '' ?
                    <AvatarIcon source={{uri: user.avatar}} />
                    :
                    <AccountIcon style={{opacity: state.index===4? 1 : 0.5}} width="24" height="24" fill="#FFFFFF"/>
                }
=======
        <TabArea>
            <TabItem onPress={()=>goTo('Home')}>
                <HomeIcon style={{opacity: state.index ===0? 1 : 0.5}} width="24" height="24" fill="#FFFFFF" />
            </TabItem>
            <TabItem onPress={()=>goTo('Search')}>
                <SearchIcon style={{opacity: state.index ===1? 1 : 0.5}} width="24" height="24" fill="#FFFFFF" />
            </TabItem>
            <TabItemCenter onPress={()=>goTo('Appointments')}>
                <CalendarIcon width="32" height="32" fill="#4EADBE" />
            </TabItemCenter>
            <TabItem onPress={()=>goTo('Favorites')}>
                <FavoriteIcon style={{opacity: state.index ===3? 1 : 0.5}} width="24" height="24" fill="#FFFFFF" />
            </TabItem>
            <TabItem onPress={()=>goTo('Profile')}>
                {user.avatar !='' ?
                    <AvatarIcon source={{uri: user.avatar}} />
                    :
                    <AccountIcon style={{opacity: state.index ===4? 1 : 0.5}}  width="24" height="24" fill="#FFFFFF" />
                }                
>>>>>>> a8c6851fdbebfbd18e84c6057c591e0eda2a2571
            </TabItem>
        </TabArea>

    );
<<<<<<< HEAD
}
=======
}
>>>>>>> a8c6851fdbebfbd18e84c6057c591e0eda2a2571
