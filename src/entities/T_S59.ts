import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class T_S59 {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rtu_id: string;

    @Column()
    lvs_id: string;

    @Column()
    lvs_pos: number;

    @Column()
    fh: Date;

    @Column()
    et: number;

    @Column()
    c: number;
    
}