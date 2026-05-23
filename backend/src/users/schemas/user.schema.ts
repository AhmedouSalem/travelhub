/** 
 *  @Schema transforme une classe TypeScript en schéma Mongoose
 *  @Prop déclare une propriété/champ dans MongoDB.
 *  SchemaFactory génère le vrai schéma Mongoose à partir de la classe
 */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

/** 
 * mongoose est un ODM(Object Document Mapper : Il permet de manipuler les documents MongoDB comme des objets TypeScript/JavaScript.) pour MongoDB
 */
import { HydratedDocument } from "mongoose";

/**
 *  un type TypeScript appelé UserDocument qui représente un document MongoDB complet avec ses champs et methods
 *  C'est un doc MongoDB basé sur la class User
 */
export type UserDocument = HydratedDocument<User>;

export enum UserRole {
    USER = 'USER',
    ADMIN = 'ADMIN',
}

@Schema({
    timestamps: true,
})

export class User {
    @Prop({ required: true, trim: true })
    firstName!: string;

    @Prop({ required: true, trim: true })
    lastName!: string;

    @Prop({ required: true, unique: true, lowercase: true, trim: true })
    email!: string;

    @Prop({ required: true })
    password!: string;

    @Prop({
        type: String,
        enum: UserRole,
        default: UserRole.USER
    })
    role!: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);