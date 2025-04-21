import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

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
                <Text className="text-3xl text-blue-400 text-center font-bold mt-20">{t('Clover Travel')}</Text>
                <TextInput
                    className="w-full h-14 bg-white rounded-lg px-4  text-base border border-gray-300"
                    placeholder={t('email')}
                    placeholderTextColor="#aaa"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                    style={{ borderRadius: 30 }}
                />
                <TextInput
                    className="w-full h-14 bg-white rounded-lg px-4  text-base border border-gray-300"
                    placeholder={t('password')}
                    placeholderTextColor="#aaa"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    style={{ borderRadius: 30 }}
                />
                <TextInput
                    className="w-full h-14 bg-white rounded-lg px-4 text-base border border-gray-300"
                    placeholder={t('confirm password')}
                    placeholderTextColor="#aaa"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    style={{ borderRadius: 30 }}
                />
                <TouchableOpacity
                    style={{ borderRadius: 30 }}
                    onPress={() => router.navigate('/(tabs)')}
                    className="w-full h-14 bg-blue-500 rounded-lg justify-center items-center"
                >
                    <Text className="text-white text-lg font-bold">{t('Sign Up')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
