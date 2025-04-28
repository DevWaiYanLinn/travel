import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';
import { Image } from 'expo-image';


export const Comment = memo(({ content }: { content: string }) => {
    const { t } = useTranslation();

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
                    <Text className="text-gray-500 font-bold">{t('Emily')} </Text>
                    <Text
                        style={{
                            fontSize: 10,
                        }}
                        className="text-blue-500 font-semibold"
                    >
                        {t('Yesterday')}
                    </Text>
                </View>
                <View
                    className="p-3 rounded-xl mt-2 max-w-full self-start"
                    style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.6)',
                    }}
                >
                    <Text className="text-gray-500">{content}</Text>
                </View>
                <Pressable>
                    <Text className='text-sm ml-2 text-blue-500'>Reply</Text>
                </Pressable>
            </View>
        </View>
    );
});

Comment.displayName = 'Comment';


export const Reply = memo(() => {
    return   <Comment content=''/>
})

