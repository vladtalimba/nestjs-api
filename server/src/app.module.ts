import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProduseModule } from './produse/produse.module';

@Module({
  imports: [
    ProduseModule,
    MongooseModule.forRoot(
      'mongodb+srv://vlad123:talimba123@cluster0.rxfpkqc.mongodb.net/doraly_rest?retryWrites=true&w=majority',
    ),
  ],
})
export class AppModule {}
