import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProdDocument, Produse } from 'src/schema/prod.schema';
import { CreateProduseDto } from './dto/create-produse.dto';
import { UpdateProduseDto } from './dto/update-produse.dto';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose/dist/soft-delete-model';

@Injectable()
export class ProduseService {
  // Use the SoftDeleteModel instead of the regular one to perform a soft delete.
  constructor(
    @InjectModel(Produse.name) private prodModel: SoftDeleteModel<ProdDocument>,
  ) {}

  // Function to create a dto. This creates and saves an item when the POST request is accessed.
  async create(createProduseDto: CreateProduseDto): Promise<Produse> {
    try {
      const create = await new this.prodModel(createProduseDto).save();
      return create;
    } catch (error) {
      throw error;
    }
  }

  // Finds all the elements in the collection.
  async findAll() {
    try {
      const foundItems = await this.prodModel.find();
      return foundItems;
    } catch (error) {
      throw error;
    }
  }

  // Finds one element by its id.
  async findOne(id: string) {
    try {
      const foundOne = await this.prodModel.findById(id);
      return foundOne;
    } catch (error) {
      throw error;
    }
  }

  // Updates an element by its id.
  async update(id: string, updateProduseDto: UpdateProduseDto) {
    try {
      const update = await this.prodModel.updateOne(
        { _id: id },
        { $set: { ...updateProduseDto } },
      );
      return update;
    } catch (error) {
      throw error;
    }
  }

  // Removes an element by its id.
  async remove(id: string) {
    try {
      const deleted = await this.prodModel.softDelete({ _id: id });
      return deleted;
    } catch (error) {
      throw error;
    }
  }
}
