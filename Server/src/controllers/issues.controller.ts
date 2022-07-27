import { NextFunction, Request, Response } from 'express';
import { Issue, User } from '@prisma/client';
import { CreateIssueDto, UpdateIssueStatusDto } from '@dtos/issue.dto';
import IssueService from '@/services/issues.service';

class IssueController {
  public issueService = new IssueService();

  public getIssues = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllIssuesData: Issue[] = await this.issueService.findIssue(Number(req.params.perPage), Number(req.params.numPage));

      res.status(200).json({ data: findAllIssuesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getIssueById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const issueId = Number(req.params.id);
      const findOneIssueData: Issue = await this.issueService.findIssueById(issueId);

      res.status(200).json({ data: findOneIssueData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createIssue = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      let issueData: CreateIssueDto = req.body;

      const userId = Number(req.user["id"]);
      issueData.requestFromId = userId;
      const createIssueData: Issue = await this.issueService.createIssue(issueData);

      res.status(201).json({ data: createIssueData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateIssueStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const issueId = Number(req.params.id);
      const issueData: UpdateIssueStatusDto = req.body;
      const updateIssueData: Issue = await this.issueService.updateIssueStatus(issueId, issueData);

      res.status(200).json({ data: updateIssueData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

}

export default IssueController;
