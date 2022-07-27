import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import TicketRoute from '@routes/ticket.route';
import IssueRoute from './routes/issues.route';
import validateEnv from '@utils/validateEnv';
import SeedData from '@/prisma/seed';

validateEnv();
new SeedData();

const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute(),new TicketRoute(),new IssueRoute()]);

app.listen();
