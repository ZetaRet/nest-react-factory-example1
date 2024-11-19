import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { AddPartDto, CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post('create')
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.create(createVehicleDto);
  }

  @Get()
  findAll() {
    return this.vehiclesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehiclesService.findOne(+id);
  }

  @Post('update/:id')
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehiclesService.update(+id, updateVehicleDto);
  }

  @Post('addpart')
  addPart(@Body() addPartDto: AddPartDto) {
    return this.vehiclesService.addPart(addPartDto);
  }

  @Get('parts/:id')
  getVehicleParts(@Param('id') id: string) {
    return this.vehiclesService.getVehicleParts(+id);
  }

  @Get('parts_details/:id')
  getVehiclePartsDetails(@Param('id') id: string) {
    return this.vehiclesService.getVehiclePartsDetails(+id);
  }
}
