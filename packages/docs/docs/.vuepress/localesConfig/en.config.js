/**
 * Created by Liu.Jun on 2020/5/30 10:42 PM.
 */

module.exports = {
    config: {
        // The key name is the subpath of the language
        // As a special case, the default language can use '/' as its path.
        lang: 'en-US',
        title: 'Vue JSON Schema Form',
        description: 'Quickly build a form with complete verification based on Vue and JSON Schema'
    },
    themeConfig: {
        // Multi-language dropdown menu title
        selectText: 'Languages',
        // The label of this language in the dropdown menu
        label: 'English',
        ariaLabel: 'Languages',
        // Edit link text
        editLinkText: 'Edit this page on GitHub',
        logo: '/logo.png', // logo
        lastUpdated: 'lastUpdated', // string | boolean
        serviceWorker: {
            updatePopup: {
                message: "New content is available.",
                buttonText: "Refresh"
            }
        },
        // Top navigation
        nav: [
             {
                 text: 'Guide',
                 ariaLabel: 'Guide',
                 link: '/en/guide/'
             },
             {
                 text: 'Type rules',
                 ariaLabel: 'Type rules',
                 items: [
                     { text: 'string', link: '/en/rules/string.md' },
                     { text: 'number', link: '/en/rules/number.md' },
                     { text: 'boolean', link: '/en/rules/boolean.md' },
                     { text: 'null', link: '/en/rules/null.md' },
                     { text: 'object', link: '/en/rules/object.md' },
                    { text: 'array', link: '/en/rules/array.md' },
                     { text: 'combining', link: '/en/rules/combining.md' },
                 ]
             },
            { text: 'Playground', link: 'http://localhost:8800' },
            { text: 'Form Schema Generator', link: 'http://localhost:8800/schema-generator.html' },
            { text: 'Activity Editor', link: 'http://localhost:8800/vue-editor.html#/editor' },
            { text: 'Github', link: 'https://github.com/costasx83/vue-json-schema-form' }
        ],

        // Sidebar
        // Omit the .md extension, and paths ending with / will be treated as */README.md
        sidebar: {
             '/en/guide/': require('./genConfig').getGuideSidebar([
                 'Guide',
                 'Configuration',
                 'Principle',
                 'Update plan'
             ]),
             '/en/config/': require('./genConfig').getConfigSidebar(),
             '/en/rules/': require('./genConfig').getRulesSidebar(),
        }
    }
}
