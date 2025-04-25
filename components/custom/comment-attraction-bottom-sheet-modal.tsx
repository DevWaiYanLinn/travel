import { useSession } from "@/providers/session-provider";
import { gellAllComments } from "@/services/attractions.services";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import {
    BottomSheetModal,
    BottomSheetView,
    SNAP_POINT_TYPE,
} from "@gorhom/bottom-sheet";
import {
    forwardRef,
    memo,
    useCallback,
    useMemo,
    useRef,
    useState,
} from "react";
import { useTranslation } from "react-i18next";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import {
    ActivityIndicator,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import useSWR, { mutate } from "swr";
import useSWRInfinite from "swr/infinite";
import { useNavigation } from "expo-router";
import { BASE_API_URL, TAB_BAR_OPTIONS } from "@/config/constants";
import { delay } from "@/lib/utils";
import { Picker } from "@react-native-picker/picker";

type SortType = "newest" | "all";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
    },
    contentContainer: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#f3f4f6",
    },
});

const Loader = ({ isLoading }: { isLoading: boolean }) => {
    return isLoading ? (
        <View className="p-5">
            <ActivityIndicator />
        </View>
    ) : null;
};

const Comment = memo(
    ({ content, index }: { content: string; index: number }) => {
        const { t } = useTranslation();

        return (
            <View className="w-full flex-row items-start gap-3">
                <View>
                    <View className="bg-gray-200 p-1 rounded-full">
                        <Image
                            style={{
                                width: 30,
                                height: 30,
                            }}
                            className="rounded-full"
                            source={require("@/assets/images/avatar.png")}
                            resizeMode="contain"
                        />
                    </View>
                </View>
                <View className="flex-1">
                    <View className="flex-row gap-5 items-center">
                        <Text className="text-gray-500 font-bold">
                            {t("Emily")} {" " + index}
                        </Text>
                        <Text
                            style={{
                                fontSize: 10,
                            }}
                            className="text-blue-500 font-semibold"
                        >
                            {t("Yesterday")}
                        </Text>
                    </View>
                    <View
                        className="p-3 rounded-xl mt-2"
                        style={{
                            backgroundColor: "rgba(255, 255, 255, 0.6)",
                        }}
                    >
                        <Text className="text-gray-500">{content}</Text>
                    </View>
                </View>
            </View>
        );
    }
);

Comment.displayName = "Comment";

export const CommentInput = memo(
    ({ onComment }: { onComment: (value: string) => void }) => {
        const [comment, setComment] = useState("");
        return (
            <View
                className=" border-gray-300 border flex  flex-row items-center p-2 mt-3 justify-between w-full"
                style={{
                    borderRadius: 25,
                    backgroundColor: "white",
                }}
            >
                <MaterialIcons name="insert-photo" size={30} color="#9ca3af" />
                <View className="flex-1">
                    <TextInput
                        value={comment}
                        className="h-10"
                        multiline={true}
                        onChangeText={(value) => setComment(value)}
                    />
                </View>
                <TouchableOpacity
                    onPress={() => {
                        onComment(comment);
                        setComment("");
                    }}
                    className="bg-blue-500 rounded-full  h-10 w-10 justify-center items-center"
                >
                    <FontAwesome name="send" size={15} color="white" />
                </TouchableOpacity>
            </View>
        );
    }
);

CommentInput.displayName = "CommentInput";

export const CommentAttractionBottomSheetModal = forwardRef(
    (
        props: {
            onChange: (
                index: number,
                position: number,
                type: SNAP_POINT_TYPE
            ) => void;
            attractionId: string | null;
        },
        ref: any
    ) => {
        const { t } = useTranslation();
        const { session } = useSession();
        const flatListRef = useRef<FlatList>(null);
        const accessToken = useMemo(
            () => JSON.parse(session!).accessToken,
            [session]
        );

        const [sortType, setSortType] = useState<SortType>("newest");

        const getKey = useCallback(
            (pageIndex: number, previousPageData: Array<any> | null) => {
                if (previousPageData && previousPageData?.length === 0)
                    return null;

                const key = props.attractionId
                    ? [
                          `/attractions/${props.attractionId}/comments?page=${
                              pageIndex + 1
                          }&limit=10?sort-type=${sortType}`,
                          pageIndex + 1,
                          sortType,
                      ]
                    : null;
                return key;
            },
            [props.attractionId, sortType]
        );

        const {
            data: comments,
            isLoading,
            isValidating,
            size,
            setSize,
            error,
            mutate,
        } = useSWRInfinite(getKey, ([url]: [string, number]) =>
            gellAllComments(url, accessToken)
        );

        const scrollToBottom = () => {
            flatListRef.current?.scrollToEnd({ animated: true });
        };

        const onComment = useCallback(
            async (value: string) => {
                const res = await fetch(
                    BASE_API_URL +
                        `/attractions/${props.attractionId}/comments`,
                    {
                        method: "POST",
                        body: JSON.stringify({ content: value }),
                        headers: {
                            Authorization: "Bearer " + accessToken,
                            "Content-Type": "application/json",
                        },
                    }
                ).then((res) => res.json());
                mutate(undefined, {
                    revalidate: (pageData, key) => {
                        if (Array.isArray(key)) {
                            const [url, page] = key;
                            return page === 1;
                        }
                        return false;
                    },
                });
                // mutate(
                //     async (data: any) => {
                //         const res = await fetch(
                //             BASE_API_URL +
                //                 `/attractions/${props.attractionId}/comments`,
                //             {
                //                 method: "POST",
                //                 body: JSON.stringify({ content: value }),
                //                 headers: {
                //                     Authorization: "Bearer " + accessToken,
                //                     "Content-Type": "application/json",
                //                 },
                //             }
                //         ).then((res) => res.json());

                //         if (!res) return data;

                //         return data?.map((d: any, i: number) => {
                //             if (i === data.length - 1) {
                //                 return [
                //                     ...data[data.length - 1],
                //                     {
                //                         ...res,
                //                     },
                //                 ];
                //             }

                //             return d;
                //         });
                //     },
                //     {
                //         optimisticData: comments?.map((d: any, i: number) => {
                //             if (i === comments.length - 1) {
                //                 return [
                //                     ...comments[comments.length - 1],
                //                     {
                //                         id: new Date().getTime().toString(),
                //                         content: value,
                //                     },
                //                 ];
                //             }
                //             return d;
                //         }),
                //         rollbackOnError: true,
                //         revalidate: false,
                //     }
                // );
                // setTimeout(() => {
                //     scrollToBottom();
                // }, 500);
            },
            [comments, props.attractionId]
        );
        return (
            <BottomSheetModal
                snapPoints={["100%"]}
                index={0}
                ref={ref}
                backgroundStyle={{ backgroundColor: "#f3f4f6" }}
            >
                <BottomSheetView
                    style={styles.contentContainer}
                    className="p-3 flex-1"
                >
                    <View className="flex-1 w-full relative">
                        <Text className="text-3xl font-bold text-gray-600 text-center">
                            {t("Comments")}
                        </Text>
                        {isLoading || error ? null : (
                            <FlatList
                                ListHeaderComponent={
                                    <View className="w-1/3">
                                        <Picker
                                            style={{ width: "100%" }}
                                            selectedValue={sortType}
                                            onValueChange={setSortType}
                                            className="w-full bg-gray-100 rounded-lg px-3"
                                        >
                                            <Picker.Item
                                                label={t("Newest")}
                                                value="default"
                                            />
                                            <Picker.Item
                                                label={t("All")}
                                                value="all"
                                            />
                                        </Picker>
                                    </View>
                                }
                                ref={flatListRef}
                                windowSize={5}
                                ListFooterComponent={
                                    isLoading || isValidating ? (
                                        <ActivityIndicator />
                                    ) : null
                                }
                                showsVerticalScrollIndicator={false}
                                onEndReached={() => {
                                    const isReachingEnd =
                                        comments &&
                                        comments[comments.length - 1].length <
                                            10;
                                    if (!isReachingEnd) {
                                        setSize(size + 1);
                                    }
                                }}
                                contentContainerStyle={{ gap: 10 }}
                                data={
                                    comments ? comments.flatMap((c) => c) : []
                                }
                                keyExtractor={(item, index) => `${index}`}
                                renderItem={({ item, index }) => (
                                    <Comment
                                        content={item.content}
                                        index={index}
                                    />
                                )}
                            />
                        )}
                    </View>
                    <CommentInput onComment={onComment} />
                </BottomSheetView>
            </BottomSheetModal>
        );
    }
);
