import {BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import type {
    CreditsType, MetaDataType,
    Seasons,
    VideoData, VideoLinkType,
    VideoTypeEnum
} from "@/common/interface/entity/video";
import {SeasonsRecord} from "@/entity/video/SeasonsRecord";


@Entity('video')
export default class VideoRecord extends BaseEntity implements VideoData{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column("simple-json")
    type: VideoTypeEnum

    @Column()
    backdropPicPath: string

    @Column()
    posterPicPath: string

    @Column()
    description: string

    @Column({
        type: 'simple-json',
    })
    credits: CreditsType[]

    @Column("simple-json")
    link: VideoLinkType[]

    @Column("simple-json")
    metaData: MetaDataType

    @OneToMany(() => SeasonsRecord, (seasons) => seasons,{
        cascade: true
    })
    @JoinColumn()
    seasons: Seasons[];

    @Column()
    path: string
}
