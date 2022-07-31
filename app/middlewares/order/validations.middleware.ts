import { ORDER_ASSIGNED, ORDER_DELIVERED, ORDER_IN_TRANSIT, ORDER_PENDING } from '../../models/order/constants';
import { sendResponse } from '../../utils/respond.util';
import { Request, Response, NextFunction } from 'express';
import statuses from '../../utils/status'

export const validateCreateOrder = (req: Request, res: Response, next: NextFunction) => {
    const { statusCodes: { CODE_BAD_REQUEST }} = statuses;
    const { zone_id, pickup, dropoff } = req.body;
    const errors: string[] = [];
    if(!zone_id) {
        errors.push('zone_id is required');
    }
    if (!pickup || !pickup?.pickup_lat || !pickup?.pickup_lon) {
        errors.push('pickup is required, and should have pickup_lat and pickup_lon');
    }
    if (!Number(pickup?.pickup_lat)) {
        errors.push('pickup.pickup_lat should be a number');
    }
    if (!Number(pickup?.pickup_lon)) {
        errors.push('pickup.pickup_lon should be a number');
    }
    if (!dropoff || !dropoff?.dropoff_lat || !dropoff?.dropoff_lon) {
        errors.push('dropoff is required, and should have dropoff_lat and dropoff_lon');
    }
    if (!Number(dropoff?.dropoff_lat)) {
        errors.push('dropoff.dropoff_lat should be a number');
    }
    if (!Number(dropoff?.dropoff_lon)) {
        errors.push('dropoff.dropoff_lon should be a number');
    }
    if (errors.length > 0) {
        return sendResponse(res, CODE_BAD_REQUEST, 'Invalid request', errors);
    }
    return next();
}

export const validateUpdateOrder = (req: Request, res: Response, next: NextFunction) => {
    const { statusCodes: { CODE_BAD_REQUEST }} = statuses;
    const { state, zone_id, pickup, dropoff } = req.body;
    const errors: string[] = [];
    if (!!state && state.length === 0) {
        errors.push('state should have a value');
    }
    if (!!state && ![ORDER_ASSIGNED, ORDER_DELIVERED, ORDER_IN_TRANSIT, ORDER_PENDING].includes(state)) {
        errors.push(
            `state must be one of the following: ${ORDER_ASSIGNED}, ${ORDER_DELIVERED}, ${ORDER_IN_TRANSIT}, ${ORDER_PENDING}`);
    }
    if(!!zone_id && zone_id.length === 0) {
        errors.push('zone_id should have a value');
    }
    if (!!pickup && !pickup?.pickup_lat && !pickup?.pickup_lon) {
        errors.push('pickup should have a value, and should have pickup_lat and pickup_lon');
    }
    if (!!pickup && !Number(pickup?.pickup_lat)) {
        errors.push('pickup.pickup_lat should be a number');
    }
    if (!!pickup && !Number(pickup?.pickup_lon)) {
        errors.push('pickup.pickup_lon should be a number');
    }
    if (!!dropoff && !dropoff?.dropoff_lat && !dropoff?.dropoff_lon) {
        errors.push('dropoff should have a value, and should have dropoff_lat and dropoff_lon');
    }
    if (!!dropoff && !Number(dropoff?.dropoff_lat)) {
        errors.push('dropoff.dropoff_lat should be a number');
    }
    if (!!dropoff && !Number(dropoff?.dropoff.dropoff_lon)) {
        errors.push('dropoff.dropoff_lon should be a number');
    }
    if (errors.length > 0) {
        return sendResponse(res, CODE_BAD_REQUEST, 'Invalid request', errors);
    }
    return next();
}
