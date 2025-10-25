import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

/**
 * Prisma service that manages database connection lifecycle.
 * Automatically connects on module initialization and disconnects on module destruction.
 */
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  /**
   * Connects to the database when the module is initialized.
   */
  async onModuleInit(): Promise<void> {
    await (this.$connect as () => Promise<void>)();
  }

  /**
   * Disconnects from the database when the module is destroyed.
   */
  async onModuleDestroy(): Promise<void> {
    await (this.$disconnect as () => Promise<void>)();
  }
}
