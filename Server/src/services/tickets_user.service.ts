import { PrismaClient, Ticket, TicketUser } from '@prisma/client';
import { BuyTicketDto, CreateTicketDto } from '@dtos/ticket.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

class TicketUserService {
  public ticketUser = new PrismaClient().ticketUser;

  public findTicketUser(userId: number, perPage?: number, numPage?: number): Promise<TicketUser[]> {
    let option = {
      where: { userId: userId },
      include: {
        Ticket: true,
      },
    };

    if (!Number.isNaN(perPage)) {
      option = { ...option, ...{ skip: Number(perPage * (numPage - 1)), take: perPage } };
    }

    const TicketUser: Promise<TicketUser[]> = this.ticketUser.findMany(option);
    return TicketUser;
  }
}

export default TicketUserService;
