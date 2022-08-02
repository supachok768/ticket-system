import { NextFunction, Request, Response } from 'express';
import { Role } from '@prisma/client';
import RoleService from '@/services/role.service';
import { RequestWithUser } from '@/interfaces/auth.interface';

class RolesController {
  public roleService = new RoleService();

  public getRoles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllRoleData: Role[] = await this.roleService.findRole()

      res.status(200).json({ data: findAllRoleData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
  
  public getRoleByUser = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.user.id);
      const findRoleByUser = await this.roleService.findRoleByUser(userId);

      res.status(200).json({ data: findRoleByUser, message: 'findRoleByUser' });
    } catch (error) {
      next(error);
    }
  };
}

export default RolesController;
