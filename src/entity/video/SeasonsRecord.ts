import type {Seasons, VideoData} from "@common/interface/entity/video";
import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {EpisodeRecord} from "@/entity/video/EpisodeRecord";
import VideoRecord from "@/entity/video/videoRecord";


@Entity('seasons')
export class SeasonsRecord extends BaseEntity implements Seasons {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    number: string;
    @Column()
    title: string;
    @Column()
    total: string;
    @Column()
    year: string;

    @OneToMany(() => EpisodeRecord, episode => episode.seasons,{
        cascade: true
    })
    episodes: EpisodeRecord[];

    @ManyToOne(() => VideoRecord, video => video.seasons)
    video: VideoData
    @Column()
    posterPicPath: string;
}