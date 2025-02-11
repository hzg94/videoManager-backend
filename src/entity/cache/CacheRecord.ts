import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {CacheType} from "@common/interface/entity/cache";


@Entity('cache')
export class CacheRecord extends BaseEntity implements CacheType{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cacheId: string;

    @Column()
    type: string;
}