import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CatalogQueryDto } from './dto/catalog-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateCatalogItemDto } from './dto/create-catalog-item.dto';
import { UpdateCatalogItemDto } from './dto/update-catalog-item.dto';

@ApiTags('Catalog')
@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get()
  @ApiOperation({
    summary: 'List available catalog items with optional search and category',
  })
  findAll(@Query() query: CatalogQueryDto) {
    return this.catalogService.findAll(query);
  }

  @Get('categories')
  @ApiOperation({ summary: 'List catalog categories' })
  getCategories() {
    return this.catalogService.getCategories();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get catalog item details' })
  @ApiParam({ name: 'id', description: 'Catalog item MongoDB id' })
  findOne(@Param('id') id: string) {
    return this.catalogService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Create catalog item - temporarily protected by JWT'
  })
  create(@Body() createCatalogItemDto: CreateCatalogItemDto) {
    return this.catalogService.create(createCatalogItemDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update catalog item - temporarily protected by JWT',
  })
  update(
    @Param('id') id: string,
    @Body() updateCatalogItemDto: UpdateCatalogItemDto,
  ) {
    return this.catalogService.update(id, updateCatalogItemDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete catalog item - temporarily protected by JWT',
  })
  remove(@Param('id') id: string) {
    return this.catalogService.remove(id);
  }
}
