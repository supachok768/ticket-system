import { Router } from 'express';
import TicketController from '@/controllers/tickets.controller';
import { CreateTicketDto } from '@dtos/ticket.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@middlewares/auth.middleware';

class TicketRoute implements Routes {
  public path = '/tickets';
  public router = Router();
  public ticketController = new TicketController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.ticketController.getTickets);
    this.router.get(`${this.path}/pages/:perPage(\\d+)/:numPage(\\d+)`, this.ticketController.getTickets);
    this.router.get(`${this.path}/:id(\\d+)`, this.ticketController.getTicketById);
    this.router.post(`${this.path}`, validationMiddleware(CreateTicketDto, 'body'), this.ticketController.createTicket);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateTicketDto, 'body', true), this.ticketController.updateTicket);
    this.router.delete(`${this.path}/:id(\\d+)`, this.ticketController.deleteTicket);
  }
}

export default TicketRoute;
