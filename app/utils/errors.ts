import { NextFunction, Request, RequestHandler, Response } from 'express';

export const validationError = (err: any) => {
  const errors = Object.values(err.errors).map(e => e);
  return { type: false, error: errors[0] };
};

export const use = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => fn(req, res, next);
};
