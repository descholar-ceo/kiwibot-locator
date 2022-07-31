import { validateCreateBotOrder } from './../middlewares/bot-orders/validation.middleware';
import { sendResponse } from '../utils/respond.util';
import { Request, Response, Router } from 'express';
import R from 'ramda';
import BotOrderService from '../services/bot-order/bot-order.service';
 
class BotOrderController {
  private readonly path: string;
  private readonly router: Router;
  private readonly botOrderService: BotOrderService;

  constructor() {
    this.path = '/bot-orders';
    this.router = Router();
    this.botOrderService = new BotOrderService();
    this.intializeRoutes();
  }
 
  private intializeRoutes = () => {
    this.router.get(this.path, this.all.bind(this));
    this.router.post(this.path, validateCreateBotOrder.bind(this), this.create.bind(this));
    this.router.get(`${this.path}/:id`, this.show.bind(this));
    this.router.delete(`${this.path}/:id`, this.removeOrderFromBot.bind(this));
    this.router.get(`${this.path}/bot/:botId`, this.getByBotId.bind(this));
    this.router.get(`${this.path}/bot/suggestion/:botId`, this.getOrdersSuggestionForBotByDistance.bind(this));
    this.router.get(`${this.path}/order/:orderId`, this.getByOrderId.bind(this));
    this.router.get(`${this.path}/order/suggestion/:orderId`, this.getBotsSuggestionForOrderByDistance.bind(this));
  }
 
  private all = async (req: Request, res: Response): Promise<void> => {
    const { query: { page, limit }} = req;
    const { status, message, data } = await this.botOrderService.getAllBotOrders(Number(page), Number(limit));
    sendResponse(res, status, message, data);
  }
 
  private create = async (req: Request, res: Response): Promise<void> => {
    const botOrder: any = R.pick(['bot_id', 'order_id'], req.body);
    const { status, message, data } = await this.botOrderService.createBotOrder(botOrder);
    sendResponse(res, status, message, data);
  }
 
  private show = async (req: Request, res: Response): Promise<void> => {
    const { params: { id }} = req;
    const { status, message, data } = await this.botOrderService.getBotOrderById(id);
    sendResponse(res, status, message, data);
  }

  private getByBotId = async (req: Request, res: Response): Promise<void> => {
    const { params: { botId }, query: { page, limit }} = req;
    const { status, message, data } = await this.botOrderService.getByBotId(botId, Number(page), Number(limit));
    sendResponse(res, status, message, data);
  }

  private removeOrderFromBot = async (req: Request, res: Response): Promise<void> => {
    const { params: { id }} = req;
    const { status, message, data } = await this.botOrderService.removeOrderFromBot(id);
    sendResponse(res, status, message, data);
  }

  private getByOrderId = async (req: Request, res: Response): Promise<void> => {
    const { params: { orderId }, query: { page, limit }} = req;
    const { status, message, data } = await this.botOrderService.getByOrderId(orderId, Number(page), Number(limit));
    sendResponse(res, status, message, data);
  }

  private getOrdersSuggestionForBotByDistance = async (req: Request, res: Response): Promise<void> => {
    const { params: { botId }, query: { page, limit }} = req;
    const { status, message, data } = await this.botOrderService.getOrdersSuggestionForBotByDistance(botId, Number(page), Number(limit));
    sendResponse(res, status, message, data);
  }

  private getBotsSuggestionForOrderByDistance = async (req: Request, res: Response): Promise<void> => {
    const { params: { orderId }, query: { page, limit }} = req;
    const { status, message, data } = await this.botOrderService.getBotsSuggestionForOrderByDistance(orderId, Number(page), Number(limit));
    sendResponse(res, status, message, data);
  }
}

export default new BotOrderController();
