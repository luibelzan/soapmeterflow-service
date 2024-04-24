import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class T_S24 {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cnc_id: string;

    @Column()
    fh: Date;

    @Column()
    meter_id: string;

    @Column()
    comstatus: number;

    @Column()
    date: Date;

    @Column()
    active: string;

}