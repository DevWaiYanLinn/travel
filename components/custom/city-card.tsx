import React, { memo } from 'react';
import { View, Text, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Link } from 'expo-router';
import { Image } from 'expo-image';
import { UserPreference } from './user-preference';

type CityCardProps = {
    id: string;
    name: string;
    about: string;
    source: ImageSourcePropType;
    preference: boolean;
};

const CityCard = memo((props: CityCardProps) => {
    const { t } = useTranslation();

    return (
        <View className="rounded-lg overflow-hidden relative" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
            <Image source={props.source} style={{ width: '100%', height: 200 }} contentFit="cover" />
            <UserPreference preference={props.preference} apiEndPoint={`/cities/${props.id}/preferences`} />
            <View className="p-4">
                <Text className="text-xl font-bold text-gray-600 mb-2">{props.name}</Text>
                <Text className="text-mdp text-gray-600 mb-4">
                    {props.about.length > 100 ? `${props.about.substring(0, 100)}...` : props.about}
                </Text>
                <Link href={`/(app)/(city)/about-city?id=${props.id}`} asChild className="self-start">
                    <TouchableOpacity className={'bg-indigo-500 rounded-md px-4 py-2 items-center justify-center'}>
                        <Text className="text-white font-bold">{t('Read More')}</Text>
                    </TouchableOpacity>
                </Link>
            </View>
        </View>
    );
});

CityCard.displayName = 'CityCard';

export default CityCard;
