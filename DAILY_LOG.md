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

## Jour 9 - Première implémentation statique du catalogue public

### Ce qui fonctionne

* Création des types TypeScript du catalogue avec `CatalogItem` et `CatalogCategory`
* Création d'un jeu de données statique `mockCatalog` aligné avec la structure du backend
* Import des images de la maquette Visily dans `frontend/public/images`
* Adaptation des styles globaux pour préparer l'identité visuelle claire de TravelHub
* Implémentation du composant réutilisable `CatalogCard`
* Affichage statique des services avec `map()` et transmission des données par `props`
* Mise en place d'une grille responsive pour les cartes du catalogue
* Vérification de l'affichage sur téléphone, format intermédiaire, tablette et ordinateur

### Ce qui reste à faire

* Ajouter la navbar publique
* Ajouter la section hero avec la barre de recherche visuelle
* Ajouter les filtres de catégories statiques
* Ajouter le footer public
* Rendre ensuite la recherche et les filtres interactifs avec React
* Connecter enfin le catalogue réel à l'API backend

### Décision technique

* Application de la démarche recommandée par React : construire d'abord une version statique fidèle à la maquette avant d'ajouter les états et les appels API
* Utilisation d'un composant `CatalogCard` réutilisable alimenté par des `props`
* Conservation d'un modèle de données compatible avec l'API NestJS pour faciliter le remplacement ultérieur des données fictives par les réponses backend

## Jour 10 - Finalisation de la page publique statique du catalogue

### Ce qui fonctionne

* Création de la barre de navigation publique avec le logo TravelHub, le lien Catalog et les accès Login / Register
* Création de la section hero avec le message principal de la plateforme et la barre de recherche visuelle
* Création des filtres de catégories affichés sous forme de boutons : All, Meals, Films, Newspapers et Activities
* Création du footer public
* Assemblage complet de la page `CatalogPage` à partir de composants React réutilisables
* Intégration cohérente de la navbar, du hero, des filtres, de la grille de cartes et du footer
* Adaptation responsive de la page publique complète
* Vérification visuelle de l'affichage sur téléphone, format intermédiaire, tablette et ordinateur

### Ce qui reste à faire

* Rendre la barre de recherche interactive avec React
* Rendre les filtres de catégories interactifs
* Afficher un état vide lorsqu'aucun service ne correspond à la recherche ou au filtre
* Implémenter la page statique de détail d'un service
* Remplacer ensuite les données fictives par les données réelles de l'API backend
* Connecter plus tard l'authentification et le parcours de réservation utilisateur

### Décision technique

* Conservation d'une version statique fondée sur `mockCatalog` afin de stabiliser l'interface avant de gérer les interactions et les appels API
* Découpage de la page en composants réutilisables : `PublicNavbar`, `HeroSection`, `CategoryFilters`, `CatalogCard` et `PublicFooter`
* Séparation entre la composition visuelle de la page et les futures logiques d'état React pour faciliter l'apprentissage et la maintenance

## Jour 11 - Interactions de recherche et filtres du catalogue public

### Ce qui fonctionne

* Ajout d'un état React pour contrôler la recherche du catalogue
* Transformation de la barre de recherche du hero en champ contrôlé
* Ajout d'un état React pour gérer la catégorie active
* Rendu interactif des filtres : All, Meals, Films, Newspapers et Activities
* Filtrage combiné par catégorie et par texte saisi
* Recherche dans le titre et la description des services
* Affichage du nombre de services trouvés
* Ajout d'un état vide lorsqu'aucun service ne correspond aux critères
* Ajout d'un bouton pour réinitialiser la recherche et les filtres

### Ce qui reste à faire

* Implémenter la page statique de détail d'un service
* Rendre le bouton Details fonctionnel avec React Router
* Remplacer ensuite les données fictives par les données réelles de l'API backend
* Connecter plus tard l'authentification et le parcours de réservation utilisateur

### Décision technique

* Conservation temporaire de `mockCatalog` pour travailler d'abord les interactions frontend
* Centralisation de l'état de recherche et de catégorie dans `CatalogPage`
* Utilisation de `useMemo` pour calculer la liste filtrée à partir de l'état React