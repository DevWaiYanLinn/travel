import CityCard from "@/components/custom/city-card";
import {
    KeyboardAvoidingView,
    Platform,
    TextInput,
    View,
    FlatList
} from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useTranslation } from "react-i18next";
import useSWR from "swr";
import { getAllCities } from "@/services/cities.services";
import { useSession } from "@/providers/session-provider";


export default function City() {
    const { t } = useTranslation();
    const { session } = useSession();
    const {
        data: cities,
        error,
        isLoading,
    } = useSWR("/cities", (url: string) =>
        getAllCities(url, JSON.parse(session!).accessToken)
    );

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <View className="sticky p-3">
                <View
                    style={{ borderRadius: 10, backgroundColor: "rgba(255, 255, 255, 0.6)" }}
                    className="h-14 flex flex-row justify-between items-center"
                    
                >
                    <TextInput
                        placeholder={t("Search your favorite city...")}
                        className="flex-1 rounded-md px-4 py-3"
                    />
                    <EvilIcons
                        name="search"
                        size={30}
                        color="#6b7280"
                        className="mx-2"
                    />
                </View>
            </View>
            <View className="flex-1 px-3">
            {isLoading || error ? null : (
                <FlatList
                    contentContainerStyle={{
                        gap: 10,
                    }}
                    keyExtractor={(item) => item.id}
                    data={cities}
                    renderItem={({ item }) => {
                        return (
                            <CityCard
                                name={item.translations[0].name}
                                about={item.translations[0].about}
                                source={{ uri: item.images[0].url }}
                            />
                        );
                    }}
                />
            )}
            </View>
        </KeyboardAvoidingView>
    );
}
