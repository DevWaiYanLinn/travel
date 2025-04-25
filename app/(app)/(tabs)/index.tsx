import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import CityList from '@/components/custom/city-list';
import { useTranslation } from 'react-i18next';
import { Link, useRouter } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import PopularCard from '@/components/custom/popular-card';
import { useSession } from '@/providers/session-provider';

export default function Tab() {
    const { t } = useTranslation();
    const router = useRouter();
    const { signOut, session } = useSession();

    return (
        <ScrollView className="p-3 flex-1">
            <View className="flex-row items-center justify-between mb-5">
                <Link href={'/(app)/(user)/profile'}>
                    <View className="flex-row items-center">
                        <Image source={require('@/assets/images/avatar.png')} className="w-12 h-12 rounded-full mr-3" />
                        <Text className="text-lg font-bold text-gray-600 ">{t('John Doe')}</Text>
                    </View>
                </Link>
                <TouchableOpacity
                    onPress={() => {
                        signOut();
                        router.push('/(auth)/sign-in');
                    }}
                >
                    <MaterialCommunityIcons name="logout" size={30} color="#f87171" />
                </TouchableOpacity>
            </View>
            <CityList />
            <View className="mt-5">
                <Text className="text-xl text-gray-600 font-bold">{t('Popular Attractions')}</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className="mt-3">
                    <PopularCard name={t('Nagasaki')} image={require('@/assets/city/nagasaki.jpg')} />
                    <PopularCard name={t('Osaka Castle')} image={require('@/assets/city/sky-tree.jpg')} />
                    <PopularCard name={t('Sky Tree')} image={require('@/assets/city/osaka-castle.jpg')} />
                </ScrollView>
            </View>
            <View className="mt-5">
                <Text className="text-xl text-gray-600 font-bold">{t('Popular Cuisines')}</Text>

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className="mt-3">
                    <PopularCard name={t('Takoyaki')} image={require('@/assets/food/takoyaki.jpg')} />
                    <PopularCard name={t('Sushi')} image={require('@/assets/food/sushi.jpg')} />
                    <PopularCard name={t('Ramen')} image={require('@/assets/food/ramen.png')} />
                </ScrollView>
            </View>
        </ScrollView>
    );
}
