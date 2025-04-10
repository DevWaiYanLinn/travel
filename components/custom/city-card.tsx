import React from 'react';
import { View, Text, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import Button from './button';
import { useTranslation } from 'react-i18next';
import AntDesign from '@expo/vector-icons/AntDesign';

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
    const { t } = useTranslation()
    return (
        <View className="bg-white shadow-lg rounded-lg overflow-hidden m-4 relative">
            <Image source={imageUrl} style={{ width: '100%', height: 200 }} resizeMode="cover" />
            <View className="absolute top-2 right-2 bg-gray-100  rounded-full p-2 ">
                <AntDesign name="heart" size={17} color="red" />
            </View>
            <View className="p-4">
                <Text className="text-2xl font-bold text-gray-600 mb-2">{title}</Text>
                <Text className="text-md text-gray-600 mb-4">
                    {description.length > 100 ? `${description.substring(0, 100)}...` : description}
                </Text>
                <Button onPress={onReadMore} variant="primary">
                    <Text className="text-white text-sm font-semibold">{t('Read More')}</Text>
                </Button>
            </View>
        </View>
    );
};

export default CityCard;
