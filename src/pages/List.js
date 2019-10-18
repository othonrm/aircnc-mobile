import React, { useState, useEffect, useCallback } from 'react';
import {
    AsyncStorage,
    SafeAreaView,
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    RefreshControl,
    ActivityIndicator,
} from 'react-native';

import socketio from 'socket.io-client';

import api from '../services/api';

import logo from '../assets/logo.png';

import SpotList from '../components/SpotList';

export default function List({ navigation }) {

    const [techs, setTechs] = useState(null);

    const [refreshing, setRefreshing] = useState(true);

    useEffect(() => {

        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.0.7:3333', {
                query: { user_id }
            })

            socket.on('booking_response', booking => {

                alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA': 'REJEITADA'}.`);

            });
        });

    }, [])

    useEffect(() => {

        // console.log("List use effect!");

        if(!refreshing)
        {
            return;
        }

        AsyncStorage.getItem('techs').then(storagedTechs => {

            if(storagedTechs.length == 0 || storagedTechs == null)
            {
                AsyncStorage.removeItem('user').then(() => {

                    navigation.navigate('Login');

                });
            }

            const techsArray = storagedTechs.split(',').map(tech => tech.trim());

            setTechs(techsArray);

            setRefreshing(false);

        });


    }, [refreshing, techs]);

    function onRefresh() {

        setRefreshing(true);

        setTechs(null);
    }

    return (

        <View style={styles.container}>

            <Image style={styles.logo} source={logo} />

            <ScrollView
                refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> }
            >
            {
                techs == null ?
                <ActivityIndicator />
                :
                techs.map(tech => <SpotList key={tech} tech={tech} />)
            }
            </ScrollView>

        </View>

    );

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        // justifyContent: 'center'
    },

    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 10,
    }

});
