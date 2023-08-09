import {generateRandomDocumentName} from "@app/utils/helpers";
import {
    GetObjectCommand,
    GetObjectRequest,
    PutObjectCommand,
    PutObjectRequest,
    S3Client,
    S3ClientConfig
} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";
import {returnDataInterface} from "@app/resources/media/interfaces/media.interfaces";
const bucketName: string | undefined = process.env.AWS_BUCKET_NAME;
const accessKeyId:  string | undefined = process.env.AWS_BUCKET_ACCESS_KEY;
const secretAccessKey:  string | undefined = process.env.AWS_BUCKET_SECRET_KEY;
const region:  string | undefined = process.env.AWS_BUCKET_REGION;


if(!region || !accessKeyId || !secretAccessKey) {
  throw new Error("Credentials not provided");
}

const s3ClientConfig: S3ClientConfig = {
  region: region,
  credentials: {
    accessKeyId: accessKeyId as string,
    secretAccessKey:secretAccessKey as string
  }
};
const s3: S3Client = new S3Client(s3ClientConfig);
const returnData = (type: boolean, data: string): returnDataInterface => ({type, data})

export const uploadMediaTos3 = async(dir:string, file: any): Promise<returnDataInterface> => {
    const documentName:string = generateRandomDocumentName(16);
    const params: PutObjectRequest = {
        Bucket: bucketName,
        Key:`${dir}/${documentName}`,
        Body: file.buffer,
        ContentType: file.mimetype
    }
    try {
          const uploadDocumentToS3: PutObjectCommand = new PutObjectCommand(params);
          await s3.send(uploadDocumentToS3);
          return returnData(true, documentName)
    }catch (e) {
      return returnData(false, "Oops something went wrong while uploading document")
    }
}

export const GetMediaFromS3 = async (filename:string, dir: any = null): Promise<returnDataInterface> => {
  const params: GetObjectRequest = {
    Bucket: bucketName,
    Key: dir === null ? filename : `${dir}/${filename}`
  };
  try {
    const getImageUrlCommand: GetObjectCommand = new GetObjectCommand(params);
    const url: string = await getSignedUrl(s3, getImageUrlCommand, {
      expiresIn: 3600
    });
    return returnData(true, url)
  } catch (error) {
    return returnData(false, 'Unable to retrieve data')
  }
};