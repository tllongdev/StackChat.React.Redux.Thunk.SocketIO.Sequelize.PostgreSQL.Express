import {createStore} from 'redux'

// the simplest possible reducer
const reducer = (state = {}, action) => {
  return state
}

const store = createStore(reducer)
export default store
