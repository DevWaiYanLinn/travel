import { Link, Redirect, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import FormInput from '@/components/common/FomInput';
import clsx from 'clsx';
import { useSession } from '@/providers/session-provider';
import { BASE_API_URL } from '@/config/constants';
import { fetcher } from '@/lib/fetch';

export default function SignIn() {
    const { isLoading, signIn, session } = useSession();

    if (isLoading) {
        return <View />;
    }

    if (session) {
        return <Redirect href="/(app)/(tabs)" />;
    }

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
                    Alert.alert('エラー ', 'メールアドレスとパスワードが間違い', [
                        {
                            text: 'キャンセル',
                            style: 'cancel',
                        },
                        { text: 'OK' },
                    ]);
                }
            }
        } finally {
            setIsPending(false);
        }
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
                    source={require('@/assets/images/sign-in-bg.png')}
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
                <Text className="text-3xl text-blue-500 text-center py-2 font-bold">{t('ミャウマップ')}</Text>
                <FormInput
                    editable={!isPending}
                    className="w-full h-14 bg-gray-50 rounded-lg px-4 text-base border border-gray-300"
                    placeholder={t('Email')}
                    placeholderTextColor="#aaa"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={form.email}
                    errorText={error.email}
                    onChangeText={(value) => setForm({ ...form, email: value })}
                />
                <FormInput
                    editable={!isPending}
                    className="w-full h-14 bg-gray-50 rounded-lg px-4  text-base border border-gray-300"
                    placeholder={t('Password')}
                    placeholderTextColor="#aaa"
                    secureTextEntry
                    errorText={error.password}
                    value={form.password}
                    onChangeText={(value) => setForm({ ...form, password: value })}
                />
                <TouchableOpacity
                    onPress={handleSignIn}
                    className={clsx(
                        'w-full h-14 justify-center items-center rounded-lg',
                        isPending ? 'bg-blue-200' : 'bg-blue-500'
                    )}
                >
                    <Text className="text-white text-lg font-bold">{t('Sign In')}</Text>
                </TouchableOpacity>
                <Link
                    href={'/(auth)/sign-up'}
                    className="w-full text-center text-primary text-[1.1rem] font-bold underline"
                >
                    {t("Don't you have and account? Sign Up")}
                </Link>
            </View>
        </View>
    );
}
