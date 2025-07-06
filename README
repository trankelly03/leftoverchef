#  LeftoverChef

**LeftoverChef** ist eine mobile App, mit der Nutzer:innen basierend auf vorhandenen Zutaten passende Rezepte finden können. Optional kann nach Länderküche gefiltert werden. Favoriten lassen sich speichern und verwalten.

---

##  Features

- Zutaten manuell hinzufügen oder löschen
- Suche nach Rezepten über Spoonacular API
- Filter nach Länderküche (Cuisine)
- Favoriten speichern, anzeigen und löschen
- Text-to-Speech-Funktion für Rezepte (nur englisch)
- Persistente Speicherung über AsyncStorage

---

## Verwendete Technologien

| Komponente              | Zweck                                                                 |
|-------------------------|------------------------------------------------------------------------|
| **React Native (Expo)** | Frontend-Framework                                                     |
| **Spoonacular API**     | Rezeptdaten (https://spoonacular.com/food-api)                        |
| **AsyncStorage**        | Lokales Speichern von Favoriten                                        |
| **React Navigation**    | Navigation zwischen Screens                                            |
| **expo-speech**         | Vorlesen der Zubereitung                                               |

---

##  Architektur

- **Client-only Architektur**
  Die App läuft vollständig auf dem Gerät. Es gibt keinen eigenen Server.
- **Zentrale Komponenten**:
  - `App.tsx`: Einstiegspunkt, Navigation, State-Management
  - `IngredientInput.tsx`: Zutaten + Filter hinzufügen/löschen
  - `RecipeItem.tsx`: Darstellung einzelner Rezepte
  - `RecipeDetail.tsx`: Detailansicht eines Rezepts inkl. TTS + Favoriten
  - `FavoritesScreen.tsx`: Anzeige und Verwaltung von Favoriten
- **Device APIs**: `expo-speech`, `@react-native-async-storage/async-storage`

---

##  Installation & Inbetriebnahme

### 1. Voraussetzungen

- Node.js (empfohlen: v18+)
- npm oder yarn
- **Expo CLI**:
  ```bash
  npm install -g expo-cli
