export const returnResult = (type: boolean, data: any) => ({ type, ...data });
import { Response } from 'express';

interface responseData {
  type?: boolean;
  status: number;
  title: string;
  message: string;
  entity?: any;
}

export const failResult = (err: string) =>
  returnResult(false, {
    status: 422,
    title: 'Oops something went wrong',
    message: err,
  });

export const response = (data: responseData) => (entity: any) => (res: Response) =>
  res.status(data.status).send({ ...data, entity });

export const respond = (data: responseData) => (res: Response) => {
  const { type, ...result } = data;
  return res.status(data.status).send({ ...result });
};
