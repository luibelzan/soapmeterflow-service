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
exports.T_G05_TEMP = void 0;
const typeorm_1 = require("typeorm");
let T_G05_TEMP = class T_G05_TEMP {
};
exports.T_G05_TEMP = T_G05_TEMP;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], T_G05_TEMP.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], T_G05_TEMP.prototype, "cnt_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], T_G05_TEMP.prototype, "fh", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_G05_TEMP.prototype, "minvph1_lv", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_G05_TEMP.prototype, "minvph2_lv", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_G05_TEMP.prototype, "minvph3_lv", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_G05_TEMP.prototype, "miniph1_lv", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_G05_TEMP.prototype, "miniph2_lv", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_G05_TEMP.prototype, "miniph3_lv", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_G05_TEMP.prototype, "minpplus_triph", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_G05_TEMP.prototype, "minpminus_triph", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_G05_TEMP.prototype, "minqplus_triph", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_G05_TEMP.prototype, "minqminus_triph", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_G05_TEMP.prototype, "minvph1_mv", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_G05_TEMP.prototype, "minvph2_mv", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_G05_TEMP.prototype, "minvph3_mv", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_G05_TEMP.prototype, "minineutral", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_G05_TEMP.prototype, "minv0_comp", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_G05_TEMP.prototype, "minv1_comp", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_G05_TEMP.prototype, "minv2_comp", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_G05_TEMP.prototype, "minvhs", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_G05_TEMP.prototype, "bc", void 0);
exports.T_G05_TEMP = T_G05_TEMP = __decorate([
    (0, typeorm_1.Entity)()
], T_G05_TEMP);
