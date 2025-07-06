import React, { useState } from 'react';
import {
    SafeAreaView,
    FlatList,
    StyleSheet,
    Button,
    View,
    Alert,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Header from './components/Header';
import IngredientInput from './components/IngredientInput';
import RecipeItem from './components/RecipeItem';
import RecipeDetail from './components/RecipeDetail';
import FavoritesScreen from './components/FavoritesScreen';

const Stack = createNativeStackNavigator();

export default function App() {
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [recipes, setRecipes] = useState<any[]>([]);
    const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

    const fetchRecipes = async () => {
        const query = ingredients.join(',');
        const cuisineParam = selectedFilter ? `&cuisine=${selectedFilter}` : '';

        const url = `https://api.spoonacular.com/recipes/complexSearch?includeIngredients=${query}&number=5${cuisineParam}&addRecipeInformation=true&apiKey=a1c8aea603a3431c9b83486c5e099a7f`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            console.log('API response:', data); // Debug-Output

            if (!data.results || data.results.length === 0) {
                Alert.alert('No recipes found');
                setRecipes([]);
                return;
            }

            setRecipes(data.results);
        } catch (err) {
            console.error('Error loading recipes:', err);
            Alert.alert('Error', 'Could not load recipes.');
            setRecipes([]);
        }
    };

    const HomeScreen = ({ navigation }) => (
        <SafeAreaView style={styles.container}>
            <Header />

            <View style={styles.button}>
                <Button
                    title="⭐ Show favorites"
                    onPress={() => navigation.navigate('Favorites')}
                />
            </View>

            <IngredientInput
                ingredients={ingredients}
                setIngredients={setIngredients}
                fetchRecipes={fetchRecipes}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
            />

            {recipes.length === 0 ? (
                <View style={{ padding: 20 }}>
                    <Button title="No recipes to show" disabled />
                </View>
            ) : (
                <FlatList
                    data={recipes}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <RecipeItem
                            item={item}
                            onPress={() =>
                                navigation.navigate('Recipes', {
                                    id: item.id,
                                    title: item.title,
                                    image: item.image,
                                })
                            }
                        />
                    )}
                />
            )}
        </SafeAreaView>
    );

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Recipes" component={RecipeDetail} />
                <Stack.Screen name="Favorites" component={FavoritesScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', paddingTop: 40 },
    button: { marginHorizontal: 20, marginBottom: 10 },
});
