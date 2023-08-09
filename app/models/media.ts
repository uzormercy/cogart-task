import { Table, Column, Model } from 'sequelize-typescript';
@Table({
  tableName: 'medias',
  timestamps: true,
  underscored: true,
  modelName: 'Media',
})
export class Media extends Model<Media> {
  @Column
  name: string;

  @Column
  fileType: string

  @Column
  extension: string
}