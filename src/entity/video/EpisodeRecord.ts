import type {EpisodeData, Seasons} from "@common/interface/entity/video";
import {BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {SeasonsRecord} from "@/entity/video/SeasonsRecord";

@Entity('episode')
export class EpisodeRecord extends BaseEntity implements EpisodeData {
    @PrimaryGeneratedColumn()
    id: number;
    backdropPicPath: string;
    description: string;

    number: string;
    time: number;
    title: string;

    @ManyToOne(() => SeasonsRecord, (seasons) => seasons.episodes)
    seasons: Seasons[]

}