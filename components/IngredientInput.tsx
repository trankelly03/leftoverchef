import React, { useState } from 'react';
import {
    View,
    TextInput,
    Button,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

export default function IngredientInput({
                                            ingredients,
                                            setIngredients,
                                            fetchRecipes,
                                            selectedFilter,
                                            setSelectedFilter,
                                        }) {
    const [input, setInput] = useState('');

    const addIngredient = () => {
        if (input.trim().length > 0) {
            setIngredients([...ingredients, input.trim()]);
            setInput('');
        }
    };

    const removeIngredient = (ingredientToRemove) => {
        setIngredients(ingredients.filter((item) => item !== ingredientToRemove));
    };

    const clearIngredients = () => {
        setIngredients([]);
    };

    const cuisines = [
        'italian',
        'mexican',
        'chinese',
        'indian',
        'french',
        'american',
        'greek',
        'japanese',
        'thai',
        'vietnamese',
    ];

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Enter ingredient"
                value={input}
                onChangeText={setInput}
                style={styles.input}
            />
            <Button title="➕Add ingredient" onPress={addIngredient} />

            {ingredients.length > 0 && (
                <>
                    <Text style={styles.ingredientListLabel}>Zutaten:</Text>
                    <View style={styles.ingredientChips}>
                        {ingredients.map((item, index) => (
                            <View key={index} style={styles.ingredientChip}>
                                <Text style={styles.ingredientText}>{item}</Text>
                                <TouchableOpacity onPress={() => removeIngredient(item)}>
                                    <Text style={styles.removeX}>✖</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                    <Button title="🗑️Delete all ingredients" onPress={clearIngredients} />
                </>
            )}

            <Text style={styles.filterLabel}>Country Cuisine:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.filterContainer}>
                    {cuisines.map((cuisine) => {
                        const isSelected = selectedFilter === cuisine;
                        return (
                            <TouchableOpacity
                                key={cuisine}
                                onPress={() =>
                                    setSelectedFilter(isSelected ? null : cuisine)
                                }
                                style={[
                                    styles.filterButton,
                                    isSelected && styles.activeFilter,
                                ]}
                            >
                                <Text style={{ color: isSelected ? '#fff' : '#000' }}>
                                    {isSelected ? `${cuisine} ✖` : cuisine}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>

            <View style={{ marginTop: 10 }}>
                <Button title="🔎Search recipes" onPress={fetchRecipes} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 16 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 10,
        borderRadius: 6,
    },
    ingredientListLabel: {
        marginTop: 10,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    ingredientChips: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
        marginBottom: 10,
    },
    ingredientChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eee',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 6,
        marginRight: 6,
        marginBottom: 6,
    },
    ingredientText: {
        marginRight: 6,
    },
    removeX: {
        color: 'red',
        fontWeight: 'bold',
    },
    filterLabel: {
        fontWeight: 'bold',
        marginBottom: 6,
    },
    filterContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    filterButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        marginRight: 8,
        backgroundColor: '#eee',
    },
    activeFilter: {
        backgroundColor: 'orange',
        borderColor: 'orange',
    },
});
