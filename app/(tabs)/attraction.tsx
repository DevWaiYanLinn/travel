import { Button, Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView, ScrollView, TextInput } from 'react-native-gesture-handler';
import { BottomSheetModal, BottomSheetView, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useCallback, useRef, useState } from 'react';
import Feather from '@expo/vector-icons/Feather';
import { Picker } from '@react-native-picker/picker';
import { Picker as PickerType } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';
import { Dimensions } from 'react-native';

export default function Attraction() {
    const { t } = useTranslation();
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const [selectedCity, setSelectedCity] = useState("default");

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);


    const handleCityChange = (itemValue: string) => {
        setSelectedCity(itemValue);
    }

    const cityPickerRef = useRef<PickerType<string> | null>(null);

    return (
        <GestureHandlerRootView className="flex-1 bg-white" style={styles.container}>
            <View className='flex-row items-center justify-between sticky top-0'>
                <Text className='text-2xl font-bold text-gray-500'>{t('Attractions')}</Text>
                <TouchableOpacity className=" bg-blue-500 px-3 flex-row items-center gap-2 justify-between py-2 rounded-lg" onPress={handlePresentModalPress}>
                    <Text className='text-white font-bold text-lg'>  
                        {t('Search')}
                    </Text>
                    <Feather name="search" size={15} color="white" />
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} className='flex-1'>
                <View className='flex-row p-3 flex gap-5  bg-white rounded-lg mt-5'>
                    <Image className='rounded-md' resizeMode='cover' style={{ width: Dimensions.get('window').width * 0.3, height: Dimensions.get('window').width * 0.3 }} source={require('@/assets/city/tokyo.png')} />
                    <View className='flex-1'>
                        <Text className='text-lg font-bold text-gray-500'>{t('Tokyo')}</Text>
                    </View>
                </View>
                <View className='flex-row p-3 flex  bg-white rounded-lg mt-5 gap-5'>
                    <Image className='rounded-md' resizeMode='cover' style={{ width: Dimensions.get('window').width * 0.3, height: Dimensions.get('window').width * 0.3 }} source={require('@/assets/city/osaka-castle.jpg')} />
                    <View className='flex-1'>
                        <Text className='text-lg font-bold text-gray-500'>{t('Osaka')}</Text>
                    </View>
                </View>
            </ScrollView>
            <BottomSheetModalProvider>
                <BottomSheetModal snapPoints={['100%']} ref={bottomSheetModalRef} onChange={handleSheetChanges}>
                    <BottomSheetView style={styles.contentContainer} className='p-3'>
                        <View className='flex-row w-full items-center justify-between px-2 rounded-lg bg-gray-100'>
                            <TextInput
                                placeholder={t('Search For Attractions...')}
                                className="flex-1 rounded-l py-2"
                                style={{ height: 50 }}
                                autoCapitalize="none" />
                            <Feather name="search" size={20} color="#6b7280" />
                        </View>
                        <View className='mt-5 w-full gap-5 flex-row '>
                            <View className='flex-1 rounded-lg overflow-hidden bg-gray-100'>
                                <Picker style={{ width: '100%' }} ref={cityPickerRef} selectedValue={selectedCity} onValueChange={handleCityChange} className='w-full bg-gray-100 rounded-lg px-3 py-2'>
                                    <Picker.Item label={t('City Name')} value="default" />
                                    <Picker.Item label={t('Tokyo')} value="tokyo" />
                                    <Picker.Item label={t('Osaka')} value="osaka" />
                                </Picker>
                            </View>
                            <View className='flex-1 rounded-lg overflow-hidden bg-gray-100'>
                                <Picker style={{ width: '100%' }} ref={cityPickerRef} selectedValue={selectedCity} onValueChange={handleCityChange} className='w-full bg-gray-100 rounded-lg px-3 py-2'>
                                    <Picker.Item label={t('Type')} value="default" />
                                    <Picker.Item label="Tokyo" value="tokyo" />
                                    <Picker.Item label="Osaka" value="osaka" />
                                    <Picker.Item label="Kyoto" value="kyoto" />
                                    <Picker.Item label="Nara" value="nara" />
                                    <Picker.Item label="Hiroshima" value="hiroshima" />
                                </Picker>
                            </View>
                        </View>
                        <View className='flex-1'></View>
                    </BottomSheetView>
                </BottomSheetModal>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        height: '50%',
    },
});
