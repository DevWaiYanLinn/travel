import FormInput from '@/components/common/FomInput';
import { BASE_API_URL } from '@/config/constants';
import { fetcher } from '@/lib/fetch';
import { AntDesign, Entypo, MaterialIcons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function SingUp() {
    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const { t } = useTranslation();
    const router = useRouter();
    const [error, setError] = useState<{ [key: string]: any }>({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [isPending, setIsPending] = useState(false);

    const handleSignUp = async () => {
        setIsPending(true);
        setError({});
        try {
            await fetcher(BASE_API_URL + '/auth/sign-up', {
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
                method: 'POST',
            });

            router.push('/(auth)/sign-in');
        } catch (e: unknown) {
            if (e instanceof Response) {
                const { errors, message } = await e.json();
                if (e.status === 400) {
                    if (errors) {
                        setError(errors);
                        return;
                    }

                    if (message) {
                        Alert.alert('エラー ', message, [{ text: 'OK' }]);
                    }
                }

                if (e.status === 500) {
                    Alert.alert('エラー ', 'サーバーエラー', [{ text: 'OK' }]);
                }
            }
        } finally {
            setIsPending(false);
        }
    };

    return (
        <ScrollView>
            <View className="flex-1 bg-indigo-600 justify-center items-center">
                <View style={{ height: 175 }} className=" w-full flex justify-center items-center">
                    <Text className="text-white font-bold text-5xl italic">MeowMap</Text>
                </View>
                <View
                    className="px-5 flex-1 w-full gap-3 bg-white py-8"
                    style={{
                        borderTopRightRadius: 30,
                        borderTopLeftRadius: 30,
                    }}
                >
                    <Text className="text-4xl text-gray-600 text-center font-bold">{t('Sign Up')}</Text>
                    <FormInput
                        label={t('Email')}
                        icons={<MaterialIcons name="email" size={24} color="#9ca3af" className="ml-2" />}
                        editable={!isPending}
                        placeholder={t('tashibana@gmail.com')}
                        placeholderTextColor="#aaa"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={form.email}
                        onChangeText={(value) => setForm({ ...form, email: value })}
                        errorText={error.email}
                    />
                    <FormInput
                        editable={!isPending}
                        label={t('Password')}
                        icons={<Entypo name="lock" size={24} color="#9ca3af" className="ml-2" />}
                        placeholderTextColor="#aaa"
                        secureTextEntry
                        value={form.password}
                        onChangeText={(value) => setForm({ ...form, password: value })}
                        errorText={error.password}
                    />
                    <FormInput
                        editable={!isPending}
                        label={t('Confirm Password')}
                        icons={<Entypo name="lock" size={24} color="#9ca3af" className="ml-2" />}
                        placeholderTextColor="#aaa"
                        secureTextEntry
                        value={form.confirmPassword}
                        onChangeText={(value) => setForm({ ...form, confirmPassword: value })}
                        errorText={error.confirmPassword}
                    />
                    <TouchableOpacity
                        disabled={isPending}
                        onPress={handleSignUp}
                        className="w-full mt-3 gap-3 flex-row rounded-lg py-3 bg-indigo-500  justify-center items-center"
                    >
                        <Text className="text-white text-lg font-bold">{t('Sign Up')}</Text>
                        <AntDesign name="arrowright" size={20} color="#FFFFFF" />
                    </TouchableOpacity>
                    <View className="flex-row justify-center items-center gap-3">
                        <View className="border-b flex-1 border-gray-300"></View>
                        <Text className="text-gray-500">or</Text>
                        <View className="border-b flex-1 border-gray-300"></View>
                    </View>
                    <Link asChild href={'/(auth)/sign-in'}>
                        <TouchableOpacity className="border border-red-600 py-3 rounded-lg">
                            <Text className="text-red-600 font-bold text-center">
                                {' '}
                                {t('Already account?. Sign In')}
                            </Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
        </ScrollView>
    );
}
