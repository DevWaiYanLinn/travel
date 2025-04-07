import { Link, useNavigation, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { t } = useTranslation()
    const router = useRouter()

    return (
        <View className="flex-1 justify-center items-center bg-gray-100 px-5">
            <Text className="text-4xl font-bold text-gray-800 mb-10">{t('Clover Travel')}</Text>
            <TextInput
                className="w-full h-12 bg-white rounded-lg px-4 mb-4 text-base border border-gray-300"
                placeholder="Email"
                placeholderTextColor="#aaa"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                className="w-full h-12 bg-white rounded-lg px-4 mb-6 text-base border border-gray-300"
                placeholder="Password"
                placeholderTextColor="#aaa"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => router.navigate('/(tabs)')} className="w-full h-12 bg-blue-500 rounded-lg justify-center items-center">
                <Text className="text-white text-lg font-semibold">{t('Sign In')}</Text>
            </TouchableOpacity>
            <Link href="/(auth)/sign-up" className="w-full text-center mt-3 text-primary text-[1.1rem] underline">
                {t("Sign Up")}
            </Link>
        </View>
    );
}
