import React, { useState } from 'react';
import {
    FlatList,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import Swiper from 'react-native-swiper';
export default function Tab() {
    const [isSearchVisible, setSearchVisible] = useState(false);

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
        <View className="flex-1 p-4">
            <View className="flex-row items-center justify-between mb-5">
                {!isSearchVisible && (
                    <View className="flex-row items-center">
                        <Image source={{ uri: 'https://i.pravatar.cc/50' }} className="w-12 h-12 rounded-full mr-3" />
                        <Text className="text-lg font-bold text-gray-800">John Doe</Text>
                    </View>
                )}
                {isSearchVisible ? (
                    <TextInput
                        onBlur={() => setSearchVisible(false)}
                        autoFocus={true}
                        placeholder="Search..."
                        className="flex-1 bg-gray-200 rounded-md px-4 py-2"
                    />
                ) : (
                    <TouchableOpacity onPress={() => setSearchVisible(true)} className="bg-gray-200 rounded-full p-2">
                        <Feather name="search" size={24} color="black" />
                    </TouchableOpacity>
                )}
            </View>
            <FlatList
                data={data}
                style={{ flexGrow: 0 }}
                className="rounded-md bg-gray-200 p-2"
                renderItem={({ item }: { item: string }) => (
                    <View
                        className={`${
                            item === 'Tokyo' ? 'bg-white shadow-md' : 'bg-inherit'
                        } px-6 h-10 flex flex-row rounded-lg  justify-center items-center`}
                    >
                        <Text className="text-center font-thin text-blue-500">{item}</Text>
                    </View>
                )}
                decelerationRate={'fast'}
                keyExtractor={(item: string) => item}
                horizontal={true}
                showsHorizontalScrollIndicator={false} // Hide scroll indicator
            />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View>
                    <View className="mt-5">
                        <Text className="text-2xl text-blue-500">Popular Destinations</Text>
                    </View>
                    <View className="mt-5">
                        <Text className="text-blue-500 text-2xl">Popular Cuisines</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}
