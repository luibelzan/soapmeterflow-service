import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class REQUESTS {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("text", { array: true })
    cnt_id: string[];

    @Column({ nullable: true })
    fh_i: string;

    @Column({ nullable: true })
    fh_f: string;

    @Column({ nullable: true })
    url: string; //tabla concecntardores

    @Column()
    report_type: string;

    @Column()
    priority: number; //3

    @Column()
    source: string; //MET
}