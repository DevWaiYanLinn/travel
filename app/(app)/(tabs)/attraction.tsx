import { ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView, Pressable, TextInput } from 'react-native-gesture-handler';
import { BottomSheetModal, BottomSheetModalProvider, SNAP_POINT_TYPE } from '@gorhom/bottom-sheet';
import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from 'expo-router';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import AttractionCard from '@/components/custom/attraction-card';
import { useSession } from '@/providers/session-provider';
import { CommentAttractionBottomSheetModal } from '@/components/custom/comment-attraction-bottom-sheet-modal';
import { fetcher } from '@/lib/fetch';
import { BASE_API_URL } from '@/config/constants';
import { Skeleton } from '@/components/common/skeleton';
import { buildQuerySting, filterParams, list } from '@/lib/utils';
import useSWRInfinite from 'swr/dist/infinite';
import { useLocalSearchParams, useRouter } from 'expo-router/build/hooks';
import FilterAttractionBottomSheetModal from '@/components/custom/filter-attraction-bottom-sheet-modal';

export default function Attraction() {
    const { t } = useTranslation();
    const filterSheetModalRef = useRef<BottomSheetModal>(null);
    const commentSheetModalRef = useRef<BottomSheetModal>(null);
    const attractionListRef = useRef<FlatList>(null);
    const { session } = useSession();
    const [attractionId, setAttractionId] = useState<string | null>(null);
    const searchParams = useLocalSearchParams();
    const [params, setParams] = useState<{ [key: string]: string }>({ cityId: `${searchParams.cityId}` });
    const router = useRouter();

    const {
        data: attractions,
        error,
        size,
        setSize,
        isLoading,
        isValidating,
    } = useSWRInfinite(
        (index, previousPageData) => {
            if (index && !previousPageData.length) return null;
            const paramsToString = buildQuerySting(filterParams({ ...searchParams, page: index + 1, take: 10 }));
            return [`/attractions?${paramsToString}`, index + 1];
        },
        ([key]) => {
            return fetcher(BASE_API_URL + key, {
                headers: {
                    Authorization: 'Bearer ' + session?.accessToken,
                },
            });
        }
    );

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

    const handleFilterPress = useCallback(() => {
        filterSheetModalRef.current?.dismiss();
        router.replace(`/(app)/(tabs)/attraction?${buildQuerySting(filterParams({ ...params }))}`);
        attractionListRef.current?.scrollToOffset({ offset: 0 });
    }, [params, attractionListRef.current]);

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
        <View className="flex-1">
            <View className="sticky p-3">
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
            {!isLoading || !attractions ? (
                <View className="px-3 gap-3">
                    {list(5).map((i) => (
                        <View
                            key={i}
                            className="flex-row gap-2 p-3 rounded-lg"
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
                        >
                            <Skeleton
                                className=" rounded-lg"
                                style={{
                                    width: Dimensions.get('window').width * 0.35,
                                    height: Dimensions.get('window').width * 0.35,
                                }}
                            />
                            <View />
                            <View className="flex-1">
                                <View className="flex-1 justify-between">
                                    <Skeleton
                                        style={{
                                            width: 150,
                                            height: 11,
                                            borderRadius: 10,
                                        }}
                                    />
                                    <Skeleton
                                        style={{
                                            width: 130,
                                            height: 10,
                                            borderRadius: 10,
                                        }}
                                    />
                                    <Skeleton
                                        style={{
                                            width: 120,
                                            height: 10,
                                            borderRadius: 10,
                                        }}
                                    />
                                    <Skeleton
                                        style={{
                                            width: 100,
                                            height: 10,
                                            borderRadius: 10,
                                        }}
                                    />
                                </View>
                                <View className="flex-row justify-end  gap-3 mt-5 ">
                                    <Skeleton className="rounded-lg" style={{ width: 30, height: 10 }} />
                                    <Skeleton className="rounded-lg" style={{ width: 30, height: 10 }} />
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            ) : (
                <FlatList
                    ref={attractionListRef}
                    initialScrollIndex={0}
                    showsVerticalScrollIndicator={false}
                    onEndReached={() => {
                        const isReachingEnd = attractions && attractions[attractions.length - 1].length < 10;
                        if (!isReachingEnd) {
                            setSize(size + 1);
                        }
                    }}
                    ListFooterComponent={isLoading || isValidating ? <ActivityIndicator /> : null}
                    windowSize={5}
                    data={attractions.flatMap((a) => a)}
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
                    contentContainerStyle={{ gap: 10, paddingHorizontal: 10 }}
                />
            )}
            <FilterAttractionBottomSheetModal
                ref={filterSheetModalRef}
                handleFilterPress={handleFilterPress}
                params={params}
                setParams={setParams}
            />
            <CommentAttractionBottomSheetModal
                attractionId={attractionId}
                ref={commentSheetModalRef}
                onChange={handleSheetChanges}
            />
        </View>
    );
}
