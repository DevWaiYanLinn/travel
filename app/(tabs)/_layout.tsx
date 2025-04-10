import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';
import Fontisto from '@expo/vector-icons/Fontisto';

export default function Layout() {
    const { t } = useTranslation();
    return (
        <Tabs initialRouteName="index" screenOptions={{ tabBarActiveTintColor: '#60a5fa' }}>
            <Tabs.Screen
                name="index"
                options={{
                    headerShown: false,
                    title: t('Home'),
                    tabBarIcon: ({ color }: { color: string }) => <FontAwesome size={28} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="city"
                options={{
                    headerShown: true,
                    title: t('Cities'),
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontSize: 25, color: '#4b5563' },
                    tabBarIcon: ({ color }: { color: string }) => <FontAwesome5 size={28} name="city" color={color} />,
                }}
            />
            <Tabs.Screen
                name="attraction"
                options={{
                    headerShown: false,
                    title: t('Attractions'),
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontSize: 25, color: '#4b5563' },
                    tabBarIcon: ({ color }: { color: string }) => <Fontisto name="heart" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    headerShown: true,
                    title: t('Settings'),
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontSize: 25, color: '#4b5563' },
                    tabBarIcon: ({ color }: { color: string }) => <FontAwesome size={28} name="cog" color={color} />,
                }}
            />
        </Tabs>
    );
}
