import { PrismaClient, IssueStatus} from '@prisma/client';

class IssueStatusService {
  public issueStatus = new PrismaClient().issueStatus;

  public findIssueStatus(): Promise<IssueStatus[]> {
    const IssueStatusData: Promise<IssueStatus[]> = this.issueStatus.findMany();
    return IssueStatusData;
  }
}

export default IssueStatusService;
