import React from 'react';
import { View, Text, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import Button from './button';
import { useTranslation } from 'react-i18next';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link } from 'expo-router';

const CityCard = ({
    title,
    description,
    imageUrl,
    onReadMore,
}: {
    title: string;
    description: string;
    imageUrl: ImageSourcePropType;
    onReadMore: () => void;
}) => {
    const { t } = useTranslation();
    return (
        <View className="bg-white shadow-lg rounded-lg overflow-hidden relative">
            <Image source={imageUrl} style={{ width: '100%', height: 200 }} resizeMode="cover" />
            <View className="absolute top-2 right-2 bg-gray-100  rounded-full p-2 ">
                <AntDesign name="heart" size={17} color="red" />
            </View>
            <View className="p-4">
                <Text className="text-2xl font-bold text-gray-600 mb-2">{title}</Text>
                <Text className="text-md text-gray-600 mb-4">
                    {description.length > 100 ? `${description.substring(0, 100)}...` : description}
                </Text>
                <Link href="/(city)/about-city" asChild className="self-start">
                    <TouchableOpacity className="bg-blue-500 rounded-md px-4 py-2 items-center justify-center">
                        <Text className="text-white font-bold">{t('Read More')}</Text>
                    </TouchableOpacity>
                </Link>
            </View>
        </View>
    );
};

export default CityCard;
