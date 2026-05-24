const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error('MONGO_URI is missing in backend/.env');
    process.exit(1);
}

const userSchema = new mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        email: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: String,
        role: {
            type: String,
            enum: ['USER', 'ADMIN'],
            default: 'USER',
        },
    },
    { timestamps: true },
);

const catalogItemSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        category: {
            type: String,
            enum: ['FILM', 'NEWSPAPER', 'MEAL', 'ACTIVITY'],
        },
        price: Number,
        available: Boolean,
        imageUrl: String,
    },
    { timestamps: true },
);

const User = mongoose.model('User', userSchema);
const CatalogItem = mongoose.model('CatalogItem', catalogItemSchema);

async function upsertUser({ firstName, lastName, email, password, role }) {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        existingUser.role = role;
        await existingUser.save();
        console.log(`User already exists, role updated: ${email} (${role})`);
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
    });

    console.log(`User created: ${email} (${role})`);
}

async function upsertCatalogItem(item) {
    const existingItem = await CatalogItem.findOne({ title: item.title });

    if (existingItem) {
        console.log(`Catalog item already exists: ${item.title}`);
        return;
    }

    await CatalogItem.create(item);
    console.log(`Catalog item created: ${item.title}`);
}

async function seed() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        await upsertUser({
            firstName: 'Admin',
            lastName: 'TravelHub',
            email: 'admin@travelhub.local',
            password: 'Admin123',
            role: 'ADMIN',
        });

        await upsertUser({
            firstName: 'User',
            lastName: 'TravelHub',
            email: 'user@travelhub.local',
            password: 'User123',
            role: 'USER',
        });

        await upsertCatalogItem({
            title: 'Menu méditerranéen',
            description: 'Repas complet proposé aux passagers pendant le trajet.',
            category: 'MEAL',
            price: 12.5,
            available: true,
            imageUrl: 'https://example.com/images/menu-mediterraneen.jpg',
        });

        await upsertCatalogItem({
            title: 'Film documentaire - Destination Japon',
            description: 'Documentaire de voyage disponible dans le catalogue passager.',
            category: 'FILM',
            price: 4.99,
            available: true,
            imageUrl: 'https://example.com/images/japon.jpg',
        });

        await upsertCatalogItem({
            title: 'Journal international',
            description: 'Accès numérique à une sélection de journaux internationaux.',
            category: 'NEWSPAPER',
            price: 2.5,
            available: true,
            imageUrl: 'https://example.com/images/newspaper.jpg',
        });

        await upsertCatalogItem({
            title: 'Atelier découverte culturelle',
            description: 'Activité interactive proposée aux passagers pendant le trajet.',
            category: 'ACTIVITY',
            price: 8,
            available: true,
            imageUrl: 'https://example.com/images/activity.jpg',
        });

        console.log('Seed completed successfully');
    } catch (error) {
        console.error('Seed failed:', error);
        process.exit(1);
    } finally {
        await mongoose.disconnect();
    }
}

seed();