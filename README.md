# 📋 Projects Manager

> Application de gestion de projets et de tâches collaboratives

Une application web moderne développée avec React pour la gestion simplifiée de projets et la collaboration en équipe.

![Projects Manager](https://img.shields.io/badge/Status-En%20développement-yellow)
![React](https://img.shields.io/badge/React-19.1-blue)
![Vite](https://img.shields.io/badge/Vite-7.1-green)
![License](https://img.shields.io/badge/License-Copyright-red)

## ✨ Fonctionnalités

### 🚀 Gestion de projets
- **Création de projets** - Interface intuitive pour créer et organiser vos projets
- **Détails projet** - Page dédiée pour chaque projet avec ses tâches

### ✅ Gestion des tâches
- **Création de tâches** - Ajout rapide de tâches avec assignation
- **Statuts dynamiques** - TODO, EN COURS, TERMINÉ
- **Assignation** - Attribution des tâches aux membres de l'équipe
- **Suivi en temps réel** - Mise à jour instantanée des statuts

### 👥 Collaboration
- **Multi-utilisateurs** - Système d'authentification sécurisé
- **Partage de projets** - Collaboration sur les projets communs
- **Assignation de tâches** - Délégation et suivi des responsabilités

### 🎨 Interface moderne
- **Design responsive** - Adapté mobile, tablette et desktop
- **Bootstrap 5** - Interface moderne et professionnelle
- **UX optimisée** - Navigation intuitive et interactions fluides

## 🛠️ Technologies utilisées

### Frontend
- **React 19.1** - Framework JavaScript moderne
- **React Router DOM** - Navigation côté client
- **Bootstrap 5** - Framework CSS responsive
- **Vite** - Build tool ultra-rapide

### Backend & Base de données
- **API REST** - Architecture moderne
- **Base de données relationnelle** - Stockage sécurisé
- **Authentification JWT** - Gestion des sessions sécurisée

### Outils de développement
- **ESLint** - Qualité du code
- **Git** - Contrôle de version
- **GitHub** - Hébergement du code

## 🚀 Installation et démarrage

### Prérequis
- Node.js (version 18 ou supérieure)
- npm ou yarn
- Git

### Installation

```bash
# Cloner le dépôt
git clone https://github.com/LaiPe/projects-manager.git

# Aller dans le répertoire
cd projects-manager

# Installer les dépendances
npm install

# Démarrer en mode développement
npm run dev
```

### Scripts disponibles

```bash
# Développement avec hot reload
npm run dev

# Build de production
npm run build

# Prévisualisation du build
npm run preview

# Linting du code
npm run lint
```

## 📱 Aperçu

### Page d'accueil
- Présentation claire du service
- Call-to-action pour l'inscription
- Design moderne et attrayant

### Dashboard projets
- Vue en grille de tous vos projets
- Création rapide de nouveaux projets
- Actions directes (modifier, supprimer, consulter)

### Gestion des tâches
- Interface horizontale optimisée
- Changement de statut en un clic
- Édition en ligne des tâches

## 🏗️ Architecture

```
src/
├── components/          # Composants réutilisables
├── contexts/           # Contextes React (Auth, Liste)
├── hooks/              # Hooks personnalisés
├── layouts/            # Layouts (Header, Footer)
├── pages/              # Pages de l'application
├── services/           # Services API
└── utils/              # Utilitaires
```

## 🔒 Sécurité

- **Authentification sécurisée** - JWT avec cookies httpOnly
- **Validation côté client** - Validation en temps réel des formulaires
- **Protection HTTPS** - Chiffrement des communications
- **Hachage des mots de passe** - Stockage sécurisé des credentials

## 👨‍💻 Auteur

**Léo Peyronnet**
- Portfolio : [portfolio.leopeyronnet.fr](https://portfolio.leopeyronnet.fr/)
- Email : peyronnet.leo@gmail.com
- GitHub : [@LaiPe](https://github.com/LaiPe)

## ⚖️ Licence

Copyright (c) 2025 Léo Peyronnet. Tous droits réservés.

Ce projet est protégé par copyright. Le code source est visible à des fins de démonstration et de portfolio uniquement. Toute utilisation, reproduction ou distribution nécessite une autorisation écrite préalable.

Voir le fichier [LICENSE](./LICENSE) pour plus de détails.

## 🤝 Contact

Pour toute question, suggestion ou demande d'autorisation :
- **Email** : peyronnet.leo@gmail.com
- **Objet** : "Projects Manager - [Votre demande]"

---

<div align="center">
  <sub>Développé avec ❤️ par <a href="https://portfolio.leopeyronnet.fr/">Léo Peyronnet</a></sub>
</div>
