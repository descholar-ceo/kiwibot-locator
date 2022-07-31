import { BOT_AVAILABLE, BOT_BUSY, BOT_RESERVED } from '../../models/bot/constants';
import { sendResponse } from '../../utils/respond.util';
import { Request, Response, NextFunction } from 'express';
import statuses from '../../utils/status'

export const validateCreateBot = (req: Request, res: Response, next: NextFunction) => {
    const { statusCodes: { CODE_BAD_REQUEST }} = statuses;
    const { zone_id, location } = req.body;
    const errors: string[] = [];
    if(!zone_id) {
        errors.push('zone_id is required');
    }
    if (!location || !location?.lat || !location?.lon) {
        errors.push('location is required, and should have latitude and longitude');
    }
    if (!Number(location?.lat)) {
        errors.push('location.lat should be a number');
    }
    if (!Number(location?.lon)) {
        errors.push('location.lon should be a number');
    }
    if (errors.length > 0) {
        return sendResponse(res, CODE_BAD_REQUEST, 'Invalid request', errors);
    }
    return next();
}

export const validateUpdateBot = (req: Request, res: Response, next: NextFunction) => {
    const { statusCodes: { CODE_BAD_REQUEST }} = statuses;
    const { status, zone_id, location } = req.body;
    const errors: string[] = [];
    if (Object.keys(req.body).length === 0) {
        errors.push('No data provided');
    }
    if (!!status && status.length === 0) {
        errors.push('status should have a value');
    }
    if (!!status && ![BOT_AVAILABLE, BOT_BUSY, BOT_RESERVED].includes(status)) {
        errors.push('status must be one of the following: busy, available, reserved');
    }
    if(!!zone_id && zone_id.length === 0) {
        errors.push('zone_id should have a value');
    }
    if (!!location && !location?.lat && !location?.lon) {
        errors.push('location should have a value, and should have latitude and longitude');
    }
    if (!!location?.lat && !Number(location?.lat)) {
        errors.push('location.lat should be a number');
    }
    if (!!location?.lat && !Number(location?.lon)) {
        errors.push('location.lon should be a number');
    }
    if (errors.length > 0) {
        return sendResponse(res, CODE_BAD_REQUEST, 'Invalid request', { errors });
    }
    return next();
}
