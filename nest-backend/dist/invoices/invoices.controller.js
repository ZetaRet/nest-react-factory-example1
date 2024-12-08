"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoicesController = void 0;
const common_1 = require("@nestjs/common");
const invoices_service_1 = require("./invoices.service");
const create_invoice_dto_1 = require("./dto/create-invoice.dto");
const update_invoice_dto_1 = require("./dto/update-invoice.dto");
let InvoicesController = class InvoicesController {
    constructor(invoicesService) {
        this.invoicesService = invoicesService;
    }
    create(createInvoiceDto) {
        return this.invoicesService.create(createInvoiceDto);
    }
    findAll() {
        return this.invoicesService.findAll();
    }
    findOne(id) {
        return this.invoicesService.findOne(+id);
    }
    update(id, updateInvoiceDto) {
        return this.invoicesService.update(+id, updateInvoiceDto);
    }
    clear(id) {
        return this.invoicesService.clear(+id);
    }
    total(id) {
        return this.invoicesService.total(+id);
    }
    view(id) {
        return this.invoicesService.view(+id);
    }
    createService(createInvoiceServiceDto) {
        return this.invoicesService.createService(createInvoiceServiceDto);
    }
    findAllServices() {
        return this.invoicesService.findAllServices();
    }
    findInvoiceParts(id) {
        return this.invoicesService.findInvoiceParts(+id);
    }
    addInvoiceParts(id, addInvoicePartsDto) {
        return this.invoicesService.addInvoiceParts(+id, addInvoicePartsDto);
    }
    updateInvoiceParts(id, updateInvoicePartsDto) {
        return this.invoicesService.updateInvoiceParts(+id, updateInvoicePartsDto);
    }
    removeInvoiceParts(id) {
        return this.invoicesService.removeInvoiceParts(+id);
    }
    findInvoiceArray(id) {
        return this.invoicesService.findInvoiceArray(+id);
    }
    addInvoiceArray(id, addInvoiceArrayDto) {
        return this.invoicesService.addInvoiceArray(+id, addInvoiceArrayDto);
    }
    updateInvoiceArray(id, updateInvoiceArrayDto) {
        return this.invoicesService.updateInvoiceArray(+id, updateInvoiceArrayDto);
    }
    removeInvoiceArray(id) {
        return this.invoicesService.removeInvoiceArray(+id);
    }
    addVehicle(id, addInvoiceVehicleDto) {
        return this.invoicesService.addVehicle(+id, addInvoiceVehicleDto);
    }
};
exports.InvoicesController = InvoicesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_invoice_dto_1.CreateInvoiceDto]),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_invoice_dto_1.UpdateInvoiceDto]),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('clear/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "clear", null);
__decorate([
    (0, common_1.Get)('total/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "total", null);
__decorate([
    (0, common_1.Get)('view/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "view", null);
__decorate([
    (0, common_1.Post)('services/add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_invoice_dto_1.CreateInvoiceServiceDto]),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "createService", null);
__decorate([
    (0, common_1.Get)('services/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "findAllServices", null);
__decorate([
    (0, common_1.Get)('parts/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "findInvoiceParts", null);
__decorate([
    (0, common_1.Post)('add_parts/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_invoice_dto_1.AddInvoicePartsDto]),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "addInvoiceParts", null);
__decorate([
    (0, common_1.Post)('update_parts/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_invoice_dto_1.UpdateInvoicePartsDto]),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "updateInvoiceParts", null);
__decorate([
    (0, common_1.Get)('remove_parts/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "removeInvoiceParts", null);
__decorate([
    (0, common_1.Get)('array/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "findInvoiceArray", null);
__decorate([
    (0, common_1.Post)('add_array/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_invoice_dto_1.AddInvoiceArrayDto]),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "addInvoiceArray", null);
__decorate([
    (0, common_1.Post)('update_array/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_invoice_dto_1.UpdateInvoiceArrayDto]),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "updateInvoiceArray", null);
__decorate([
    (0, common_1.Get)('remove_array/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "removeInvoiceArray", null);
__decorate([
    (0, common_1.Post)('add_vehicle/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_invoice_dto_1.AddInvoiceVehicleDto]),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "addVehicle", null);
exports.InvoicesController = InvoicesController = __decorate([
    (0, common_1.Controller)('invoices'),
    __metadata("design:paramtypes", [invoices_service_1.InvoicesService])
], InvoicesController);
//# sourceMappingURL=invoices.controller.js.map