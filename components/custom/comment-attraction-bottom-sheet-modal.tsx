import { useSession } from '@/providers/session-provider';
import { BottomSheetModal, BottomSheetView, SNAP_POINT_TYPE } from '@gorhom/bottom-sheet';
import React, { ForwardedRef, forwardRef, memo, useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { fetcher } from '@/lib/fetch';
import { CommentInput } from './comment-input';
import { BASE_API_URL } from '@/config/constants';
import { FlatList } from 'react-native-gesture-handler';
import useSWRInfinite from 'swr/infinite';
import { Comment } from './comment';
import { ImagePickerAsset } from 'expo-image-picker';
import { Skeleton } from '../common/skeleton';

type SortType = 'newest' | 'all';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        height: '50%',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },
});

export const CommentAttractionBottomSheetModal = memo(
    forwardRef(
        (
            props: {
                onChange: (index: number, position: number, type: SNAP_POINT_TYPE) => void;
                attractionId: string | null;
            },
            ref: ForwardedRef<any>
        ) => {
            const { t } = useTranslation();
            const { session } = useSession();
            const [sortType, setSortType] = useState<SortType>('newest');
            const snapPoints = useMemo(() => ['100%'], []);
            const flatListRef = useRef<FlatList>(null);

            const getKey = useCallback(
                (index: number, previousPageData: Array<any>) => {
                    if (index && !previousPageData.length) return null;
                    const key = props.attractionId
                        ? [
                              `/attractions/${props.attractionId}/comments?page=${
                                  index + 1
                              }&take=10&sortType=${sortType}`,
                              index + 1,
                              sortType,
                          ]
                        : null;

                    return key;
                },
                [props.attractionId, sortType]
            );

            const {
                data: comments,
                isLoading,
                isValidating,
                size,
                setSize,
                error,
                mutate,
            } = useSWRInfinite(getKey, ([key]) => {
                return fetcher(BASE_API_URL + key, {
                    headers: {
                        Authorization: 'Bearer ' + session?.accessToken,
                    },
                });
            });

            const mutateComment = useCallback(async () => {
                await mutate((data) => data, {
                    revalidate: (pageData, key) => {
                        if (Array.isArray(key)) {
                            const [url, pageIndex, sorting] = key;
                            return pageIndex === 1 && sorting === 'newest';
                        }
                        return false;
                    },
                });
                flatListRef.current?.scrollToIndex({ index: 0 });
            }, [mutate]);

            const onComment = async (params: { comment: string; image: ImagePickerAsset | null }) => {
                const formData = new FormData();

                if (params.comment) {
                    formData.append('content', params.comment);
                }

                if (params.image) {
                    formData.append('image', {
                        uri: params.image.uri,
                        type: params.image.mimeType,
                        name: params.image.fileName,
                    } as any);
                }
                try {
                    await fetcher(BASE_API_URL + '/attractions/' + props.attractionId + '/comments', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: 'Bearer ' + session?.accessToken,
                        },
                        body: formData,
                    });
                    if (sortType === 'newest') {
                        mutateComment();
                        return;
                    }
                    setSortType('newest');
                } catch (error) {
                    Alert.alert('エラー ', '禁止されているコンテンツはアップロードできません', [{ text: 'OK' }]);
                }
            };

            return (
                <BottomSheetModal
                    snapPoints={snapPoints}
                    index={0}
                    ref={ref}
                    backgroundStyle={{ backgroundColor: 'white' }}
                    enableBlurKeyboardOnGesture={false}
                    enableDynamicSizing={false}
                >
                    <BottomSheetView style={styles.contentContainer} className="p-3 flex-1">
                        <View className="flex-1 w-full">
                            <View className="border self-end w-[40%] h-12 mb-3 items-center justify-center rounded-lg border-gray-300">
                                <Picker
                                    onValueChange={setSortType}
                                    selectedValue={sortType}
                                    style={{ width: '100%', margin: 0, padding: 0 }}
                                    className="w-full bg-white rounded-lg px-3"
                                >
                                    <Picker.Item label={t('Newest')} value="newest" />
                                    <Picker.Item label={t('All')} value="all" />
                                </Picker>
                            </View>
                            {isLoading || !comments || error ? (
                                <View className="gap-5">
                                    <View className="flex-row gap-3">
                                        <Skeleton style={{ width: 50, height: 50, borderRadius: '50%' }} />
                                        <View className="gap-3">
                                            <View className="flex-row gap-5">
                                                <Skeleton className="rounded-lg" style={{ width: 100, height: 17 }} />
                                                <Skeleton className="rounded-lg" style={{ width: 100, height: 15 }} />
                                            </View>
                                            <Skeleton className="w-[80%] h-12 rounded-lg" />
                                        </View>
                                    </View>
                                    <View className="flex-row gap-3">
                                        <Skeleton style={{ width: 50, height: 50, borderRadius: '50%' }} />
                                        <View className="gap-3 flex-1">
                                            <View className="flex-row gap-5">
                                                <Skeleton className="rounded-lg" style={{ width: 80, height: 17 }} />
                                                <Skeleton className="rounded-lg" style={{ width: 100, height: 15 }} />
                                            </View>
                                            <Skeleton className="w-[40%] h-12 rounded-lg" />
                                            <Skeleton className="w-[100%] h-40 rounded-lg" />
                                        </View>
                                    </View>
                                    <View className="flex-row gap-3">
                                        <Skeleton style={{ width: 50, height: 50, borderRadius: '50%' }} />
                                        <View className="gap-3 flex-1">
                                            <View className="flex-row gap-5">
                                                <Skeleton className="rounded-lg" style={{ width: 80, height: 17 }} />
                                                <Skeleton className="rounded-lg" style={{ width: 100, height: 15 }} />
                                            </View>
                                            <Skeleton className="w-[40%] h-12 rounded-lg" />
                                            <Skeleton className="w-[100%] h-40 rounded-lg" />
                                        </View>
                                    </View>
                                    <View className="flex-row gap-3">
                                        <Skeleton style={{ width: 50, height: 50, borderRadius: '50%' }} />
                                        <View className="gap-3">
                                            <View className="flex-row gap-5">
                                                <Skeleton className="rounded-lg" style={{ width: 100, height: 17 }} />
                                                <Skeleton className="rounded-lg" style={{ width: 100, height: 15 }} />
                                            </View>
                                            <Skeleton className="w-[60%] h-12 rounded-lg" />
                                        </View>
                                    </View>
                                </View>
                            ) : (
                                <FlatList
                                    ref={flatListRef}
                                    initialScrollIndex={0}
                                    initialNumToRender={10}
                                    ListFooterComponent={isLoading || isValidating ? <ActivityIndicator /> : null}
                                    showsVerticalScrollIndicator={false}
                                    onEndReached={() => {
                                        const isReachingEnd = comments && comments[comments.length - 1].length < 10;
                                        if (!isReachingEnd) {
                                            setSize(size + 1);
                                        }
                                    }}
                                    contentContainerStyle={{ gap: 10 }}
                                    data={comments.flatMap((c) => c)}
                                    keyExtractor={(item, index) => item.id}
                                    renderItem={({ item }) => (
                                        <Comment
                                            content={item.content}
                                            createdAt={item.createdAt}
                                            image={item.images[0]}
                                        />
                                    )}
                                />
                            )}
                        </View>
                        <CommentInput onComment={onComment} />
                    </BottomSheetView>
                </BottomSheetModal>
            );
        }
    )
);

CommentAttractionBottomSheetModal.displayName = 'CommentAttractionBottomSheetModal';
