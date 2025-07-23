import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [PrismaService, MenuService],
  controllers: [MenuController],
})
export class MenuModule {}
