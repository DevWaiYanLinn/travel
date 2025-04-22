import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { signInApi } from "@/services/sign-in";
import { delay } from "@/lib/utils";
import FormInput from "@/components/common/FomInput";

export default function SignIn() {
    const router = useRouter();
    const { t } = useTranslation();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState<{ [key: string]: any }>({
        email: "有効なメールを入力してください。",
        password: "パスワードは必須です。",
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSignIn = async () => {
        router.push("/(tabs)");
        // setError({});
        // setIsLoading(true);
        // await delay(50000);
        // try {
        //     await signInApi(form);
        // } catch (e: unknown) {
        //     if (e instanceof Response) {
        //         if (e.status === 400) {
        //             const { errors } = await e.json();
        //             setError({
        //                 email: errors.email,
        //                 password: errors.password,
        //             });
        //             return;
        //         }

        //         if (e.status === 401) {
        //         }
        //     }
        // } finally {
        //     setIsLoading(false);
        // }
    };

    return (
        <View className="flex-1 bg-white">
            <View
                className="h-[35%] z-10 overflow-hidden"
                style={{
                    borderBottomLeftRadius: 30,
                    borderBottomRightRadius: 30,
                }}
            >
                <Image
                    source={require("@/assets/images/sign-in-bg.png")}
                    resizeMode="stretch"
                    className="w-full h-full"
                />
            </View>
            <View
                className="flex-1 px-5 gap-4 mt-8"
                style={{
                    borderTopLeftRadius: 50,
                    borderTopRightRadius: 50,
                }}
            >
                <Text className="text-3xl text-blue-500 text-center py-2 font-bold">
                    {t("ミャウマップ")}
                </Text>
                <FormInput
                    className="w-full h-14 bg-gray-50 rounded-lg px-4 text-base border border-gray-300"
                    placeholder={t("email")}
                    placeholderTextColor="#aaa"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={form.email}
                    errorText={error.email}
                    onChangeText={(value) => setForm({ ...form, email: value })}
                />
                <FormInput
                    className="w-full h-14 bg-gray-50 rounded-lg px-4  text-base border border-gray-300"
                    placeholder={t("password")}
                    placeholderTextColor="#aaa"
                    secureTextEntry
                    errorText={error.password}
                    value={form.password}
                    onChangeText={(value) =>
                        setForm({ ...form, password: value })
                    }
                />
                <TouchableOpacity
                    disabled={isLoading}
                    onPress={handleSignIn}
                    className="w-full h-14 bg-blue-500 justify-center items-center rounded-lg"
                >
                    <Text className="text-white text-lg font-bold">
                        {t("Sign In")}
                    </Text>
                </TouchableOpacity>
                <Link
                    href={"/(auth)/sign-up"}
                    className="w-full text-center text-primary text-[1.1rem] underline"
                >
                    {t("Sign Up")}
                </Link>
            </View>
        </View>
    );
}
