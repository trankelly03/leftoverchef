// components/Header.tsx
import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

export default function Header() {
    return (
        <View style={styles.header}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
            <Text style={styles.title}>LeftoverChef</Text>
        </View>
    );

}

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'orange',
        paddingVertical: 20,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    logo: {
        width: 70,
        height: 70,
        marginRight: 10,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 22,
        color: '#fff',
        fontWeight: 'bold',
    },
});
