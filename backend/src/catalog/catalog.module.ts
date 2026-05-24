import { Module } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CatalogController } from './catalog.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CatalogItem, CatalogItemSchema } from './schemas/catalog-item.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CatalogItem.name,
        schema: CatalogItemSchema,
      }
    ])
  ],
  controllers: [CatalogController],
  providers: [CatalogService],
})
export class CatalogModule {}
