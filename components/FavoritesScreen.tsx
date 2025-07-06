import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Button,
    Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function FavoritesScreen() {
    const [favorites, setFavorites] = useState([]);
    const [deletedItem, setDeletedItem] = useState(null);
    const [showUndo, setShowUndo] = useState(false);
    const undoTimeout = useRef(null);
    const navigation = useNavigation();

    useEffect(() => {
        const loadFavorites = async () => {
            const stored = await AsyncStorage.getItem('favorites');
            setFavorites(stored ? JSON.parse(stored) : []);
        };
        const unsubscribe = navigation.addListener('focus', loadFavorites);
        return unsubscribe;
    }, [navigation]);

    const saveFavorites = async (list) => {
        setFavorites(list);
        await AsyncStorage.setItem('favorites', JSON.stringify(list));
    };

    const removeFavorite = (item) => {
        Alert.alert(
            'Remove Favorite?',
            `Do you really want to remove "${item.title}" from your favorites?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Remove',
                    style: 'destructive',
                    onPress: async () => {
                        const updated = favorites.filter((f) => f.id !== item.id);
                        setDeletedItem(item);
                        setShowUndo(true);
                        saveFavorites(updated);

                        if (undoTimeout.current) clearTimeout(undoTimeout.current);
                        undoTimeout.current = setTimeout(() => {
                            setDeletedItem(null);
                            setShowUndo(false);
                        }, 5000);
                    },
                },
            ]
        );
    };

    const undoDelete = async () => {
        if (deletedItem) {
            const restored = [...favorites, deletedItem];
            saveFavorites(restored);
            setDeletedItem(null);
            setShowUndo(false);
        }
    };

    const clearAllFavorites = () => {
        Alert.alert(
            'Clear all favorites?',
            'Are you sure you want to remove all saved favorites?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete All',
                    style: 'destructive',
                    onPress: async () => {
                        await AsyncStorage.removeItem('favorites');
                        setFavorites([]);
                    },
                },
            ]
        );
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() =>
                navigation.navigate('Recipes', {
                    id: item.id,
                    title: item.title,
                    image: item.image,
                })
            }
        >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.title}>{item.title}</Text>
                <TouchableOpacity onPress={() => removeFavorite(item)}>
                    <Text style={styles.removeText}>✖</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {favorites.length === 0 ? (
                <Text style={styles.empty}>No favorites saved.</Text>
            ) : (
                <FlatList
                    data={favorites}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={styles.list}
                />
            )}

            {favorites.length > 0 && (
                <View style={styles.clearButton}>
                    <Button title="🗑️ Delete all favorites" color="red" onPress={clearAllFavorites} />
                </View>
            )}

            {showUndo && deletedItem && (
                <View style={styles.undoContainer}>
                    <Text style={styles.undoText}>"{deletedItem.title}" removed</Text>
                    <TouchableOpacity onPress={undoDelete}>
                        <Text style={styles.undoAction}>↩ Undo</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    list: { padding: 16 },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        padding: 10,
        marginBottom: 10,
        marginHorizontal: 16,
        borderRadius: 8,
        elevation: 1,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 10,
    },
    info: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
    },
    removeText: {
        color: 'red',
        fontSize: 18,
        fontWeight: 'bold',
    },
    empty: {
        textAlign: 'center',
        marginTop: 40,
        fontSize: 16,
    },
    clearButton: {
        paddingHorizontal: 16,
        marginBottom: 10,
    },
    undoContainer: {
        backgroundColor: '#333',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        paddingHorizontal: 20,
    },
    undoText: {
        color: '#fff',
        fontSize: 14,
    },
    undoAction: {
        color: '#ffcc00',
        fontWeight: 'bold',
        fontSize: 14,
    },
});
