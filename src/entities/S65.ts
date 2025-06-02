import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class S65 {

    @PrimaryColumn()
    rtuId: string;

    @PrimaryColumn()
    fh: string;

    @Column()
    idRpt: string;

    @Column()
    idPet: number;

    @Column()
    version: string;

    @Column({ nullable: true })
    errCat: number;

    @Column({ nullable: true })
    errCode: number;

    @Column()
    et: number;

    @Column()
    c: number;

    @Column({ nullable: true })
    d1: string;

    @Column({ nullable: true })
    d2: string;
}
