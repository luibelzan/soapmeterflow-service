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
Object.defineProperty(exports, "__esModule", { value: true });
exports.T_CT = void 0;
const typeorm_1 = require("typeorm");
let T_CT = class T_CT {
};
exports.T_CT = T_CT;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'varchar', length: 15 }),
    __metadata("design:type", String)
], T_CT.prototype, "id_ct", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 40, nullable: true }),
    __metadata("design:type", String)
], T_CT.prototype, "nom_ct", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', nullable: true }),
    __metadata("design:type", Number)
], T_CT.prototype, "id_comunidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', nullable: true }),
    __metadata("design:type", Number)
], T_CT.prototype, "id_provincia", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', nullable: true }),
    __metadata("design:type", Number)
], T_CT.prototype, "id_localidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 6, nullable: true }),
    __metadata("design:type", String)
], T_CT.prototype, "cp_ct", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 30, nullable: true }),
    __metadata("design:type", String)
], T_CT.prototype, "cod_zona", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 3, nullable: true }),
    __metadata("design:type", String)
], T_CT.prototype, "id_distribuidora", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", String)
], T_CT.prototype, "lat_ct", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", String)
], T_CT.prototype, "lon_ct", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 6, nullable: true }),
    __metadata("design:type", String)
], T_CT.prototype, "cod_estacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 80, nullable: true }),
    __metadata("design:type", String)
], T_CT.prototype, "dir_ct", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 30, nullable: true }),
    __metadata("design:type", String)
], T_CT.prototype, "id_se", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 30, nullable: true }),
    __metadata("design:type", String)
], T_CT.prototype, "id_circuito", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', nullable: true }),
    __metadata("design:type", Boolean)
], T_CT.prototype, "ind_balance", void 0);
exports.T_CT = T_CT = __decorate([
    (0, typeorm_1.Entity)()
], T_CT);
