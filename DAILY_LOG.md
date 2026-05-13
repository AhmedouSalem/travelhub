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