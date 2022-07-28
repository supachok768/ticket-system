import { NextFunction, Request, Response } from 'express';
import { Ticket, TicketUser } from '@prisma/client';
import { BuyTicketDto, CreateTicketDto } from '@dtos/ticket.dto';
import ticketService from '@services/tickets.service';

class TicketController {
  public ticketService = new ticketService();

  public getTickets = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllTicketsData: Ticket[] = await this.ticketService.findTicket(Number(req.params.perPage), Number(req.params.numPage));

      res.status(200).json({ data: findAllTicketsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getTicketById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const ticketId = Number(req.params.id);
      const findOneTicketData: Ticket = await this.ticketService.findTicketById(ticketId);

      res.status(200).json({ data: findOneTicketData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createTicket = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const ticketData: CreateTicketDto = req.body;
      const createTicketData: Ticket = await this.ticketService.createTicket(ticketData);

      res.status(201).json({ data: createTicketData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public buyTicket = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      let ticketData: BuyTicketDto = req.body;
      const userId = Number(req.user['id']);
      ticketData.userId = userId;
      const createTicketUserData: TicketUser = await this.ticketService.buyTicket(ticketData);

      res.status(201).json({ data: createTicketUserData, message: 'buy ticket' });
    } catch (error) {
      next(error);
    }
  };

  public updateTicket = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const ticketId = Number(req.params.id);
      const ticketData: CreateTicketDto = req.body;
      const updateTicketData: Ticket = await this.ticketService.updateTicket(ticketId, ticketData);

      res.status(200).json({ data: updateTicketData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteTicket = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const ticketId = Number(req.params.id);
      const deleteTicketData: Ticket = await this.ticketService.deleteTicket(ticketId);

      res.status(200).json({ data: deleteTicketData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default TicketController;
