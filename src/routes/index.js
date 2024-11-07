import Home from '~/pages/home';
import Content from '~/pages/content';
import Add from '~/pages/add';
import Sua from '~/pages/sua';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/content', component: Content },
    { path: '/add', component: Add },
    { path: '/sua/:ID', component: Sua },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
