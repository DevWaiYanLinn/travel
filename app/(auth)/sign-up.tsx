import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function SingUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View className="flex-1 justify-center items-center bg-gray-100 px-5">
            <Text className="text-4xl font-bold text-gray-800 mb-10">J Travel</Text>
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
            <TextInput
                className="w-full h-12 bg-white rounded-lg px-4 mb-6 text-base border border-gray-300"
                placeholder="Confirm Password"
                placeholderTextColor="#aaa"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity className="w-full h-12 bg-blue-500 rounded-lg justify-center items-center">
                <Text className="text-white text-lg font-semibold">Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
}
