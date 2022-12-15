//1 IMPORTO TODO LO NECESARIO PARA REAR EL STORE DE MI APP

import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import rootReducer from "../reducer/index"




export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk))) // 3 LO EXPORTO PARA QUE INDEX LO USEN
// EN EL PROVIDER