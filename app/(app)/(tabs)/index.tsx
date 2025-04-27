import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { CityList } from '@/components/custom/city-list';
import { useTranslation } from 'react-i18next';
import { Link, useRouter } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import PopularCard from '@/components/custom/popular-card';
import { useSession } from '@/providers/session-provider';
import useSWR from 'swr';
import { GRAPHQL_API_URL } from '@/config/constants';
import { fetcher } from '@/lib/fetch';
import { Skeleton } from '@/components/common/skeleton';
import { list } from '@/lib/utils';

const query = `query {
  user {
    email
  }
  cities {
    id
    name
    translations {
      name
    }
  }
  preferenceAttractions {
    id
    name
    translations {
      name
    }
    images {
      url
    }
    _count {
      preferences
    }
  }
  preferenceFoods {
    id
    name
    translations {
      name
    }
    images {
      url
    }
    _count {
      preferences
    }
  }
}
`;

export default function Tab() {
    const { t } = useTranslation();
    const router = useRouter();
    const { signOut, session } = useSession();

    const {
        data: res,
        isLoading,
        error,
    } = useSWR([GRAPHQL_API_URL, query], ([url, query]) => {
        return fetcher(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + session?.accessToken,
            },
            body: JSON.stringify({ query }),
        });
    });

    if (error) {
        return null;
    }

    return (
        <ScrollView className="p-3 flex-1">
            <View className="flex-row items-center justify-between mb-5">
                <Link href={'/(app)/(user)/profile'}>
                    <View className="flex-row items-center">
                        {isLoading ? (
                            <>
                                <Skeleton className="w-12 h-12 rounded-full" />
                                <Skeleton className="h-5  w-24 ml-3 rounded-md" />
                            </>
                        ) : (
                            <>
                                <Image
                                    source={require('@/assets/images/avatar.png')}
                                    className="w-12 h-12 rounded-full mr-3"
                                />
                                <Text className="text-lg font-bold text-gray-600 ">
                                    {res.data.user.email.length > 5
                                        ? res.data.user.email.substring(0, 10) + ' ...'
                                        : res.data.user.email}
                                </Text>
                            </>
                        )}
                    </View>
                </Link>
                <TouchableOpacity
                    onPress={() => {
                        signOut();
                        router.push('/(auth)/sign-in');
                    }}
                >
                    <MaterialCommunityIcons name="logout" size={30} color="#f87171" />
                </TouchableOpacity>
            </View>
            {isLoading ? null : <CityList cities={res.data.cities} />}
            <View className="mt-5">
                <Text className="text-xl text-gray-600 font-bold">{t('Popular Attractions')}</Text>
                <ScrollView
                    contentContainerClassName="gap-3"
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    className="mt-3"
                >
                    {isLoading
                        ? list(3).map((i) => (
                              <View key={i} className="p-3 bg-white rounded-lg">
                                  <Skeleton
                                      className="rounded-lg"
                                      style={{
                                          width: Dimensions.get('window').width * 0.4,
                                          height: Dimensions.get('window').height * 0.2,
                                      }}
                                  />
                                  <Skeleton className="h-6 w-full mt-3 rounded-lg" />
                              </View>
                          ))
                        : res.data.preferenceAttractions.map((attraction: any) => {
                              return (
                                  <PopularCard
                                      key={attraction.id}
                                      name={attraction.name}
                                      source={{ uri: attraction.images[0].url }}
                                  />
                              );
                          })}
                </ScrollView>
            </View>
            <View className="mt-5">
                <Text className="text-xl text-gray-600 font-bold">{t('Popular Cuisines')}</Text>
                <ScrollView
                    contentContainerClassName="gap-3"
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    className="mt-3"
                >
                    {isLoading
                        ? list(3).map((i) => (
                              <View key={i} className="p-3 bg-white rounded-lg">
                                  <Skeleton
                                      className="rounded-lg"
                                      style={{
                                          width: Dimensions.get('window').width * 0.4,
                                          height: Dimensions.get('window').height * 0.2,
                                      }}
                                  />
                                  <Skeleton className="h-6 w-full mt-3 rounded-lg" />
                              </View>
                          ))
                        : res.data.preferenceFoods.map((food: any) => {
                              return (
                                  <PopularCard key={food.id} name={food.name} source={{ uri: food.images[0].url }} />
                              );
                          })}
                </ScrollView>
            </View>
        </ScrollView>
    );
}
