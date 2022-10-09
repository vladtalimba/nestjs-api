import { Module } from '@nestjs/common';
import { ProduseService } from './produse.service';
import { ProduseController } from './produse.controller';
import { ProdSchema, Produse } from 'src/schema/prod.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  // Import the schema.
  imports: [
    MongooseModule.forFeature([{ name: Produse.name, schema: ProdSchema }]),
  ],
  controllers: [ProduseController],
  providers: [ProduseService],
})
export class ProduseModule {}
