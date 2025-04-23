import { useFocusEffect } from 'expo-router';
import '../global.css';
import { useCallback, useEffect } from 'react';
import 'react-native-reanimated';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import '@/localization/i18n';
import { BackHandler } from 'react-native';
import { SessionProvider } from '@/providers/session-provider';
import { Slot } from 'expo-router';
import { SWRConfig } from 'swr';

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                return true;
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () => {
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
            };
        }, [])
    );

    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            void SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <SessionProvider>
            <SWRConfig
                value={{
                    provider: () => new Map(),
                }}
            >
                <Slot />
            </SWRConfig>
        </SessionProvider>
    );
}
