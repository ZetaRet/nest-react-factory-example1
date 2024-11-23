import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import {
  AddInvoiceArrayDto,
  AddInvoicePartsDto,
  AddInvoiceVehicleDto,
  CreateInvoiceDto,
  CreateInvoiceServiceDto,
} from './dto/create-invoice.dto';
import { UpdateInvoiceArrayDto, UpdateInvoiceDto, UpdateInvoicePartsDto } from './dto/update-invoice.dto';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoicesService.create(createInvoiceDto);
  }

  @Get()
  findAll() {
    return this.invoicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoicesService.findOne(+id);
  }

  @Post('update/:id')
  update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoicesService.update(+id, updateInvoiceDto);
  }

  @Get('clear/:id')
  clear(@Param('id') id: string) {
    return this.invoicesService.clear(+id);
  }

  @Get('total/:id')
  total(@Param('id') id: string) {
    return this.invoicesService.total(+id);
  }

  @Post('services/add')
  createService(@Body() createInvoiceServiceDto: CreateInvoiceServiceDto) {
    return this.invoicesService.createService(createInvoiceServiceDto);
  }

  @Get('services/all')
  findAllServices() {
    return this.invoicesService.findAllServices();
  }

  @Get('parts/:id')
  findInvoiceParts(@Param('id') id: string) {
    return this.invoicesService.findInvoiceParts(+id);
  }

  @Post('add_parts/:id')
  addInvoiceParts(@Param('id') id: string, @Body() addInvoicePartsDto: AddInvoicePartsDto) {
    return this.invoicesService.addInvoiceParts(+id, addInvoicePartsDto);
  }

  @Post('update_parts/:id')
  updateInvoiceParts(@Param('id') id: string, @Body() updateInvoicePartsDto: UpdateInvoicePartsDto) {
    return this.invoicesService.updateInvoiceParts(+id, updateInvoicePartsDto);
  }

  @Get('remove_parts/:id')
  removeInvoiceParts(@Param('id') id: string) {
    return this.invoicesService.removeInvoiceParts(+id);
  }

  @Get('array/:id')
  findInvoiceArray(@Param('id') id: string) {
    return this.invoicesService.findInvoiceArray(+id);
  }

  @Post('add_array/:id')
  addInvoiceArray(@Param('id') id: string, @Body() addInvoiceArrayDto: AddInvoiceArrayDto) {
    return this.invoicesService.addInvoiceArray(+id, addInvoiceArrayDto);
  }

  @Post('update_array/:id')
  updateInvoiceArray(@Param('id') id: string, @Body() updateInvoiceArrayDto: UpdateInvoiceArrayDto) {
    return this.invoicesService.updateInvoiceArray(+id, updateInvoiceArrayDto);
  }

  @Get('remove_array/:id')
  removeInvoiceArray(@Param('id') id: string) {
    return this.invoicesService.removeInvoiceArray(+id);
  }

  @Post('add_vehicle/:id')
  addVehicle(@Param('id') id: string, @Body() addInvoiceVehicleDto: AddInvoiceVehicleDto) {
    return this.invoicesService.addVehicle(+id, addInvoiceVehicleDto);
  }
}
