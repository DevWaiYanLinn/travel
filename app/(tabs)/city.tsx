import CityCard from '@/components/custom/city-card';
import { useFetch } from '@/lib/fetch';
import { ScrollView, Text, View } from 'react-native';

export default function City() {
    const { data: cities } = useFetch<Array<any>>('/(api)/cities');
    return (
        <ScrollView className="flex-1">
            <CityCard
                imageUrl="https://picsum.photos/200/300"
                title="hello"
                description="hey"
                onReadMore={() => {
                    console.log('Read more clicked');
                }}
            />
            <CityCard
                imageUrl="https://picsum.photos/200/300"
                title="hello"
                description="hey"
                onReadMore={() => {
                    console.log('Read more clicked');
                }}
            />
            <CityCard
                imageUrl="https://picsum.photos/200/300"
                title="hello"
                description="hey"
                onReadMore={() => {
                    console.log('Read more clicked');
                }}
            />
        </ScrollView>
    );
}
