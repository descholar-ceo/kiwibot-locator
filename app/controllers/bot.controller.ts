import { BOT_AVAILABLE } from './../models/bot/constants';
import { validateCreateBot, validateUpdateBot } from '../middlewares/bot/validations.middleware';
import { sendResponse } from './../utils/respond.util';
import { Request, Response, Router } from 'express';
import R from 'ramda';
import BotService from '../services/bot/bot.service';
 
class BotController {
  private readonly path: string;
  private readonly router: Router;
  private readonly botService: BotService;

  constructor() {
    this.path = '/bots';
    this.router = Router();
    this.botService = new BotService();
    this.intializeRoutes();
  }
 
  private intializeRoutes = () => {
    this.router.get(this.path, this.all.bind(this));
    this.router.post(this.path, validateCreateBot.bind(this), this.create.bind(this));
    this.router.get(`${this.path}/:id`, this.show.bind(this));
    this.router.put(`${this.path}/:id`, validateUpdateBot.bind(this), this.update.bind(this));
    this.router.get(`${this.path}/zone/:zone`, this.getByZone.bind(this));
  }
 
  private all = async (req: Request, res: Response): Promise<void> => {
    const { query: { page, limit }} = req;
    const { status, message, data } = await this.botService.getAllBots(Number(page), Number(limit));
    sendResponse(res, status, message, data);
  }
 
  private create = async (req: Request, res: Response): Promise<void> => {
    const bot: any = R.pick(['zone_id', 'location'], req.body);
    bot.status = BOT_AVAILABLE;
    const { status, message, data } = await this.botService.createBot(bot);
    sendResponse(res, status, message, data);
  }
 
  private show = async (req: Request, res: Response): Promise<void> => {
    const { params: { id }} = req;
    const { status, message, data } = await this.botService.getBotById(id);
    sendResponse(res, status, message, data);
  }

  private getByZone = async (req: Request, res: Response): Promise<void> => {
    const { params: { zone }, query: { page, limit }} = req;
    const { status, message, data } = await this.botService.getByZone(zone, Number(page), Number(limit));
    sendResponse(res, status, message, data);
  }

  private update = async (req: Request, res: Response): Promise<void> => {
    const { params: { id }} = req;
    const dataForUpdate = R.pick(['status', 'zone_id', 'location'], req.body);
    const { status, message, data } = await this.botService.updateBot(id, dataForUpdate);
    sendResponse(res, status, message, data);
  }
}

export default new BotController();
