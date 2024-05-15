import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class T_CT {
  @PrimaryColumn({ type: 'varchar', length: 15 })
  id_ct: string;

  @Column({ type: 'varchar', length: 40, nullable: true })
  nom_ct: string;

  @Column({ type: 'integer', nullable: true })
  id_comunidad: number;

  @Column({ type: 'integer', nullable: true })
  id_provincia: number;

  @Column({ type: 'integer', nullable: true })
  id_localidad: number;

  @Column({ type: 'varchar', length: 6, nullable: true })
  cp_ct: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  cod_zona: string;

  @Column({ type: 'varchar', length: 3, nullable: true })
  id_distribuidora: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  lat_ct: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  lon_ct: string;

  @Column({ type: 'varchar', length: 6, nullable: true })
  cod_estacion: string;

  @Column({ type: 'varchar', length: 80, nullable: true })
  dir_ct: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  id_se: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  id_circuito: string;

  @Column({ type: 'boolean', nullable: true })
  ind_balance: boolean;
}