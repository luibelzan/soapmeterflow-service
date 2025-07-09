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
exports.T_G06_TEMP = void 0;
const typeorm_1 = require("typeorm");
let T_G06_TEMP = class T_G06_TEMP {
};
exports.T_G06_TEMP = T_G06_TEMP;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], T_G06_TEMP.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], T_G06_TEMP.prototype, "cnt_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], T_G06_TEMP.prototype, "fh", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_G06_TEMP.prototype, "momvph1_lv", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_G06_TEMP.prototype, "momvph2_lv", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_G06_TEMP.prototype, "momvph3_lv", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_G06_TEMP.prototype, "momiph1_lv", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_G06_TEMP.prototype, "momiph2_lv", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_G06_TEMP.prototype, "momiph3_lv", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_G06_TEMP.prototype, "mompplus_triph", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_G06_TEMP.prototype, "mompminus_triph", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_G06_TEMP.prototype, "momqplus_triph", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_G06_TEMP.prototype, "momqminus_triph", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_G06_TEMP.prototype, "momvph1_mv", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_G06_TEMP.prototype, "momvph2_mv", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_G06_TEMP.prototype, "momvph3_mv", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_G06_TEMP.prototype, "momineutral", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_G06_TEMP.prototype, "momv0_comp", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_G06_TEMP.prototype, "momv1_comp", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_G06_TEMP.prototype, "momv2_comp", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_G06_TEMP.prototype, "momvhs", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_G06_TEMP.prototype, "bc", void 0);
exports.T_G06_TEMP = T_G06_TEMP = __decorate([
    (0, typeorm_1.Entity)()
], T_G06_TEMP);
