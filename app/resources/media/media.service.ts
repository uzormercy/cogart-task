
import {v4 as uuid} from "uuid"
import {uploadMediaInterface} from "@app/resources/media/interfaces/media.interfaces";
import {failResult, returnResult} from "@app/utils/respond";
import {GetMediaFromS3} from "@app/libs/aws.services";
import fetch from "node-fetch";
import sharp from "sharp"
import { Readable } from "stream";
import { Media } from "@app/models/media";


export const uploadMediaService = async (uploadImageDto: any): Promise<any> => {
    const uploadMedia: uploadMediaInterface ={
        id: uuid(),
        ...uploadImageDto
    }
    const media =  await Media.create(uploadMedia);
    if(!media) return failResult('Unable to upload media correctly');
    return returnResult(true, {
        status: 201,
        title: 'Media Upload',
        message: 'Media was uploaded successfully',
        entity: media.id
    })
}

export const imageTransformService = async (transformDto: any) => {
    const { width, height, id, rotation} = transformDto;
    const image: Media | null = await Media.findOne({where: { id }});
   if(!image) return failResult('Unable to retrieve image')
    const retrieveS3Image = await GetMediaFromS3(image.name, 'images');
   if(!retrieveS3Image.type) return failResult('Oops something went wrong')
    const toBuffer: Buffer = await convertToBuffer(retrieveS3Image.data);
    const transformations: Promise<Buffer> =  sharp(toBuffer).rotate((rotation)).resize(width, height).toBuffer();
    return returnResult(true, {status: 200, title: "Image Transform", message: 'Image transform completed'})
}

export const convertToBuffer = async(url: string):Promise<Buffer> => {
    const res = await fetch(url);
    return res.buffer();
}

export const waterMarkVideoService = async (id:string, waterMark: string) => {
    const video: Media | null = await Media.findOne({where: { id }});
    if(!video) return failResult('Unable to retrieve video')
    const retrieveS3Image = await GetMediaFromS3(video.name, 'videos');
   if(!retrieveS3Image.type) return failResult('Oops something went wrong');
    const textStream = new Readable();
    textStream.push(Buffer.from(waterMark));
    textStream.push(null);
    return returnResult(true, {
        status: 200,
        title: 'Water mark Video',
        message: "",
        entity: {
            text: textStream,
            url: retrieveS3Image.data
        }
    })
}

export const extractAudioService = async (id: string) => {
    const video: Media | null = await Media.findOne({where: { id }});
    if(!video) return failResult('Unable to retrieve video')
    const retrieveS3Image = await GetMediaFromS3(video.name, 'videos');
   if(!retrieveS3Image.type) return failResult('Oops something went wrong');
    return returnResult(true, {
        status: 200,
        title: 'Extract audio',
        message: "",
        entity: {
            video: retrieveS3Image.data,
            name: video.name
        }
    })
}