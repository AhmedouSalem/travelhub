import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from './schemas/booking.schema';
import { CatalogItem, CatalogItemSchema } from '../catalog/schemas/catalog-item.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Booking.name,
        schema: BookingSchema,
      },
      {
        name: CatalogItem.name,
        schema: CatalogItemSchema,
      },
    ])
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
