import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { getUrlFromDeepLink } from '../actions/deeplinkAction';

const DeepLinkScreen = ({ route }: any) => {

    const { url } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <WebView style={styles.container} source={{ uri: getUrlFromDeepLink(url) }} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})

export default DeepLinkScreen;
