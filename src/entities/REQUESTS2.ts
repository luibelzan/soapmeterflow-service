import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class REQUESTS2 {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("text", { array: true })
    cnt_id: string[];

    @Column({ nullable: true })
    fh_i: Date;

    @Column({ nullable: true })
    fh_f: Date;

    @Column({ nullable: true })
    url: string; //tabla concecntardores

    @Column()
    report_type: string;

    @Column()
    priority: number; //3

    @Column()
    source: string; //MET

    @Column()
    ct_id: string;
}