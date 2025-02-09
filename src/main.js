import { createApp } from 'vue'

import { Quasar, Notify, Loading } from 'quasar'

import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

import '@/styles/main.scss'

import App from '@/App.vue'
import router from '@/router'

const app = createApp(App)

app.use(router)
app.use(Quasar, {
  plugins: {
    Notify,
    Loading
  },
  config: {
    notify: {
      position: 'top'
    }
  }
})

app.mount('#app')
