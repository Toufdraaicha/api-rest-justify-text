# Projet Justification de Texte

Ce projet est une application Node.js qui fournit une API pour justifier du texte. Il inclut également un script pour cloner le projet avec la création d'un fichier .env pour une configuration facile. Docker Compose est utilisé pour l'exécution et la construction de l'application.

## Installation

1. Clonez ce dépôt :

    ```bash
    git clone https://github.com/Toufdraaicha/api-rest-justify-text.git
    ```

2. Accédez au répertoire du projet :

    ```bash
    cd api-rest-justify-text
    ```

3. Créez un fichier `.env` à partir de fichier `.env.dist`.

## Utilisation de Docker Compose

4. Construisez l'image Docker :

    ```bash
    docker-compose build
    ```

5. Démarrez l'application :

    ```bash
    docker-compose up
    ```

    L'application sera disponible à l'adresse : `http://localhost:3000`.

6. Pour arrêter l'application, utilisez `Ctrl + C`, puis exécutez :

    ```bash
    docker-compose down
    ```

## Utilisation de l'API de Justification

Le serveur sera disponible à l'adresse : `http://localhost:3000` (ou le port que vous avez spécifié dans le fichier `.env`).

1. Pour récuperer le token, envoyez une requête POST à l'URL `api/token` avec l'email dans le corps de la requête au format JSON :

    ```bash
    curl -X POST http://localhost:3000/api/justify -H "Content-Type: application/json" -d '{"email": "toto@tata.com"}'
    ```

2. Pour justifier un texte, envoyez une requête POST à l'URL `api/justify` avec le texte à justifier dans le corps de la requête au format Text :

    ```bash
    curl -X POST http://localhost:3000/api/justify -H "Content-Type: text/plain" -H "Authorization:  votre_token" -d "Votre texte à justifier ici."
    ```

## Utilisation du publique URL:

```bash
curl -X POST http://api-rest-justify-text-ac173026aa11.herokuapp.com/api/token -H "Content-Type: application/json" -d '{"email": "toto@tata.com"}'