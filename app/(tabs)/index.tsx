import React, { useState } from 'react';
import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import CityList from '@/components/custom/city-list';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useTranslation } from 'react-i18next';

export default function Tab() {
    const { t, i18n } = useTranslation();
    const [isSearchVisible, setSearchVisible] = useState(false);

    return (
        <View className="p-4 flex-1">
            <View className="flex-row items-center justify-between mb-5">
                <View className="flex-row items-center">
                    <Image source={{ uri: 'https://i.pravatar.cc/50' }} className="w-12 h-12 rounded-full mr-3" />
                    <Text className="text-lg font-bold text-gray-500 ">{t('John Doe')}</Text>
                </View>
            </View>
            <CityList />
            <View className="flex-1 mt-5 gap-5 ">
                <View className="flex-1">
                    <Text className="text-2xl text-gray-600">{t('Popular Attractions')}</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className="mt-5">
                        <View className="w-[150px] mr-5 relative rounded-lg bg-white pt-3 px-3 overflow-hidden">
                            <Image
                                className="w-full h-[75%] rounded-md"
                                resizeMode="cover"
                                source={require('../../assets/city/sky-tree.jpg')}
                            />
                            <View className="flex-1 justify-center items-center">
                                <Text className="text-center  text-gray-500 font-extrabold ">{t('Sky Tree')}</Text>
                            </View>
                            <View className="absolute top-5 right-5 bg-gray-100  rounded-full p-2 ">
                                <AntDesign name="heart" size={17} color="red" />
                            </View>
                        </View>
                        <View className="w-[150px] mr-5 rounded-lg px-3 pt-3 relative bg-white overflow-hidden">
                            <Image
                                className="w-full h-[75%] rounded-md"
                                resizeMode="cover"
                                source={require('../../assets/city/osaka-castle.jpg')}
                            />
                            <View className="flex-1 justify-center items-center">
                                <Text className="text-center  text-gray-500 font-extrabold ">{t('Osaka Castle')}</Text>
                            </View>
                            <View className="absolute top-5 right-5 bg-gray-100  rounded-full p-2 ">
                                <AntDesign name="hearto" size={17} color="red" />
                            </View>
                        </View>
                        <View className="w-[150px] mr-5 rounded-lg px-3 pt-3 relative bg-white overflow-hidden">
                            <Image
                                className="w-full h-[75%] rounded-md"
                                resizeMode="cover"
                                source={require('../../assets/city/osaka-castle.jpg')}
                            />
                            <View className="flex-1 justify-center items-center">
                                <Text className="text-center  text-gray-500 font-extrabold ">{t('Osaka Castle')}</Text>
                            </View>
                            <View className="absolute top-5 right-5 bg-gray-100  rounded-full p-2 ">
                                <AntDesign name="hearto" size={17} color="red" />
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <View className="flex-1">
                    <Text className="text-2xl text-gray-600">{t('Popular Cuisines')}</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className="mt-5">
                        <View className="w-[150px] mr-5 rounded-lg bg-white px-3 pt-3 overflow-hidden relative">
                            <Image
                                className="w-full h-[75%] rounded-md"
                                resizeMode="cover"
                                source={require('../../assets/food/takoyaki.jpg')}
                            />
                            <View className="flex-1 justify-center items-center">
                                <Text className="text-center text-gray-500  font-extrabold ">{t('Takoyaki')}</Text>
                            </View>
                            <View className="absolute top-5 right-5 bg-gray-100  rounded-full p-2 ">
                                <AntDesign name="hearto" size={17} color="red" />
                            </View>
                        </View>
                        <View className="w-[150px] mr-5 rounded-lg px-3 pt-3 bg-white overflow-hidden relative">
                            <Image
                                className="w-full h-[75%] rounded-md"
                                resizeMode="cover"
                                source={require('../../assets/food/sushi.jpg')}
                            />
                            <View className="flex-1 justify-center items-center">
                                <Text className="text-center text-gray-500 mt-3 font-extrabold ">{t('Sushi')}</Text>
                            </View>
                            <View className="absolute top-5 right-5 bg-gray-100  rounded-full p-2 ">
                                <AntDesign name="hearto" size={17} color="red" />
                            </View>
                        </View>
                        <View className="w-[150px] mr-5 rounded-lg px-3 pt-3 bg-white overflow-hidden relative">
                            <Image
                                className="w-full h-[75%] rounded-md"
                                resizeMode="cover"
                                source={require('../../assets/food/sushi.jpg')}
                            />
                            <View className="flex-1 justify-center items-center">
                                <Text className="text-center text-gray-500 mt-3 font-extrabold ">{t('Sushi')}</Text>
                            </View>
                            <View className="absolute top-5 right-5 bg-gray-100  rounded-full p-2 ">
                                <AntDesign name="hearto" size={17} color="red" />
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <View className="justify-center items-center">
                    <TouchableOpacity className="bg-blue-500 rounded-full w-full py-3">
                        <Text className="text-white font-bold text-center text-lg">{t('About Us')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
