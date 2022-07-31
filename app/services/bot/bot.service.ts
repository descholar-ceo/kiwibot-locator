import { BOT_AVAILABLE } from './../../models/bot/constants';
import { preparePaging } from './../../utils/prepare-paging.util';
import Bot from '../../models/bot/bot.model';
import BotInterface from '../../models/bot/bot.interface';
import statuses from '../../utils/status'
import ResponseDto from '../response.dto';

export default class BotService {
    private botModel: Bot;

    constructor() {
        this.botModel = new Bot();
    }

    async createBot(bot: BotInterface): Promise<ResponseDto> {
        const { statusCodes: { CODE_CREATED, CODE_BAD_REQUEST }} = statuses;
        const createdBot = await this.botModel.create(bot);
        if (!!createdBot.id && Object.keys(createdBot).length > 1) {
            return {
                status: CODE_CREATED,
                message: 'Bot created',
                data: createdBot,
            }
        }
            return {
                status: CODE_BAD_REQUEST,
                message: 'Bot not created',
                data: null
            }
    }

    async getAllBots(page: number, limit: number): Promise<ResponseDto> {
        const { offset, limit: resLimit } = preparePaging(page, limit);
        const bots = await this.botModel.all(offset, resLimit);
        const { statusCodes: { CODE_OK, CODE_NOT_FOUND }} = statuses;
        switch (bots?.length) {
            case 0:
                return { status: CODE_NOT_FOUND, message: 'No bots found', data: null };
            default:
                return { status: CODE_OK, message: 'Bots retrieved', data: bots };
        }
    }

    async getBotById(id: string): Promise<ResponseDto> {
        const bot = await this.botModel.get(id);
        const { statusCodes: { CODE_OK, CODE_NOT_FOUND }} = statuses;
        switch (bot) {
            case null:
                return { status: CODE_NOT_FOUND, message: 'Bot not found', data: null };
            default:
                return { status: CODE_OK, message: 'Bot retrieved', data: bot };
        }
    }

    async getByZone(zone: string, page: number, limit: number): Promise<ResponseDto> {
        const { offset, limit: resLimit } = preparePaging(page, limit);
        const bots = await this.botModel.getByZone(zone, offset, resLimit);
        const { statusCodes: { CODE_OK, CODE_NOT_FOUND }} = statuses;
        switch (bots?.length) {
            case 0:
                return { status: CODE_NOT_FOUND, message: 'No bots found', data: null };
            default:
                return { status: CODE_OK, message: 'Bots retrieved', data: bots };
        }
    }

    async updateBot(id: string, data: Partial<BotInterface>): Promise<ResponseDto> {
        const bot = await this.botModel.update(id, data);
        const { statusCodes: { CODE_OK, CODE_INTERNAL_SERVER_ERROR }} = statuses;
        if (!!bot) {
            return { status: CODE_OK, message: 'Bot updated', data: bot };
        }
        return { status: CODE_INTERNAL_SERVER_ERROR, message: 'Bot not updated', data: null };
    }

    async getAvailableBot(page: number, limit: number): Promise<ResponseDto> {
        const { offset, limit: resLimit } = preparePaging(page, limit);
        const bot = await this.botModel.getByStatus(BOT_AVAILABLE, offset, resLimit);
        const { statusCodes: { CODE_OK, CODE_NOT_FOUND }} = statuses;
        switch (bot) {
            case null:
                return { status: CODE_NOT_FOUND, message: 'Bot not found', data: null };
            default:
                return { status: CODE_OK, message: 'Bot retrieved', data: bot };
        }
    }
}
