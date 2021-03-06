import {combineReducers, ReducersMapObject, Reducer} from "redux"
import {connectRouter} from 'connected-react-router'
import history from '../history'
import home, {HomeState} from './home'
import profile, {ProfileState} from './profile'
import cart, {CartState} from './cart'

const reducers: ReducersMapObject = {
  router: connectRouter(history),
  home,
  profile,
  cart,
}

type RootState = {
  [key in keyof typeof reducers]: ReturnType<typeof reducers[key]>
}


const rootReducer: Reducer<RootState> = combineReducers(reducers)

export {
  RootState,
  HomeState,
  ProfileState,
  CartState
}
export default rootReducer