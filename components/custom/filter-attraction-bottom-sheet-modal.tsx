import { GRAPHQL_API_URL } from '@/config/constants';
import { fetcher } from '@/lib/fetch';
import { useSession } from '@/providers/session-provider';
import { Feather } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { Picker } from '@react-native-picker/picker';
import { ForwardedRef, forwardRef, memo, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import useSWR from 'swr';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f3f4f6',
    },
});

const query = `query {
    cities {
        id
        name
    }
}`;

const FilterAttractionBottomSheetModal = memo(
    forwardRef(
        (
            props: {
                handleFilterPress: (params: { [key: string]: string }) => void;
            },
            ref: ForwardedRef<any>
        ) => {
            const { t } = useTranslation();
            const { session } = useSession();
            const snapPoints = useMemo(() => ['70%'], []);
            const [params, setParams] = useState<{ [key: string]: string }>({
                cityId: 'default',
            });
            const {
                data: res,
                error,
                isLoading,
            } = useSWR(
                [GRAPHQL_API_URL, query],
                ([url, query]) => {
                    return fetcher(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + session?.accessToken,
                        },
                        body: JSON.stringify({ query }),
                    });
                },
                {
                    revalidateIfStale: true,
                }
            );

            if (error) {
                return null;
            }

            return (
                <BottomSheetModal
                    backdropComponent={(props) => (
                        <BottomSheetBackdrop
                            {...props}
                            disappearsOnIndex={-1}
                            appearsOnIndex={0}
                            pressBehavior="close"
                        />
                    )}
                    snapPoints={snapPoints}
                    index={0}
                    ref={ref}
                >
                    <BottomSheetView style={styles.contentContainer}>
                        <View className="flex-1 bg-white p-3 rounded-lg">
                            <View className="flex-row w-full border border-gray-300 items-center justify-between px-2 rounded-lg bg-gray-100">
                                <TextInput
                                    placeholder={t('Search For Attractions...')}
                                    className="flex-1 rounded-l h-14"
                                    style={{ height: 50 }}
                                    autoCapitalize="none"
                                />
                                <Feather name="search" size={20} color="#6b7280" />
                            </View>
                            <View className="mt-5 w-full gap-5 flex-row ">
                                <View className="flex-1 rounded-lg overflow-hidden bg-gray-100 border-gray-300 border">
                                    <Picker
                                        style={{ width: '100%' }}
                                        selectedValue={params.cityId}
                                        onValueChange={(value) => {
                                            setParams({
                                                ...params,
                                                cityId: value,
                                            });
                                        }}
                                        className="w-full bg-gray-100 rounded-lg h-14"
                                    >
                                        <Picker.Item label={t('All')} value={'default'} />
                                        {isLoading
                                            ? null
                                            : res.data.cities.map((c: any) => (
                                                  <Picker.Item key={c.id} label={c.name} value={c.id} />
                                              ))}
                                    </Picker>
                                </View>
                                <View className="flex-1 rounded-lg overflow-hidden bg-gray-50 border-gray-300 border">
                                    <Picker
                                        pointerEvents="none"
                                        placeholder="Tags"
                                        style={{ width: '100%' }}
                                        selectedValue={'default'}
                                        className="w-full bg-gray-100 rounded-lg px-3 py-2"
                                    >
                                        <Picker.Item label={t('Tags')} value="default" />
                                    </Picker>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    props.handleFilterPress(params);
                                }}
                                className="bg-blue-500 py-3 px-5 mt-5 rounded-lg self-start"
                            >
                                <Text className="text-white font-semibold">{t('Filter')}</Text>
                            </TouchableOpacity>
                            <View className="flex-1"></View>
                        </View>
                    </BottomSheetView>
                </BottomSheetModal>
            );
        }
    )
);

FilterAttractionBottomSheetModal.displayName = 'FilterAttractionBottomSheetModal';

export default FilterAttractionBottomSheetModal;
