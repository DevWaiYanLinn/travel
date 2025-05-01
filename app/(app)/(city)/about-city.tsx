import { Skeleton } from "@/components/common/skeleton";
import { BASE_API_URL } from "@/config/constants";
import { fetcher } from "@/lib/fetch";
import { list } from "@/lib/utils";
import { useSession } from "@/providers/session-provider";
import { Image } from "expo-image";
import { useSearchParams } from "expo-router/build/hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, ScrollView, Text, View } from "react-native";
import useSWR from "swr";

export default function AboutCity() {
    const { t } = useTranslation();
    const params = useSearchParams();
    const { session } = useSession();

    const {
        data: city,
        error,
        isLoading,
    } = useSWR(
        params.get("id") ? `/cities/${params.get("id")}` : null,
        (key) => {
            return fetcher(BASE_API_URL + key, {
                headers: {
                    Authorization: "Bearer " + session?.accessToken,
                },
            });
        }
    );
    if (error) {
        return null;
    }
    return (
        <ScrollView className="flex-1 bg-white pb-3">
            <View className="flex-row items-center gap-3 relative">
                {isLoading || !city ? (
                    <Skeleton
                        style={{
                            height: Dimensions.get("window").height * 0.28,
                            width: "100%",
                            borderBottomRightRadius: 10,
                            borderBottomLeftRadius: 10,
                        }}
                    />
                ) : (
                    <React.Fragment>
                        <Image
                            source={{ uri: city.images[0].url }}
                            className="rounded-lg"
                            style={{
                                height: Dimensions.get("window").height * 0.28,
                                width: "100%",
                                borderBottomRightRadius: 10,
                                borderBottomLeftRadius: 10,
                            }}
                            contentFit="cover"
                        />
                        {/* <View className="absolute w-full h-full bg-white z-20"></View> */}
                        <View className="absolute w-full h-full z-40 justify-center items-center">
                            <Text className="text-white text-8xl font-extrabold">
                                {city.name}
                            </Text>
                        </View>
                    </React.Fragment>
                )}
            </View>
            <View className="flex-1 gap-3 p-5">
                {isLoading || !city ? (
                    <React.Fragment>
                        <Skeleton
                            style={{
                                width: "100%",
                                height: 25,
                                borderRadius: 5,
                                alignSelf: "center",
                            }}
                        />
                        <Skeleton
                            style={{
                                width: "60%",
                                height: 25,
                                borderRadius: 5,
                            }}
                        />
                        <Skeleton
                            style={{
                                width: "80%",
                                height: 25,
                                borderRadius: 5,
                            }}
                        />
                        <Skeleton
                            style={{
                                width: "90%",
                                height: 25,
                                borderRadius: 5,
                            }}
                        />
                        <Skeleton
                            style={{
                                width: "100%",
                                height: 25,
                                borderRadius: 5,
                            }}
                        />
                        <Skeleton
                            style={{
                                width: "90%",
                                height: 25,
                                borderRadius: 5,
                            }}
                        />
                        <Skeleton
                            style={{
                                width: "90%",
                                height: 25,
                                borderRadius: 5,
                            }}
                        />
                        <Skeleton
                            style={{
                                width: "80%",
                                height: 25,
                                borderRadius: 5,
                            }}
                        />
                        <Skeleton
                            style={{
                                width: "100%",
                                height: 25,
                                borderRadius: 5,
                            }}
                        />
                        <Skeleton
                            style={{
                                width: "90%",
                                height: 25,
                                borderRadius: 5,
                            }}
                        />

                        <Skeleton
                            style={{
                                width: "100%",
                                height: 25,
                                borderRadius: 5,
                            }}
                        />
                          <Skeleton
                            style={{
                                width: "90%",
                                height: 25,
                                borderRadius: 5,
                            }}
                        />
                        <Skeleton
                            style={{
                                width: "90%",
                                height: 25,
                                borderRadius: 5,
                            }}
                        />
                        <Skeleton
                            style={{
                                width: "80%",
                                height: 25,
                                borderRadius: 5,
                            }}
                        />
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Text className="text-2xl text-gray-600 text-center font-bold">
                            {city.name}について
                        </Text>
                        <Text className="text-gray-600 text-md">
                            {city.about}
                        </Text>
                        <Text className="text-gray-600 text-md">
                            {city.transportation}
                        </Text>
                        <Text className="text-gray-600 text-md">
                            {city.travelTips}
                        </Text>
                        <Text className="text-gray-600 text-md">
                            {city.thingsToDo}
                        </Text>
                        <Text className="text-gray-600 text-md">
                            {city.bestTimeToVisit}
                        </Text>
                        <Text className="text-gray-600 text-md">
                            {city.bestPlacesToStay}
                        </Text>
                        <Text className="text-gray-600 text-md">
                            {city.bestPlacesToEat}
                        </Text>
                        <Text className="text-gray-600 text-md">
                            {city.bestPlacesToVisit}
                        </Text>
                        <Text className="text-gray-600 text-md">
                            {city.bestPlacesToExperience}
                        </Text>
                        <Text className="text-gray-600 text-md">
                            {city.bestPlacesToExplore}
                        </Text>
                        <Text className="text-gray-600 text-md">
                            {city.bestPlacesToRelax}
                        </Text>
                        <Text className="text-gray-600 text-md">
                            {city.bestPlacesToAdventure}
                        </Text>
                        <Text className="text-gray-600 text-md">
                            {city.bestPlacesToEnjoy}
                        </Text>
                        <Text className="text-gray-600 text-md">
                            {city.bestPlacesToDiscover}
                        </Text>
                        <Text className="text-gray-600 text-md">
                            {city.bestPlacesToUnwind}
                        </Text>
                        <Text className="text-gray-600 text-md">
                            {city.bestPlacesToIndulge}
                        </Text>
                    </React.Fragment>
                )}
            </View>
        </ScrollView>
    );
}
