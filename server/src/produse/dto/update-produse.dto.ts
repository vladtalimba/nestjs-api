import { PartialType } from '@nestjs/mapped-types';
import { CreateProduseDto } from './create-produse.dto';

export class UpdateProduseDto extends PartialType(CreateProduseDto) {}
