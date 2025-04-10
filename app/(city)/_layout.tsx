import { Stack } from "expo-router";

export default function CityLayout(){
    return (
        <Stack>
            <Stack.Screen name="about-city" options={{ headerShown: false }}  />
        </Stack>
    );
}