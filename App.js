import React from 'react';
import {
    View,
    SafeAreaView,
    Platform,
    StatusBar,
    YellowBox
} from 'react-native';

import Routes from './src/routes';

YellowBox.ignoreWarnings([
    'Unrecognized WebSocket'
]);

export default function App() {

    return (
        <SafeAreaView style={{ marginTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0, flex: 1 }}>
            <Routes />
        </SafeAreaView>
    );
}
