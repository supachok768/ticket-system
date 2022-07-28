import { PrismaClient, Issue, IssueStatus } from '@prisma/client';
import { CreateIssueDto, UpdateIssueStatusDto } from '@dtos/issue.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

class IssueService {
  public issue = new PrismaClient().issue;
  public issueStatus = new PrismaClient().issueStatus;
  public users = new PrismaClient().user;
  public ticketUser = new PrismaClient().ticketUser;

  public findIssue(perPage?: number, numPage?: number): Promise<Issue[]> {
    let option = {
      include: {
        TicketIssue: {
          include: { TicketUser: true },
        },
        IssueStatusTransaction: {
          include: { IssueStatus: true },
        },
      },
    };

    if (!Number.isNaN(perPage)) {
      option = { ...option, ...{ skip: Number(perPage * (numPage - 1)), take: perPage } };
    }

    const Issue: Promise<Issue[]> = this.issue.findMany(option);
    return Issue;
  }

  public findIssueById(issueId: number): Promise<Issue> {
    if (isEmpty(issueId)) throw new HttpException(400, "You're not issueId");

    const findIssue: Promise<Issue> = this.issue.findUnique({
      where: { id: issueId },
      include: {
        TicketIssue: {
          include: { TicketUser: true },
        },
        IssueStatusTransaction: {
          include: { IssueStatus: true },
        },
      },
    });
    if (!findIssue) throw new HttpException(409, "You're not ticket");

    return findIssue;
  }

  public async createIssue(issueData: CreateIssueDto): Promise<Issue> {
    if (isEmpty(issueData)) throw new HttpException(400, "You're not issueData");
    const findStatusOpen: IssueStatus = await this.issueStatus.findFirst({ where: { id: issueData.issueStatusId } });
    delete issueData.issueStatusId;

    const findTicketUser = await this.ticketUser.findUnique({
      where: { id: issueData.ticketUserId },
    });
    if (!findTicketUser) throw new HttpException(409, 'user have no this ticket');
    delete issueData.ticketUserId;

    const findAssignTo = await this.users.findUnique({
      where: { id: issueData.assignToId },
    });
    if (!findAssignTo) throw new HttpException(409, 'Assign is not user');

    const findRequestTo = await this.users.findUnique({
      where: { id: issueData.requestFromId },
    });
    if (!findRequestTo) throw new HttpException(409, 'requestor is not user');

    const createIssueData: Promise<Issue> = this.issue.create({
      data: {
        ...issueData,
        TicketIssue: {
          create: {
            ticketUserId: findTicketUser.id,
          },
        },
        IssueStatusTransaction: {
          create: {
            issueStatusId: findStatusOpen.id,
          },
        },
      },
    });
    return createIssueData;
  }

  public async updateIssueStatus(issueId: number, issueData: UpdateIssueStatusDto): Promise<Issue> {
    if (isEmpty(issueData)) throw new HttpException(400, "You're not issueData");

    const findIssue = await this.issue.findUnique({
      where: { id: issueId },
    });
    if (!findIssue) throw new HttpException(409, "You're not issue");

    const findStatus: IssueStatus = await this.issueStatus.findFirst({ where: { id: issueData.issueStatusId } });

    const updateIssueData: Promise<Issue> = this.issue.update({
      where: { id: issueId },
      data: {
        IssueStatusTransaction: {
          create: {
            issueStatusId: findStatus.id,
          },
        },
      },
    });
    return updateIssueData;
  }
}

export default IssueService;
