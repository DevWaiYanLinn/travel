import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { cdayjs } from '@/lib/utils';

export const Comment = memo(
    (props: {
        createdAt: string;
        content: string;
        image: {
            url: string;
            width: number;
            height: number;
        };
    }) => {
        const { t } = useTranslation();
        const image = useMemo(() => {
            if (props.image) {
                const widthRatio = (Dimensions.get('window').width - 100) / props.image.width;
                const heightRatio = (Dimensions.get('window').width - 100) / props.image.height;
                const scale = Math.min(widthRatio, heightRatio);
                return {
                    url: props.image.url,
                    width: props.image.width * scale,
                    heigh: props.image.height * scale,
                };
            }
            return null;
        }, []);
        return (
            <View className="w-full flex-row items-start gap-3">
                <View className="bg-gray-200 p-1 rounded-full">
                    <Image
                        style={{
                            width: 35,
                            height: 35,
                            borderRadius: 40,
                        }}
                        source={require('@/assets/images/avatar.png')}
                        contentFit="cover"
                    />
                </View>
                <View className="flex-1">
                    <View className="flex-row gap-5 items-center">
                        <Text className="text-gray-600 font-bold">{t('Emily')} </Text>
                        <Text
                            style={{
                                fontSize: 10,
                            }}
                            className="text-indigo-500 font-bold"
                        >
                            {cdayjs(props.createdAt).locale('ja').format('YYYY年MM月DD日 dddd')}
                        </Text>
                    </View>
                    {props.content ? (
                        <View className="p-3 bg-gray-100 rounded-xl mt-2 max-w-full self-start">
                            <Text className="text-gray-600">{props.content}</Text>
                        </View>
                    ) : null}
                    {image ? (
                        <View
                            style={{
                                width: image.width,
                                height: image.heigh,
                            }}
                            className=" rounded-lg border-gray-200 mt-3 overflow-hidden"
                        >
                            <Image
                                source={image.url}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}
                                contentFit="contain"
                            />
                        </View>
                    ) : null}
                    {/* <Pressable>
                    <Text className="text-sm ml-2 text-blue-500">Reply</Text>
                </Pressable> */}
                </View>
            </View>
        );
    }
);

Comment.displayName = 'Comment';

export const Reply = memo(() => {
    return null;
});
