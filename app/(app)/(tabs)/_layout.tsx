import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { AntDesign } from '@expo/vector-icons';
import { TAB_BAR_OPTIONS } from '@/config/constants';

export default function Layout() {
    const { t } = useTranslation();
    return (
        <Tabs initialRouteName="index" screenOptions={TAB_BAR_OPTIONS}>
            <Tabs.Screen
                name="index"
                options={{
                    headerShown: false,
                    title: t('Home'),
                    tabBarIcon: ({ color }: { color: string }) => <FontAwesome size={30} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="city"
                options={{
                    headerShown: false,
                    title: t('Cities'),
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontSize: 25, color: '#4b5563' },
                    tabBarIcon: ({ color }: { color: string }) => (
                        <FontAwesome6 size={30} name="tree-city" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="attraction"
                options={{
                    headerShown: false,
                    title: t('Attractions'),
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontSize: 25, color: '#4b5563' },
                    tabBarIcon: ({ color }: { color: string }) => <AntDesign size={30} name="star" color={color} />,
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    headerShown: false,
                    title: t('Settings'),
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontSize: 25, color: '#4b5563' },
                    tabBarIcon: ({ color }: { color: string }) => <FontAwesome size={30} name="cog" color={color} />,
                }}
            />
        </Tabs>
    );
}
