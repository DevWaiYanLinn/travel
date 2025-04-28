import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import FormInput from "@/components/common/FomInput";
import useSWR from "swr";
import { GRAPHQL_API_URL } from "@/config/constants";
import { fetcher } from "@/lib/fetch";
import { useSession } from "@/providers/session-provider";
import { list } from "@/lib/utils";
import { Skeleton } from "@/components/common/skeleton";
import { useCallback, useState } from "react";
import * as ImagePicker from "expo-image-picker";

const query = `query {
	user {
		email
		firstName
		lastName
		dateOfBirth
	}
}
`;

type Profile = {
    name?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    dateOfBirh?: string;
};

export default function Profile() {
    const { session } = useSession();
    const [form, setForm] = useState<Profile>({});
    const {
        data: res,
        isLoading,
        error,
    } = useSWR([GRAPHQL_API_URL, query], ([url, query]) => {
        return fetcher(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + session?.accessToken,
            },
            body: JSON.stringify({ query }),
        });
    });

    const pickImage = useCallback(async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images", "videos"],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);
    }, []);
    
    if (error) {
        return null;
    }

    return (
        <View className="flex-1 bg-white">
            <View className="h-48  relative">
                <Image
                    source={require("@/assets/images/profile-edit-bg.jpg")}
                    className="w-full h-full"
                    resizeMode="stretch"
                />
                <View className="flex-row justify-center absolute bottom-0 left-[30] translate-y-[50%] z-20">
                    <View className="relative">
                        <Pressable
                            onPress={pickImage}
                            className="absolute border-blue-400 border bottom-2 right-[0.5] z-30 p-1 rounded-full"
                        >
                            <Entypo name="camera" size={15} color="#60a5fa" />
                        </Pressable>
                        <View className="border rounded-full w-24 h-24 overflow-hidden border-white bg-white">
                            {isLoading ? (
                                <Skeleton
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                    }}
                                />
                            ) : (
                                <Image
                                    source={
                                        res.data.user.profile
                                            ? { uri: res.data.user.profile }
                                            : require("@/assets/images/avatar.png")
                                    }
                                    className="w-full h-full"
                                />
                            )}
                        </View>
                    </View>
                </View>
            </View>
            <View className="flex-1 p-3">
                <View className="mt-12 gap-4 p-5  rounded-lg flex-1 ">
                    {isLoading || !res ? (
                        list(4).map((i) => {
                            return (
                                <Skeleton
                                    key={i}
                                    style={{
                                        width: "100%",
                                        height: 50,
                                        borderRadius: 5,
                                    }}
                                />
                            );
                        })
                    ) : (
                        <>
                            <FormInput
                                defaultValue={res.data.user.name}
                                placeholder="Name"
                            />
                            <FormInput
                                defaultValue={res.data.user.email}
                                placeholder="Email"
                            />
                            <FormInput
                                defaultValue={res.data.user.firstName}
                                placeholder="First name"
                            />
                            <FormInput
                                defaultValue={res.data.user.lastName}
                                placeholder="Last name"
                            />
                            <TouchableOpacity
                                className="bg-blue-500 w-full  py-3"
                                style={{ borderRadius: 5 }}
                            >
                                <Text className="text-white text-center">
                                    Save
                                </Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </View>
        </View>
    );
}
