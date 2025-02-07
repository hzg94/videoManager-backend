import type {EpisodeData} from "@common/interface/entity/video";
import {BaseEntity, PrimaryGeneratedColumn} from "typeorm";

export class EpisodeRecord extends BaseEntity implements EpisodeData {
    @PrimaryGeneratedColumn()
    id: string;
    backdropPicPath: string;
    description: string;

    number: string;
    time: number;
    title: string;

}