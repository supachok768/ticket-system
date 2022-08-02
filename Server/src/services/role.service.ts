import { HttpException } from '@/exceptions/HttpException';
import { PrismaClient, Role, UserRole } from '@prisma/client';

class RoleService {
  public role = new PrismaClient().role;
  public users = new PrismaClient().user;

  public findRole(): Promise<Role[]> {
    const Role: Promise<Role[]> = this.role.findMany();
    return Role;
  }

  public async findRoleByUser(userId: number): Promise<Array<string>> {
    const findUser = await this.users.findUnique({
      where: { id: userId },
      include: {
        UserRole: true
      },
    });
    if (!findUser) throw new HttpException(409, "You're not user");
    const roles = await this.findRole();
    const roleStringList: Array<string> = findUser.UserRole.map((userRole: UserRole) => roles.find((role:Role)=> role.id == userRole.roleId).name);
    return roleStringList
  }
}

export default RoleService;
