"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const serve_static_1 = require("@nestjs/serve-static");
const config_1 = require("@nestjs/config");
const path_1 = require("path");
const parts_module_1 = require("./parts/parts.module");
const nest_knexjs_1 = require("nest-knexjs");
const vendors_module_1 = require("./vendors/vendors.module");
const vehicles_module_1 = require("./vehicles/vehicles.module");
const store_module_1 = require("./store/store.module");
const invoices_module_1 = require("./invoices/invoices.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '../../', 'public_html'),
                exclude: ['/api/(.*)'],
            }),
            config_1.ConfigModule.forRoot({
                envFilePath: process.env.NODE_ENV == 'rootprod' ? 'nest-backend/.env' : '.env',
            }),
            nest_knexjs_1.KnexModule.forRootAsync({
                useFactory: () => ({
                    config: {
                        client: process.env.DB_TYPE,
                        connection: {
                            host: process.env.DB_HOST,
                            user: process.env.DB_NAME,
                            password: process.env.DB_PASS,
                            port: process.env.DB_PORT,
                            database: process.env.SCHEMA,
                        },
                    },
                }),
            }),
            parts_module_1.PartsModule,
            vendors_module_1.VendorsModule,
            vehicles_module_1.VehiclesModule,
            store_module_1.StoreModule,
            invoices_module_1.InvoicesModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map