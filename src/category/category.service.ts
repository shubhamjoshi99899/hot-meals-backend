import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    // Optional: Check if branch exists before creating
    const branch = await this.prisma.branch.findUnique({
      where: { id: createCategoryDto.branchId },
    });
    if (!branch) {
      throw new NotFoundException(`Branch with ID "${createCategoryDto.branchId}" not found`);
    }
    return this.prisma.category.create({ data: createCategoryDto });
  }

  async findAll() {
    return this.prisma.category.findMany();
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(`Category with ID "${id}" not found`);
    }
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    await this.findOne(id); // Ensure category exists
    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id); // Ensure category exists
    return this.prisma.category.delete({
      where: { id },
    });
  }
}