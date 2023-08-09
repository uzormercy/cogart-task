import { Request, Response}  from 'express'
import {respond} from "@app/utils/respond";
import {uploadMediaTos3} from "@app/libs/aws.services";
import {
    extractAudioService,
    imageTransformService,
    uploadMediaService,
    waterMarkVideoService
} from "@app/resources/media/media.service";
import { returnDataInterface} from "@app/resources/media/interfaces/media.interfaces";
import ffmpeg from "fluent-ffmpeg";
ffmpeg.setFfmpegPath(require('@ffmpeg-installer/ffmpeg').path)


export const uploadMedia = async (req: Request, res: Response): Promise<any> => {
    const { file } = req;
    if(!file) return respond({status: 422, title: 'Validation error', message: 'Please provide a valid media'})(res)
    const getFileOriginalName: string[] = file.originalname.split('.');
    const getFileExtension: string = getFileOriginalName[getFileOriginalName.length - 1];
     const url = req.originalUrl;
      const urlSegments = url.split('/');
      const whichMediaType: string  = urlSegments.pop() === 'images' ? 'image' : 'video';

    const doUploadToS3:returnDataInterface = await uploadMediaTos3(`${whichMediaType}s`, file);
    if(!doUploadToS3.type) return respond({status: 422, title: 'Upload fail', message: 'Media upload fails'})(res);
    const buildData = {
        extension: getFileExtension,
        fileType: whichMediaType,
        name: doUploadToS3.data
    }
    const store = await uploadMediaService(buildData);
    return respond({status: store.status, title: store.title, message:store.message, entity:store.entity })(res)
}

export const imageTransform = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const { width, height, rotation} = req.body
    const image =  await  imageTransformService({id, width, height, rotation});
    return respond({status: image.status, title: image.title, message: image.message})(res);
}

export const waterMarkVideo = async (req: Request, res: Response) : Promise<any> => {
    const { id } = req.params;
    const  {text} = req.body;
    const video  =  await waterMarkVideoService(id, text);
    const stream = ffmpeg(video.entity.url);
     const textBuffer = Buffer.from(text);
    const dks: Array<any> = text;
    stream
    .addInput(video.entity.url)
    .complexFilter([
    {
      filter: 'drawtext',
      options: {
        text: textBuffer.toString(),
        x: 100,
        y: 100
      }
    }
  ])
    .saveToFile(`/tmp/${video.name}.mp4`)
    .on('end', () => {
      res.download(`/tmp/${video.name}.mp4`);
    });
}

export const extractAudioVideo = async (req: Request, res: Response)  :  Promise<any>=> {
       const { id } = req.params;
       const video  =  await extractAudioService(id);
       ffmpeg(video.data)
        .outputOptions(['-vn'])
        .save(`/tmp/${video.entity.name}.mp3`)
        .on('end', () => {
          res.download(`/tmp/${video.entity.name}.mp3`);
        });
}