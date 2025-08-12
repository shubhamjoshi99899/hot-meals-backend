// src/menu/menu.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  // Create a category under a branch
  async createCategory(name: string, branchId: string) {
    return this.prisma.category.create({
      data: { name, branchId },
    });
  }

  async getCategoriesByBranch(branchId: string) {
    return this.prisma.category.findMany({
      where: { branchId },
      include: { menuItems: true },
    });
  }

  // Create a menu item
  async addMenuItem(data: {
    name: string;
    description?: string;
    imageUrls: string[];
    isVeg: boolean;
    isAvailable?: boolean;
    priceOptions: any;
    categoryId: string;
    branchId: string;
  }) {
    return this.prisma.menuItem.create({
      data: {
        name: data.name,
        description: data.description,
        imageUrl: data.imageUrls,
        isVeg: data.isVeg,
        isAvailable: data.isAvailable ?? true,
        priceOptions: data.priceOptions,
        categoryId: data.categoryId,
        branchId: data.branchId,
      },
    });
  }

  async toggleAvailability(itemId: string, isAvailable: boolean) {
    return this.prisma.menuItem.update({
      where: { id: itemId },
      data: { isAvailable },
    });
  }

  async getMenuByBranch(branchId: string) {
    return this.prisma.menuItem.findMany({
      where: { branchId },
      include: { category: true },
    });
  }

  async getItemsByCategory(categoryId: string) {
    return this.prisma.menuItem.findMany({
      where: { categoryId, isAvailable: true },
      orderBy: { name: 'asc' },
    });
  }
}
