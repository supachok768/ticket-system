import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import IssueStatusController from '@/controllers/issues_status.controller';

class IssueStatusRoute implements Routes {
  public path = '/issue_status';
  public router = Router();
  public issueStatusController = new IssueStatusController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.issueStatusController.getIssueStatus);
  }
}

export default IssueStatusRoute;
