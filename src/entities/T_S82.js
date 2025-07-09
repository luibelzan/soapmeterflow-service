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
exports.T_S82 = void 0;
const typeorm_1 = require("typeorm");
let T_S82 = class T_S82 {
};
exports.T_S82 = T_S82;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], T_S82.prototype, "rtu_id", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], T_S82.prototype, "lvs_id", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Date)
], T_S82.prototype, "fh", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_S82.prototype, "lvs_pos", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], T_S82.prototype, "i1max_fh", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_S82.prototype, "i1max_v1", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_S82.prototype, "i1max_v2", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_S82.prototype, "i1max_v3", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_S82.prototype, "i1max_i1", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_S82.prototype, "i1max_i2", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_S82.prototype, "i1max_i3", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_S82.prototype, "i1max_in", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_S82.prototype, "i1max_simp", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_S82.prototype, "i1max_sexp", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], T_S82.prototype, "i1max_bc", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], T_S82.prototype, "i2max_fh", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_S82.prototype, "i2max_v1", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_S82.prototype, "i2max_v2", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_S82.prototype, "i2max_v3", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_S82.prototype, "i2max_i1", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_S82.prototype, "i2max_i2", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_S82.prototype, "i2max_i3", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_S82.prototype, "i2max_in", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_S82.prototype, "i2max_simp", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_S82.prototype, "i2max_sexp", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], T_S82.prototype, "i2max_bc", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], T_S82.prototype, "i3max_fh", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_S82.prototype, "i3max_v1", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_S82.prototype, "i3max_v2", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_S82.prototype, "i3max_v3", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_S82.prototype, "i3max_i1", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_S82.prototype, "i3max_i2", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_S82.prototype, "i3max_i3", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_S82.prototype, "i3max_in", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_S82.prototype, "i3max_simp", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_S82.prototype, "i3max_sexp", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], T_S82.prototype, "i3max_bc", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], T_S82.prototype, "inmax_fh", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_S82.prototype, "inmax_v1", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_S82.prototype, "inmax_v2", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_S82.prototype, "inmax_v3", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_S82.prototype, "inmax_i1", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_S82.prototype, "inmax_i2", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_S82.prototype, "inmax_i3", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_S82.prototype, "inmax_in", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_S82.prototype, "inmax_simp", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_S82.prototype, "inmax_sexp", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], T_S82.prototype, "inmax_bc", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], T_S82.prototype, "v1max_fh", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_S82.prototype, "v1max_v1", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_S82.prototype, "v1max_v2", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_S82.prototype, "v1max_v3", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_S82.prototype, "v1max_i1", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_S82.prototype, "v1max_i2", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_S82.prototype, "v1max_i3", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_S82.prototype, "v1max_in", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_S82.prototype, "v1max_simp", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_S82.prototype, "v1max_sexp", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], T_S82.prototype, "v1max_bc", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], T_S82.prototype, "v2max_fh", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_S82.prototype, "v2max_v1", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_S82.prototype, "v2max_v2", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_S82.prototype, "v2max_v3", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_S82.prototype, "v2max_i1", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_S82.prototype, "v2max_i2", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_S82.prototype, "v2max_i3", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_S82.prototype, "v2max_in", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_S82.prototype, "v2max_simp", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_S82.prototype, "v2max_sexp", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], T_S82.prototype, "v2max_bc", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], T_S82.prototype, "v3max_fh", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_S82.prototype, "v3max_v1", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_S82.prototype, "v3max_v2", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_S82.prototype, "v3max_v3", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_S82.prototype, "v3max_i1", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_S82.prototype, "v3max_i2", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_S82.prototype, "v3max_i3", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], T_S82.prototype, "v3max_in", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_S82.prototype, "v3max_simp", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], T_S82.prototype, "v3max_sexp", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], T_S82.prototype, "v3max_bc", void 0);
exports.T_S82 = T_S82 = __decorate([
    (0, typeorm_1.Entity)()
], T_S82);
