module.exports = {
  title: 'Vuex-ORM GraphQL Plugin',
  description: 'Vue + Vuex-ORM + GraphQL = <3',

  base: '/plugin-graphql/',

  themeConfig: {
    logo: '/logo-vuex-orm.png',

    repo: 'https://github.com/vuex-orm/plugin-graphql',
    docsDir: 'docs',
    docsBranch: 'master',
    editLinks: true,

    markdown: {
      lineNumbers: true
    },

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Vuex-ORM', link: 'https://vuex-orm.github.io/vuex-orm/' },
      { text: 'GitHub', link: 'https://github.com/vuex-orm/plugin-graphql' },
    ],

    sidebar: [
      ['/guide/', 'Introduction'],

      {
        title: 'Basics',
        collapsable: false,
        children: [
          '/guide/setup',
          '/guide/graphql',
          '/guide/fetch',
          '/guide/persist',
          '/guide/push',
          '/guide/destroy',
          '/guide/relationships',
        ]
      },

      {
        title: 'Advanced Topics',
        collapsable: false,
        children: [
          '/guide/connection-mode',
          '/guide/custom-queries',
          '/guide/eager-loading',
          '/guide/virtual-fields',
          '/guide/meta-fields',
          '/guide/testing',
        ]
      },

      {
        title: 'Meta',
        collapsable: false,
        children: [
          '/guide/faq',
          '/guide/contribution',
        ]
      },
    ],
  },
};
