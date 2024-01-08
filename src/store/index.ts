import { createStore } from 'vuex'

import sourceData from '@/utils/data.json'

export default createStore({
  // application global data - to use in multiple components
  state: sourceData
})
