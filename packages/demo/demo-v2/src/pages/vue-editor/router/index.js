import Vue from 'vue';
import VueRouter from 'VueRouter';
import routes from './routes/index.js';

Vue.use(VueRouter);

/**
 * Router entry
 *
 */
export default new VueRouter({
    mode: 'hash',
    routes: [...routes],
    scrollBehavior() {
        return { x: 0, y: 0 };
    }
});
