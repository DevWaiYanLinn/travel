import { useSession } from '@/providers/session-provider';
import { BottomSheetModal, BottomSheetView, SNAP_POINT_TYPE } from '@gorhom/bottom-sheet';
import { ForwardedRef, forwardRef, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CommentAttraction } from './comment-attraction';
import { fetcher } from '@/lib/fetch';
import { CommentInput } from './comment-input';
import { BASE_API_URL } from '@/config/constants';

type SortType = 'newest' | 'all';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f3f4f6',
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
        const mutateCommentRef = useRef<() => void>(null);
        const { t } = useTranslation();
        const { session } = useSession();
        const [sortType, setSortType] = useState<SortType>('newest');

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
                if (mutateCommentRef.current && sortType === 'newest') {
                    mutateCommentRef.current();
                    return;
                }
                setSortType('newest');
            } catch {}
        };

        return (
            <BottomSheetModal
                snapPoints={['100%']}
                index={0}
                ref={ref}
                backgroundStyle={{ backgroundColor: '#f3f4f6' }}
            >
                <BottomSheetView style={styles.contentContainer} className="p-3 flex-1">
                    <View className="flex-1 w-full">
                        <Text className="text-2xl font-bold text-gray-600 text-center">{t('Comments')}</Text>
                        <Picker
                            onValueChange={setSortType}
                            selectedValue={sortType}
                            style={{ width: '50%' }}
                            className="w-full bg-gray-100 rounded-lg px-3"
                        >
                            <Picker.Item label={t('Newest')} value="newest" />
                            <Picker.Item label={t('All')} value="all" />
                        </Picker>
                        {sortType === 'newest' ? (
                            <CommentAttraction
                                ref={mutateCommentRef}
                                sortType="newest"
                                fetcher={([url, page]) =>
                                    fetcher(url, {
                                        headers: {
                                            Authorization: 'Bearer ' + session?.accessToken,
                                        },
                                    })
                                }
                                attractionId={props.attractionId}
                            />
                        ) : (
                            <CommentAttraction
                                ref={mutateCommentRef}
                                sortType="all"
                                fetcher={([url, page]) =>
                                    fetcher(url, {
                                        headers: {
                                            Authorization: 'Bearer ' + session?.accessToken,
                                        },
                                    })
                                }
                                attractionId={props.attractionId}
                            />
                        )}
                    </View>
                    <CommentInput onComment={onComment} />
                </BottomSheetView>
            </BottomSheetModal>
        );
    }
);
