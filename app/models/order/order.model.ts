import { ORDER_COLLECTION_NAME } from './constants';
import OrderInterface from './order.interface';
import db from '../../configs/firebase.config';

export default class Order {
    async create(order: OrderInterface) {
        const createdOrder = await this.getCollection().add(order);
        const createdOrderValue = (await createdOrder.get()).data();
        return { id: createdOrder.id, ...createdOrderValue };
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
    async getByCreatorId(creator: string, offset: number, limit: number) {
        const gottenDoc = await this.getCollection().where('creator_id', '==', creator).offset(offset).limit(limit).get();
        return this.getValues(gottenDoc);
    }
    async getByZone(zone: string, offset: number, limit: number) {
        const gottenDoc = await this.getCollection().where('zone_id', '==', zone).offset(offset).limit(limit).get();
        return this.getValues(gottenDoc);
    }

    async update(id: string, data: Partial<OrderInterface>) {
        const gottenDoc = await this.get(id);
        if (gottenDoc) return this.getCollection().doc(id).update(data);
        return null;
    }

    async getOrderByState(state: string, offset: number, limit: number) {
        const gottenDoc = await this.getCollection().where('state', '==', state).offset(offset).limit(limit).get();
        if(gottenDoc.size > 0) return this.getValues(gottenDoc);
        return null;
    }

    private getValues = (gottenDoc: any) => gottenDoc.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
    private getCollection = () => db.collection(ORDER_COLLECTION_NAME);
}
