import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView, Pressable, ScrollView, TextInput } from 'react-native-gesture-handler';
import { BottomSheetModal, BottomSheetView, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useCallback, useRef, useState } from 'react';
import Feather from '@expo/vector-icons/Feather';
import { Picker } from '@react-native-picker/picker';
import { Picker as PickerType } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';
import { Dimensions } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFocusEffect } from 'expo-router';

export default function Attraction() {
    const { t } = useTranslation();
    const filterSheetModalRef = useRef<BottomSheetModal>(null);
    const commentSheetModalRef = useRef<BottomSheetModal>(null);

    const [selectedCity, setSelectedCity] = useState('default');

    const handleCommentModalPress = useCallback(() => {
        commentSheetModalRef.current?.present();
    }, []);

    const handlePresentModalPress = useCallback(() => {
        filterSheetModalRef.current?.present();
    }, []);

    const handleSheetChanges = useCallback((index: number) => {
        // console.log('handleSheetChanges', index);
    }, []);

    const handleCityChange = (itemValue: string) => {
        setSelectedCity(itemValue);
    };

    const cityPickerRef = useRef<PickerType<string> | null>(null);

    useFocusEffect(
        useCallback(() => {
            return () => {
                filterSheetModalRef.current?.dismiss();
                commentSheetModalRef.current?.dismiss();
            };
        }, [])
    );

    return (
        <GestureHandlerRootView className="flex-1" style={styles.container}>
            <View className="flex-row items-center justify-between sticky top-0">
                <Text className="text-2xl font-bold text-gray-600">{t('Attractions')}</Text>
                <TouchableOpacity
                    className=" bg-blue-500 px-3 flex-row items-center gap-2 justify-between py-2 rounded-lg"
                    onPress={handlePresentModalPress}
                >
                    <Feather name="search" size={15} color="white" />
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} className="flex-1 mt-5">
                <View className="flex-row p-3 flex gap-5  bg-white rounded-lg">
                    <View className="relative">
                        <Image
                            className="rounded-md"
                            resizeMode="cover"
                            style={{
                                width: Dimensions.get('window').width * 0.35,
                                height: Dimensions.get('window').width * 0.35,
                            }}
                            source={require('@/assets/city/sky-tree.jpg')}
                        />
                        <View className="absolute top-2 right-2 bg-gray-100  rounded-full p-1">
                            <AntDesign name="heart" size={16} color="red" />
                        </View>
                    </View>
                    <View className="flex-1">
                        <View className="flex-1 justify-between">
                            <Text className="text-lg font-bold text-gray-500">{t('Sky Tree')}</Text>
                            <Text className="text-gray-500" style={{ fontSize: 12 }}>
                                {t('Ticket Price')} :
                                <Text className="text-blue-400" style={{ fontSize: 12 }}>
                                    {' '}
                                    {t('Free')}
                                </Text>
                            </Text>
                            <Text className="text-gray-500" style={{ fontSize: 12 }}>
                                {t('Hours')} :
                                <Text className="text-blue-400" style={{ fontSize: 12 }}>
                                    {' '}
                                    9:00AM - 10:00PM
                                </Text>
                            </Text>
                            <Text className="text-gray-500" style={{ fontSize: 12 }}>
                                {t('Location')} :
                                <Text className="text-blue-400" style={{ fontSize: 12 }}>
                                    {' '}
                                    {t('Click')}
                                </Text>
                            </Text>
                        </View>
                        <Pressable onPress={handleCommentModalPress}>
                            <View className="flex-row w-full rounded-lg justify-end items-center gap-5">
                                <View className="flex-row gap-1 items-center">
                                    <AntDesign name="hearto" size={14} color="#6b7280" />
                                    <Text style={{ fontSize: 10 }} className=" text-gray-500">
                                        99k
                                    </Text>
                                </View>
                                <View className="flex-row gap-1 items-center">
                                    <FontAwesome name="comment-o" size={15} color="#6b7280" />
                                    <Text style={{ fontSize: 10 }} className="text-sm text-gray-500">
                                        100
                                    </Text>
                                </View>
                            </View>
                        </Pressable>
                    </View>
                </View>
                <View className="flex-row p-3 flex gap-5  bg-white rounded-lg mt-5">
                    <View className="relative">
                        <Image
                            className="rounded-md"
                            resizeMode="cover"
                            style={{
                                width: Dimensions.get('window').width * 0.35,
                                height: Dimensions.get('window').width * 0.35,
                            }}
                            source={require('@/assets/city/osaka-castle.jpg')}
                        />
                        <View className="absolute top-2 right-2 bg-gray-100  rounded-full p-1">
                            <AntDesign name="hearto" size={16} color="red" />
                        </View>
                    </View>
                    <View className="flex-1">
                        <View className="flex-1 justify-between">
                            <Text className="text-lg font-bold text-gray-500">{t('Osaka Castle Park')}</Text>
                            <Text className="text-gray-500" style={{ fontSize: 12 }}>
                                {t('Ticket Price')} :
                                <Text className="text-blue-400" style={{ fontSize: 12 }}>
                                    {' '}
                                    {t('1000¥')}
                                </Text>
                            </Text>
                            <Text className="text-gray-500" style={{ fontSize: 12 }}>
                                {t('Hours')} :
                                <Text className="text-blue-400" style={{ fontSize: 12 }}>
                                    {' '}
                                    9:00AM : 10:00PM
                                </Text>
                            </Text>
                            <Text className="text-gray-500" style={{ fontSize: 12 }}>
                                {t('Location')} :
                                <Text className="text-blue-400" style={{ fontSize: 12 }}>
                                    {' '}
                                    {t('Click')}
                                </Text>
                            </Text>
                        </View>
                        <Pressable onPress={handleCommentModalPress}>
                            <View className="flex-row w-full rounded-lg justify-end items-center gap-5">
                                <View className="flex-row gap-1 items-center">
                                    <AntDesign name="hearto" size={14} color="#6b7280" />
                                    <Text style={{ fontSize: 10 }} className=" text-gray-500">
                                        99k
                                    </Text>
                                </View>
                                <View className="flex-row gap-1 items-center">
                                    <FontAwesome name="comment-o" size={15} color="#6b7280" />
                                    <Text style={{ fontSize: 10 }} className="text-sm text-gray-500">
                                        100
                                    </Text>
                                </View>
                            </View>
                        </Pressable>
                    </View>
                </View>
                <View className="flex-row p-3 flex gap-5  bg-white rounded-lg mt-5">
                    <View className="relative">
                        <Image
                            className="rounded-md"
                            resizeMode="cover"
                            style={{
                                width: Dimensions.get('window').width * 0.35,
                                height: Dimensions.get('window').width * 0.35,
                            }}
                            source={require('@/assets/city/megane-bridge.png')}
                        />
                        <View className="absolute top-2 right-2 bg-gray-100  rounded-full p-1">
                            <AntDesign name="hearto" size={16} color="red" />
                        </View>
                    </View>
                    <View className="flex-1">
                        <View className="flex-1 justify-between">
                            <Text className="text-lg font-bold text-gray-500">{t('Megane Bridge')}</Text>
                            <Text className="text-gray-500" style={{ fontSize: 12 }}>
                                {t('Ticket Price')} :
                                <Text className="text-blue-400" style={{ fontSize: 12 }}>
                                    {' '}
                                    {t('Free')}
                                </Text>
                            </Text>
                            <Text className="text-gray-500" style={{ fontSize: 12 }}>
                                {t('Hours')} :
                                <Text className="text-blue-400" style={{ fontSize: 12 }}>
                                    {' '}
                                    24 Hours
                                </Text>
                            </Text>
                            <Text className="text-gray-500" style={{ fontSize: 12 }}>
                                {t('Location')} :
                                <Text className="text-blue-400" style={{ fontSize: 12 }}>
                                    {' '}
                                    {t('Click')}
                                </Text>
                            </Text>
                        </View>
                        <View className="flex-row w-full rounded-lg justify-end mb-2 items-center gap-5">
                            <View className="flex-row gap-1 items-center">
                                <AntDesign name="hearto" size={14} color="#6b7280" />
                                <Text style={{ fontSize: 10 }} className=" text-gray-500">
                                    99k
                                </Text>
                            </View>
                            <View className="flex-row gap-1 items-center">
                                <FontAwesome name="comment-o" size={15} color="#6b7280" />
                                <Text style={{ fontSize: 10 }} className="text-sm text-gray-500">
                                    50
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View className="flex-row p-3 flex gap-5  bg-white rounded-lg mt-5">
                    <View className="relative">
                        <Image
                            className="rounded-md"
                            resizeMode="cover"
                            style={{
                                width: Dimensions.get('window').width * 0.35,
                                height: Dimensions.get('window').width * 0.35,
                            }}
                            source={require('@/assets/city/glover-garden.png')}
                        />
                        <View className="absolute top-2 right-2 bg-gray-100  rounded-full p-1">
                            <AntDesign name="hearto" size={16} color="red" />
                        </View>
                    </View>
                    <View className="flex-1">
                        <View className="flex-1 justify-between">
                            <Text className="text-lg font-bold text-gray-500">{t('Glover Garden')}</Text>
                            <Text className="text-gray-500" style={{ fontSize: 12 }}>
                                {t('Ticket Price')} :
                                <Text className="text-blue-400" style={{ fontSize: 12 }}>
                                    {' '}
                                    {t('Free')}
                                </Text>
                            </Text>
                            <Text className="text-gray-500" style={{ fontSize: 12 }}>
                                {t('Hours')} :
                                <Text className="text-blue-400" style={{ fontSize: 12 }}>
                                    {' '}
                                    9:00AM
                                </Text>
                            </Text>
                            <Text className="text-gray-500" style={{ fontSize: 12 }}>
                                {t('Location')} :
                                <Text className="text-blue-400" style={{ fontSize: 12 }}>
                                    {' '}
                                    {t('Click')}
                                </Text>
                            </Text>
                        </View>
                        <Pressable onPress={handleCommentModalPress}>
                            <View className="flex-row w-full rounded-lg justify-end items-center gap-5">
                                <View className="flex-row gap-1 items-center">
                                    <AntDesign name="hearto" size={14} color="#6b7280" />
                                    <Text style={{ fontSize: 10 }} className=" text-gray-500">
                                        99k
                                    </Text>
                                </View>
                                <View className="flex-row gap-1 items-center">
                                    <FontAwesome name="comment-o" size={15} color="#6b7280" />
                                    <Text style={{ fontSize: 10 }} className="text-sm text-gray-500">
                                        100
                                    </Text>
                                </View>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
            <BottomSheetModalProvider>
                <BottomSheetModal snapPoints={['100%']} ref={filterSheetModalRef} onChange={handleSheetChanges}>
                    <BottomSheetView style={styles.contentContainer} className="p-3">
                        <View className="flex-row w-full items-center justify-between px-2 rounded-lg bg-gray-100">
                            <TextInput
                                placeholder={t('Search For Attractions...')}
                                className="flex-1 rounded-l py-2"
                                style={{ height: 50 }}
                                autoCapitalize="none"
                            />
                            <Feather name="search" size={20} color="#6b7280" />
                        </View>
                        <View className="mt-5 w-full gap-5 flex-row ">
                            <View className="flex-1 rounded-lg overflow-hidden bg-gray-100">
                                <Picker
                                    style={{ width: '100%' }}
                                    ref={cityPickerRef}
                                    selectedValue={selectedCity}
                                    onValueChange={handleCityChange}
                                    className="w-full bg-gray-100 rounded-lg px-3 py-2"
                                >
                                    <Picker.Item label={t('City Name')} value="default" />
                                    <Picker.Item label={t('Tokyo')} value="tokyo" />
                                    <Picker.Item label={t('Osaka')} value="osaka" />
                                </Picker>
                            </View>
                            <View className="flex-1 rounded-lg overflow-hidden bg-gray-100">
                                <Picker
                                    style={{ width: '100%' }}
                                    ref={cityPickerRef}
                                    selectedValue={selectedCity}
                                    onValueChange={handleCityChange}
                                    className="w-full bg-gray-100 rounded-lg px-3 py-2"
                                >
                                    <Picker.Item label={t('Type')} value="default" />
                                    <Picker.Item label="Tokyo" value="tokyo" />
                                    <Picker.Item label="Osaka" value="osaka" />
                                    <Picker.Item label="Kyoto" value="kyoto" />
                                    <Picker.Item label="Nara" value="nara" />
                                    <Picker.Item label="Hiroshima" value="hiroshima" />
                                </Picker>
                            </View>
                        </View>
                        <View className="flex-1"></View>
                    </BottomSheetView>
                </BottomSheetModal>
                <BottomSheetModal snapPoints={['100%']} ref={commentSheetModalRef} onChange={handleSheetChanges}>
                    <BottomSheetView style={styles.contentContainer} className="p-3">
                        <ScrollView className="flex-1 w-full" showsVerticalScrollIndicator={false}>
                            <Text className="text-2xl font-bold text-gray-500 text-center">{t('Comments')}</Text>
                            <View className="mt-5 flex-1 w-full gap-5">
                                <View className="w-full flex-row items-start gap-3">
                                    <View>
                                        <View className="bg-gray-200 p-1 rounded-full">
                                            <Image
                                                style={{ width: 30, height: 30 }}
                                                className="rounded-full"
                                                source={require('@/assets/images/avatar.png')}
                                                resizeMode="contain"
                                            />
                                        </View>
                                    </View>
                                    <View className="flex-1">
                                        <View className="flex-row gap-5 items-center">
                                            <Text className="text-gray-500 font-bold">{t('John Doe')}</Text>
                                            <Text style={{ fontSize: 10 }} className="text-blue-500 font-semibold">
                                                {t('Today')}
                                            </Text>
                                        </View>
                                        <View className="bg-gray-100 p-3 rounded-xl mt-2">
                                            <Text className="text-gray-500">
                                                これはダミーテキストです。文章の内容は意味を持っていませんが、レイアウトやデザインを確認するために使われます。文字のバランスや行間を調整する際に便利です。文章の長さや漢字の割合などをテストできます。見出しや本文のスタイルを確認するのにも適しています。
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <View className="w-full flex-row items-start gap-3">
                                    <View>
                                        <View className="bg-gray-200 p-1 rounded-full">
                                            <Image
                                                style={{ width: 30, height: 30 }}
                                                className="rounded-full"
                                                source={require('@/assets/images/avatar.png')}
                                                resizeMode="contain"
                                            />
                                        </View>
                                    </View>
                                    <View className="flex-1">
                                        <View className="flex-row gap-5 items-center">
                                            <Text className="text-gray-500 font-bold">{t('Emily')}</Text>
                                            <Text style={{ fontSize: 10 }} className="text-blue-500 font-semibold">
                                                {t('Yesterday')}
                                            </Text>
                                        </View>
                                        <View className="bg-gray-100 p-3 rounded-xl mt-2">
                                            <Text className="text-gray-500">
                                                もう少し文章を追加すると、全体の雰囲気をより正確に把握できます。フォントサイズや段落の配置など、細かいデザイン要素を調整するためにご活用ください。
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <View className="w-full flex-row items-start gap-3">
                                    <View>
                                        <View className="bg-gray-200 p-1 rounded-full">
                                            <Image
                                                style={{ width: 30, height: 30 }}
                                                className="rounded-full"
                                                source={require('@/assets/images/avatar.png')}
                                                resizeMode="contain"
                                            />
                                        </View>
                                    </View>
                                    <View className="flex-1">
                                        <View className="flex-row gap-5 items-center">
                                            <Text className="text-gray-500 font-bold">{t('ワイヤンリン')}</Text>
                                            <Text style={{ fontSize: 10 }} className="text-blue-500 font-semibold">
                                                {t('Yesterday')}
                                            </Text>
                                        </View>
                                        <View className="overflow-hidden  rounded-xl mt-3">
                                            <Image
                                                style={{ width: '100%', height: 200 }}
                                                source={require('@/assets/images/glover-memory.jpg')}
                                                resizeMode="cover"
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </BottomSheetView>
                </BottomSheetModal>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        height: '50%',
    },
});
