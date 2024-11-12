import Home from '~/pages/home';
import Content from '~/pages/content';
import Add from '~/pages/add';
import Sua from '~/pages/sua';
import List from '~/pages/list';
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/content', component: Content },
    { path: '/add', component: Add },
    { path: '/sua/:ID', component: Sua },
    { path: '/list', component: List },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
