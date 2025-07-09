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
exports.T_CONCENTRADORES = void 0;
const typeorm_1 = require("typeorm");
let T_CONCENTRADORES = class T_CONCENTRADORES {
};
exports.T_CONCENTRADORES = T_CONCENTRADORES;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'varchar', length: 15 }),
    __metadata("design:type", String)
], T_CONCENTRADORES.prototype, "id_cnc", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", String)
], T_CONCENTRADORES.prototype, "cod_mod", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], T_CONCENTRADORES.prototype, "des_cnc_af", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", String)
], T_CONCENTRADORES.prototype, "tip_concentrator", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", String)
], T_CONCENTRADORES.prototype, "des_vdlms", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", String)
], T_CONCENTRADORES.prototype, "des_vprime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], T_CONCENTRADORES.prototype, "ip_ipcom", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', nullable: true }),
    __metadata("design:type", Number)
], T_CONCENTRADORES.prototype, "des_portws", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], T_CONCENTRADORES.prototype, "des_ipmask", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], T_CONCENTRADORES.prototype, "ip_ipgtw", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], T_CONCENTRADORES.prototype, "des_ipdhcp", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], T_CONCENTRADORES.prototype, "ip_iploc", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], T_CONCENTRADORES.prototype, "des_ipmaskloc", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], T_CONCENTRADORES.prototype, "des_priority", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], T_CONCENTRADORES.prototype, "des_macplc", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], T_CONCENTRADORES.prototype, "des_stgserver", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], T_CONCENTRADORES.prototype, "des_ntpserver", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], T_CONCENTRADORES.prototype, "des_ftpserver", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 15, nullable: true }),
    __metadata("design:type", String)
], T_CONCENTRADORES.prototype, "id_ct", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 5, nullable: true }),
    __metadata("design:type", String)
], T_CONCENTRADORES.prototype, "des_version_stg", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 3, nullable: true }),
    __metadata("design:type", String)
], T_CONCENTRADORES.prototype, "des_fab_dc", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', nullable: true }),
    __metadata("design:type", Number)
], T_CONCENTRADORES.prototype, "id_wanlan", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 60, nullable: true }),
    __metadata("design:type", String)
], T_CONCENTRADORES.prototype, "ws_url", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 1, nullable: true }),
    __metadata("design:type", String)
], T_CONCENTRADORES.prototype, "ind_synccontador", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', nullable: true }),
    __metadata("design:type", Number)
], T_CONCENTRADORES.prototype, "num_contadores", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', nullable: true }),
    __metadata("design:type", Number)
], T_CONCENTRADORES.prototype, "seg_sendreq", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', nullable: true }),
    __metadata("design:type", Number)
], T_CONCENTRADORES.prototype, "seg_desconcontador", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', nullable: true }),
    __metadata("design:type", Number)
], T_CONCENTRADORES.prototype, "num_reintdesconcontador", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', nullable: true }),
    __metadata("design:type", Number)
], T_CONCENTRADORES.prototype, "seg_reintintervalo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 60, nullable: true }),
    __metadata("design:type", String)
], T_CONCENTRADORES.prototype, "dc_url", void 0);
exports.T_CONCENTRADORES = T_CONCENTRADORES = __decorate([
    (0, typeorm_1.Entity)({ name: 't_concentradores' })
], T_CONCENTRADORES);
