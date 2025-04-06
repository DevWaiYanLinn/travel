import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Button from './button';

const CityCard = ({
    title,
    description,
    imageUrl,
    onReadMore,
}: {
    title: string;
    description: string;
    imageUrl: string;
    onReadMore: () => void;
}) => {
    return (
        <View className="bg-white shadow-lg rounded-lg overflow-hidden m-4">
            <Image source={{ uri: imageUrl }} style={{ width: '100%', height: 200 }} resizeMode="cover" />
            <View className="p-4">
                <Text className="text-lg font-bold text-gray-800 mb-2">{title}</Text>
                <Text className="text-sm text-gray-600 mb-4">
                    {description.length > 100 ? `${description.substring(0, 100)}...` : description}
                </Text>
                <Button onPress={onReadMore} variant="primary">
                    <Text className="text-white text-sm font-semibold">Read More</Text>
                </Button>
            </View>
        </View>
    );
};

export default CityCard;
