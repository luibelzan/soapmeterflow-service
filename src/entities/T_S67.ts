import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class T_S67 {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rtu_id: string;

    @Column()
    fh: Date;

    @Column()
    et: number;

    @Column()
    c: number;

    @Column({ nullable: true })
    d1: string;
}