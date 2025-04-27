import { memo } from 'react';
import { Animated, RegisteredStyle, StyleSheet, ViewStyle } from 'react-native';

const styles = StyleSheet.create({
    skeleton: {
        backgroundColor: '#ccc',
    },
});

export const Skeleton = memo((props: { className?: string; style?: ViewStyle }) => {
    const opacity = new Animated.Value(0.3);

    Animated.loop(
        Animated.sequence([
            Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
            Animated.timing(opacity, { toValue: 0.3, duration: 700, useNativeDriver: true }),
        ])
    ).start();

    return <Animated.View className={props.className} style={[styles.skeleton, { opacity }, props.style]} />;
});
