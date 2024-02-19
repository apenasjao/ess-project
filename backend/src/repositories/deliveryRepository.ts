import prisma from '@database';
import { Prisma, Delivery } from '@prisma/client';

class DeliveryRepository {
    async create(data: Prisma.DeliveryCreateInput): Promise<Delivery> {
        const delivery = await prisma.delivery.create({ data });
        return delivery;
    }

    async findById(id: number): Promise<Delivery | null> {
        const delivery = await prisma.delivery.findUnique({ where: { id } });
        return delivery;
    }

    async update(id: number, data: Prisma.DeliveryUpdateInput): Promise<Delivery> {
        const delivery = await prisma.delivery.update({ where: { id }, data });
        return delivery;
      }

    async delete(id: number): Promise<Delivery> {
        const delivery = await prisma.delivery.delete({ where: { id } });
        return delivery;
    }

    async findAll(): Promise<Delivery[]> {
        const delivery = await prisma.delivery.findMany();
        return delivery;
    }
}

export default new DeliveryRepository();