import type {EpisodeData, Seasons} from "@common/interface/entity/video";
import {BaseEntity, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {EpisodeRecord} from "@/entity/video/EpisodeRecord";
import VideoRecord from "@/entity/video/videoRecord";


@Entity('seasons')
export class SeasonsRecord extends BaseEntity implements Seasons {
    @PrimaryGeneratedColumn()
    id: number;

    description: string;

    number: string;

    title: string;

    total: string;

    year: string;

    @ManyToOne(() => VideoRecord, video => video.seasons)
    video: VideoRecord[];

    @OneToMany(() => EpisodeRecord, episode => episode.seasons,{
        cascade: true
    })
    @JoinColumn()
    episodes: EpisodeRecord[];
}