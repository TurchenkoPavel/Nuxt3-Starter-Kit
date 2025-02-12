// https://nuxt.com/docs/api/configuration/nuxt-config
import Lara from '@primevue/themes/lara';
import type { NuxtPage } from 'nuxt/schema'


export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { 
    enabled: false,
    overlay: false
  },
  app: {
    head: {
      title: 'Nuxt3 Starter Kit - Build Fast and Scalable Web Apps',
      meta: [
        { name: 'description', content: 'The ultimate starter kit for creating modern web applications with Nuxt 3. Includes SQLite, authentication, and role-based access control.' },
      ],
    },
  },
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET,
    bcryptSaltRounds: process.env.BCRYPT_SALT_ROUNDS,
    superAdminEmail: process.env.SUPERADMIN_EMAIL,
    superAdminPassword: process.env.SUPERADMIN_PASSWORD,
    superAdminFirstName: process.env.SUPERADMIN_FIRSTNAME,
    superAdminLastName: process.env.SUPERADMIN_LASTNAME,
    public: {
      apiBase: '/api', // Для публичного доступа к API (опционально)
    },
  },
  modules: ['@primevue/nuxt-module', '@nuxtjs/tailwindcss', '@pinia/nuxt'],
  primevue: {
    options: {
      theme: {
        preset: Lara,
        options: {
          darkModeSelector: false || 'none',
        }
      }
    },
    components: {
      include: ['Button', 'Form', 'InputText', 'Message', 'Toast', 'Card', 'Drawer', 'DataTable', 'Column', 'Password',
        'Select', 'ConfirmPopup', 'FileUpload', 'Dialog'
      ]
    }
  },
  nitro: {
    preset: 'node-server',
  },
  css: [
    '@/assets/scss/index.scss' // Подключаем глобальные стили
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vite: {
    server: {
      fs: {
        strict: false, 
      },
    },
  },
  hooks: {
    'pages:extend' (pages) {
      function setMiddleware (pages: NuxtPage[]) {
        for (const page of pages) {
          console.log(page.path)
          if (page.path?.startsWith('/admin/')) {
            page.meta ||= {};
            page.meta.middleware = [...(page.meta.middleware || []), 'admin'];
          }
          if (page.path?.startsWith('/superadmin/')) {
            page.meta ||= {};
            page.meta.middleware = [...(page.meta.middleware || []), 'superadmin'];
          }
        }
      }
      setMiddleware(pages)
    }
  }
})