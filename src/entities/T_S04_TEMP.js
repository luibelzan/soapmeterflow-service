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
exports.T_S04_TEMP = void 0;
const typeorm_1 = require("typeorm");
let T_S04_TEMP = class T_S04_TEMP {
};
exports.T_S04_TEMP = T_S04_TEMP;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], T_S04_TEMP.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], T_S04_TEMP.prototype, "cnt_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], T_S04_TEMP.prototype, "fh_i", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], T_S04_TEMP.prototype, "fh_f", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_S04_TEMP.prototype, "ctr", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_S04_TEMP.prototype, "pt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_S04_TEMP.prototype, "mx", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], T_S04_TEMP.prototype, "fx", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_S04_TEMP.prototype, "aia", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_S04_TEMP.prototype, "aea", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_S04_TEMP.prototype, "r1a", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_S04_TEMP.prototype, "r2a", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_S04_TEMP.prototype, "r3a", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_S04_TEMP.prototype, "r4a", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_S04_TEMP.prototype, "aii", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_S04_TEMP.prototype, "aei", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_S04_TEMP.prototype, "r1i", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_S04_TEMP.prototype, "r2i", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_S04_TEMP.prototype, "r3i", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_S04_TEMP.prototype, "r4i", void 0);
exports.T_S04_TEMP = T_S04_TEMP = __decorate([
    (0, typeorm_1.Entity)()
], T_S04_TEMP);
