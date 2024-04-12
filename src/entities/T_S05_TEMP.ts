import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'


@Entity()
export class T_S05_TEMP {

    @PrimaryGeneratedColumn()
    id: number;

    @Column() 
    cnt_id: string;

    @Column()
    fh: Date;

    @Column()
    ctr: number;

    @Column()
    pt: number;

    @Column()
    aia: number;

    @Column()
    aea: number;

    @Column()
    r1a: number;

    @Column()
    r2a: number;

    @Column()
    r3a: number;

    @Column()
    r4a: number;

}