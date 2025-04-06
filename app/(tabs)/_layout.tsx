import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Tabs } from 'expo-router';

export default function Layout() {
    return (
        <Tabs initialRouteName="index" screenOptions={{ tabBarActiveTintColor: 'blue' }}>
            <Tabs.Screen
                name="index"
                options={{
                    headerShown: false,
                    title: 'Home',
                    tabBarIcon: ({ color }: { color: string }) => <FontAwesome size={28} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="city"
                options={{
                    headerShown: false,
                    title: 'City',
                    tabBarIcon: ({ color }: { color: string }) => <FontAwesome5 size={28} name="city" color={color} />,
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    headerShown: false,
                    title: 'Settings',
                    tabBarIcon: ({ color }: { color: string }) => (
                        <FontAwesome size={28} name="cog" className="text-cyan-500" />
                    ),
                }}
            />
        </Tabs>
    );
}
