// src/menu/menu.controller.ts
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post('category')
  createCategory(@Body() body: { name: string; branchId: string }) {
    return this.menuService.createCategory(body.name, body.branchId);
  }

  @Get('category/:branchId')
  getCategories(@Param('branchId') branchId: string) {
    return this.menuService.getCategoriesByBranch(branchId);
  }

  // File upload + body data
  @Post('item')
  createMenuItem(@Body() body: any) {
    return this.menuService.addMenuItem(body);
  }

  @Patch('item/:id/availability')
  toggleAvailability(
    @Param('id') id: string,
    @Body() body: { isAvailable: boolean },
  ) {
    return this.menuService.toggleAvailability(id, body.isAvailable);
  }

  @Get('items/:branchId')
  getAvailableItems(@Param('branchId') branchId: string) {
    return this.menuService.getMenuByBranch(branchId);
  }

  @Get('items/category/:categoryId')
  getItemsByCategory(@Param('categoryId') categoryId: string) {
    return this.menuService.getItemsByCategory(categoryId);
  }
}
