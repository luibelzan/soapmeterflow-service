import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class T_S17 {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cnc_id: string;

    @Column()
    fh: Date;

    @Column()
    et: number;

    @Column()
    c: number;

    @Column()
    d1: string;

    @Column({ nullable: true })
    d2: string;
}