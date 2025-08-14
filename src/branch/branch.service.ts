import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateBranchDto, UpdateBranchDto } from './branch.dto';

@Injectable()
export class BranchService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBranchDto: CreateBranchDto) {
    return this.prisma.branch.create({
      data: createBranchDto,
    });
  }

  async findAll() {
    return this.prisma.branch.findMany();
  }

  async findOne(id: string) {
    const branch = await this.prisma.branch.findUnique({
      where: { id },
    });

    if (!branch) {
      throw new NotFoundException(`Branch with ID "${id}" not found`);
    }

    return branch;
  }

  async update(id: string, updateBranchDto: UpdateBranchDto) {
    // First, check if the branch exists
    await this.findOne(id);
    return this.prisma.branch.update({
      where: { id },
      data: updateBranchDto,
    });
  }

  async remove(id: string) {
    // First, check if the branch exists
    await this.findOne(id);
    return this.prisma.branch.delete({
      where: { id },
    });
  }
}
