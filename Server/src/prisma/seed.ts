import { PrismaClient, Role, User } from '@prisma/client';
import { hash } from 'bcrypt';
import { HASH_SALT } from '@config';
import { IUserRole } from '@/interfaces/user_role.interface';
import { logger } from '@utils/logger';

export default class SeedData {
  private prismaClient = new PrismaClient();

  constructor() {
    this.Initial();
  }

  private async Initial() {
    await this.InitialRoleData();
    await this.InitialUserData();
    await this.InitialTicketData();
    await this.InitialIssueStatusData();
    await this.InitialUserRole();
  }

  private async InitialRoleData() {
    const role = this.prismaClient.role;
    const roleCount: number = await role.count();
    if (roleCount > 0) return;

    return role.createMany({
      data: [
        { name: 'TicketManager', description: '' },
        { name: 'Supporter', description: '' },
        { name: 'Client', description: '' },
      ],
      skipDuplicates: true,
    });
  }

  private async InitialUserData() {
    const user = this.prismaClient.user;
    const userCount: number = await user.count();
    if (userCount > 0) return;

    let data = [
      { email: 'superadmin@dummy.com', password: '12345678', firstName: 'Super', lastName: 'Admin' },
      { email: 'supporter@dummy.com', password: '12345678', firstName: 'Support', lastName: 'Customer' },
      { email: 'ticketmanager@dummy.com', password: '12345678', firstName: 'Ticket', lastName: 'Manager' },
      { email: 'client@dummy.com', password: '12345678', firstName: 'Client', lastName: 'TicketSystem' },
    ];

    data = await Promise.all(
      data.map(async item => {
        const passwordHash = await hash(item.password, HASH_SALT);
        return { ...item, password: passwordHash };
      }),
    );

    return user.createMany({
      data: data,
      skipDuplicates: true,
    });
  }

  private async InitialTicketData() {
    const ticket = this.prismaClient.ticket;
    const ticketCount: number = await ticket.count();
    if (ticketCount > 0) return;

    const data = [
      { name: 'A', price: 5000, amountLimitPerDay: 10, minimumBuy: 1 },
      { name: 'B', price: 2500, amountLimitPerDay: 20, minimumBuy: 2 },
      { name: 'C', price: 1000, amountLimitPerDay: 30, minimumBuy: 2 },
      { name: 'D', price: 500, amountLimitPerDay: 40, minimumBuy: 3 },
    ];

    return ticket.createMany({
      data: data,
      skipDuplicates: true,
    });
  }

  private async InitialIssueStatusData() {
    const issueStatus = this.prismaClient.issueStatus;
    const issueStatusCount: number = await issueStatus.count();
    if (issueStatusCount > 0) return;

    const data = [
      { name: 'Open', description: '' },
      { name: 'Hold', description: '' },
      { name: 'In Process', description: '' },
      { name: 'Close', description: '' },
    ];

    return issueStatus.createMany({
      data: data,
      skipDuplicates: true,
    });
  }

  private async InitialUserRole() {
      const userRole = this.prismaClient.userRole;
      const userRoleCount: number = await userRole.count();
      if (userRoleCount > 0) return;
      const user = this.prismaClient.user;
      const role: Role[] = await this.prismaClient.role.findMany();
      const userList: User[] = await user.findMany();
      const data: IUserRole[][] = userList.map((item: User): IUserRole[] => {
        if (item.email == 'superadmin@dummy.com') {
          return role.map((role: Role): IUserRole => {
            return { userId: item.id, roleId: role.id };
          });
        }

        if (item.email == 'supporter@dummy.com') {
          return [{ userId: item.id, roleId: role[role.findIndex((role: Role) => role.name === 'Supporter')].id }];
        }

        if (item.email == 'ticketmanager@dummy.com') {
          return [{ userId: item.id, roleId: role[role.findIndex((role: Role) => role.name === 'TicketManager')].id }];
        }

        if (item.email == 'client@dummy.com') {
          return [{ userId: item.id, roleId: role[role.findIndex((role: Role) => role.name === 'Client')].id }];
        }
      });

      const dataFlat: IUserRole[] = data.flat(2);
      return userRole.createMany({
        data: dataFlat,
      });
  }
}
