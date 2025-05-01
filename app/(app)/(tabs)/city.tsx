import CityCard from '@/components/custom/city-card';
import { KeyboardAvoidingView, Platform, TextInput, View, FlatList } from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import { useSession } from '@/providers/session-provider';
import { fetcher } from '@/lib/fetch';
import { BASE_API_URL } from '@/config/constants';
import { Skeleton } from '@/components/common/skeleton';
import { list } from '@/lib/utils';
import { useState } from 'react';

export default function City() {
    const { t } = useTranslation();
    const [q, setQ] = useState('');
    const { session } = useSession();

    const {
        data: cities,
        error,
        isLoading,
    } = useSWR(
        `/cities?q=${q}`,
        (url: string) =>
            fetcher(BASE_API_URL + url, {
                headers: {
                    Authorization: 'Bearer ' + session?.accessToken,
                },
            }),
        { dedupingInterval: 1000 }
    );

    if (error) {
        return null;
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
            <View className="sticky p-3">
                <View
                    style={{
                        borderRadius: 10,
                        backgroundColor: 'rgba(255, 255, 255, 0.6)',
                    }}
                    className="h-14 flex flex-row justify-between items-center"
                >
                    <TextInput
                        placeholder={t('Search your favorite city...')}
                        className="flex-1 rounded-md px-4 py-3"
                    />
                    <EvilIcons name="search" size={30} color="#6b7280" className="mx-2" />
                </View>
            </View>
            {isLoading ? (
                <View className="px-3 gap-3">
                    {list(3).map((i) => (
                        <View
                            key={i}
                            className="overflow-hidden"
                            style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                                borderRadius: 5,
                            }}
                        >
                            <Skeleton
                                style={{
                                    width: '100%',
                                    height: 200,
                                }}
                            />
                            <View className="p-4">
                                <Skeleton
                                    className="rounded-lg"
                                    style={{
                                        width: 100,
                                        height: 15,
                                    }}
                                />
                                <Skeleton
                                    className="mt-3 rounded-lg"
                                    style={{
                                        width: '100%',
                                        height: 70,
                                    }}
                                />
                                <Skeleton
                                    className="rounded-lg mt-3"
                                    style={{
                                        width: 80,
                                        height: 30,
                                    }}
                                />
                            </View>
                        </View>
                    ))}
                </View>
            ) : (
                <FlatList
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        gap: 10,
                        paddingHorizontal: 10,
                    }}
                    keyExtractor={(item) => item.id}
                    data={cities}
                    renderItem={({ item }) => {
                        return <CityCard id={item.id} preference={!!item.preferences.length} name={item.name} about={item.about} source={{ uri: item.images[0].url }} />;
                    }}
                />
            )}
        </KeyboardAvoidingView>
    );
}
