import { Image, Text, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';

export default function Edit() {
    return (
        <View className="flex-1">
            <View className="h-48 bg-blue-400 relative">
                <Image
                    source={require('@/assets/images/profile-edit-bg.jpg')}
                    className="w-full h-full"
                    resizeMode="stretch"
                />
                <View className="flex-row justify-center absolute bottom-0 left-[30] translate-y-[50%] z-20">
                    <View className="relative">
                        <View className="absolute bottom-2 right-[0.5] bg-blue-00 z-30 p-1 rounded-full">
                            <Entypo name="camera" size={15} color="#FFFFFF" />
                        </View>
                        <View className="border rounded-full w-20 h-20 overflow-hidden border-white bg-white">
                            <Image source={require('@/assets/images/avatar.png')} className="w-full h-full" />
                        </View>
                    </View>
                </View>
            </View>
            <View className="p-3 flex-1">
                <View className="mt-14 gap-4 p-5 bg-white rounded-lg flex-1 ">
                    <View className="pb-5 border-b border-b-gray-300  flex-row justify-between items-center">
                        <View>
                            <Text className="text-gray-400 font-bold text-sm">Name</Text>
                            <Text className="text-gray-600 font-bold text-lg mt-1">John Doe</Text>
                        </View>
                        <Feather name="edit" size={21} color="#3b82f6" />
                    </View>
                    <View className="pb-5  border-b border-b-gray-300   flex-row justify-between items-center">
                        <View>
                            <Text className="text-gray-400 font-bold text-sm">Email</Text>
                            <Text className="text-gray-600 font-bold text-lg mt-1">john@gmail.com</Text>
                        </View>
                        <Feather name="edit" size={21} color="#3b82f6" />
                    </View>
                    <View className="pb-5  border-b border-b-gray-300 flex-row justify-between items-center">
                        <View>
                            <Text className="text-gray-400 font-bold text-sm">DOB</Text>
                            <Text className="text-gray-600 font-bold text-lg mt-1">1998/09/29</Text>
                        </View>
                        <Feather name="edit" size={21} color="#3b82f6" />
                    </View>
                </View>
            </View>
        </View>
    );
}
