# Groupomania - Réseau social d'entreprise
Vous êtes développeur depuis plus d'un an chez CONNECT-E, une petite agence web
regroupant une douzaine d'employés.
Votre directrice, Stéphanie, vient de signer un nouveau contrat avec Groupomania, un groupe spécialisé dans la grande distribution, et l'un des plus fidèles clients de l'agence.
Le projet consiste à construire un réseau social interne pour les employés de Groupomania. Le but de cet outil est de faciliter les interactions entre collègues.

## Table des matières
- Fonctionnalités
- Installation
- Configuration
- Utilisation
- Contribuer
- Licence

## Fonctionnalités
- Interface de connexion et de création de compte
- Page d'accueil permettant de publier des posts et d'accéder au fil d'actualité
- Possibilité de commenter et liker un post
- Possibilité de modifier ou supprimer son post
- Possibilité de modifier ses informations de compte
- Possibilité de supprimer son compte

## Installer le Backend
1. Dans le terminal du backend, installer les dépendances
     ```
     npm install
     ```
2. Configurer les variables d'environnement
    Modifier le fichier .env avec vos informations
3. Créer la base de données avec MongoDB
4. Lancer le serveur avec :
    ```
    nodemon server
    ```
5. Se connecter avec le compte Admin
    Identifiant `administrateur@gmail.com` 
    Mot de passe `Admin@1234`

## Installer le Frontend
1. Dans le terminal du frontend, installer les dépendances
     ```
     npm install
     ```
2. Configurer les variables d'environnement
    Modifier le fichier .env avec vos informations
4. Lancer le serveur avec :
    ```
    npm start
    ```