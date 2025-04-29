import { forwardRef, memo, useCallback, useEffect, useRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import useSWRInfinite from 'swr/dist/infinite';
import { Comment } from './comment';
import { BASE_API_URL } from '@/config/constants';
import { fetcher } from '@/lib/fetch';
import { useSession } from '@/providers/session-provider';

export const CommentAttraction = memo(
    forwardRef((props: { attractionId: string | null; sortType: string }, ref: any) => {
        const flatListRef = useRef<FlatList>(null);
        const { session } = useSession();
        const getKey = useCallback(
            (index: number, previousPageData: Array<any>) => {
                if (index && !previousPageData.length) return null;
                const key = props.attractionId
                    ? [
                          `/attractions/${props.attractionId}/comments?page=${index + 1}&take=10&sort-type=${
                              props.sortType
                          }`,
                          index + 1,
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
        } = useSWRInfinite(getKey, ([url, index, page]) => {
            return fetcher(BASE_API_URL + url, {
                headers: {
                    Authorization: 'Bearer ' + session?.accessToken,
                },
            });
        });

        // const mutateComment = useCallback(async () => {
        //     await mutate((data) => data, {
        //         revalidate: (pageData, key) => {
        //             if (Array.isArray(key)) {
        //                 const [url, pageIndex, sorting] = key;
        //                 return pageIndex === 1;
        //             }

        //             return false;
        //         },
        //     });
        //     flatListRef.current?.scrollToIndex({ index: 0 });
        // }, []);

        // useEffect(() => {
        //     ref.current = mutateComment;
        // }, []);

        if (error) {
            return null;
        }

        return isLoading || !comments ? (
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
                    if (!isReachingEnd && !isLoading && !isValidating) {
                        setSize(size + 1);
                    }
                }}
                contentContainerStyle={{ gap: 10 }}
                data={comments.flatMap((c) => c)}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item, index }) => (
                    <View>
                        <Text>{index}</Text>
                        <Comment content={item.content} />
                    </View>
                )}
            />
        );
    })
);

CommentAttraction.displayName = 'CommentAttraction';
