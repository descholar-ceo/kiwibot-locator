import { ORDER_PENDING } from './../order/constants';
import { BOT_AVAILABLE } from './../bot/constants';
import { BOT_ORDER_COLLECTION_NAME } from './constants';
import BotOrderInterface from './bot-order.interface';
import db from '../../configs/firebase.config';
import Bot from '../bot/bot.model';
import Order from '../order/order.model';

export default class BotOrder {
  private readonly botModel: Bot;
  private readonly orderModel: Order;
  constructor () {
    this.botModel = new Bot();
    this.orderModel = new Order();
  }

  async create(botOrder: BotOrderInterface) {
    const createdBotOrder = await this.getCollection().add(botOrder);
    const createdBotOrderValue = (await createdBotOrder.get()).data();
    return { id: createdBotOrder.id, ...createdBotOrderValue };
  }

  async all(offset: number, limit: number) {
    const gottenDoc = await (await this.getCollection().offset(offset).limit(limit).get());
    return this.getValues(gottenDoc);
  }

  async get(id: string) {
    const gottenDoc = await this.getCollection().doc(id).get();
    if (gottenDoc.exists) {
      const bots = await this.botModel.get(gottenDoc.data()?.bot_id);
      const orders = await this.orderModel.get(gottenDoc.data()?.order_id);
      return { bots, orders };
    };
    return null;
  }

  async getByBotId(id: string, offset: number, limit: number) {
    const gottenDoc = await this.getCollection().where('bot_id', '==', id).offset(offset).limit(limit).get();
    if (gottenDoc.size > 0) {
      const bot = await this.botModel.get(id);
      const orders = [];
      for (const doc of gottenDoc.docs) {
        const gottenOrder = await this.orderModel.get(doc.data()?.order_id);
        if(!!gottenOrder) orders.push(gottenOrder);
      }
      return { bot, orders };
    };
    return null;
  }

  async getByOrderId(id: string, offset: number, limit: number) {
    const gottenDoc = await this.getCollection().where('order_id', '==', id).offset(offset).limit(limit).get();
    if (gottenDoc.size > 0) {
      const order = await this.orderModel.get(id);
      const bots = [];
      for (const doc of gottenDoc.docs) {
        const gottenBot = await this.botModel.get(doc.data()?.bot_id);
        if(!!gottenBot) bots.push(gottenBot);
      }
      return { bots, order };
    };
    return null;
  }
  
  async removeOrderFromBot(id: string) {
    let gottenDoc = await this.getCollection().where('bot_id', '==', id).get();
    if (gottenDoc.empty) gottenDoc = await this.getCollection().where('order_id', '==', id).get();
    let isDeleted = false;
    if (gottenDoc.empty) {
      return isDeleted;
    }
    for (const doc of gottenDoc.docs) {
      const gottenDoc = doc.data();
      if (await this.delete(doc.id)) {
        await this.botModel.update(gottenDoc.bot_id, { status: BOT_AVAILABLE });
        await this.orderModel.update(gottenDoc.order_id, { state: ORDER_PENDING });
        isDeleted = true;
      }
    }
    return isDeleted;
  }

 private async delete(id: string) {
    const gottenDoc = await this.get(id);
    if (gottenDoc) return this.getCollection().doc(id).delete();
    return null;
  }
  
  private getValues = (gottenDoc: any) =>
    gottenDoc.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));

  private getCollection = () => db.collection(BOT_ORDER_COLLECTION_NAME);
}
