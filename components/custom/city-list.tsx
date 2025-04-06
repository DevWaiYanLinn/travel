import { useEffect, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { FlatList, View } from 'react-native';

export default function CityList() {
    const [selectedId, setSelectedId] = useState<string | null>('Tokyo');
    const handlePress = (id: string) => {
        setSelectedId(id);
    };

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
        <FlatList
            key={selectedId}
            data={data}
            style={{ flexGrow: 0 }}
            className="rounded-md bg-gray-200 p-2"
            renderItem={({ item }: { item: string }) => {
                if (item === selectedId) {
                    return (
                        <TouchableOpacity onPress={() => handlePress(item)}>
                            <View
                                className={`bg-white px-6 h-10 flex flex-row rounded-lg  justify-center items-center`}
                            >
                                <Text className="text-center font-thin text-blue-500">{item}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                }
                return (
                    <TouchableOpacity onPress={() => handlePress(item)}>
                        <View className={` px-6 h-10 flex flex-row rounded-lg  justify-center items-center`}>
                            <Text className="text-center font-thin text-blue-500">{item}</Text>
                        </View>
                    </TouchableOpacity>
                );
            }}
            decelerationRate={'fast'}
            keyExtractor={(item: string) => item}
            horizontal={true}
            showsHorizontalScrollIndicator={false} // Hide scroll indicator
        />
    );
}
