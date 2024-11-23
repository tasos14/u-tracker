import { Theme } from '@/constants/theme';
import { AppThemeContext } from '@/context/themeContext';
import React, { useContext } from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';

type FloatingActionProps = {
    handlePress: () => void;
};

export default function FloatingAction({ handlePress }: FloatingActionProps) {
    const { theme } = useContext(AppThemeContext);
    const backgroundColor = Theme[theme].colors.primary5;
    const color = Theme[theme].colors.invertedColor;
    return (
        <View style={[styles.buttonContainer]}>
            <Pressable onPress={handlePress} style={[styles.shadow, mainButtonStyles.button, { backgroundColor }]}>
                <Text style={[mainButtonStyles.content, { color }]}>+</Text>
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
