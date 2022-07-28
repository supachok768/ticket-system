import { Router } from 'express';
import IssueController from '@/controllers/issues.controller';
import { CreateIssueDto, UpdateIssueStatusDto } from '@dtos/issue.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@middlewares/auth.middleware';

class IssueRoute implements Routes {
  public path = '/issues';
  public router = Router();
  public issueController = new IssueController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.issueController.getIssues);
    this.router.get(`${this.path}/assign/me`, authMiddleware, this.issueController.findIssueAssign);
    this.router.get(`${this.path}/request/me`, authMiddleware, this.issueController.findIssueRequest);
    this.router.get(`${this.path}/assign/me/today`, authMiddleware, this.issueController.findIssueAssignToday);
    this.router.get(`${this.path}/pages/:perPage(\\d+)/:numPage(\\d+)`, this.issueController.getIssues);
    this.router.get(`${this.path}/:id(\\d+)`, this.issueController.getIssueById);
    this.router.post(`${this.path}`, authMiddleware, validationMiddleware(CreateIssueDto, 'body'), this.issueController.createIssue);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(UpdateIssueStatusDto, 'body'), this.issueController.updateIssueStatus);
  }
}

export default IssueRoute;
