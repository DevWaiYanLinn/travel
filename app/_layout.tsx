import {Stack, useFocusEffect} from 'expo-router';
import '../global.css';
import {useCallback, useEffect} from 'react';
import 'react-native-reanimated';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import '@/localization/i18n';
import { BackHandler } from 'react-native';
void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	useFocusEffect(
		useCallback(() => {
			const onBackPress = () => {
				// Returning true disables back button
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
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(city)" options={{ headerShown: false }} />
            <Stack.Screen name="(user)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
        </Stack>
    );
}
