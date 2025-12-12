import { createRouter, createWebHashHistory } from 'vue-router';


/**
 * Router entry
 *
 */
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/editor',
            name: 'editor',
            component: () => import('../views/editor/Editor.vue'),
        },
        {
            path: '/editor-m',
            name: 'editorM',
            component: () => import('../views/editor/EditorM.vue'),
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
