import React, { useState } from 'react';
import {
    View,
    Text,
    AsyncStorage,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
} from 'react-native';

import api from '../services/api';

export default function Book({ navigation }) {

    const [date, setDate] = useState('');

    const spot_id = navigation.getParam('id');

    async function handleSubmit() {

        // if(date.length == 0)
        // {
        //     alert("Você deve preencher a data do agendamento!");

        //     return;
        // }

        const user_id = await AsyncStorage.getItem('user');

        await api.post(`/spots/${spot_id}/bookings`, {
            date: date
        }, {
            headers: {
                user_id
            },
        }).then(response => {

            console.log("Booking response: ", response.data);

            Alert.alert("", 'Solicitação de reserva confirmada!');

            navigation.navigate('List');
        })
        .catch(error => {

            console.log("Booking error: ", error.response.data)

            alert((error.response.data != null ? error.response.data.error : "Algo deu errado, por favor tente novamente!"));

            return;
        });
    }

    function handleCancel() {

        navigation.navigate('List');

    }

    return (
        <View style={styles.form}>

            <Text style={styles.label}>DATA DE INTERESSE *</Text>
            <TextInput
                style={styles.input}
                placeholder="Qual data você quer reservar?"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={date}
                onChangeText={text => setDate(text)}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit}
            >
                <Text style={styles.buttonText}>
                    Solicitar reserva
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={handleCancel}
            >
                <Text style={styles.buttonText}>
                    Cancelar
                </Text>
            </TouchableOpacity>

        </View>
    );

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 2,
        paddingHorizontal: 20,
        marginBottom: 20,
        height: 44,
        fontSize: 16,
        color: '#444'
    },

    button: {
        height: 40,
        backgroundColor: '#F05A5B',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginBottom: 10,
    },

    cancelButton: {
        backgroundColor: '#ccc'
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },

});
