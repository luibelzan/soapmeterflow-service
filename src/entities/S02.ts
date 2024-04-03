import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class S02 {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cntId: string;

    @Column()
    magn: number;

    @Column()
    fh: string;

    @Column()
    hor: string;

    @Column()
    bc: number;

    @Column()
    ai: number;

    @Column()
    ae: number;

    @Column()
    r1: number;

    @Column()
    r2: number;

    @Column()
    r3: number;

    @Column()
    r4: number;

    @Column()
    origen: string;

}