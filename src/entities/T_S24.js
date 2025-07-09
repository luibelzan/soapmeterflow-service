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
exports.T_S24 = void 0;
const typeorm_1 = require("typeorm");
let T_S24 = class T_S24 {
};
exports.T_S24 = T_S24;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], T_S24.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], T_S24.prototype, "cnc_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], T_S24.prototype, "fh", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], T_S24.prototype, "meter_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_S24.prototype, "comstatus", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], T_S24.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], T_S24.prototype, "active", void 0);
exports.T_S24 = T_S24 = __decorate([
    (0, typeorm_1.Entity)()
], T_S24);
