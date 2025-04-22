import React, { useState } from "react";
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import CityList from "@/components/custom/city-list";
import { useTranslation } from "react-i18next";
import { Link, useRouter } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import PopulardCard from "@/components/custom/popular-card";

export default function Tab() {
    const { t, i18n } = useTranslation();
    const [isSearchVisible, setSearchVisible] = useState(false);
    const router = useRouter();

    return (
        <ScrollView className="p-3 flex-1">
            <View className="flex-row items-center justify-between mb-5">
                <Link href={"/(user)/profile"}>
                    <View className="flex-row items-center">
                        <Image
                            source={require("@/assets/images/avatar.png")}
                            className="w-12 h-12 rounded-full mr-3"
                        />
                        <Text className="text-lg font-bold text-gray-600 ">
                            {t("John Doe")}
                        </Text>
                    </View>
                </Link>
                <TouchableOpacity
                    onPress={() => {
                        router.push("/(auth)/sign-in");
                    }}
                >
                    <MaterialCommunityIcons
                        name="logout"
                        size={30}
                        color="red"
                    />
                </TouchableOpacity>
            </View>
            <CityList />
            <View className="mt-5">
                <Text className="text-xl text-gray-600 font-bold">
                    {t("Popular Attractions")}
                </Text>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    className="mt-3"
                >
                    <PopulardCard
                        name={t("Nagasaki")}
                        image={require("../../assets/city/nagasaki.jpg")}
                    />
                    <PopulardCard
                        name={t("Osaka Castle")}
                        image={require("../../assets/city/sky-tree.jpg")}
                    />
                     <PopulardCard
                        name={t("Sky Tree")}
                        image={require("../../assets/city/osaka-castle.jpg")}
                    />
                </ScrollView>
            </View>
            <View className="mt-5">
                <Text className="text-xl text-gray-600 font-bold">
                    {t("Popular Cuisines")}
                </Text>
                
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    className="mt-3"
                >   
                <PopulardCard
                        name={t("Takoyaki")}
                        image={require("../../assets/food/takoyaki.jpg")}
                    />
                    <PopulardCard
                        name={t("Sushi")}
                        image={require("../../assets/food/sushi.jpg")}
                    />
                     <PopulardCard
                        name={t("Ramen")}
                        image={require("../../assets/food/ramen.png")}
                    />
                </ScrollView>
            </View>
        </ScrollView>
    );
}
