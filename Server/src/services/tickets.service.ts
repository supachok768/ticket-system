import { PrismaClient, Ticket } from '@prisma/client';
import { CreateTicketDto } from '@dtos/ticket.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

class TicketService {
  public ticket = new PrismaClient().ticket;

  public findTicket(perPage?: number, numPage?: number): Promise<Ticket[]> {
    let option = {
    };

    if (!Number.isNaN(perPage)) {
      option = { ...option, ...{ skip: Number(perPage * (numPage - 1)), take: perPage } };
    }

    const Ticket: Promise<Ticket[]> = this.ticket.findMany(option);
    return Ticket;
  }

  public findTicketById(ticketId: number): Promise<Ticket> {
    if (isEmpty(ticketId)) throw new HttpException(400, "You're not ticketId");

    const findTicket: Promise<Ticket> = this.ticket.findUnique({
      where: { id: ticketId }
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

  public async updateTicket(ticketId: number, ticketData: CreateTicketDto): Promise<Ticket> {
    if (isEmpty(ticketData)) throw new HttpException(400, "You're not ticketData");

    const findTicket = await this.ticket.findUnique({
      where: { id: ticketId }
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
