import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { FlatList, View } from 'react-native';

function CityTab({ cityId, selectedId }: { cityId: string; selectedId: string | null }) {
    if (cityId === selectedId)
        return (
            <View className={` px-6 h-10 flex flex-row rounded-lg  justify-center items-center`}>
                <Text className="text-center font-bold text-blue-500">{cityId}</Text>
            </View>
        );

    return (
        <View className={`px-6 h-10 flex flex-row rounded-lg  justify-center items-center`}>
            <Text className="text-center font-base text-blue-500">{cityId}</Text>
        </View>
    );
}

export default function CityList() {
    const [selectedId, setSelectedId] = useState<string | null>('Tokyo');
    const handlePress = (id: string) => {
        setSelectedId(id);
    };
    const { t } = useTranslation();

    const data = [
        'Tokyo',
        'Osaka',
        'Kyoto',
        'Nagasaki',
        'Hokkaido',
        'Okinawa',
        'Fukuoka',
        'Kumamoto',
        'Nara',
        'Kagawa',
    ];

    return (
        <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            style={{ flexGrow: 0 }}
            className="rounded-lg bg-white p-2 "
        >
            {data.map((item: string) => {
                return (
                    <TouchableOpacity key={item} onPress={() => handlePress(item)}>
                        <CityTab cityId={t(item)} selectedId={selectedId} />
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
}
