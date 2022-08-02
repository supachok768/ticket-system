import { PrismaClient, Issue, IssueStatus, User } from '@prisma/client';
import { CreateIssueDto, UpdateIssueStatusDto } from '@dtos/issue.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

class IssueService {
  public issue = new PrismaClient().issue;
  public issueStatus = new PrismaClient().issueStatus;
  public users = new PrismaClient().user;
  public ticketUser = new PrismaClient().ticketUser;
  public ticket = new PrismaClient().ticket;

  public findIssue(perPage?: number, numPage?: number): Promise<Issue[]> {
    // let option = ;

    // if (!Number.isNaN(perPage)) {
    //   option = { ...option, ...{ skip: Number(perPage * (numPage - 1)), take: perPage } };
    // }

    const Issue: Promise<Issue[]> = this.issue.findMany({
      ...{
        include: {
          AssignTo: true,
          RequestFrom: true,
          Ticket: true,
          IssueStatusTransaction: {
            include: { IssueStatus: true },
            orderBy: {
              createAt: 'desc',
            }
          },
        },
        orderBy: {
          createAt: 'desc',
        }
      }
    });
    return Issue;
  }

  public findIssueRequest(userId: number, perPage?: number, numPage?: number): Promise<Issue[]> {
    // if (!Number.isNaN(perPage)) {
    //   option = { ...option, ...{ skip: Number(perPage * (numPage - 1)), take: perPage } };
    // }

    const Issue: Promise<Issue[]> = this.issue.findMany({
      ...{
        where: {
          requestFromId: userId,
        },
        include: {
          AssignTo: true,
          RequestFrom: true,
          Ticket: true,
          IssueStatusTransaction: {
            include: { IssueStatus: true },
            orderBy: {
              createAt: 'desc',
            }
          },
        },
        orderBy: {
          createAt: 'desc',
        }
      },
    });
    return Issue;
  }

  public findIssueAssign(userId: number, perPage?: number, numPage?: number): Promise<Issue[]> {
    let option = {
      where: {
        assignToId: userId,
      },
      include: {
        AssignTo: true,
        RequestFrom: true,
        Ticket: true,
        IssueStatusTransaction: {
          include: { IssueStatus: true },
        },
      },
    };

    if (!Number.isNaN(perPage)) {
      option = { ...option, ...{ skip: Number(perPage * (numPage - 1)), take: perPage } };
    }

    const Issue: Promise<Issue[]> = this.issue.findMany({
      ...{
        where: {
          assignToId: userId,
        },
        include: {
          AssignTo: true,
          RequestFrom: true,
          Ticket: true,
          IssueStatusTransaction: {
            include: { IssueStatus: true },
            orderBy: {
              createAt: 'desc',
            },
          },
        },
        orderBy: {
          createAt: 'desc',
        },
      },
    });
    return Issue;
  }

  public findIssueAssignToday(userId: number, perPage?: number, numPage?: number): Promise<Issue[]> {
    const date = new Date();
    const Issue: Promise<Issue[]> = this.issue.findMany({
      where: {
        assignToId: userId,
        createAt: {
          gte: new Date(date.toISOString().substring(0, 10)),
        },
      },
      include: {
        AssignTo: true,
        RequestFrom: true,
        Ticket: true,
        IssueStatusTransaction: {
          include: { IssueStatus: true },
          orderBy: {
            createAt: 'desc',
          },
        },
      },
      orderBy: {
        createAt: 'desc',
      },
    });
    return Issue;
  }

  public findIssueById(issueId: number): Promise<Issue> {
    if (isEmpty(issueId)) throw new HttpException(400, "You're not issueId");

    const findIssue: Promise<Issue> = this.issue.findUnique({
      where: { id: issueId },
      include: {
        Ticket: true,
        AssignTo: true,
        RequestFrom: true,
        IssueStatusTransaction: {
          include: { IssueStatus: true },
          orderBy: {
            createAt: 'desc',
          },
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

    const findTicket = await this.ticket.findUnique({
      where: { id: issueData.ticketId },
    });
    if (!findTicket) throw new HttpException(409, 'user have no this ticket');
    // delete issueData.ticketId;

    const ticketUserHave = await this.ticketUser.findMany({
      where: {
        ticketId: issueData.ticketId,
        userId: issueData.requestFromId,
      },
    });
    const sumTicketUserHave: number = ticketUserHave.reduce((accumulator, curr) => accumulator + curr.amount, 0);
    const ticketUsed = await this.issue.findMany({
      where: {
        ticketId: issueData.ticketId,
        requestFromId: issueData.requestFromId,
      },
    });
    const sumTicketUsed: number = ticketUsed.length;
    if (sumTicketUserHave <= sumTicketUsed) throw new HttpException(400, "You're not have more ticket");

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
