import React, { memo } from "react";
import { View, Text, Image, Dimensions, Pressable, ImageSourcePropType } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

type AttractionCardProps = {
    title: string;
    image: ImageSourcePropType
    ticketPrice: string;
    hours: string;
    location: string;
    onCommentPress?: () => void;
};

const AttractionCard = memo(
    ({
        title,
        image,
        ticketPrice,
        hours,
        location,
        onCommentPress,
    }: AttractionCardProps) => {
        const { t } = useTranslation();
        return (
            <View className="flex-row p-3 flex gap-5 bg-white rounded-lg">
                <View className="relative">
                    <Image
                        className="rounded-md"
                        resizeMode="cover"
                        style={{
                            width: Dimensions.get("window").width * 0.35,
                            height: Dimensions.get("window").width * 0.35,
                        }}
                        source={image}
                    />
                    <View className="absolute top-2 right-2 bg-gray-100 rounded-full p-1">
                        <AntDesign name="heart" size={16} color="red" />
                    </View>
                </View>
                <View className="flex-1">
                    <View className="flex-1 justify-between">
                        <Text className="text-lg font-bold text-gray-600">
                            {t(title)}
                        </Text>
                        <Text className="text-gray-500 font-bold text-xs">
                            {t("Ticket Price")}:{" "}
                            <Text className="text-blue-400">
                                {ticketPrice}
                            </Text>
                        </Text>
                        <Text className="text-gray-500 font-bold text-xs">
                            {t("Hours")}:{" "}
                            <Text className="text-blue-400">{hours}</Text>
                        </Text>
                        <Text className="text-gray-500 font-bold text-xs">
                            {t("Location")}:{" "}
                            <Text className="text-blue-400">{location}</Text>
                        </Text>
                    </View>
                    <Pressable onPress={onCommentPress}>
                        <View className="flex-row w-full rounded-lg justify-end items-center gap-5">
                            <View className="flex-row gap-1 items-center">
                                <AntDesign
                                    name="hearto"
                                    size={14}
                                    color="#6b7280"
                                />
                                <Text className="text-gray-500 text-[10px]">
                                    99k
                                </Text>
                            </View>
                            <View className="flex-row gap-1 items-center">
                                <FontAwesome
                                    name="comment-o"
                                    size={15}
                                    color="#6b7280"
                                />
                                <Text className="text-gray-500 text-[10px]">
                                    100
                                </Text>
                            </View>
                        </View>
                    </Pressable>
                </View>
            </View>
        );
    }
);

export default AttractionCard;
