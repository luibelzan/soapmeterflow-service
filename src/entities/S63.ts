import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class S63 {

    @PrimaryColumn()
    rtuId: string;

    @PrimaryColumn()
    lvsId: string;

    @PrimaryColumn()
    fh: string;

    @Column()
    idRpt: string;
    
    @Column()
    idPet: number;

    @Column()
    version: string;

    @Column()
    lvsPos: number;

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
