import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class REQUESTS {

    @Column()
    cnt_id: string[];

    @Column()
    fh_i: Date;

    @Column()
    fh_f: Date;

    @Column()
    url: string; //tabla concecntardores

    @Column()
    report_type: string;

    @Column()
    priority: number; //3

    @Column()
    source: string; //MET
}