import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
    CatalogItem,
    CatalogItemDocument,
} from '../catalog/schemas/catalog-item.schema';
import { CreateBookingDto } from './dto/create-booking.dto';
import {
    Booking,
    BookingDocument,
    BookingStatus,
} from './schemas/booking.schema';
import { AuthenticatedUser } from '../auth/strategies/jwt.strategy';

@Injectable()
export class BookingsService {
    constructor(
        @InjectModel(Booking.name)
        private readonly bookingModel: Model<BookingDocument>,

        @InjectModel(CatalogItem.name)
        private readonly catalogItemModel: Model<CatalogItemDocument>,
    ) { }

    async create(user: AuthenticatedUser, createBookingDto: CreateBookingDto) {
        const quantity = createBookingDto.quantity ?? 1;

        if (!Types.ObjectId.isValid(createBookingDto.catalogItemId)) {
            throw new BadRequestException('Invalid catalog item id');
        }

        const catalogItem = await this.catalogItemModel
            .findOne({
                _id: createBookingDto.catalogItemId,
                available: true,
            })
            .exec();

        if (!catalogItem) {
            throw new NotFoundException('Catalog item not found or unavailable');
        }

        const booking = await this.bookingModel.create({
            userId: user.id,
            catalogItemId: catalogItem._id,
            quantity,
            totalPrice: catalogItem.price * quantity,
            status: BookingStatus.CONFIRMED,
        });

        return booking.populate('catalogItemId');
    }

    async findMyBookings(user: AuthenticatedUser) {
        return this.bookingModel
            .find({ userId: user.id })
            .populate('catalogItemId')
            .sort({ createdAt: -1 })
            .exec();
    }

    async cancel(user: AuthenticatedUser, id: string) {
        if (!Types.ObjectId.isValid(id)) {
            throw new NotFoundException('Booking not found');
        }

        const booking = await this.bookingModel
            .findOne({
                _id: id,
                userId: user.id,
            })
            .exec();

        if (!booking) {
            throw new NotFoundException('Booking not found');
        }

        if (booking.status === BookingStatus.CANCELED) {
            return booking.populate('catalogItemId');
        }

        booking.status = BookingStatus.CANCELED;
        await booking.save();

        return booking.populate('catalogItemId');
    }
}