import { PrismaClient, Ticket, TicketUser } from '@prisma/client';
import { BuyTicketDto, CreateTicketDto } from '@dtos/ticket.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

class TicketService {
  public ticket = new PrismaClient().ticket;
  public ticketUser = new PrismaClient().ticketUser;

  public findTicket(perPage?: number, numPage?: number): Promise<Ticket[]> {
    let option = {};

    if (!Number.isNaN(perPage)) {
      option = { ...option, ...{ skip: Number(perPage * (numPage - 1)), take: perPage } };
    }

    const Ticket: Promise<Ticket[]> = this.ticket.findMany(option);
    return Ticket;
  }

  public findTicketById(ticketId: number): Promise<Ticket> {
    if (isEmpty(ticketId)) throw new HttpException(400, "You're not ticketId");

    const findTicket: Promise<Ticket> = this.ticket.findUnique({
      where: { id: ticketId },
    });
    if (!findTicket) throw new HttpException(409, "You're not ticket");

    return findTicket;
  }

  public async createTicket(ticketData: CreateTicketDto): Promise<Ticket> {
    if (isEmpty(ticketData)) throw new HttpException(400, "You're not ticketData");

    const findTicket: Ticket = await this.ticket.findUnique({ where: { name: ticketData.name } });
    if (findTicket) throw new HttpException(409, `You're name ${ticketData.name} already exists`);

    const createTicketData: Promise<Ticket> = this.ticket.create({
      data: {
        ...ticketData,
      },
    });
    return createTicketData;
  }

  public async buyTicket(ticketData: BuyTicketDto): Promise<TicketUser> {
    if (isEmpty(ticketData)) throw new HttpException(400, "You're not ticketData");

    const findTicket: Ticket = await this.ticket.findUnique({ where: { id: ticketData.ticketId } });
    if (!findTicket) throw new HttpException(409, `You're name ${ticketData.name} not already exists`);
    if (ticketData.amount < findTicket.minimumBuy) throw new HttpException(400, `minimum buy is ${findTicket.minimumBuy}`);
    const date = new Date();
    const buyToday = await this.ticketUser.findMany({
      where: {
        ticketId: ticketData.ticketId,
        createAt: {
          gte: new Date(date.toISOString().substring(0, 10))
        },
      },
    });
    const sumBuyToday:number = buyToday.reduce((accumulator,curr)=>(accumulator + curr.amount),0)
    if (sumBuyToday > findTicket.amountLimitPerDay) throw new HttpException(400, 'ticket is sold out!');

    const createTicketData: Promise<TicketUser> = this.ticketUser.create({
      data: {
        userId: ticketData.userId,
        ticketId: ticketData.ticketId,
        amount: ticketData.amount,
        totalPrice: (Number(findTicket.price) * ticketData.amount).toFixed(2),
      },
    });
    return createTicketData;
  }

  public async updateTicket(ticketId: number, ticketData: CreateTicketDto): Promise<Ticket> {
    if (isEmpty(ticketData)) throw new HttpException(400, "You're not ticketData");

    const findTicket = await this.ticket.findUnique({
      where: { id: ticketId },
    });
    if (!findTicket) throw new HttpException(409, "You're not ticket");

    const updateTicketData: Promise<Ticket> = this.ticket.update({
      where: { id: ticketId },
      data: {
        ...ticketData,
      },
    });
    return updateTicketData;
  }

  public async deleteTicket(ticketId: number): Promise<Ticket> {
    if (isEmpty(ticketId)) throw new HttpException(400, "You're not ticketId");

    const findTicket: Ticket = await this.ticket.findUnique({ where: { id: ticketId } });
    if (!findTicket) throw new HttpException(409, "You're not ticket");

    const deleteTicketData: Promise<Ticket> = this.ticket.delete({ where: { id: ticketId } });
    return deleteTicketData;
  }
}

export default TicketService;
