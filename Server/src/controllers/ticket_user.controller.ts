import { NextFunction, Request, Response } from 'express';
import { TicketUser } from '@prisma/client';
import TicketUserService from '@/services/tickets_user.service';
import { RequestWithUser } from '@/interfaces/auth.interface';
class TicketUserController {
  public ticketUserService = new TicketUserService();

  public getTicketUser = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.user.id);
      const findAllTicketUserData = await this.ticketUserService.findTicketUser(userId,Number(req.params.perPage), Number(req.params.numPage));

      res.status(200).json({ data: findAllTicketUserData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
}

export default TicketUserController;
