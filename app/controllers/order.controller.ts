import { validateCreateOrder, validateUpdateOrder } from './../middlewares/order/validations.middleware';
import { sendResponse } from '../utils/respond.util';
import { Request, Response, Router } from 'express';
import R from 'ramda';
import OrderService from '../services/order/order.service';
import { ORDER_PENDING } from '../models/order/constants';
 
class OrderController {
  private readonly path: string;
  private readonly router: Router;
  private readonly orderService: OrderService;

  constructor() {
    this.path = '/orders';
    this.router = Router();
    this.orderService = new OrderService();
    this.intializeRoutes();
  }
 
  private intializeRoutes = () => {
    this.router.get(this.path, this.all.bind(this));
    this.router.post(this.path, validateCreateOrder.bind(this), this.create.bind(this));
    this.router.get(`${this.path}/:id`, this.show.bind(this));
    this.router.put(`${this.path}/:id`, validateUpdateOrder.bind(this), this.update.bind(this));
    this.router.get(`${this.path}/creator/:ceator`, this.getByCreatorId.bind(this));
    this.router.get(`${this.path}/zone/:zone`, this.getByZone.bind(this));
  }
 
  private all = async (req: Request, res: Response): Promise<void> => {
    const { query: { page, limit} } = req;
    const { status, message, data } = await this.orderService.getAllOrders(Number(page), Number(limit));
    sendResponse(res, status, message, data);
  }
 
  private create = async (req: Request, res: Response): Promise<void> => {
    const order: any = R.pick(['zone_id', 'pickup', 'dropoff'], req.body);
    order.creator_id = 'randomuserid';
    order.state = ORDER_PENDING;
    order.creation_date = new Date();
    const { status, message, data } = await this.orderService.createOrder(order);
    sendResponse(res, status, message, data);
  }
 
  private show = async (req: Request, res: Response): Promise<void> => {
    const { params: { id }} = req;
    const { status, message, data } = await this.orderService.getOrderById(id);
    sendResponse(res, status, message, data);
  }

  private getByZone = async (req: Request, res: Response): Promise<void> => {
    const { params: { zone }, query: {page, limit}} = req;
    const { status, message, data } = await this.orderService.getByZone(zone, Number(page), Number(limit));
    sendResponse(res, status, message, data);
  }

  private update = async (req: Request, res: Response): Promise<void> => {
    const { params: { id }} = req;
    const dataForUpdate = R.pick(['state', 'zone_id', 'pickup', 'dropoff'], req.body);
    const { status, message, data } = await this.orderService.updateOrder(id, dataForUpdate);
    sendResponse(res, status, message, data);
  }

  private getByCreatorId = async (req: Request, res: Response): Promise<void> => {
    const { params: { ceator }, query: { page, limit }} = req;
    const { status, message, data } = await this.orderService.getByCreatorId(ceator, Number(page), Number(limit));
    sendResponse(res, status, message, data);
  }
}

export default new OrderController();
