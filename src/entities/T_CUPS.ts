import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class T_CUPS {
  @PrimaryColumn({ name: 'id_cups', length: 30 })
  idCups!: string;

  @Column({ name: 'nom_cups', length: 50, nullable: true })
  nomCups?: string;

  @Column({ name: 'cif_cups', length: 12, nullable: true })
  cifCups?: string;

  @Column({ name: 'dir_cups', length: 80, nullable: true })
  dirCups?: string;

  @Column({ name: 'cp_cups', length: 6, nullable: true })
  cpCups?: string;

  @Column({ name: 'id_comunidad', nullable: true })
  idComunidad?: number;

  @Column({ name: 'id_provincia', nullable: true })
  idProvincia?: number;

  @Column({ name: 'id_localidad', nullable: true })
  idLocalidad?: number;

  @Column({ name: 'cod_catastro', length: 20, nullable: true })
  codCatastro?: string;

  @Column({ name: 'cod_acometida', length: 30, nullable: true })
  codAcometida?: string;

  @Column({ name: 'cod_nodo', length: 15, nullable: true })
  codNodo?: string;

  @Column({ name: 'cod_zona', length: 30, nullable: true })
  codZona?: string;

  @Column({ name: 'cod_sector', length: 30, nullable: true })
  codSector?: string;

  @Column({ name: 'cod_subsector', length: 30, nullable: true })
  codSubsector?: string;

  @Column({ name: 'lat_cups', length: 20, nullable: true })
  latCups?: string;

  @Column({ name: 'lon_cups', length: 20, nullable: true })
  lonCups?: string;

  @Column({ name: 'des_utmx', length: 20, nullable: true })
  desUtmx?: string;

  @Column({ name: 'des_utmy', length: 20, nullable: true })
  desUtmy?: string;

  @Column({ name: 'cups_estado', length: 1, nullable: true })
  cupsEstado?: string;

  @Column({ name: 'tip_cups', length: 2, nullable: true })
  tipCups?: string;

  @Column({ name: 'id_ct', length: 15, nullable: true })
  id_ct: string;

  @Column({ name: 'tip_tarifa', length: 10, nullable: true })
  tipTarifa?: string;

  @Column({ name: 'fec_fecha_alta', type: 'date', nullable: true })
  fecFechaAlta?: Date;

  @Column({ name: 'fec_fecha_baja', type: 'date', nullable: true })
  fecFechaBaja?: Date;

  @Column({ name: 'tip_tipo_frontera', length: 3, nullable: true })
  tipTipoFrontera?: string;

  @Column({ name: 'cod_codigo_mytc', length: 15, nullable: true })
  codCodigoMytc?: string;

  @Column({ name: 'cod_clave_autonomica', nullable: true })
  codClaveAutonomica?: number;

  @Column({ name: 'id_distribuidora', length: 3, nullable: true })
  idDistribuidora?: string;

  @Column({ name: 'val_potencia_adscrita', type: 'numeric', nullable: true })
  valPotenciaAdscrita?: number;

  @Column({ name: 'val_potencia_contratada', type: 'numeric', nullable: true })
  valPotenciaContratada?: number;

  @Column({ name: 'des_nivel_tension', length: 10, nullable: true })
  desNivelTension?: string;

  @Column({ name: 'cod_poliza', length: 30, nullable: true })
  codPoliza?: string;

  @Column({ name: 'id_cnt', length: 15, nullable: true })
  id_cnt: string;

  @Column({ name: 'des_propiedad', length: 1, nullable: true })
  desPropiedad?: string;

  @Column({ name: 'des_fabricante', length: 15, nullable: true })
  desFabricante?: string;

  @Column({ name: 'tip_equipo', length: 3, nullable: true })
  tipEquipo?: string;

  @Column({ name: 'cod_fase', length: 1, nullable: true })
  codFase?: string;

  @Column({ name: 'id_linea', length: 15, nullable: true })
  idLinea?: string;

  @Column({ name: 'id_trafo', length: 15, nullable: true })
  idTrafo?: string;

  @Column({ name: 'nom_calle', length: 50, nullable: true })
  nomCalle?: string;

  @Column({ name: 'cod_portal', length: 12, nullable: true })
  codPortal?: string;

  @Column({ name: 'nom_comercializadora', length: 80, nullable: true })
  nomComercializadora?: string;

  @Column({ name: 'tip_punto_medida', nullable: true })
  tipPuntoMedida?: number;

  @Column({ name: 'tip_lectura', length: 10, nullable: true })
  tipLectura?: string;

  @Column({ name: 'ind_habitual', length: 1, default: 'S' })
  indHabitual!: string;

  @Column({ name: 'ind_maximetro', length: 1, default: 'N' })
  indMaximetro!: string;

  @Column({ name: 'ind_reactiva', length: 1, default: 'N' })
  indReactiva!: string;

  @Column({ name: 'fec_registro', type: 'date', nullable: true })
  fecRegistro?: Date;

  @Column({ name: 'ind_repetidor', length: 1, default: 'N' })
  indRepetidor!: string;

  @Column({ name: 'ind_autoconsumo', length: 1, default: 'N' })
  indAutoconsumo!: string;
}