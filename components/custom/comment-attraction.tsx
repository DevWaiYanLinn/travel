import { forwardRef, memo, useCallback, useEffect, useRef } from 'react';
import { ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import useSWRInfinite from 'swr/dist/infinite';
import { Comment } from './comment';
import { BASE_API_URL } from '@/config/constants';

export const CommentAttraction = memo(
    forwardRef(
        (props: { attractionId: string | null; fetcher: (url: any) => Promise<any>; sortType: string }, ref: any) => {
            const flatListRef = useRef<FlatList>(null);

            const getKey = useCallback(
                (pageIndex: number, previousPageData: Array<any> | null) => {
                    if (previousPageData && previousPageData?.length === 0) return null;
                    const key = props.attractionId
                        ? [
                              `${BASE_API_URL}/attractions/${props.attractionId}/comments?page=${
                                  pageIndex + 1
                              }&take=10&sort-type=${props.sortType}`,
                              pageIndex + 1,
                              props.sortType,
                          ]
                        : null;
                    return key;
                },
                [props.attractionId, props.sortType]
            );

            const {
                data: comments,
                isLoading,
                isValidating,
                size,
                setSize,
                error,
                mutate,
            } = useSWRInfinite(getKey, props.fetcher, {
                revalidateOnMount: true,
                parallel: true,
            });

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

            useEffect(() => {
                ref.current = mutateComment;
            }, []);

            if (error) {
                return null;
            }

            return isLoading ? (
                <ActivityIndicator />
            ) : (
                <FlatList
                    ref={flatListRef}
                    windowSize={5}
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
                    data={comments ? comments.flatMap((c) => c) : []}
                    keyExtractor={(item, index) => `${index}`}
                    renderItem={({ item, index }) => <Comment content={item.content} />}
                />
            );
        }
    )
);
