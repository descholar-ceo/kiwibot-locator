import {Response} from 'express';
export const sendResponse = (res: Response, code: number, message: string, data: any) => res.status(code).json({
    message,
    data
});
