import { ORDER_PENDING } from './../../models/order/constants';
import { BOT_AVAILABLE } from '../../models/bot/constants';
import { sendResponse } from '../../utils/respond.util';
import { Request, Response, NextFunction } from 'express';
import statuses from '../../utils/status';
import BotService from '../../services/bot/bot.service';
import OrderService from '../../services/order/order.service';

export const validateCreateBotOrder = async (req: Request, res: Response, next: NextFunction) => {
    const { statusCodes: { CODE_BAD_REQUEST, CODE_NOT_FOUND }} = statuses;
    const { bot_id, order_id } = req.body;
    const errors: string[] = [];
    if (!!bot_id) {
        const bot = await new BotService().getBotById(bot_id);
        if (bot.status === CODE_NOT_FOUND) {
            errors.push('bot_id is invalid');
        }
        if (!!bot?.data && bot?.data?.status !== BOT_AVAILABLE) {
            errors.push('bot is not available');
        }
    }
    if (!!order_id) {
        const order = await new OrderService().getOrderById(order_id);
        if (order.status === CODE_NOT_FOUND) {
            errors.push('order_id is invalid');
        }
        if (!!order?.data && order?.data?.state !== ORDER_PENDING) {
            errors.push('order is not pending');
        }
    }
    if (!bot_id) {
        errors.push('bot_id is required');
    }
    if(!order_id) {
        errors.push('order_id is required');
    }
    if (errors.length > 0) {
        return sendResponse(res, CODE_BAD_REQUEST, 'Invalid request', errors);
    }
    return next();
}
