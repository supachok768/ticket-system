import { Inventory } from '@/interfaces/inventory.interface';
import { PrismaClient, Ticket, TicketUser } from '@prisma/client';
import TicketService from './tickets.service';

class TicketUserService {
  public ticketUser = new PrismaClient().ticketUser;
  public issue = new PrismaClient().issue;
  public ticket = new TicketService();
  public async findTicketUser(userId: number, perPage: number = NaN, numPage: number = NaN) {
    // let option = ;

    // if (!Number.isNaN(perPage)) {
    //   option = { ...option, ...{ skip: Number(perPage * (numPage - 1)), take: perPage } };
    // }

    const ticket: Ticket[] = await this.ticket.findTicket();

    const TicketInventory = await this.ticketUser.groupBy({
      by: ['ticketId'],
      where: { userId: userId },
      _sum: {
        amount: true,
      },
    });

    const TicketUsed = await this.issue.groupBy({
      by: ['ticketId'],
      where: { requestFromId: userId },
      _count: true,
    });

    const Inventory: Array<Inventory> = TicketInventory.map(ticketSum => {
      const ticketInfo: Ticket = ticket.find((x: Ticket) => x.id == ticketSum.ticketId);
      const findTicketUsed = TicketUsed.find(x => x.ticketId == ticketSum.ticketId);
      const qty: number = findTicketUsed ? ticketSum._sum.amount - findTicketUsed._count :ticketSum._sum.amount ;
      return { ticket: ticketInfo, qty: qty };
    });

    return Inventory;
  }
}

export default TicketUserService;
