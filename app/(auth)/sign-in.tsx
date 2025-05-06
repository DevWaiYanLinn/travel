import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import FormInput from '@/components/common/FomInput';
import clsx from 'clsx';
import { useSession } from '@/providers/session-provider';
import { BASE_API_URL } from '@/config/constants';
import { fetcher } from '@/lib/fetch';
import { AntDesign, Entypo, MaterialIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

export default function SignIn() {
    const { signIn } = useSession();
    const router = useRouter();
    const { t } = useTranslation();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState<{ [key: string]: any }>({
        email: '',
        password: '',
    });
    const [isPending, setIsPending] = useState(false);

    const handleSignIn = async () => {
        setError({});
        setIsPending(true);
        try {
            const { accessToken, refreshToken } = await fetcher(BASE_API_URL + '/auth/sign-in', {
                method: 'POST',
                body: JSON.stringify(form),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            signIn({ accessToken, refreshToken });
            router.push('/(app)/(tabs)');
        } catch (e: unknown) {
            if (e instanceof Response) {
                const { errors, message } = await e.json();
                if (e.status === 400) {
                    if (errors) {
                        setError({
                            email: errors.email,
                            password: errors.password,
                        });
                        return;
                    }
                    if (message) {
                    }
                }

                if (e.status === 401) {
                    Alert.alert('エラー ', 'メールアドレスとパスワードが間違い', [{ text: 'OK' }]);
                }
            }
        } finally {
            setIsPending(false);
        }
    };

    return (
        <ScrollView>
            <View className="flex-1 justify-center bg-indigo-600 items-center">
                <View style={{ height: 175 }} className=" w-full flex justify-center items-center">
                    <Text className="text-white font-bold text-5xl italic">MeowMap</Text>
                </View>
                <View
                    className="px-5 flex-1 bg-white gap-3 w-full py-8"
                    style={{
                        borderTopRightRadius: 30,
                        borderTopLeftRadius: 30,
                    }}
                >
                    <Text className="text-4xl text-gray-600 text-center font-bold">{t('ログイン')}</Text>
                    <FormInput
                        label={t('Email')}
                        icons={<MaterialIcons name="email" size={24} color="#9ca3af" className="ml-2" />}
                        editable={!isPending}
                        placeholder={'tashibana@gmail.com'}
                        placeholderTextColor="#aaa"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={form.email}
                        errorText={error.email}
                        onChangeText={(value) => setForm({ ...form, email: value })}
                    />
                    <FormInput
                        label={t('Password')}
                        icons={<Entypo name="lock" size={24} color="#9ca3af" className="ml-2" />}
                        editable={!isPending}
                        placeholderTextColor="#aaa"
                        secureTextEntry
                        errorText={error.password}
                        value={form.password}
                        onChangeText={(value) => setForm({ ...form, password: value })}
                    />
                    <TouchableOpacity
                        onPress={handleSignIn}
                        className={clsx(
                            'w-full mt-3  py-3 justify-center flex-row gap-3 items-center rounded-lg',
                            isPending ? 'bg-indigo-300' : 'bg-indigo-600'
                        )}
                    >
                        <Text className="text-white text-lg font-bold">{t('ログイン')}</Text>
                        <AntDesign name="arrowright" size={20} color="#FFFFFF" />
                    </TouchableOpacity>
                    <View className="flex-row justify-center items-center gap-3">
                        <View className="border-b flex-1 border-gray-300"></View>
                        <Text className="text-gray-500">or</Text>
                        <View className="border-b flex-1 border-gray-300"></View>
                    </View>
                    <Link href={'/(auth)/sign-up'} asChild>
                        <TouchableOpacity className="w-full border py-3 rounded-lg border-red-600">
                            <Text className="text-center text-red-600 font-bold">
                                {t("Don't you have an account? Sign Up")}
                            </Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
        </ScrollView>
    );
}
