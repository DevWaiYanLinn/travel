import FormInput from "@/components/common/FomInput";
import { BASE_API_URL } from "@/config/constants";
import { fetcher } from "@/lib/fetch";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";

export default function SingUp() {
    const [form, setForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const { t } = useTranslation();
    const router = useRouter();
    const [error, setError] = useState<{ [key: string]: any }>({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [isPending, setIsPending] = useState(false);

    const handleSignUp = async () => {
        setIsPending(true);
        setError({});
        try {
            await fetcher(BASE_API_URL + "/auth/sign-up", {
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
                method:'POST'
            });

            return router.push("/(auth)/sign-in");
        } catch (e: unknown) {
            if (e instanceof Response) {
                const { errors, message } = await e.json();
                if (e.status === 400) {
                    if (errors) {
                        setError(errors);
                        return;
                    }
                    if (message) {
                    }
                }

                if (e.status === 500) {
                    Alert.alert(
                        "エラー ",
                        "サーバーエラー",
                        [{ text: "OK" }]
                    );
                }
            }
        } finally {
            setIsPending(false);
        }
    };

    return (
        <View className="flex-1">
            <View
                className=" h-[35%] z-10 overflow-hidden"
                style={{
                    borderBottomLeftRadius: 30,
                    borderBottomRightRadius: 30,
                }}
            >
                <Image
                    source={require("@/assets/images/sign-up-bg.png")}
                    resizeMode="stretch"
                    className="w-full h-full"
                />
            </View>
            <View className="flex-1 bg-white px-5 -mt-10 gap-5">
                <Text className="text-3xl text-indigo-500 text-center font-bold mt-20">
                {t("ミャウマップ")}
                </Text>
                <FormInput
                    editable={!isPending}
                    className="w-full h-14 bg-white rounded-lg px-4  text-base border border-gray-300"
                    placeholder={t("Email")}
                    placeholderTextColor="#aaa"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={form.email}
                    onChangeText={(value) => setForm({ ...form, email: value })}
                    errorText={error.email}
                />
                <FormInput
                    editable={!isPending}
                    className="w-full h-14 bg-white rounded-lg px-4  text-base border border-gray-300"
                    placeholder={t("Password")}
                    placeholderTextColor="#aaa"
                    secureTextEntry
                    value={form.password}
                    onChangeText={(value) =>
                        setForm({ ...form, password: value })
                    }
                    errorText={error.password}
                />
                <FormInput
                    editable={!isPending}
                    className="w-full h-14 bg-white rounded-lg px-4 text-base border border-gray-300"
                    placeholder={t("Confirm Password")}
                    placeholderTextColor="#aaa"
                    secureTextEntry
                    value={form.confirmPassword}
                    onChangeText={(value) =>
                        setForm({ ...form, confirmPassword: value })
                    }
                    errorText={error.confirmPassword}
                />
                <TouchableOpacity
                    disabled={isPending}
                    onPress={handleSignUp}
                    className="w-full rounded-lg h-14 bg-indigo-500  justify-center items-center"
                >
                    <Text className="text-white text-lg font-bold">
                        {t("Sign Up")}
                    </Text>
                </TouchableOpacity>
                <Link
                    href={"/(auth)/sign-in"}
                    className="w-full font-bold text-center text-indigo-500 text-[1.1rem] underline"
                >
                    {t("Already account?. Sign In")}
                </Link>
            </View>
        </View>
    );
}
