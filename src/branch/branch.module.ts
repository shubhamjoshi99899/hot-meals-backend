import { Module } from '@nestjs/common';
import { BranchService } from './branch.service';
import { BranchController } from './branch.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [PrismaService, BranchService],
  controllers: [BranchController],
})
export class BranchModule {}
