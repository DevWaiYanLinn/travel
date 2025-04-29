import { useSession } from '@/providers/session-provider';
import { BottomSheetModal, BottomSheetView, SNAP_POINT_TYPE } from '@gorhom/bottom-sheet';
import { ForwardedRef, forwardRef, useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CommentAttraction } from './comment-attraction';
import { fetcher } from '@/lib/fetch';
import { CommentInput } from './comment-input';
import { BASE_API_URL } from '@/config/constants';
import { FlatList } from 'react-native-gesture-handler';
import useSWRInfinite from 'swr/dist/infinite';
import { Comment } from './comment';

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

export const CommentAttractionBottomSheetModal = forwardRef(
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
                          `/attractions/${props.attractionId}/comments?page=${index + 1}&take=10&sortType=${sortType}`,
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
        } = useSWRInfinite(
            getKey,
            ([url]) => {
                return fetcher(BASE_API_URL + url, {
                    headers: {
                        Authorization: 'Bearer ' + session?.accessToken,
                    },
                });
            },
            { revalidateFirstPage: false }
        );

        const mutateComment = useCallback(async () => {
            await mutate((data) => data, {
                revalidate: (pageData, key) => {
                    if (Array.isArray(key)) {
                        const [url, pageIndex, sorting] = key;
                        return pageIndex === 1;
                    }

                    return false;
                },
            });
            flatListRef.current?.scrollToIndex({ index: 0 });
        }, []);

        const onComment = async (value: string) => {
            try {
                await fetcher(BASE_API_URL + '/attractions/' + props.attractionId + '/comments', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + session?.accessToken,
                    },
                    body: JSON.stringify({ content: value }),
                });
                if (sortType === 'newest') {
                    mutateComment();
                    return;
                }
                setSortType('newest');
            } catch {}
        };
        return (
            <BottomSheetModal
                snapPoints={snapPoints}
                index={0}
                ref={ref}
                backgroundStyle={{ backgroundColor: 'white' }}
            >
                <BottomSheetView style={styles.contentContainer} className="p-3 flex-1">
                    <View className="flex-1 w-full">
                        <Text className="text-2xl font-bold text-gray-600 text-center">{t('Comments')}</Text>
                        <Picker
                            onValueChange={setSortType}
                            selectedValue={sortType}
                            style={{ width: '50%' }}
                            className="w-full bg-white rounded-lg px-3"
                        >
                            <Picker.Item label={t('Newest')} value="newest" />
                            <Picker.Item label={t('All')} value="all" />
                        </Picker>
                        {isLoading || !comments || error ? (
                            <ActivityIndicator />
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
                                renderItem={({ item }) => <Comment content={item.content} />}
                            />
                        )}
                    </View>
                    <CommentInput onComment={onComment} />
                </BottomSheetView>
            </BottomSheetModal>
        );
    }
);
