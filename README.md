# Application de Gestion d'Utilisateurs

Application React + TypeScript permettant de consulter, rechercher et gérer une liste d'utilisateurs via l'API DummyJSON.

🚀 Démo

Déployé sur Vercel : https://exam-front-ten.vercel.app/

📋 Description du projet

Cette application a été développée from scratch en suivant une approche progressive par niveaux de complexité croissante, allant d'une simple liste d'utilisateurs à une application complète avec gestion d'état avancée, optimisations React et UX soignée.

✨ Fonctionnalités

🎯 Niveau 1 - Base dynamique

- ✅ Affichage de la liste des utilisateurs depuis l'API
- ✅ Fiche détaillée d'un utilisateur (âge, société, adresse, etc.)
- ✅ Navigation via React Router (`/` et `/user/:id`)
- ✅ Gestion des états de chargement et erreurs réseau

🔍 Niveau 2 - Interactivité

- ✅ Recherche en temps réel (nom, prénom, email) avec support multi-mots
- ✅ Tri par nom ou par âge
- ✅ Pagination (10 utilisateurs par page, côté client)
- ✅ Gestion propre des erreurs (try/catch)

🎨 Niveau 3 - UX évoluée

- ✅ Système de favoris persistant (`localStorage`)
- ✅ Thème clair/sombre avec persistance
- ✅ Skeleton loader pendant le chargement
- ✅ Messages d'erreur stylisés avec bouton "Réessayer"
- ✅ Optimisations avec `useMemo` (filtre + tri)
- ✅ Animations CSS (fade-in, hover, transitions)

⚡ Niveau 4 - Approche professionnelle

- ✅ Custom hooks : `useUsers()`, `useFavorites()`
- ✅ Optimisations React : `React.memo`, `useCallback`
- ✅ `ErrorBoundary` pour capturer les erreurs globales
- ✅ Page 404 pour les routes/utilisateurs inexistants
- ✅ Notifications toast (`react-hot-toast`)
- ✅ Architecture maintenable et performante

🛠️ Technologies utilisées

- React 18 avec TypeScript
- Vite (build tool)
- React Router v6 (navigation)
- react-hot-toast (notifications)
- react-icons (icônes Material Design)
- CSS3 (animations, thème dark/light)

📦 Installation

```bash
# Cloner le dépôt
git clone https://github.com/Mitikx/ExamFront.git
cd ExamFront

# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build de production
npm run build
```

📁 Structure du projet

```
src/
├── App.tsx
├── main.tsx
├── components/
│   ├── UserList.tsx
│   ├── UserCard.tsx
│   ├── UserDetail.tsx
│   ├── ErrorBoundary.tsx
│   └── NotFound.tsx
├── context/
│   ├── ThemeContext.ts
│   └── AppProvider.tsx
├── hooks/
│   └── useUsers.ts
├── model/
│   └── User.tsx
└── style/
    └── styles.css
```

🎯 Travail effectué

🔧 Architecture

- Séparation des responsabilités : Hooks customs centralisent la logique métier
- Services isolent les appels API
- Contexts gèrent l'état global (thème)
- Components purs et réutilisables

Optimisations :

- `React.memo` sur `UserCard` et `NavBar` (évite re-renders inutiles)
- `useMemo` pour pipeline filtre+tri (recalcul uniquement si dépendances changent)
- `useCallback` pour stabiliser les callbacks passés en props
- `ErrorBoundary` attrape les erreurs React non gérées

🎨 UX/UI

Thème adaptatif :

- Mode clair/sombre avec détection préférence système
- Persistance dans `localStorage`
- Transition douce entre les thèmes

Animations :

- Fade-in sur les cartes utilisateur
- Effet hover avec élévation (translateY + box-shadow)
- Animation pulse sur les favoris
- Skeleton loader fluide pendant chargement

Notifications :

- Toast de succès (ajout/retrait favoris, rechargement)
- Toast d'erreur (échec réseau)

ID unique pour éviter doublons

🔍 Recherche avancée

- La recherche supporte plusieurs mots : "john doe" trouve les utilisateurs avec "john" ET "doe" dans nom/prénom/email
- Insensible à la casse
- Reset automatique à la page 1 après recherche

⭐ Favoris

- Ajout/retrait avec icône étoile
- Persistance `localStorage`
- Favoris triés en premier dans la liste
- Bouton "Effacer tous les favoris" dans la navbar
- Compteur de favoris

🚦 Gestion d'erreurs

- 3 niveaux :
  - `ErrorBoundary` (erreurs React non catchées)
  - `try/catch` dans les hooks (erreurs async)
  - Messages d'erreur avec bouton retry
