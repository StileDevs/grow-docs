import { defineConfig } from "vitepress";


// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "grow-docs",
  description: "Growtopia documentation",

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "Protocol",
        items: [
          { text: "Introduction", link: "/protocol/introduction" },
          { text: "HTTPS Server", link: "/protocol/https-server" },
          { text: "Login Server", link: "/protocol/login-server" },
          { text: "ENet", link: "/protocol/enet" },
        ],
      },      
      { 
        text: "Packets",
        items: [
          { text: "Hello Packet", link: "/packets/hello-packet"},
          { text: "Text Packet", link: "/packets/text-packet/text"},
          { text: "Action Packet", link: "/packets/action-packet/action"},
          { text: "Tank Packet", link: "/packets/tank-packet/tank"},
        ]
      },
      {
        text: "Reference",
        items: [
          { text: "Documentation", link: "/reference/docs" },
        ],
      },
      // {
      //   text: "Example",
      //   items: [
      //     { text: "Markdown Examples", link: "/markdown-examples" },
      //     { text: "Runtime API Examples", link: "/api-examples" },
      //   ],
      // },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/StileDevs/grow-docs" },
    ],
  },

  vite: {
    optimizeDeps: { include: ['@braintree/sanitize-url'] },
    resolve: {
      alias: {
        dayjs: 'dayjs/',
      },
    },
  },
});
