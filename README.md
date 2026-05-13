# TravelHub

TravelHub est une application fullstack NestJS / React simulant une plateforme de services passagers : catalogue, recherche, réservation, historique utilisateur et espace administrateur.

## Stack prévue

- Backend : NestJS, Node.js, TypeScript, MongoDB, Mongoose, JWT, Swagger
- Frontend : React, TypeScript, Vite, React Router, Axios
- DevOps : Docker, Docker Compose, Jenkins, GitHub Actions
- Tests : Jest, Supertest

## Lancement infrastructure

```bash
docker compose up -d
```
MongoDB :
```text
localhost:27017
```
Mongo Express :
```text
http://localhost:8081
admin / admin
```

## Lancement backend

```bash
npm install
npm run start:dev
```
Le backend NestJS démarre sur :
```text
http://localhost:3000
```

La documentation Swagger est disponible sur :
```text
http://localhost:3000/api/docs
```

## Variables d'environnement backend
Créer un fichier backend/.env à partir de backend/.env.example :
```text
PORT=3000
MONGO_URI=mongodb://root:root@localhost:27017/travelhub?authSource=admin
JWT_SECRET=travelhub_dev_secret
```

## Structure

```text
backend/
frontend/
docker-compose.yml
README.md
DAILY_LOG.md
```

