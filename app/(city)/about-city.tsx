import { useTranslation } from "react-i18next";
import { Dimensions, Image, ScrollView, Text, View } from "react-native";



export default function AboutCity() {
    const { t } = useTranslation()
    return <ScrollView className="flex-1 p-3" showsVerticalScrollIndicator={false}>
        <View className="flex-1 flex-row bg-white p-3 rounded-lg items-center gap-3">
            <Image
                source={require("@/assets/city/tokyo.png")} className="rounded-lg" style={{ height: Dimensions.get('window').height * 0.30 , width:'75%'}} />
            <View className="gap-3 justify-center">
                <View className="w-20 flex-1 rounded-md bg-red-300">
                    <Image source={require('@/assets/city/tokyo.png')} className="w-full h-full rounded-md" />
                </View>
                <View className="w-20 flex-1 rounded-md bg-red-300">
                    <Image source={require('@/assets/city/tokyo.png')} className="w-full h-full rounded-md" />
                </View>
                <View className="w-20 flex-1 rounded-md bg-red-300">
                    <Image source={require('@/assets/city/tokyo.png')} className="w-full h-full rounded-md" />
                </View>
            </View>
        </View>
        <View className="bg-white p-3 mt-3 rounded-lg">
            <Text className="text-2xl text-gray-500 font-bold">{t('About Tokyo')}</Text>
        </View>
    </ScrollView>
}