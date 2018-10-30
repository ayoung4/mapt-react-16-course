import { LandingPage } from './pages/landing';
import { LoginPage } from './pages/login';

interface IRouteProps {
    component: React.SFC | React.ComponentClass;
    path: string;
    RouteComponent?: React.SFC | React.ComponentClass;
    fallbackPath?: string;
    exact?: boolean;
}

export type Routes = { [key: string]: IRouteProps };

export const routes: Routes = {
    landing: {
        component: LandingPage,
        path: '/',
    },
    login: {
        component: LoginPage,
        path: '/login',
    }
}