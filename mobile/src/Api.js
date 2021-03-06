import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_API = 'http://10.0.2.2:8000/api';

export default {
    checkToken:async (token) => {
        const req = await fetch(`${BASE_API}/auth/refresh`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token})
        });
        const json = await req.json();
        return json;
    },
    signIn: async (email, password) => {
        const req = await fetch(`${BASE_API}/auth/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });
        const json = await req.json();
        return json;
    },
    signUp: async (name, email, password) => {
        const req = await fetch(`${BASE_API}/user`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
        });
        const json = await req.json();
        return json;
    },
<<<<<<< HEAD

    logout: async () => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/auth/logout`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token})
        });
        const json = await req.json();
        return json;
    },

    getDoctors: async () => {
        const token = await AsyncStorage.getItem('token');

        const req = await fetch(`${BASE_API}/doctors?token=${token}`);
        const json = await req.json();
        return json;
    },

    getDoctor: async (id) => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/doctor/${id}?token=${token}`);
        const json = await req.json();
        console.log(json);
=======
    getDoctors: async (lat=null, lng=null, address=null) => {
        const token = await AsyncStorage.getItem('token');

        console.log("LAT", lat);
        console.log("LNG", lng);
        console.log("ADDRESS", address);

        const req = await fetch(`${BASE_API}/doctors?token=${token}&lat=${lat}&lng=${lng}&address=${address}`);
        const json = await req.json();
>>>>>>> a8c6851fdbebfbd18e84c6057c591e0eda2a2571
        return json;
    }




};
