import { BASE_API_URL } from "@/config/constants";
import { fetcher } from "@/lib/fetch";
import { useSession } from "@/providers/session-provider";
import { AntDesign } from "@expo/vector-icons";
import { memo, useCallback, useRef, useState } from "react";
import { TouchableOpacity } from "react-native";

export const UserPreference = memo(
    (props: { preference: boolean; apiEndPoint: string }) => {
        const [preference, setPreference] = useState(props.preference);
        const { session } = useSession();
        const timeoutRef = useRef<any>(null);

        const handlePress = useCallback(() => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            setPreference(!preference);

            timeoutRef.current = setTimeout(() => {
                fetcher(BASE_API_URL + props.apiEndPoint, {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + session?.accessToken,
                    },
                });
            }, 500);
        }, [preference, timeoutRef.current]);

        return (
            <TouchableOpacity
                onPress={handlePress}
                className="absolute top-2 right-2 bg-gray-100 rounded-full p-1"
            >
                <AntDesign
                    name={preference ? "heart" : "hearto"}
                    size={16}
                    color="#6366f1"
                />
            </TouchableOpacity>
        );
    }
);

UserPreference.displayName = "UserPreference";
