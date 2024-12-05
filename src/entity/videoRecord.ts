import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import type {CreditsType, MetaDataType, VideoData, VideoLinkType, VideoTypeEnum} from "@common/interface/entity/video";


@Entity('video')
export default class VideoRecord extends BaseEntity implements VideoData{
    @PrimaryGeneratedColumn()
    id: string

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

    @Column("simple-json")
    credits: CreditsType[]

    @Column()
    path: string

    @Column("simple-json")
    link: VideoLinkType[]

    @Column("simple-json")
    metaData: MetaDataType

}
