const beListConfig = [];

// Route guards
export default function guards(router) {
    router.beforeEach(async (to, from, next) => {
        const beGuardsList = [...beListConfig];

        // Execute each interceptor in sequence
        // If route address is returned, break loop and navigate; '' or 'next' string, execute next();
        // If catch exception, stop route navigation and break loop

        while (beGuardsList.length > 0) {
            const handler = beGuardsList.shift();
            const isRunInterceptor = handler.valid ? handler.valid(to, from) : true;

            if (isRunInterceptor) {
                try {
                    const nextValue = await handler(to, from); // eslint-disable-line
                    if (nextValue !== undefined) {
                        next(...(nextValue === '' || nextValue === 'next' ? [] : [nextValue]));
                        return;
                    }
                } catch (e) {
                    // Reject or throw error interrupts subsequent interceptors and does not navigate
                    next(false);
                    return;
                }
            }
        }

        // Fallback execution
        next();
    });

    // afterEach does not change route behavior, does not use the above pattern
    router.afterEach((to, from) => {
        const baseTitle = 'vue-json-schema-form';
        if (to.meta.title) {
            document.title = `${to.meta.title} | ${baseTitle}`;
        }
    });
}
