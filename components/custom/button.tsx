import { TouchableOpacity } from 'react-native';

export default function Button({
    variant = 'primary',
    onPress = () => {},
    children,
}: {
    onPress?: () => void;
    children: React.ReactNode;
    variant?: string;
}) {
    const buttonVariant: { [key: string]: string } = {
        primary: 'bg-blue-500',
        secondary: 'bg-gray-500',
        danger: 'bg-red-500',
        success: 'bg-green-500',
        warning: 'bg-yellow-500',
        info: 'bg-blue-300',
        light: 'bg-gray-200',
        dark: 'bg-gray-800',
        link: 'bg-transparent',
    };

    return (
        <TouchableOpacity onPress={onPress} className={`${buttonVariant[variant]} rounded-md py-2 px-4 self-start`}>
            {children}
        </TouchableOpacity>
    );
}
