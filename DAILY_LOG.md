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

## Jour 12 - Page détail statique d'un service

### Ce qui fonctionne

* Création de la page détail statique d'un service du catalogue
* Ajout de la route dynamique `/catalog/:id`
* Récupération temporaire du service depuis `mockCatalog` à partir de l'identifiant présent dans l'URL
* Transformation du bouton `View details` des cartes catalogue en lien vers la page détail
* Ajout d'un fil d'Ariane pour revenir visuellement au catalogue et à la catégorie du service
* Affichage des informations principales du service : catégorie, titre, image, description, prix et disponibilité
* Ajout d'un panneau de réservation statique côté visiteur avec le bouton `Login to book`
* Ajout d'une section `What's included`
* Ajout d'une section d'informations complémentaires selon le service
* Ajout d'une section `Recommended for you` avec des services statiques issus du catalogue fictif
* Ajout d'un état `Service not found` lorsqu'un identifiant inconnu est utilisé dans l'URL
* Vérification visuelle de la page détail sur desktop et mobile

### Ce qui reste à faire

* Connecter la page détail à l'API backend avec `GET /catalog/:id`
* Adapter le panneau de réservation selon l'état d'authentification de l'utilisateur
* Ajouter le sélecteur de quantité pour les utilisateurs connectés
* Connecter le bouton `Book now` au backend
* Implémenter ensuite la page `My bookings`
* Connecter plus tard les recommandations à une vraie logique applicative

### Décision technique

* Conservation de `mockCatalog` pour finaliser d'abord la structure statique de la page détail
* Découpage de la page en composants réutilisables afin de respecter l'approche React
* Non-implémentation du bloc `DEMO MODE / Visitor / User`, car il s'agissait d'une annotation Visily et non d'une fonctionnalité réelle
* Conservation temporaire des recommandations en statique, la vraie recommandation étant prévue pour une version ultérieure

## Jour 13 - Connexion du catalogue public à l'API backend

### Ce qui fonctionne

* Création d'une API frontend dédiée au catalogue pour centraliser les appels HTTP
* Connexion de la page catalogue publique à l'endpoint backend `GET /catalog`
* Connexion de la page détail à l'endpoint backend `GET /catalog/:id`
* Mapping des données backend MongoDB vers le modèle frontend React
* Transformation de `_id` en `id` afin de conserver une structure propre côté frontend
* Conservation des types métier du catalogue dans `src/types/catalog.ts`
* Envoi des filtres de catégorie vers le backend
* Envoi de la recherche texte vers le backend
* Ajout d'un état de chargement pendant la récupération du catalogue
* Ajout d'un état d'erreur si le catalogue ne peut pas être chargé
* Conservation de l'état vide lorsqu'aucun service ne correspond aux critères
* Ajout d'un fallback local pour les images lorsque l'API renvoie une URL d'exemple
* Affichage des détails réels d'un service à partir de son identifiant MongoDB
* Conservation temporaire des recommandations simples à partir des autres services du catalogue
* Vérification visuelle du catalogue, des filtres, de la recherche et de la page détail

### Ce qui reste à faire

* Implémenter statiquement la page Login selon la maquette Visily
* Implémenter statiquement la page Register selon la maquette Visily
* Implémenter statiquement la page My Bookings pour l'utilisateur connecté
* Connecter ensuite les formulaires Login et Register au backend
* Connecter le parcours de réservation utilisateur depuis la page détail
* Connecter la page My Bookings à l'API backend
* Implémenter plus tard les pages administrateur : Dashboard, Manage Catalog et Admin Bookings

### Décision technique

* Passage progressif de `mockCatalog` vers l'API réelle sans casser l'interface existante
* Conservation d'un modèle frontend propre avec `id`, même si le backend MongoDB renvoie `_id`
* Utilisation du backend pour la recherche et le filtrage afin de se rapprocher du comportement réel de l'application
* Conservation des recommandations en logique simple et temporaire, la vraie recommandation étant prévue pour une version ultérieure
* Priorité donnée aux pages utilisateur publiques et connectées avant les écrans administrateur