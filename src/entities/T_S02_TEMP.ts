import { Entity, PrimaryColumn, Column, Generated } from 'typeorm'

@Entity()
export class T_S02_TEMP {

    @PrimaryColumn('uuid', { generated: 'uuid' })
    @Generated('uuid')
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