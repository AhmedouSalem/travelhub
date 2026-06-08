# TravelHub

TravelHub est une application fullstack NestJS / React simulant une plateforme de services passagers : catalogue, recherche, réservation, historique utilisateur et espace administrateur.

# Démonstration en ligne
## Frontend React

Interface publique actuellement déployée sur Render :

https://travelhub-frontend.onrender.com/

### Déploiement frontend Render

Le frontend React utilise React Router avec des routes côté client comme `/catalog/:id`.

Pour éviter une erreur lors d'un rafraîchissement direct sur une route dynamique, le service Render Static Site doit définir une règle de rewrite :

```text
Source Path: /*
Destination Path: /index.html
Action: Rewrite
```

## Backend NestJS / Documentation API

Documentation Swagger du backend déployé :

https://travelhub-3til.onrender.com/api/docs

Les services hébergés sur Render peuvent nécessiter quelques secondes de chargement lors du premier accès après une période d'inactivité.

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

## Endpoints principaux

### Auth

```text
POST /auth/register
POST /auth/login
GET  /auth/profile
```

### Catalog

```text
GET    /catalog
GET    /catalog/categories
GET    /catalog/:id
POST   /catalog        ADMIN seulement
PATCH  /catalog/:id    ADMIN seulement
DELETE /catalog/:id    ADMIN seulement
```

### Bookings

```text
POST   /bookings             USER connecté
GET    /bookings/me          USER connecté
PATCH  /bookings/:id/cancel  USER connecté
GET    /bookings             ADMIN seulement
```

## Accès visiteur

Les visiteurs non connectés peuvent consulter le catalogue, voir le détail d'un service, rechercher et filtrer par catégorie.

## Gestion des rôles

- `VISITOR` : utilisateur non connecté, peut consulter le catalogue public.
- `USER` : utilisateur connecté, pourra réserver et consulter son historique.
- `ADMIN` : utilisateur connecté avec droits de gestion du catalogue.

Dans le backend, `VISITOR` n'est pas stocké en base. L'absence de JWT correspond à un visiteur.