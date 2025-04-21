import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import CityList from '@/components/custom/city-list';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useTranslation } from 'react-i18next';
import Entypo from '@expo/vector-icons/Entypo';
import { Link } from 'expo-router';

export default function Tab() {
    const { t, i18n } = useTranslation();
    const [isSearchVisible, setSearchVisible] = useState(false);

    return (
        <ScrollView className="p-3 flex-1">
            <View className="flex-row items-center justify-between mb-5">
                <Link href={'/(user)/profile'}>
                    <View className="flex-row items-center">
                        <Image source={require('@/assets/images/avatar.png')} className="w-12 h-12 rounded-full mr-3" />
                        <Text className="text-lg font-bold text-gray-600 ">{t('John Doe')}</Text>
                    </View>
                </Link>
                <Entypo name="dots-three-vertical" size={24} color="#6b7280" />
            </View>
            <CityList />
            <View className="mt-5">
                <Text className="text-xl text-gray-600 font-bold">{t('Popular Attractions')}</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className="mt-3">
                    <View className="mr-3 rounded-lg p-3 relative bg-white overflow-hidden">
                        <Image
                            style={{
                                width: Dimensions.get('window').width * 0.4,
                                height: Dimensions.get('window').height * 0.2,
                            }}
                            className="rounded-md"
                            resizeMode="cover"
                            source={require('../../assets/city/nagasaki.jpg')}
                        />
                        <Text className="text-center mt-3  text-gray-600 font-bold">{t('Nagasaki')}</Text>
                        <View className="absolute top-5 right-5 bg-gray-100  rounded-full p-2 ">
                            <AntDesign name="hearto" size={17} color="red" />
                        </View>
                    </View>
                    <View className="mr-3 relative rounded-lg bg-white p-3 overflow-hidden">
                        <Image
                            style={{
                                width: Dimensions.get('window').width * 0.4,
                                height: Dimensions.get('window').height * 0.2,
                            }}
                            className="rounded-md"
                            resizeMode="cover"
                            source={require('../../assets/city/sky-tree.jpg')}
                        />
                        <Text className="text-center mt-3  text-gray-600 font-bold ">{t('Sky Tree')}</Text>
                        <View className="absolute top-5 right-5 bg-gray-100  rounded-full p-2 ">
                            <AntDesign name="heart" size={17} color="red" />
                        </View>
                    </View>
                    <View className="mr-3 rounded-lg p-3 relative bg-white overflow-hidden">
                        <Image
                            className="rounded-md"
                            style={{
                                width: Dimensions.get('window').width * 0.4,
                                height: Dimensions.get('window').height * 0.2,
                            }}
                            resizeMode="cover"
                            source={require('../../assets/city/osaka-castle.jpg')}
                        />
                        <Text className="text-center mt-3  text-gray-600 font-bold ">{t('Osaka Castle')}</Text>
                        <View className="absolute top-5 right-5 bg-gray-100  rounded-full p-2 ">
                            <AntDesign name="hearto" size={17} color="red" />
                        </View>
                    </View>
                </ScrollView>
            </View>
            <View className="mt-5">
                <Text className="text-xl text-gray-600 font-bold">{t('Popular Cuisines')}</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className="mt-3">
                    <View className="mr-3 rounded-lg bg-white p-3 overflow-hidden relative">
                        <Image
                            style={{
                                width: Dimensions.get('window').width * 0.4,
                                height: Dimensions.get('window').height * 0.2,
                            }}
                            className="h-[75%] rounded-md"
                            resizeMode="cover"
                            source={require('../../assets/food/takoyaki.jpg')}
                        />
                        <Text className="text-center mt-3 text-gray-600  font-bold ">{t('Takoyaki')}</Text>
                        <View className="absolute top-5 right-5 bg-gray-100  rounded-full p-2 ">
                            <AntDesign name="hearto" size={17} color="red" />
                        </View>
                    </View>
                    <View className="mr-3 rounded-lg px-3 pt-3 bg-white overflow-hidden relative">
                        <Image
                            style={{
                                width: Dimensions.get('window').width * 0.4,
                                height: Dimensions.get('window').height * 0.2,
                            }}
                            className="rounded-md"
                            resizeMode="cover"
                            source={require('../../assets/food/sushi.jpg')}
                        />
                        <View className="flex-1 justify-center items-center">
                            <Text className="text-center text-gray-600 font-bold ">{t('Sushi')}</Text>
                        </View>
                        <View className="absolute top-5 right-5 bg-gray-100  rounded-full p-2 ">
                            <AntDesign name="hearto" size={17} color="red" />
                        </View>
                    </View>
                    <View className="rounded-lg p-3 bg-white overflow-hidden relative">
                        <Image
                            style={{
                                width: Dimensions.get('window').width * 0.4,
                                height: Dimensions.get('window').height * 0.2,
                            }}
                            className="rounded-md"
                            resizeMode="cover"
                            source={require('../../assets/food/ramen.png')}
                        />
                        <Text className="text-center mt-3 text-gray-500 font-extrabold ">{t('Ramen')}</Text>
                        <View className="absolute top-5 right-5 bg-gray-100  rounded-full p-2 ">
                            <AntDesign name="hearto" size={17} color="red" />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </ScrollView>
    );
}
