import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import courseReducer from "../features/reducres/courseReducer";
import userReducer from "../features/reducres/userReducer";

// const store = createStore(userReducer, applyMiddleware(thunk));

const rootReducer = combineReducers({
  course: courseReducer,
  user: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
