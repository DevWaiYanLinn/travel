import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView, Pressable, TextInput } from 'react-native-gesture-handler';
import { BottomSheetModal, BottomSheetView, BottomSheetModalProvider, SNAP_POINT_TYPE } from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef, useState } from 'react';
import Feather from '@expo/vector-icons/Feather';
import { Picker } from '@react-native-picker/picker';
import { Picker as PickerType } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from 'expo-router';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import AttractionCard from '@/components/custom/attraction-card';
import { useSession } from '@/providers/session-provider';
import useSWR from 'swr';
import { CommentAttractionBottomSheetModal } from '@/components/custom/comment-attraction-bottom-sheet-modal';
import { fetcher } from '@/lib/fetch';
import { BASE_API_URL } from '@/config/constants';
import { Skeleton } from '@/components/common/skeleton';
import { list } from '@/lib/utils';

export default function Attraction() {
    const { t } = useTranslation();
    const filterSheetModalRef = useRef<BottomSheetModal>(null);
    const commentSheetModalRef = useRef<BottomSheetModal>(null);

    const { session } = useSession();

    const [attractionId, setAttractionId] = useState<string | null>(null);

    const cityPickerRef = useRef<PickerType<string> | null>(null);

    const {
        data: attractions,
        error,
        isLoading,
    } = useSWR('/attractions', (url: string) => {
        return fetcher(BASE_API_URL + url, {
            headers: {
                Authorization: 'Bearer ' + session?.accessToken,
            },
        });
    });

    const [selectedCity, setSelectedCity] = useState('default');

    const handleCommentModalPress = useCallback((id: string) => {
        setAttractionId(id);
        commentSheetModalRef.current?.present();
    }, []);

    const handlePresentModalPress = useCallback(() => {
        filterSheetModalRef.current?.present();
    }, []);

    const handleSheetChanges = useCallback((index: number, position: number, type: SNAP_POINT_TYPE) => {
        if (type === 1) {
        }
    }, []);

    const handleCityChange = (itemValue: string) => {
        setSelectedCity(itemValue);
    };

    useFocusEffect(
        useCallback(() => {
            return () => {
                filterSheetModalRef.current?.dismiss();
                commentSheetModalRef.current?.dismiss();
            };
        }, [])
    );

    if (error) {
        return null;
    }

    return (
        <GestureHandlerRootView className="flex-1" style={styles.container}>
            <View className="sticky">
                <Pressable onPress={handlePresentModalPress}>
                    <View
                        style={{
                            borderRadius: 10,
                            backgroundColor: 'rgba(255, 255, 255, 0.6)',
                        }}
                        className="h-14 flex flex-row justify-between items-center"
                    >
                        <TextInput
                            editable={false}
                            pointerEvents="none"
                            placeholder={t('Search your favorite city...')}
                            className="flex-1 rounded-md px-4 py-3"
                        />
                        <EvilIcons name="search" size={30} color="#6b7280" className="mx-2" />
                    </View>
                </Pressable>
            </View>
            {isLoading ? (
                list(5).map((i) => (
                    <View
                        key={i}
                        className="p-3 flex-row gap-2 rounded-lg mt-3"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
                    >
                        <Skeleton
                            className="rounded-lg"
                            style={{
                                width: Dimensions.get('window').width * 0.35,
                                height: Dimensions.get('window').width * 0.35,
                            }}
                        />
                        <View />
                        <View className="flex-1">
                            <View className="flex-1 justify-between">
                                <Skeleton style={{ width: 150, height: 11, borderRadius: 10 }} />
                                <Skeleton style={{ width: 130, height: 10, borderRadius: 10 }} />
                                <Skeleton style={{ width: 120, height: 10, borderRadius: 10 }} />
                                <Skeleton style={{ width: 100, height: 10, borderRadius: 10 }} />
                            </View>
                            <View className="flex-row justify-end  gap-3 mt-5 ">
                                <Skeleton className="rounded-lg" style={{ width: 30, height: 10 }} />
                                <Skeleton className="rounded-lg" style={{ width: 30, height: 10 }} />
                            </View>
                        </View>
                    </View>
                ))
            ) : (
                <FlatList
                    data={attractions}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <AttractionCard
                            name={item.name}
                            source={{ uri: item.images[0].url }}
                            ticketPrice={item.ticketPrice}
                            hours={item.hours}
                            location={item.location}
                            onCommentPress={() => {
                                handleCommentModalPress(item.id);
                            }}
                        />
                    )}
                    contentContainerStyle={{ gap: 10, paddingTop: 10 }}
                />
            )}
            <BottomSheetModalProvider>
                <BottomSheetModal
                    snapPoints={['100%']}
                    index={0}
                    ref={filterSheetModalRef}
                    onChange={handleSheetChanges}
                >
                    <BottomSheetView style={styles.contentContainer}>
                        <View className="flex-1 bg-white p-3 rounded-lg">
                            <View className="flex-row w-full border border-gray-300 items-center justify-between px-2 rounded-lg bg-gray-100">
                                <TextInput
                                    placeholder={t('Search For Attractions...')}
                                    className="flex-1 rounded-l py-2"
                                    style={{ height: 50 }}
                                    autoCapitalize="none"
                                />
                                <Feather name="search" size={20} color="#6b7280" />
                            </View>
                            <View className="mt-5 w-full gap-5 flex-row ">
                                <View className="flex-1 rounded-lg overflow-hidden bg-gray-100 border-gray-300 border">
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
                                <View className="flex-1 rounded-lg overflow-hidden bg-gray-100 border-gray-300 border">
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
                        </View>
                    </BottomSheetView>
                </BottomSheetModal>
                <CommentAttractionBottomSheetModal
                    attractionId={attractionId}
                    ref={commentSheetModalRef}
                    onChange={handleSheetChanges}
                />
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 11,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f3f4f6',
    },
});
