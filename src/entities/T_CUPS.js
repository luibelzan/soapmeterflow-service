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
exports.T_CUPS = void 0;
const typeorm_1 = require("typeorm");
let T_CUPS = class T_CUPS {
};
exports.T_CUPS = T_CUPS;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'id_cups', length: 30 }),
    __metadata("design:type", String)
], T_CUPS.prototype, "idCups", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nom_cups', length: 50, nullable: true }),
    __metadata("design:type", String)
], T_CUPS.prototype, "nomCups", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cif_cups', length: 12, nullable: true }),
    __metadata("design:type", String)
], T_CUPS.prototype, "cifCups", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'dir_cups', length: 80, nullable: true }),
    __metadata("design:type", String)
], T_CUPS.prototype, "dirCups", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cp_cups', length: 6, nullable: true }),
    __metadata("design:type", String)
], T_CUPS.prototype, "cpCups", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_comunidad', nullable: true }),
    __metadata("design:type", Number)
], T_CUPS.prototype, "idComunidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_provincia', nullable: true }),
    __metadata("design:type", Number)
], T_CUPS.prototype, "idProvincia", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_localidad', nullable: true }),
    __metadata("design:type", Number)
], T_CUPS.prototype, "idLocalidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cod_catastro', length: 20, nullable: true }),
    __metadata("design:type", String)
], T_CUPS.prototype, "codCatastro", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cod_acometida', length: 30, nullable: true }),
    __metadata("design:type", String)
], T_CUPS.prototype, "codAcometida", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cod_nodo', length: 15, nullable: true }),
    __metadata("design:type", String)
], T_CUPS.prototype, "codNodo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cod_zona', length: 30, nullable: true }),
    __metadata("design:type", String)
], T_CUPS.prototype, "codZona", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cod_sector', length: 30, nullable: true }),
    __metadata("design:type", String)
], T_CUPS.prototype, "codSector", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cod_subsector', length: 30, nullable: true }),
    __metadata("design:type", String)
], T_CUPS.prototype, "codSubsector", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'lat_cups', length: 20, nullable: true }),
    __metadata("design:type", String)
], T_CUPS.prototype, "latCups", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'lon_cups', length: 20, nullable: true }),
    __metadata("design:type", String)
], T_CUPS.prototype, "lonCups", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'des_utmx', length: 20, nullable: true }),
    __metadata("design:type", String)
], T_CUPS.prototype, "desUtmx", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'des_utmy', length: 20, nullable: true }),
    __metadata("design:type", String)
], T_CUPS.prototype, "desUtmy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cups_estado', length: 1, nullable: true }),
    __metadata("design:type", String)
], T_CUPS.prototype, "cupsEstado", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tip_cups', length: 2, nullable: true }),
    __metadata("design:type", String)
], T_CUPS.prototype, "tipCups", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_ct', length: 15, nullable: true }),
    __metadata("design:type", String)
], T_CUPS.prototype, "id_ct", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tip_tarifa', length: 10, nullable: true }),
    __metadata("design:type", String)
], T_CUPS.prototype, "tipTarifa", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fec_fecha_alta', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], T_CUPS.prototype, "fecFechaAlta", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fec_fecha_baja', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], T_CUPS.prototype, "fecFechaBaja", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tip_tipo_frontera', length: 3, nullable: true }),
    __metadata("design:type", String)
], T_CUPS.prototype, "tipTipoFrontera", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cod_codigo_mytc', length: 15, nullable: true }),
    __metadata("design:type", String)
], T_CUPS.prototype, "codCodigoMytc", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cod_clave_autonomica', nullable: true }),
    __metadata("design:type", Number)
], T_CUPS.prototype, "codClaveAutonomica", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_distribuidora', length: 3, nullable: true }),
    __metadata("design:type", String)
], T_CUPS.prototype, "idDistribuidora", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'val_potencia_adscrita', type: 'numeric', nullable: true }),
    __metadata("design:type", Number)
], T_CUPS.prototype, "valPotenciaAdscrita", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'val_potencia_contratada', type: 'numeric', nullable: true }),
    __metadata("design:type", Number)
], T_CUPS.prototype, "valPotenciaContratada", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'des_nivel_tension', length: 10, nullable: true }),
    __metadata("design:type", String)
], T_CUPS.prototype, "desNivelTension", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cod_poliza', length: 30, nullable: true }),
    __metadata("design:type", String)
], T_CUPS.prototype, "codPoliza", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_cnt', length: 15, nullable: true }),
    __metadata("design:type", String)
], T_CUPS.prototype, "id_cnt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'des_propiedad', length: 1, nullable: true }),
    __metadata("design:type", String)
], T_CUPS.prototype, "desPropiedad", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'des_fabricante', length: 15, nullable: true }),
    __metadata("design:type", String)
], T_CUPS.prototype, "desFabricante", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tip_equipo', length: 3, nullable: true }),
    __metadata("design:type", String)
], T_CUPS.prototype, "tipEquipo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cod_fase', length: 1, nullable: true }),
    __metadata("design:type", String)
], T_CUPS.prototype, "codFase", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_linea', length: 15, nullable: true }),
    __metadata("design:type", String)
], T_CUPS.prototype, "idLinea", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_trafo', length: 15, nullable: true }),
    __metadata("design:type", String)
], T_CUPS.prototype, "idTrafo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nom_calle', length: 50, nullable: true }),
    __metadata("design:type", String)
], T_CUPS.prototype, "nomCalle", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cod_portal', length: 12, nullable: true }),
    __metadata("design:type", String)
], T_CUPS.prototype, "codPortal", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nom_comercializadora', length: 80, nullable: true }),
    __metadata("design:type", String)
], T_CUPS.prototype, "nomComercializadora", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tip_punto_medida', nullable: true }),
    __metadata("design:type", Number)
], T_CUPS.prototype, "tipPuntoMedida", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tip_lectura', length: 10, nullable: true }),
    __metadata("design:type", String)
], T_CUPS.prototype, "tipLectura", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ind_habitual', length: 1, default: 'S' }),
    __metadata("design:type", String)
], T_CUPS.prototype, "indHabitual", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ind_maximetro', length: 1, default: 'N' }),
    __metadata("design:type", String)
], T_CUPS.prototype, "indMaximetro", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ind_reactiva', length: 1, default: 'N' }),
    __metadata("design:type", String)
], T_CUPS.prototype, "indReactiva", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fec_registro', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], T_CUPS.prototype, "fecRegistro", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ind_repetidor', length: 1, default: 'N' }),
    __metadata("design:type", String)
], T_CUPS.prototype, "indRepetidor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ind_autoconsumo', length: 1, default: 'N' }),
    __metadata("design:type", String)
], T_CUPS.prototype, "indAutoconsumo", void 0);
exports.T_CUPS = T_CUPS = __decorate([
    (0, typeorm_1.Entity)()
], T_CUPS);
