import { memo } from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native';

export const CityList = memo(({ cities }: { cities: { name: string; id: string }[] }) => {
    return (
        <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            style={{ flexGrow: 0, backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
            className="rounded-l"
        >
            {cities.map((c: any) => {
                return (
                    <TouchableOpacity key={c.id}>
                        <View className={` px-6 h-10 flex flex-row rounded-lg  justify-center items-center`}>
                            <Text className="text-center font-bold text-indigo-500">{c.name}</Text>
                        </View>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
});

CityList.displayName = 'CityList';
