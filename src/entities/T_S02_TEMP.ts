import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class T_S02_TEMP {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cnt_id: string;

    @Column()
    magn: number;

    @Column()
    fh: Date;

    @Column()
    bc: string;

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