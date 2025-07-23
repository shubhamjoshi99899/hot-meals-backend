// src/branch/branch.controller.ts
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { BranchService } from './branch.service';

@Controller('branches')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Post()
  async createBranch(@Body() body: { name: string; location: string }) {
    return this.branchService.create(body.name, body.location);
  }

  @Get()
  async getAllBranches() {
    return this.branchService.findAll();
  }

  @Get(':id')
  async getBranch(@Param('id') id: string) {
    return this.branchService.findById(id);
  }

  @Patch(':id')
  async updateBranch(
    @Param('id') id: string,
    @Body() body: { name?: string; location?: string },
  ) {
    return this.branchService.update(id, body);
  }
}
