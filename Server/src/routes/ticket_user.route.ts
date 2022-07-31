import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import TicketUserController from '@/controllers/ticket_user.controller';

class TicketUserRoute implements Routes {
  public path = '/inventory';
  public router = Router();
  public ticketUserController = new TicketUserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`,authMiddleware, this.ticketUserController.getTicketUser);
  }
}

export default TicketUserRoute;
