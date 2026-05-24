import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from 'mongoose';

export type CatalogItemDocument = HydratedDocument<CatalogItem>;

export enum CatalogCategory  {
    FILM = 'FILM',
    NEWSPAPER = 'NEWSPAPER',
    MEAL = 'MEAL',
    ACTIVITY = 'ACTIVITY',
}

@Schema({
    timestamps: true
})
export class CatalogItem {
    @Prop({ required: true, trim: true })
    title!: string;

    @Prop({ required: true, trim: true })
    description!: string;

    @Prop({
        required: true,
        type: String,
        enum: CatalogCategory
    })
    category!: CatalogCategory;

    @Prop({ required: true, min: 0 })
    price!: number;

    @Prop({ default: true })
    available!: boolean;

    @Prop({ required: false })
    imageUrl?: string;
}

export const CatalogItemSchema = SchemaFactory.createForClass(CatalogItem);