import { memo } from "react";
import { View, Text, Dimensions, ImageSourcePropType } from "react-native";
import { Image } from "expo-image";
import { UserPreference } from "./user-preference";

type PopularCardProps = {
    name: string;
    source: ImageSourcePropType;
    preferences: boolean;
    apiEndPoint: string;
};

const PopularCard = memo((props: PopularCardProps) => {
    return (
        <View
            className="rounded-lg p-3"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}
        >
            <View
                className="relative overflow-hidden"
                style={{
                    borderRadius: 5,
                    width: Dimensions.get("window").width * 0.4,
                    height: Dimensions.get("window").height * 0.2,
                }}
            >
                <Image
                    className="w-full h-full"
                    contentFit="cover"
                    source={props.source}
                    style={{ width: "100%", height: "100%" }}
                />
                <UserPreference
                    preference={props.preferences}
                    apiEndPoint={props.apiEndPoint}
                />
            </View>
            <Text
                className="w-full text-center mt-3 text-gray-600 font-bold"
            >
                {props.name.length > 8
                    ? props.name.substring(0, 8) + ".."
                    : props.name}
            </Text>
        </View>
    );
});

PopularCard.displayName = "PopularCityCard";

export default PopularCard;
