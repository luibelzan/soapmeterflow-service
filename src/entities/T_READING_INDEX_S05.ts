import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class T_READING_INDEX_S05 {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cnt_id: string;

    @Column()
    fh: Date;

    @Column({ nullable: true })
    read: number;
}