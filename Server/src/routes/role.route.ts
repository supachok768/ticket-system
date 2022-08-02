import { Router } from 'express';
import RolesController from '@controllers/roles.controller';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';

class RolesRoute implements Routes {
  public path = '/roles';
  public router = Router();
  public rolesController = new RolesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`,authMiddleware, this.rolesController.getRoles);
    this.router.get(`${this.path}/getRoleByUser`,authMiddleware, this.rolesController.getRoleByUser);
  }
}

export default RolesRoute;
