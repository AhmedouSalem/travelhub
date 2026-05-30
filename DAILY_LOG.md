# Daily Log - TravelHub

## Jour 1 - Initialisation du socle

### Ce qui fonctionne
- Repo GitHub créé et cloné
- Docker Compose ajouté
- MongoDB ajouté
- Mongo Express ajouté
- Backend NestJS initialisé
- Frontend React/Vite initialisé

### Ce qui reste à faire
- Ajouter Auth JWT
- Préparer les pipelines Jenkins
- Ajouter GitHub Actions

### Décision technique
- Monorepo avec deux sous-projets : backend et frontend
- Base de données MongoDB avec Mongoose
- Jenkinsfile séparé pour chaque partie

## Jour 2 - Connexion backend à MongoDB et Swagger

### Ce qui fonctionne
- Configuration de `@nestjs/config`
- Connexion NestJS à MongoDB avec Mongoose
- Ajout du fichier `.env.example`
- Configuration globale de la validation avec `ValidationPipe`
- Activation de CORS pour le frontend local
- Ajout de Swagger sur `/api/docs`

### Ce qui reste à faire
- Créer le module Auth
- Créer le modèle User avec Mongoose
- Ajouter register / login
- Générer et vérifier les JWT
- Ajouter les rôles USER / ADMIN

### Décision technique
- Utilisation de MongoDB avec Mongoose pour accélérer le développement
- Utilisation de Swagger dès le début pour tester et documenter l’API

## Jour 3 - Authentification utilisateur

### Ce qui fonctionne
- Création du module Users
- Création du schéma User avec Mongoose
- Création du module Auth
- Ajout de l'inscription utilisateur
- Hash du mot de passe avec bcryptjs
- Ajout de la connexion utilisateur
- Génération d'un JWT après register/login
- Test des endpoints Auth avec Swagger

### Ce qui reste à faire
- Ajouter une route `/auth/profile`
- Ajouter un guard JWT
- Ajouter les rôles USER / ADMIN sur les futures routes
- Créer le module catalogue de services

### Décision technique
- Mot de passe jamais retourné dans les réponses API
- JWT contenant `sub`, `email` et `role`

## Jour 4 - Protection JWT des routes

### Ce qui fonctionne
- Ajout de Passport JWT
- Création de `JwtStrategy`
- Création de `JwtAuthGuard`
- Création du décorateur `@CurrentUser`
- Ajout de la route protégée `/auth/profile`
- Test du token JWT dans Swagger avec le bouton Authorize

### Ce qui reste à faire
- Ajouter un système de rôles USER / ADMIN
- Créer le module catalogue de services
- Protéger les futures routes admin
- Ajouter les premiers tests API

### Décision technique
- Les routes publiques restent `register` et `login`
- Les futures routes sensibles utiliseront `JwtAuthGuard`
- Le payload JWT contient `sub`, `email` et `role`

## Jour 5 - Catalogue public TravelHub

### Ce qui fonctionne
- Création du module `Catalog`
- Création du schéma MongoDB `CatalogItem`
- Ajout des catégories `FILM`, `NEWSPAPER`, `MEAL`, `ACTIVITY`
- Ajout de la liste publique des services disponibles
- Ajout du détail public d'un service
- Ajout de la recherche par titre ou description
- Ajout du filtre par catégorie
- Ajout des routes de création, modification et suppression protégées temporairement par JWT

### Ce qui reste à faire
- Ajouter un système de rôles avec `RolesGuard`
- Restreindre la création, modification et suppression aux administrateurs
- Ajouter le panier ou les réservations utilisateur
- Ajouter les tests API

### Décision technique
- Le rôle `VISITOR` correspond à un utilisateur non connecté
- Les routes publiques du catalogue ne nécessitent pas de JWT
- Les routes d'administration seront sécurisées avec le rôle `ADMIN`

## Jour 6 - Sécurisation des routes admin

### Ce qui fonctionne
- Création du décorateur `@Roles`
- Création du `RolesGuard`
- Protection des routes `POST /catalog`, `PATCH /catalog/:id` et `DELETE /catalog/:id`
- Accès public conservé pour la consultation du catalogue
- Distinction claire entre visiteur, utilisateur connecté et administrateur

### Ce qui reste à faire
- Ajouter une route ou un seed pour créer un administrateur plus proprement
- Ajouter le panier ou les réservations utilisateur
- Ajouter les premiers tests API
- Préparer les pipelines CI

### Décision technique
- `VISITOR` n'est pas stocké en base : c'est l'état d'un utilisateur non connecté
- `USER` et `ADMIN` sont stockés en base dans le document utilisateur
- Les routes d'administration nécessitent à la fois un JWT valide et le rôle `ADMIN`

## Jour 7 - Réservations utilisateur

### Ce qui fonctionne
- Création du module `Bookings`
- Création du schéma MongoDB `Booking`
- Ajout de la réservation d'un service du catalogue
- Calcul automatique du prix total selon la quantité
- Ajout de l'historique utilisateur avec `GET /bookings/me`
- Ajout de l'annulation d'une réservation
- Protection des routes de réservation avec JWT
- Ajout d'une route admin `GET /bookings` pour consulter toutes les réservations
- Protection de cette route avec `JwtAuthGuard`, `RolesGuard` et le rôle `ADMIN`

### Ce qui reste à faire
- Préparer le frontend React
- Ajouter des tests API sur Auth, Catalog et Bookings
- Préparer les pipelines Jenkins et GitHub Actions

### Décision technique
- Une réservation appartient toujours à l'utilisateur connecté
- Un utilisateur ne peut voir et annuler que ses propres réservations
- Les services indisponibles ne peuvent pas être réservés

## Jour 8 - Socle frontend React et authentification

### Ce qui fonctionne

* Installation de `react-router-dom` et `axios` dans le frontend React
* Mise en place de la variable d'environnement `VITE_API_BASE_URL` pour communiquer avec le backend déployé
* Création du client Axios centralisé avec ajout automatique du token JWT dans les requêtes protégées
* Définition des types TypeScript liés à l'authentification : `AuthUser`, `LoginPayload`, `RegisterPayload` et `LoginResponse`
* Création de `authApi` pour les appels `register`, `login` et `profile`
* Mise en place de `AuthContext` pour conserver l'utilisateur connecté et le token JWT
* Création du hook `useAuth`
* Mise en place des routes publiques, utilisateur et administrateur avec React Router
* Protection des routes `/my-bookings` et `/admin/*` selon l'état d'authentification et le rôle utilisateur
* Création des premières pages temporaires afin de valider la navigation

### Ce qui reste à faire

* Implémenter le design public issu de la maquette Visily
* Afficher le catalogue réel depuis l'API avec `GET /catalog`
* Afficher le détail d'un service avec `GET /catalog/:id`
* Connecter les formulaires Login et Register au backend
* Implémenter le parcours de réservation utilisateur
* Développer ensuite les écrans administrateur

### Décision technique

* Utilisation d'une architecture frontend organisée par fonctionnalités : `auth`, `catalog`, `bookings` et `admin`
* Centralisation des appels HTTP avec Axios afin de gérer automatiquement l'envoi du JWT
* Stockage du token dans `localStorage` pour restaurer la session utilisateur au rechargement
* Développement progressif du frontend : socle technique, parcours public, authentification, réservations, puis administration
