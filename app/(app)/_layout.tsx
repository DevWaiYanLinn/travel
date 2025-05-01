import { useSession } from '@/providers/session-provider';
import { Redirect, Stack } from 'expo-router';
import { View } from 'react-native';

export default function AppLayout() {
    const { session, isLoading } = useSession();

    if (isLoading) {
        return <View />;
    }

    if (!session) {
        return <Redirect href="/(auth)/sign-in" />;
    }

    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(city)" options={{ headerShown: false }} />
            <Stack.Screen name="(user)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
        </Stack>
    );
}
