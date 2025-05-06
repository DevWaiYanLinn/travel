import { useFocusEffect } from 'expo-router';
import '../global.css';
import { useCallback, useEffect } from 'react';
import 'react-native-reanimated';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import '@/localization/i18n';
import { BackHandler, NativeEventSubscription } from 'react-native';
import { SessionProvider } from '@/providers/session-provider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Slot } from 'expo-router';
import { SWRConfig } from 'swr';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                // Prevent back navigation
                return true;
            };

            // ✅ Returns a NativeEventSubscription, not BackHandlerStatic
            const subscription: NativeEventSubscription = BackHandler.addEventListener(
                'hardwareBackPress',
                onBackPress
            );

            // ✅ Remove listener correctly
            return () => subscription.remove();
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
        <SafeAreaView style={{ flex: 1 }}>
            <SessionProvider>
                <SWRConfig
                    value={{
                        provider: () => new Map(),
                    }}
                >
                    <GestureHandlerRootView>
                        <BottomSheetModalProvider>
                            <Slot />
                        </BottomSheetModalProvider>
                    </GestureHandlerRootView>
                </SWRConfig>
            </SessionProvider>
        </SafeAreaView>
    );
}
