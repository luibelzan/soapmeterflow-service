import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class T_S97 {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rtu_id: string;

    @Column()
    fh: Date;

    @Column()
    nr: number;

    @Column()
    ns: number;

    @Column()
    nt: number;

    @Column()
    bc: number;


}