import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CatalogCategory, CatalogItem, CatalogItemDocument } from './schemas/catalog-item.schema';
import { QueryFilter, Model, Types } from 'mongoose';
import { CatalogQueryDto } from './dto/catalog-query.dto';
import { CreateCatalogItemDto } from './dto/create-catalog-item.dto';
import { UpdateCatalogItemDto } from './dto/update-catalog-item.dto';

@Injectable()
export class CatalogService {
  constructor(
    @InjectModel(CatalogItem.name)
    private readonly catalogItemModel: Model<CatalogItemDocument>,
  ) {
    
  }

  async findAll(query: CatalogQueryDto): Promise<CatalogItemDocument[]> {
    // un objet de filtre MongoDB
    const filters: QueryFilter<CatalogItemDocument> = {
      available: true,// Par défaut, tu filtres uniquement les éléments disponibles
    };

    if (query.category) {
      filters.category = query.category;
    }

    if (query.search) {
      const escapedSearch = query.search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

      filters.$or = [
        { title: { $regex: escapedSearch, $options: 'i' } },
        { description: { $regex: escapedSearch, $options: 'i' } }
      ];
    }

    return this.catalogItemModel.find(filters).sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<CatalogItemDocument> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Catalog item not found');
    }

    const item = await this.catalogItemModel.findById(id).exec();

    if (!item || !item.available) {
      throw new NotFoundException('Catalog item not found');
    }

    return item;
  }

  getCategories(): CatalogCategory[] {
    return Object.values(CatalogCategory);
  }

  async create(
    createCatalogItemDto: CreateCatalogItemDto,
  ): Promise<CatalogItemDocument> {
    return this.catalogItemModel.create(createCatalogItemDto);
  }

  async update(
    id: string,
    updateCatalogItemDto: UpdateCatalogItemDto,
  ): Promise<CatalogItemDocument> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Catalog item not found');
    }

    const updatedItem = await this.catalogItemModel
      .findByIdAndUpdate(id, updateCatalogItemDto, { new: true })
      .exec();

    if (!updatedItem) {
      throw new NotFoundException('Catalog item not found');
    }

    return updatedItem;
  }

  async remove(id: string): Promise<{ message: string }> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Catalog item not found');
    }

    const deletedItem = await this.catalogItemModel.findByIdAndDelete(id).exec();

    if (!deletedItem) {
      throw new NotFoundException('Catalog item not found');
    }

    return {
      message: 'Catalog item deleted successfully',
    };
  }
}
