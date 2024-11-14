import { Theme } from '@/constants/theme';
import React from 'react';
import { StyleSheet, View, Pressable, Text, useColorScheme } from 'react-native';

type FloatingActionProps = {
    handlePress: () => void;
};

export default function FloatingAction({ handlePress }: FloatingActionProps) {
    const colorScheme = useColorScheme() || 'light';
    const backgroundColor = Theme[colorScheme].colors.primary5;
    return (
        <View style={[styles.buttonContainer]}>
            <Pressable onPress={handlePress} style={[styles.shadow, mainButtonStyles.button, { backgroundColor }]}>
                <Text style={[mainButtonStyles.content]}>+</Text>
            </Pressable>
        </View>
    );
}

const mainButtonStyles = StyleSheet.create({
    button: {
        zIndex: 1,
        height: 56,
        width: 56,
        borderRadius: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        fontSize: 24,
        color: '#000',
    },
});

const styles = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        bottom: 10,
        right: 0,
    },
    shadow: {
        shadowColor: '#171717',
        shadowOffset: { width: -0.5, height: 3.5 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    content: {
        color: '#f8f9ff',
        fontWeight: 500,
    },
});
