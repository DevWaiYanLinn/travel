import React, { memo } from "react";
import {
    View,
    Text,
    Dimensions,
    Pressable,
    ImageSourcePropType,
} from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { Image } from "expo-image";
import { UserPreference } from "./user-preference";

type AttractionCardProps = {
    id: string;
    name: string;
    source: ImageSourcePropType;
    ticketPrice: string;
    hours: string;
    location: string;
    preference: boolean;
    onCommentPress?: () => void;
};

const AttractionCard = memo((props: AttractionCardProps) => {
    const { t } = useTranslation();
    return (
        <View
            className="flex-row p-3 flex gap-5 rounded-lg"
            style={{
                backgroundColor: "rgba(255, 255, 255, 0.6)",
            }}
        >
            <View className="relative">
                <Image
                    className=" overflow-hidden"
                    contentFit="cover"
                    style={{
                        width: Dimensions.get("window").width * 0.35,
                        height: Dimensions.get("window").width * 0.35,
                        borderRadius: 5,
                    }}
                    source={props.source}
                />
                {/* <UserPreference key={`${props.preference}`}
                    apiEndPoint={`/attractions/${props.id}/preferences`}
                    preference={props.preference}
                /> */}
            </View>
            <View className="flex-1">
                <View className="flex-1 justify-between">
                    <Text className="text-lg font-bold text-gray-600">
                        {props.name}
                    </Text>
                    <Text className="text-gray-500 font-bold text-xs">
                        {t("Ticket Price")}:{" "}
                        <Text className="text-indigo-400">
                            {props.ticketPrice}
                        </Text>
                    </Text>
                    <Text className="text-gray-500 font-bold text-xs">
                        {t("Hours")}:{" "}
                        <Text className="text-indigo-400">{props.hours}</Text>
                    </Text>
                    <Text className="text-gray-500 font-bold text-xs">
                        {t("Location")}:{" "}
                        <Text className="text-indigo-400">{props.location}</Text>
                    </Text>
                </View>
                <Pressable onPress={props.onCommentPress} className="mt-2">
                    <View className="flex-row w-full rounded-lg justify-end items-center gap-5">
                        <View className="flex-row gap-1 items-center">
                            <AntDesign
                                name="hearto"
                                size={14}
                                color="#ef4444"
                            />
                            <Text className="text-gray-500 text-[10px] font-semibold">
                                99k
                            </Text>
                        </View>
                        <View className="flex-row gap-1 items-center">
                            <FontAwesome
                                name="comment-o"
                                size={15}
                                color="#818cf8"
                            />
                            <Text className="text-gray-500 text-[10px] font-semibold">
                                100
                            </Text>
                        </View>
                    </View>
                </Pressable>
            </View>
        </View>
    );
});

export default AttractionCard;
