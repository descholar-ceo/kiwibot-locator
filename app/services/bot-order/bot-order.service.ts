import { preparePaging } from './../../utils/prepare-paging.util';
import { getDistanceBetweenTwoCoodinates } from './../../utils/distance';
import { ORDER_ASSIGNED, ORDER_PENDING } from './../../models/order/constants';
import { BOT_BUSY, BOT_AVAILABLE } from './../../models/bot/constants';
import BotOrder from '../../models/bot-order/bot-order.model';
import BotOrderInterface from '../../models/bot-order/bot-order.interface';
import statuses from '../../utils/status';
import ResponseDto from '../response.dto';
import BotService from '../bot/bot.service';
import OrderService from '../order/order.service';
import BotInterface from '../../models/bot/bot.interface';
import OrderInterface from '../../models/order/order.interface';

export default class BotOrderService {
    private readonly botOrderModel: BotOrder;
    private readonly botService: BotService;
    private readonly orderService: OrderService;
    constructor() {
        this.botOrderModel = new BotOrder();
        this.botService = new BotService();
        this.orderService = new OrderService();
    }

    async createBotOrder(botOrder: BotOrderInterface): Promise<ResponseDto> {
        const { statusCodes: { CODE_CREATED, CODE_BAD_REQUEST }} = statuses;
        const createdBotOrder = await this.botOrderModel.create(botOrder);
        if (!!createdBotOrder.id && Object.keys(createdBotOrder).length > 1) {
            await this.botService.updateBot(botOrder.bot_id, { status: BOT_BUSY });
            await this.orderService.updateOrder(botOrder.order_id, { state: ORDER_ASSIGNED });
            return {
                status: CODE_CREATED,
                message: 'Order was assigned to bot',
                data: createdBotOrder,
            }
        }
            return {
                status: CODE_BAD_REQUEST,
                message: 'Order was not assigned to bot',
                data: null
            }
    }

    async getAllBotOrders(page: number, limit: number): Promise<ResponseDto> {
        const { offset, limit: resLimit } = preparePaging(page, limit);
        const orders = await this.botOrderModel.all(offset, resLimit);
        const { statusCodes: { CODE_OK, CODE_NOT_FOUND }} = statuses;
        switch (orders?.length) {
            case 0:
                return { status: CODE_NOT_FOUND, message: 'No assignment found yet', data: null };
            default:
                return { status: CODE_OK, message: 'Orders retrieved', data: orders };
        }
    }

    async getBotOrderById(id: string): Promise<ResponseDto> {
        const order = await this.botOrderModel.get(id);
        const { statusCodes: { CODE_OK, CODE_NOT_FOUND }} = statuses;
        switch (order) {
            case null:
                return { status: CODE_NOT_FOUND, message: 'Order not found', data: null };
            default:
                return { status: CODE_OK, message: 'order retrieved', data: order };
        }
    }

    async getByBotId(id: string, page: number, limit: number): Promise<ResponseDto> {
        const { offset, limit: resLimit } = preparePaging(page, limit);
        const order = await this.botOrderModel.getByBotId(id, offset, resLimit);
        const { statusCodes: { CODE_OK, CODE_NOT_FOUND }} = statuses;
        switch (order) {
            case null:
                return { status: CODE_NOT_FOUND, message: 'Order not found', data: null };
            default:
                return { status: CODE_OK, message: 'order retrieved', data: order };
        }
    }

    async getByOrderId(id: string, page: number, limit: number): Promise<ResponseDto> {
        const { offset, limit: resLimit } = preparePaging(page, limit);
        const order = await this.botOrderModel.getByOrderId(id, offset, resLimit);
        const { statusCodes: { CODE_OK, CODE_NOT_FOUND }} = statuses;
        switch (order) {
            case null:
                return { status: CODE_NOT_FOUND, message: 'Order not found', data: null };
            default:
                return { status: CODE_OK, message: 'order retrieved', data: order };
        }
    }

    async removeOrderFromBot(id: string): Promise<ResponseDto> {
        const isDeleted = await this.botOrderModel.removeOrderFromBot(id);
        const { statusCodes: { CODE_OK, CODE_INTERNAL_SERVER_ERROR }} = statuses;
        if (isDeleted) {
            return { status: CODE_OK, message: 'Order removed', data: null };
        }
        return { status: CODE_INTERNAL_SERVER_ERROR, message: 'Order not removed', data: null };
    }
    async getOrdersSuggestionForBotByDistance(id: string, page: number, limit: number): Promise<ResponseDto> {
        const { statusCodes: { CODE_OK }} = statuses;
        const bot = await this.botService.getBotById(id);
        if (bot?.status !== CODE_OK || bot?.data?.status !== BOT_AVAILABLE) {
            return { status: bot?.status, message: bot?.message, data: null };
        }
        const pendingOrders = await this.orderService.getPendingOrders(page, limit);
        if (pendingOrders?.status !== CODE_OK) {
            return { status: pendingOrders?.status, message: pendingOrders?.message, data: null };
        }
        const foundOrders = pendingOrders?.data ?? [];
        const distancedOrders: any[] = [];
        for (const order of foundOrders) {
            const { lat, lon } = bot?.data?.location;
            const { pickup_lat, pickup_lon } = order?.pickup;
            const distance = getDistanceBetweenTwoCoodinates(lat, lon, pickup_lat, pickup_lon);
            distancedOrders.push({ order, distanceFromThisBotInKM: distance });
        }
        return { status: CODE_OK, message: 'Suggestions retrieved', data: this.sortArr(distancedOrders) };
    }
    async getBotsSuggestionForOrderByDistance(id: string, page: number, limit: number): Promise<ResponseDto> {
        const { statusCodes: { CODE_OK, CODE_BAD_REQUEST }} = statuses;
        const order = await this.orderService.getOrderById(id);
        if (order?.status !== CODE_OK || order?.data?.state !== ORDER_PENDING) {
            return { status: CODE_BAD_REQUEST, message: 'This order is not pending or not found', data: null };
        }
        const availableBots = await this.botService.getAvailableBot(page, limit);
        if (availableBots?.status !== CODE_OK) {
            return { status: availableBots?.status, message: availableBots?.message, data: null };
        }
        const foundBots = availableBots?.data ?? [];
        const distancedBots: any[] = [];
        for (const bot of foundBots) {
            const { lat, lon } = bot?.location;
            const { pickup_lat, pickup_lon } = order?.data?.pickup;
            const distance = getDistanceBetweenTwoCoodinates(pickup_lat, pickup_lon, lat, lon);
            distancedBots.push({ bot, distanceFromThisOrderInKM: distance });
        }
        return { status: CODE_OK, message: 'Suggestions retrieved', data: this.sortArr(distancedBots) };
    }
    async getBotsSuggestionForOrderByZone(id: string, page: number, limit: number): Promise<ResponseDto> {
        const { statusCodes: { CODE_OK, CODE_BAD_REQUEST, CODE_NOT_FOUND }} = statuses;
        const order = await this.orderService.getOrderById(id);
        if (order?.status !== CODE_OK || order?.data?.state !== ORDER_PENDING) {
            return { status: CODE_BAD_REQUEST, message: 'This order is not pending or not found', data: null };
        }
        const botsOfTheSameZone = await this.botService.getByZone(order?.data?.zone_id, page, limit);
        if (botsOfTheSameZone?.status !== CODE_OK || botsOfTheSameZone?.data?.length <= 0) {
            return { status: botsOfTheSameZone?.status, message: botsOfTheSameZone?.message, data: null };
        }
        const availableBots = botsOfTheSameZone?.data.filter((bot: BotInterface) => bot.status === BOT_AVAILABLE);
        if (availableBots?.length <= 0) {
            return { status: CODE_NOT_FOUND, message: 'No available bots in the zone of the order specified', data: null };
        }
        const distancedBots: any[] = [];
        for (const bot of availableBots) {
            const { lat, lon } = bot?.location;
            const { pickup_lat, pickup_lon } = order?.data?.pickup;
            const distance = getDistanceBetweenTwoCoodinates(pickup_lat, pickup_lon, lat, lon);
            distancedBots.push({ bot, distanceFromThisOrderInKM: distance });
        }
        return { status: CODE_OK, message: 'Suggestions retrieved', data: this.sortArr(distancedBots) };
    }
    async getOrdersSuggestionForBotByZone(id: string, page: number, limit: number): Promise<ResponseDto> {
        const { statusCodes: { CODE_OK, CODE_NOT_FOUND }} = statuses;
        const bot = await this.botService.getBotById(id);
        if (bot?.status !== CODE_OK || bot?.data?.status !== BOT_AVAILABLE) {
            return { status: bot?.status, message: bot?.message, data: null };
        }
        const ordersOfTheSameZone = await this.orderService.getByZone(bot?.data?.zone_id, page, limit);
        if (ordersOfTheSameZone?.status !== CODE_OK) {
            return { status: ordersOfTheSameZone?.status, message: ordersOfTheSameZone?.message, data: null };
        }
        const pendingOrders = ordersOfTheSameZone?.data?.filter((order: OrderInterface) => order.state === ORDER_PENDING);
        if(pendingOrders?.length <= 0) {
            return { status: CODE_NOT_FOUND, message: 'No pending orders found from the zone of the specified bot', data: null}
        }
        const distancedOrders: any[] = [];
        for (const order of pendingOrders) {
            const { lat, lon } = bot?.data?.location;
            const { pickup_lat, pickup_lon } = order?.pickup;
            const distance = getDistanceBetweenTwoCoodinates(lat, lon, pickup_lat, pickup_lon);
            distancedOrders.push({ order, distanceFromThisBotInKM: distance });
        }
        return { status: CODE_OK, message: 'Suggestions retrieved', data: this.sortArr(distancedOrders) };
    }

    private sortArr = (arr: any[] = []) => arr.sort((elt1, elt2) => 
        elt1.distanceFromThisBotInKM - elt2.distanceFromThisBotInKM);
}
