# 🛍️ E-Commerce Platform

Une plateforme e-commerce moderne et performante construite avec Next.js, TypeScript, et MongoDB.

## ✨ Fonctionnalités

- 🛒 Catalogue de produits dynamique
- 🔍 Recherche et filtrage de produits
- 👤 Authentification des utilisateurs
- 🛍️ Panier d'achat
- 💳 Processus de paiement sécurisé
- 📱 Interface responsive
- 🌐 API RESTful

## 🚀 Technologies Utilisées

- **Frontend:**
  - Next.js 14
  - TypeScript
  - Tailwind CSS
  - React Query
  - Zustand (State Management)

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - JWT Authentication

## 📋 Prérequis

- Node.js (v18 ou supérieur)
- MongoDB
- npm ou yarn

## 🛠️ Installation

1. **Cloner le repository**
   ```bash
   git clone [URL_DU_REPO]
   cd [NOM_DU_PROJET]
   ```

2. **Installer les dépendances**
   ```bash
   # Installer les dépendances du frontend
   npm install

   # Installer les dépendances du backend
   cd backend
   npm install
   ```

3. **Configuration de l'environnement**
   Créez un fichier `.env` à la racine du projet avec les variables suivantes :
   ```env
   MONGODB_URI=votre_uri_mongodb
   JWT_SECRET=votre_secret_jwt
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

## 🏃‍♂️ Démarrage

1. **Démarrer le backend**
   ```bash
   cd backend
   npm run dev
   ```

2. **Démarrer le frontend**
   ```bash
   # Dans un nouveau terminal, à la racine du projet
   npm run dev
   ```

3. **Accéder à l'application**
   Ouvrez votre navigateur et accédez à `http://localhost:3000`

## 📁 Structure du Projet

```
├── src/
│   ├── app/              # Pages et routes Next.js
│   ├── components/       # Composants React réutilisables
│   ├── lib/             # Utilitaires et configurations
│   └── types/           # Types TypeScript
├── backend/
│   ├── controllers/     # Contrôleurs API
│   ├── models/         # Modèles MongoDB
│   ├── routes/         # Routes API
│   └── middleware/     # Middleware Express
└── public/             # Assets statiques
```

## 🔧 Configuration

### MongoDB
- Assurez-vous d'avoir MongoDB installé et en cours d'exécution
- Créez une base de données pour le projet
- Configurez l'URI de connexion dans le fichier `.env`

### API
- Le backend s'exécute sur le port 5000 par défaut
- Les endpoints API sont préfixés avec `/api`

## 🧪 Tests

```bash
# Exécuter les tests frontend
npm test

# Exécuter les tests backend
cd backend
npm test
```

## 📝 Documentation API

La documentation complète de l'API est disponible à `/api-docs` lorsque le serveur backend est en cours d'exécution.

## 🤝 Contribution

1. Fork le projet
2. Créez votre branche de fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👥 Auteurs

- Votre Nom - Développeur Principal

## 🙏 Remerciements

- Next.js Team
- MongoDB Team
- Tous les contributeurs

---

⭐ N'hésitez pas à donner une étoile au projet si vous l'appréciez !
