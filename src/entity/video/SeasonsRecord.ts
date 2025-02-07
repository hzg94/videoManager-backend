import type {EpisodeData, Seasons} from "@common/interface/entity/video";
import {BaseEntity, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {EpisodeRecord} from "@/entity/video/EpisodeRecord";


@Entity('seasons')
export class SeasonsRecord extends BaseEntity implements Seasons {
    @PrimaryGeneratedColumn()
    id: string;

    description: string;

    number: string;

    title: string;

    total: string;

    year: string;

    @OneToMany(() => EpisodeRecord, episode => episode)
    episodes: EpisodeData[];
}