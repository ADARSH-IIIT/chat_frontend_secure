import { createStore , applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { thunk } from "redux-thunk";

import allreducer from "./reducers/combine_reducers";


const store = createStore( allreducer  )


export default store