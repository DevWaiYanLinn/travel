import React, { memo } from 'react';
import { View, Text, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { useTranslation } from 'react-i18next';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link } from 'expo-router';
import clsx from 'clsx';
import { Image } from 'expo-image';

const CityCard = memo(({ name, about, source }: { name: string; about: string; source: ImageSourcePropType }) => {
    const { t } = useTranslation();

    return (
        <View className="rounded-lg overflow-hidden relative" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
            <Image source={source} style={{ width: '100%', height: 200 }} resizeMode="cover" />
            <View
                className="absolute top-2 right-2 rounded-full p-2 "
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.75)',
                }}
            >
                <AntDesign name="heart" size={17} color="red" />
            </View>
            <View className="p-4">
                <Text className="text-2xl font-bold text-gray-600 mb-2">{name}</Text>
                <Text className="text-md text-gray-600 mb-4">
                    {about.length > 100 ? `${about.substring(0, 100)}...` : about}
                </Text>
                <Link disabled={about.length < 100} href="/(app)/(city)/about-city" asChild className="self-start">
                    <TouchableOpacity
                        className={clsx(
                            'bg-blue-500 rounded-md px-4 py-2 items-center justify-center',
                            about.length < 100 && 'bg-blue-100'
                        )}
                    >
                        <Text className="text-white font-bold">{t('Read More')}</Text>
                    </TouchableOpacity>
                </Link>
            </View>
        </View>
    );
});

CityCard.displayName = 'CityCard';

export default CityCard;
