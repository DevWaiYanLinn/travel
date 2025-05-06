import { Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { Pressable, TextInput, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import clsx from 'clsx';

export const CommentInput = memo(
    ({
        onComment,
    }: {
        onComment: (params: { comment: string; image: ImagePicker.ImagePickerAsset | null }) => void;
    }) => {
        const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
        const [comment, setComment] = useState('');
        const isDisabled = useMemo(() => !image && !comment, [image?.uri, comment]);

        const pickImage = useCallback(async () => {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images', 'videos'],
                allowsEditing: false,
                aspect: [4, 3],
                quality: 0.5,
            });
            if (!result.canceled) {
                setImage(result.assets[0]);
            }
        }, []);

        return (
            <React.Fragment>
                <View className="border-t border-gray-100">
                    <View
                        className=" border-gray-300 border flex  flex-row items-center p-1 mt-2 justify-between w-full"
                        style={{
                            borderRadius: 20,
                            backgroundColor: 'white',
                        }}
                    >
                        <TouchableOpacity onPress={pickImage}>
                            <MaterialIcons name="insert-photo" size={30} color="#6366f1" />
                        </TouchableOpacity>
                        <View className="flex-1">
                            <TextInput
                                value={comment}
                                style={{
                                    minHeight: 30,
                                    maxHeight: 100,
                                }}
                                multiline={true}
                                onChangeText={(value) => setComment(value)}
                            />
                        </View>
                        <TouchableOpacity
                            disabled={isDisabled}
                            onPress={() => {
                                onComment({ comment, image });
                                setComment('');
                                setImage(null);
                            }}
                            className={clsx(
                                'rounded-full size-10 justify-center items-center',
                                isDisabled ? 'bg-indigo-300' : 'bg-indigo-500 '
                            )}
                        >
                            <FontAwesome name="send" size={15} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                </View>
                {image ? (
                    <View className="self-start py-2 relative">
                        <Image
                            style={{
                                width: 100,
                                height: 100,
                                borderRadius: 5,
                            }}
                            source={{ uri: image.uri }}
                            contentFit="cover"
                            transition={1000}
                        />
                        <Pressable
                            onPress={() => setImage(null)}
                            className="absolute top-3 right-1 bg-indigo-500 rounded-full"
                        >
                            <Entypo name="cross" size={15} color="#FFFFFF" />
                        </Pressable>
                    </View>
                ) : null}
            </React.Fragment>
        );
    }
);

CommentInput.displayName = 'CommentInput';
