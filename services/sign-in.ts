import { BASE_API_URL } from "@/config/constants";
import * as SecureStore from "expo-secure-store";
export const signInApi = async (body: { email: string; password: string }) => {
    const url = BASE_API_URL + `/auth/sign-in`;

    try {
        const res = await fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) {
            throw res;
        }
        const { accessToken, refreshToken } = await res.json();
        await SecureStore.setItem("accessToken", accessToken);
        await SecureStore.setItem("refreshToken", refreshToken);
    } catch (error : unknown) {
        throw error;
    }
};
