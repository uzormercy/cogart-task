import { Model } from "sequelize-typescript";

export interface uploadMediaInterface extends  Model{
    name: string;
    id: string;
    fileType: string;
    extension: string
}

export interface returnDataInterface {
    type: boolean;
    data:string;
}

export enum mediaType {
  JPEG = 'jpeg',
  PNG = 'png',
  mp4 = 'mp4',
}