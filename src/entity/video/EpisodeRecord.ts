import type {EpisodeData, Seasons} from "@common/interface/entity/video";
import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {SeasonsRecord} from "@/entity/video/SeasonsRecord";

@Entity('episode')
export class EpisodeRecord extends BaseEntity implements EpisodeData {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    backdropPicPath: string;
    @Column()
    description: string;
    @Column()
    number: string;
    @Column()
    time: number;
    @Column()
    title: string;

    @ManyToOne(() => SeasonsRecord, (seasons) => seasons.episodes)
    seasons: Seasons

}