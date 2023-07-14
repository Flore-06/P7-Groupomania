# Groupomania - Réseau social d'entreprise
Vous êtes développeur depuis plus d'un an chez CONNECT-E, une petite agence web
regroupant une douzaine d'employés.
Votre directrice, Stéphanie, vient de signer un nouveau contrat avec Groupomania, un groupe spécialisé dans la grande distribution, et l'un des plus fidèles clients de l'agence.
Le projet consiste à construire un réseau social interne pour les employés de Groupomania. Le but de cet outil est de faciliter les interactions entre collègues.

## Table des matières
- Fonctionnalités
- Installation

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
    Créer le fichier .env à la racine avec vos informations :
    SECRET_DB (lien de connexion à MongoDB)
    PORT (ex : 3500)
3. Créer la base de données avec MongoDB
4. Lancer le serveur avec :
    ```
    nodemon server
    ```

## Installer le Frontend
1. Dans le terminal du frontend, installer les dépendances
     ```
     npm install
     ```
2. Lancer le serveur avec :
    ```
    npm start
    ```

3. Pour le compte administrateur, modifier dans la base de données dans le modèle utilisateur user : admin à 1