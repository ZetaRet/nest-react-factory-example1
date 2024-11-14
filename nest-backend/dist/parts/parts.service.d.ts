import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
export declare class PartsService {
    create(createPartDto: CreatePartDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePartDto: UpdatePartDto): string;
    remove(id: number): string;
}
