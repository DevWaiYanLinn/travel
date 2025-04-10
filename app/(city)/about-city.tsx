import { useTranslation } from "react-i18next";
import { Dimensions, Image, ScrollView, Text, View } from "react-native";



export default function AboutCity() {
    const { t } = useTranslation()
    return <ScrollView className="flex-1 p-3" showsVerticalScrollIndicator={false}>
        <View className="flex-1 bg-white pb-3 rounded-lg">
            <View className="rounded-lg overflow-hidden">
                <Image
                    source={require("@/assets/city/tokyo.png")} className="w-full" style={{ height: Dimensions.get('window').height * 0.35 }} />
                <Text className="text-3xl font-bold text-gray-600 mt-3 text-center">{t('Tokyo')}</Text>
            </View>

        </View>
        <View className="bg-white p-3 mt-3 rounded-lg">
            <Text className="text-2xl text-gray-500 font-bold text-center">{t('About Tokyo')}</Text>
        </View>
    </ScrollView>
}