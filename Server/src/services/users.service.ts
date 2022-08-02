import { hash } from 'bcrypt';
import { PrismaClient, User, UserRole } from '@prisma/client';
import { CreateUserDto, UpdateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { IUserRoleNested } from '@/interfaces/user_role.interface';
import { openStdin } from 'process';
import { transformDocument } from '@prisma/client/runtime';
import { isNotEmpty } from 'class-validator';

class UserService {
  public users = new PrismaClient().user;
  public userRole = new PrismaClient().userRole;

  public findUser(perPage?: number, numPage?: number): Promise<User[]> {
    let option = {
      include: {
        UserRole: {
          include: {
            Role: true,
          },
          where: { isActive: true },
        },
      },
    };

    if (!Number.isNaN(perPage)) {
      option = { ...option, ...{ skip: Number(perPage * (numPage - 1)), take: perPage } };
    }

    const User: Promise<User[]> = this.users.findMany(option);
    return User;
  }

  public findUserById(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "You're not userId");

    const findUser: Promise<User> = this.users.findUnique({
      where: { id: userId },
      include: {
        UserRole: {
          include: {
            Role: true,
          },
        },
      },
    });
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findUnique({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

    const hashedPassword: string = await hash(userData.password, 10);

    const rolesActive: IUserRoleNested[] = userData.rolesActive.map((x: number): IUserRoleNested => ({ roleId: x }));
    delete userData.rolesActive;

    const createUserData: Promise<User> = this.users.create({
      data: {
        ...userData,
        password: hashedPassword,
        UserRole: {
          createMany: {
            data: rolesActive,
          },
        },
      },
    });
    return createUserData;
  }

  public async updateUser(userId: number, userData: UpdateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser = await this.users.findUnique({
      where: { id: userId },
      include: {
        UserRole: true,
      },
    });
    if (!findUser) throw new HttpException(409, "You're not user");

    const hashedPassword: string = await hash(userData.password, 10);

    const rolesActive: IUserRoleNested[] = userData.rolesActive.map((x: number): IUserRoleNested => ({ roleId: x }));
    delete userData.rolesActive;

    const newUserRole = rolesActive.filter((x: IUserRoleNested) => findUser.UserRole.findIndex(item => item.roleId == x.roleId) < 0);
    const newUserRoleButHave = findUser.UserRole.filter(
      (x: IUserRoleNested) =>
        rolesActive.findIndex(item => item.roleId == x.roleId) >= 0 && !x.isActive ,
    );
    const removeUserRole = findUser.UserRole.filter((x: UserRole) => rolesActive.findIndex((item: IUserRoleNested) => item.roleId === x.roleId) < 0 && x.isActive);

    await Promise.all(newUserRoleButHave.map(async x=>
      await this.userRole.update({
        where:{id:x.id},
        data:{
          isActive:true
        }
      })
    ))
    await Promise.all(removeUserRole.map(async x=>
      await this.userRole.update({
        where:{id:x.id},
        data:{
          isActive:false
        }
      })
    ))

    const updateUserData: Promise<User> = this.users.update({
      where: { id: userId },
      data: {
        ...userData,
        password: (userData.password) ? hashedPassword : findUser.password,
        UserRole: {
          createMany: {
            data: newUserRole,
          },
        },
      },
    });
    return updateUserData;
  }

  public async deleteUser(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "You're not userId");

    const findUser: User = await this.users.findUnique({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "You're not user");

    const deleteUserData: Promise<User> = this.users.delete({ where: { id: userId } });
    return deleteUserData;
  }
}

export default UserService;
