import React, { useEffect, useState } from 'react';
import * as Speech from 'expo-speech';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Button,
    ActivityIndicator,
    Alert
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RecipeDetail() {
    const route = useRoute();
    const recipeId = route.params?.id;
    const title = route.params?.title || 'Recipe';
    const image = route.params?.image || '';

    const [instructions, setInstructions] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await fetch(
                    `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=a1c8aea603a3431c9b83486c5e099a7f`
                );
                const data = await res.json();
                setInstructions(data.instructions || 'No instructions available.');
                setIngredients(data.extendedIngredients || []);
            } catch (err) {
                console.error('Error loading recipe:', err);
                setInstructions('Error loading recipe details.');
            } finally {
                setLoading(false);
            }
        };

        if (recipeId) {
            fetchDetails();
        } else {
            setInstructions('Missing recipe ID.');
            setLoading(false);
        }
    }, [recipeId]);

    const addToFavorites = async () => {
        try {
            const stored = await AsyncStorage.getItem('favorites');
            const favorites = stored ? JSON.parse(stored) : [];

            if (favorites.some(r => r.id === recipeId)) {
                Alert.alert('Note', 'This recipe is already in favorites.');
                return;
            }

            const newFavorite = { id: recipeId, title, image };
            const updated = [...favorites, newFavorite];

            await AsyncStorage.setItem('favorites', JSON.stringify(updated));
            Alert.alert('Success', 'Recipe added to favorites.');
        } catch (error) {
            console.error('Error saving favorite:', error);
        }
    };

    const handleSpeak = () => {
        const cleanText = instructions.replace(/<\/?[^>]+(>|$)/g, '').trim();
        if (cleanText.length === 0) {
            Alert.alert('Nothing to read', 'No instructions available.');
            return;
        }

        Speech.speak(cleanText, {
            language: 'en-US',
            rate: 1.0,
            pitch: 1.0,
        });
    };

    const stopSpeech = () => {
        Speech.stop();
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.titleWrapper}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <Button title="⭐ Add to Favorites" onPress={addToFavorites} />

            {loading ? (
                <ActivityIndicator size="large" />
            ) : (
                <View style={styles.content}>
                    <Text style={styles.sectionTitle}>Ingredients:</Text>
                    {ingredients.length === 0 ? (
                        <Text>- No ingredients available.</Text>
                    ) : (
                        ingredients.map((item, index) => (
                            <Text key={index}>
                                • {item.amount} {item.unit} {item.name}
                            </Text>
                        ))
                    )}

                    <Text style={styles.sectionTitle}>Instructions:</Text>
                    <Text style={styles.instructionText}>
                        {instructions.replace(/<\/?[^>]+(>|$)/g, '')}
                    </Text>

                    <View style={{ marginTop: 20, gap: 10 }}>
                        <Button title="🔊 Read Instructions" onPress={handleSpeak} />
                        <Button title="⏹️ Stop Reading" onPress={stopSpeech} color="gray" />
                    </View>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    titleWrapper: {
        backgroundColor: 'orange',
        paddingVertical: 20,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 22,
        color: '#fff',
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 5,
        paddingHorizontal: 20,
    },
    content: {
        marginTop: 10,
        paddingHorizontal: 20,
    },
    instructionText: {
        marginTop: 8,
        lineHeight: 22,
    },
});
