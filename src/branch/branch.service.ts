// src/branch/branch.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class BranchService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.branch.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.branch.findMany();
  }

  async findById(id: string) {
    const branch = await this.prisma.branch.findUnique({ where: { id } });
    if (!branch) throw new NotFoundException('Branch not found');
    return branch;
  }

  async update(id: string, data: { name?: string; location?: string }) {
    return this.prisma.branch.update({
      where: { id },
      data,
    });
  }
}
