import { createRouter, createWebHashHistory } from 'vue-router';


/**
 * Router entry
 *
 */
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/index',
            name: 'editor',
            meta: {
                title: 'Schema generator'
            },
            component: () => import('../views/editor/Editor.vue'),
        },
        {
            path: '/:pathMatch(.*)*',
            hidden: true,
            redirect: { name: 'editor' }
        }
    ],
    scrollBehavior() {
        return { x: 0, y: 0 };
    }
});

export default router;
