import { Image, Text, TouchableOpacity, View } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { Link } from 'expo-router';

import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import { useTranslation } from 'react-i18next';
export default function Profile() {
    const { t } = useTranslation();
    return (
        <View className="flex-1 p-3 bg-gray-100">
            <View className="flex-row justify-between items-center">
                <View className="flex-row items-center">
                    <Image source={require('@/assets/images/avatar.png')} className="rounded-full w-12 h-12" />
                    <View className="ml-3">
                        <Text className="text-xl font-bold text-gray-600">John Doe</Text>
                        <Text className="text-gray-500 text-sm font-bold">@user123</Text>
                    </View>
                </View>
                <Link href={'/(user)/edit'}>
                    <View className="bg-gray-100 rounded-full p-3">
                        <Feather name="edit" size={23} color="black" />
                    </View>
                </Link>
            </View>
            <View className="mt-5 flex-1 bg-white gap-5 p-6 rounded-md">
                <View className="h-[40%] gap-3 rounded-lg flex-row items-center justify-center border border-gray-300">
                    <Entypo name="heart" size={30} color="red" />
                    <Text className="text-3xl text-gray-600">Fav Posts</Text>
                </View>
            </View>
            <TouchableOpacity
                style={{ borderRadius: 30 }}
                className="p-4 self-end gap-3 flex-row items-center mt-3 bg-blue-500"
            >
                <Ionicons name="exit-outline" size={28} color="white" />
                <Text className="text-lg text-white font-bold">{t('Sign Out')}</Text>
            </TouchableOpacity>
        </View>
    );
}
