import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm'

@Entity()
export class T_S62 {

    @PrimaryColumn()
    id: string;

    @Column()
    partNumber: string;

    @Column()
    mod: string;

    @Column()
    af: number;

    @Column()
    te: string;

    @Column()
    vf: string;

    @Column()
    revConf: string;
}