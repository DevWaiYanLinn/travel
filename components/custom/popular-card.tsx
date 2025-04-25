import AntDesign from "@expo/vector-icons/AntDesign";
import { memo } from "react";
import {
    View,
    Text,
    Image,
    Dimensions,
    ImageSourcePropType,
} from "react-native";

const PopularCard = memo(
    ({ name, image }: { name: string; image: ImageSourcePropType }) => {
        return (
            <View
                className="mr-3 rounded-lg p-3 relative overflow-hidden"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}
            >
                <Image
                    style={{
                        width: Dimensions.get("window").width * 0.4,
                        height: Dimensions.get("window").height * 0.2,
                    }}
                    className="rounded-md"
                    resizeMode="cover"
                    source={image}
                />
                <Text className="text-center mt-3  text-gray-600 font-bold">
                    {name}
                </Text>
                <View
                    className="absolute top-5 right-5  rounded-full p-2 "
                    style={{
                        backgroundColor: "rgba(255, 255, 255, 0.75)",
                    }}
                >
                    <AntDesign name="hearto" size={17} color="red" />
                </View>
            </View>
        );
    }
);

PopularCard.displayName = "PopularCityCard";

export default PopularCard;
