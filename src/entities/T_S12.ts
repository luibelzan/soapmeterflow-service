import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class T_S12 {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cnc_id: string;

    @Column()
    fh: Date;

    @Column()
    mod: string;

    @Column()
    af: number;

    @Column()
    te: string;

    @Column()
    vf: string;

    @Column()
    vfcomm: string;

    @Column()
    pro: string;

    @Column()
    com: string;

    @Column({ nullable: true })
    bat: string;

    @Column()
    ipcom: string;

    @Column()
    portws: number;

    @Column()
    ipmask: string;

    @Column()
    ipgtw: string;

    @Column()
    ipdhcp: string;

    @Column()
    macplc: string;

    @Column()
    pse: number;

    @Column()
    priority: string;

    @Column()
    ipstg: string;

    @Column()
    ipntp: string;

    @Column()
    ntpmaxdeviation: number;

    @Column()
    ipftp: string;

    @Column()
    ftpuserreport: string;

    @Column()
    ipftpdcupg: string;

    @Column()
    userftpdcupg: string;

    @Column()
    ipftpmeterupg: string;

    @Column()
    userftpmeterupg: string;

    @Column()
    retryftp: number;

    @Column()
    timebetwftp: number;

    @Column()
    timedev: number;

    @Column()
    timedevover: number;

    @Column()
    resetmsg: string;

    @Column()
    nummeters: number;

    @Column()
    timesendreq: number;

    @Column()
    timedisconmeter: number;

    @Column()
    retrydisconmeter: number;

    @Column()
    timeretryinterval: number;

    @Column()
    ipftpCycles: string;

    @Column()
    userftpcycles: string;

    @Column()
    destdircycles: string;

    @Column()
    meterregdata: string;

    @Column()
    timeoutmeterfwu: number;

    @Column()
    valuescheckdelay: number;

    @Column()
    maxorderoutdate: number;

    @Column()
    timedelayrestart: number;

    @Column()
    reportformat: number;

    @Column()
    slave1: string;

    @Column()
    slave2: string;

    @Column()
    slave3: string;
    
    @Column()
    iploc: string;

    @Column()
    ipmaskloc: string;

    @Column()
    accinactimeout: number;

    @Column()
    accsimulmax: number;

    @Column()
    syncmeter: string;

    @Column()
    plctimeoutrm: number;

    @Column()
    plctimeoutf: number;

    @Column()
    s26content: string;
    
}