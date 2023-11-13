import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QnAPage from '../pages/QnAPage';
import DeepLinkPage from '../pages/DeepLinkPage';
import { Linking } from 'react-native';

const linking = {
    prefixes: ['assignmentapp://'],
    config: {
        screens: {
            QnAPage: 'QnAPage',
        },
    },
};

const Stack = createNativeStackNavigator();


export default function Routes() {

    const navigationRef = React.useRef<any>(null);

    React.useEffect(() => {
        Linking.addEventListener('url', handleDeepLink);
        Linking.getInitialURL().then((url) => {
            if (url) {
                setTimeout(() => {
                    handleDeepLink({ url });
                })
            }
        });
        return () => {
            Linking.removeAllListeners('url');
        };
    }, []);

    const handleDeepLink = ({ url }: any) => {
        navigationRef.current?.navigate('DeepLink', { url });
    };

    return (
        <NavigationContainer linking={linking} ref={navigationRef}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name="QnAPage" component={QnAPage} />
                <Stack.Screen name="DeepLink" component={DeepLinkPage} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}