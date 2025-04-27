import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

export const BASE_API_URL = 'https://waiyanlynn-meow-map.hf.space/api';

export const GRAPHQL_API_URL = 'https://waiyanlynn-meow-map.hf.space/graphql';

export const TAB_BAR_OPTIONS: BottomTabNavigationOptions = {
    tabBarActiveTintColor: '#3b82f6',
    tabBarStyle: {
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 35,
        marginBottom: 10,
        marginHorizontal: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        overflow: 'hidden',
    },
    tabBarIconStyle: {
        height: '100%',
        width: '100%',
    },
    tabBarShowLabel: false,
    tabBarItemStyle: {
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
    },
};
