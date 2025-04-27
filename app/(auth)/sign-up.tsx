import FormInput from '@/components/common/FomInput';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TextInput, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native';

export default function SingUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { t } = useTranslation();
    const router = useRouter();

    return (
        <View className="flex-1">
            <View
                className=" h-[35%] z-10 overflow-hidden"
                style={{ borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}
            >
                <Image
                    source={require('@/assets/images/sign-up-bg.png')}
                    resizeMode="stretch"
                    className="w-full h-full"
                />
            </View>
            <View className="flex-1 bg-white px-5 -mt-10 gap-5">
                <Text className="text-3xl text-blue-400 text-center font-bold mt-20">{t('MeowMap')}</Text>
                <FormInput
                    className="w-full h-14 bg-white rounded-lg px-4  text-base border border-gray-300"
                    placeholder={t('Email')}
                    placeholderTextColor="#aaa"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />
                <FormInput
                    className="w-full h-14 bg-white rounded-lg px-4  text-base border border-gray-300"
                    placeholder={t('Password')}
                    placeholderTextColor="#aaa"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <FormInput
                    className="w-full h-14 bg-white rounded-lg px-4 text-base border border-gray-300"
                    placeholder={t('Confirm Password')}
                    placeholderTextColor="#aaa"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity className="w-full rounded-lg h-14 bg-blue-500  justify-center items-center">
                    <Text className="text-white text-lg font-bold">{t('Sign Up')}</Text>
                </TouchableOpacity>
                <Link
                    href={'/(auth)/sign-in'}
                    className="w-full font-bold text-center text-primary text-[1.1rem] underline"
                >
                    {t('Already account?. Sign In')}
                </Link>
            </View>
        </View>
    );
}
