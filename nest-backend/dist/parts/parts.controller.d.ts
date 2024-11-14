import { PartsService } from './parts.service';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
export declare class PartsController {
    private readonly partsService;
    constructor(partsService: PartsService);
    create(createPartDto: CreatePartDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updatePartDto: UpdatePartDto): string;
    remove(id: string): string;
}
