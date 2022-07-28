import { NextFunction, Request, Response } from 'express';
import IssueStatusService from '@/services/issues_status.service';
import { IssueStatus } from '@prisma/client';

class IssueStatusController {
  public issueStatusService = new IssueStatusService();

  public getIssueStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllIssuesStatusData: IssueStatus[] = await this.issueStatusService.findIssueStatus();

      res.status(200).json({ data: findAllIssuesStatusData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
  
}

export default IssueStatusController;
