import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { memo, useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

export const CommentInput = memo(
    ({ onComment }: { onComment: (value: string) => void }) => {
        const [comment, setComment] = useState("");
        return (
            <View className="border-t border-gray-100">
                <View
                    className=" border-gray-300 border flex  flex-row items-center p-1 mt-2 justify-between w-full"
                    style={{
                        borderRadius: 20,
                        backgroundColor: "white",
                    }}
                >
                    <MaterialIcons
                        name="insert-photo"
                        size={30}
                        color="#9ca3af"
                    />
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
                        onPress={() => {
                            onComment(comment);
                            setComment("");
                        }}
                        className="bg-blue-500 rounded-full size-10 justify-center items-center"
                    >
                        <FontAwesome name="send" size={15} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
);

CommentInput.displayName = "CommentInput";
