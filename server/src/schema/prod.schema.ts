import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';

export type ProdDocument = Produse & Document;

// Schema for the Produs objects.
@Schema()
export class Produse {
  @Prop()
  name: string;

  @Prop()
  code: string;

  @Prop()
  weight: string;

  @Prop()
  price: string;

  @Prop()
  color: string;
}

// Export schema with a soft delete plugin to help with performing a soft delete.
export const ProdSchema =
  SchemaFactory.createForClass(Produse).plugin(softDeletePlugin);
