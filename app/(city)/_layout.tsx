import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function CityLayout() {
    const { t } = useTranslation();
    return (
        <Stack>
            <Stack.Screen name="about-city" options={{ headerShown: true, title: t('About City') }} />
        </Stack>
    );
}
