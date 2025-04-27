import AntDesign from '@expo/vector-icons/AntDesign';
import { memo } from 'react';
import { View, Text, Dimensions, ImageSourcePropType } from 'react-native';
import { Image } from 'expo-image';

const PopularCard = memo(({ name, source }: { name: string; source: ImageSourcePropType }) => {
    return (
        <View
            className="rounded-lg p-3 relative overflow-hidden"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
        >
            <Image
                style={{
                    borderRadius: 5,
                    width: Dimensions.get('window').width * 0.4,
                    height: Dimensions.get('window').height * 0.2,
                }}
                contentFit="cover"
                source={source}
            />
            <Text className="text-center mt-3 text-gray-600 font-bold">{name}</Text>
            <View
                className="absolute top-5 right-5  rounded-full p-2 "
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.75)',
                }}
            >
                <AntDesign name="hearto" size={17} color="red" />
            </View>
        </View>
    );
});

PopularCard.displayName = 'PopularCityCard';

export default PopularCard;
