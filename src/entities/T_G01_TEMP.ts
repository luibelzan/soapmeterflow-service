import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class T_G01_TEMP {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cnc_id: string;

    @Column()
    fh: Date;

    @Column()
    amed: number;

    @Column()
    amax: number;

    @Column()
    tot: number;

    @Column({ type: 'float'})
    aperc: number;
}