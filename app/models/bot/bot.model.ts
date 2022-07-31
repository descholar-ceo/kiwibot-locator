import { BOT_COLLECTION_NAME } from './constants';
import BotInterface from './bot.interface';
import db from '../../configs/firebase.config';

export default class Bot {
    async create(bot: BotInterface) {
        const createdBot = await this.getCollection().add(bot);
        const createdBotValue = (await createdBot.get()).data();
        return { id: createdBot.id, ...createdBotValue };
    }
    async all(offset: number, limit: number) {
        const gottenDoc = await this.getCollection().offset(offset).limit(limit).get();
        return this.getValues(gottenDoc);
    }
    async get(id: string) {
        const gottenDoc = await this.getCollection().doc(id).get();
        if (gottenDoc.exists) return gottenDoc.data();
        return null;
    }
    async getByZone(zone: string, offset: number, limit: number) {
        const gottenDoc = await this.getCollection().where('zone_id', '==', zone).offset(offset).limit(limit).get();
        return this.getValues(gottenDoc);
    }
    async update(id: string, data: Partial<BotInterface>) {
        const gottenDoc = await this.get(id);
        if (gottenDoc) return this.getCollection().doc(id).update(data);
        return null;
    }

    async getByStatus(status: string, offset: number, limit: number) {
        const gottenDoc = await this.getCollection().where('status', '==', status).offset(offset).limit(limit).get();
        if(gottenDoc.size > 0) return this.getValues(gottenDoc);
        return null;
    }

    private getValues = (gottenDoc: any) => gottenDoc.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
    private getCollection = () => db.collection(BOT_COLLECTION_NAME);
}
