import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { User } from "../../users/schemas/user.schema";
import { CatalogItem } from "../../catalog/schemas/catalog-item.schema";

export type BookingDocument = HydratedDocument<Booking>;

export enum BookingStatus {
    CONFIRMED = 'CONFIRMED',
    CANCELED = 'CANCELED',
}

@Schema({
    timestamps: true,
})
export class Booking {
    @Prop({
        type: Types.ObjectId,
        ref: User.name,
        required: true
    })
    userId!: Types.ObjectId;

    @Prop({
        type: Types.ObjectId,
        ref: CatalogItem.name,
        required: true,
    })
    catalogItemId!: Types.ObjectId;

    @Prop({ required: true, min: 1, default: 1 })
    quantity!: number;

    @Prop({ required: true, min: 0 })
    totalPrice!: number;

    @Prop({
        type: String,
        enum: BookingStatus,
        default: BookingStatus.CONFIRMED,
    })
    status!: BookingStatus;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);