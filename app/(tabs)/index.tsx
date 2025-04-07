import React, { useState } from 'react';
import {
    Image,
    Keyboard,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import CityList from '@/components/custom/city-list';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useTranslation } from "react-i18next";


export default function Tab() {
    const { t, i18n } = useTranslation();
    const [isSearchVisible, setSearchVisible] = useState(false);


    return (
        <View className="flex-1 p-4">
            <View className="flex-row items-center justify-between mb-5">
                {!isSearchVisible && (
                    <View className="flex-row items-center">
                        <Image source={{ uri: 'https://i.pravatar.cc/50' }} className="w-12 h-12 rounded-full mr-3" />
                        <Text className="text-lg font-bold text-gray-500 ">{t('John Doe')}</Text>
                    </View>
                )}
                {isSearchVisible ? (
                    <TextInput
                        onBlur={() => setSearchVisible(false)}
                        autoFocus={true}
                        placeholder={t('Search...')}
                        className="flex-1 bg-gray-200 rounded-md px-4 py-2"
                    />
                ) : (
                    <TouchableOpacity onPress={() => setSearchVisible(true)} className="bg-white rounded-full p-2">
                        <Feather name="search" size={24} color="blue" />
                    </TouchableOpacity>
                )}
            </View>
            <CityList />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View className='flex-1'>
                    <Text className="text-2xl mt-5 text-gray-500">{t('Popular Attractions')}</Text>
                    <View className='flex flex-row gap-5 mt-5'>
                        <View className='flex-1 relative rounded-lg bg-white p-3 overflow-hidden'>
                            <Image
                                className='w-full h-[150px] rounded-md'
                                resizeMode='cover'
                                source={require('../../assets/city/sky-tree.jpg')} />
                            <Text className='text-center mt-3 text-gray-500 font-extrabold '>{t('Sky Tree')}</Text>
                            <View className='absolute top-5 right-5 bg-gray-100  rounded-full p-2 '>
                                <AntDesign name="heart" size={17} color="red" />
                            </View>
                        </View>
                        <View className='flex-1 rounded-lg p-3 relative bg-white overflow-hidden'>
                            <Image
                                className='w-full h-[150px] rounded-md'
                                resizeMode='cover'
                                source={require('../../assets/city/osaka-castle.jpg')} />
                        <Text className='text-center mt-3 text-gray-500 font-extrabold '>{t('Osaka Castle')}</Text>
                            <View className='absolute top-5 right-5 bg-gray-100  rounded-full p-2'>
                                <AntDesign name="hearto" size={17} color="red" />
                            </View>
                        </View>
                    </View>
                    <Text className="text-2xl mt-5 text-gray-500">{t('Popular Cuisines')}</Text>
                    <View className='flex flex-row gap-5 mt-5'>
                        <View className='flex-1 rounded-lg bg-white p-3 overflow-hidden relative'>
                            <Image
                                className='w-full h-[150px] rounded-md'
                                resizeMode='cover'
                                source={require('../../assets/food/takoyaki.jpg')} />
                            <Text className='text-center text-gray-500 mt-3 font-extrabold '>{t('Takoyaki')}</Text>
                            <View className='absolute top-5 right-5 bg-gray-100  rounded-full p-2 '>
                                <AntDesign name="hearto" size={17} color="red" />
                            </View>
                        </View>
                        <View className='flex-1 rounded-lg p-3 bg-white overflow-hidden relative'>
                            <Image
                                className='w-full h-[150px] rounded-md'
                                resizeMode='cover'
                                source={require('../../assets/food/sushi.jpg')} />
                            <Text className='text-center text-gray-500 mt-3 font-extrabold '>{t('Sushi')}</Text>
                            <View className='absolute top-5 right-5 bg-gray-100  rounded-full p-2 '>
                                <AntDesign name="hearto" size={17} color="red" />
                            </View>
                        </View>
                    </View>
                    <View className='flex-1 justify-center items-center'>
                        <Text className="text-[1.2rem] mt-5 text-center text-blue-500 font-bold underline">www.clover-travel.com</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}
