import { preparePaging } from './../../utils/prepare-paging.util';
import { ORDER_PENDING } from './../../models/order/constants';
import Order from '../../models/order/order.model';
import OrderInterface from '../../models/order/order.interface';
import statuses from '../../utils/status'
import ResponseDto from '../response.dto';

export default class OrderService {
    private orderModel: Order;

    constructor() {
        this.orderModel = new Order();
    }

    async createOrder(order: OrderInterface): Promise<ResponseDto> {
        const { statusCodes: { CODE_CREATED, CODE_BAD_REQUEST }} = statuses;
        const createdOrder = await this.orderModel.create(order);
        if (!!createdOrder.id && Object.keys(createdOrder).length > 1) {
            return {
                status: CODE_CREATED,
                message: 'Order created',
                data: createdOrder,
            }
        }
            return {
                status: CODE_BAD_REQUEST,
                message: 'Order not created',
                data: null
            }
    }

    async getAllOrders(page: number, limit: number): Promise<ResponseDto> {
        const { offset, limit: resLimit } = preparePaging(page, limit);
        const orders = await this.orderModel.all(offset, resLimit);
        const { statusCodes: { CODE_OK, CODE_NOT_FOUND }} = statuses;
        switch (orders?.length) {
            case 0:
                return { status: CODE_NOT_FOUND, message: 'No orders found', data: null };
            default:
                return { status: CODE_OK, message: 'Orders retrieved', data: orders };
        }
    }

    async getOrderById(id: string): Promise<ResponseDto> {
        const order = await this.orderModel.get(id);
        const { statusCodes: { CODE_OK, CODE_NOT_FOUND }} = statuses;
        switch (order) {
            case null:
                return { status: CODE_NOT_FOUND, message: 'Order not found', data: null };
            default:
                return { status: CODE_OK, message: 'order retrieved', data: order };
        }
    }

    async getByCreatorId(creator: string, page: number, limit: number): Promise<ResponseDto> {
        const { offset, limit: resLimit } = preparePaging(page, limit);
        const orders = await this.orderModel.getByCreatorId(creator, offset, resLimit);
        const { statusCodes: { CODE_OK, CODE_NOT_FOUND }} = statuses;
        switch (orders?.length) {
            case 0:
                return { status: CODE_NOT_FOUND, message: 'No orders found', data: null };
            default:
                return { status: CODE_OK, message: 'Orders retrieved', data: orders };
        }
    }

    async getByZone(zone: string, page: number, limit: number): Promise<ResponseDto> {
        const { offset, limit: resLimit } = preparePaging(page, limit);
        const orders = await this.orderModel.getByZone(zone, offset, resLimit);
        const { statusCodes: { CODE_OK, CODE_NOT_FOUND }} = statuses;
        switch (orders?.length) {
            case 0:
                return { status: CODE_NOT_FOUND, message: 'No orders found', data: null };
            default:
                return { status: CODE_OK, message: 'Orders retrieved', data: orders };
        }
    }

    async updateOrder(id: string, data: Partial<OrderInterface>): Promise<ResponseDto> {
        const order = await this.orderModel.update(id, data);
        const { statusCodes: { CODE_OK, CODE_INTERNAL_SERVER_ERROR }} = statuses;
        if (!!order) {
            return { status: CODE_OK, message: 'Order updated', data: order };
        }
        return { status: CODE_INTERNAL_SERVER_ERROR, message: 'Order not updated', data: null };
    }

    async getPendingOrders(page: number, limit: number): Promise<ResponseDto> {
        const { offset, limit: resLimit } = preparePaging(page, limit);
        const orders = await this.orderModel.getOrderByState(ORDER_PENDING, offset, resLimit);
        const { statusCodes: { CODE_OK, CODE_NOT_FOUND }} = statuses;
        switch (orders) {
            case null:
                return { status: CODE_NOT_FOUND, message: 'No pending orders found', data: null };
            default:
                return { status: CODE_OK, message: 'Pending orders retrieved', data: orders };
        }
    }
}
