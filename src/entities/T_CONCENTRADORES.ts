import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 't_concentradores' })
export class T_CONCENTRADORES {
    @PrimaryColumn({ type: 'varchar', length: 15 })
    id_cnc: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    cod_mod: string;

    @Column({ type: 'text', nullable: true })
    des_cnc_af: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    tip_concentrator: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    des_vdlms: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    des_vprime: string;

    @Column({ type: 'text', nullable: true })
    ip_ipcom: string;

    @Column({ type: 'integer', nullable: true })
    des_portws: number;

    @Column({ type: 'text', nullable: true })
    des_ipmask: string;

    @Column({ type: 'text', nullable: true })
    ip_ipgtw: string;

    @Column({ type: 'text', nullable: true })
    des_ipdhcp: string;

    @Column({ type: 'text', nullable: true })
    ip_iploc: string;

    @Column({ type: 'text', nullable: true })
    des_ipmaskloc: string;

    @Column({ type: 'text', nullable: true })
    des_priority: string;

    @Column({ type: 'text', nullable: true })
    des_macplc: string;

    @Column({ type: 'text', nullable: true })
    des_stgserver: string;

    @Column({ type: 'text', nullable: true })
    des_ntpserver: string;

    @Column({ type: 'text', nullable: true })
    des_ftpserver: string;

    @Column({ type: 'varchar', length: 15, nullable: true })
    id_ct: string;

    @Column({ type: 'varchar', length: 5, nullable: true })
    des_version_stg: string;

    @Column({ type: 'varchar', length: 3, nullable: true })
    des_fab_dc: string;

    @Column({ type: 'integer', nullable: true })
    id_wanlan: number;

    @Column({ type: 'varchar', length: 60, nullable: true })
    ws_url: string;

    @Column({ type: 'varchar', length: 1, nullable: true })
    ind_synccontador: string;

    @Column({ type: 'integer', nullable: true })
    num_contadores: number;

    @Column({ type: 'integer', nullable: true })
    seg_sendreq: number;

    @Column({ type: 'integer', nullable: true })
    seg_desconcontador: number;

    @Column({ type: 'integer', nullable: true })
    num_reintdesconcontador: number;

    @Column({ type: 'integer', nullable: true })
    seg_reintintervalo: number;

    @Column({ type: 'varchar', length: 60, nullable: true })
    dc_url: string;
}