import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function RecipeItem({ item }) {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('Recipes', {
            id: item.id,
            title: item.title,
            image: item.image,
        });
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={styles.container}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text style={styles.title}>{item.title}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 8,
    },
    title: {
        marginTop: 8,
        fontSize: 16,
        fontWeight: '500',
    },
});
