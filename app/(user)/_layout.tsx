import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function Layout() {
    const { t } = useTranslation();
    return (
        <Stack>
            <Stack.Screen name="profile" options={{ headerShown: true, title: t('Profile') }} />
            <Stack.Screen name="edit" options={{ headerShown: true, title: t('Edit Profile') }} />
        </Stack>
    );
}
