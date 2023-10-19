/* eslint-disable no-unused-vars */

import './App.css'

import {RouterProvider, createRoutesFromElements, createBrowserRouter, Route} from "react-router-dom"
import Join from "./component/Join/Join"
import Chat from "./component/Chat/Chat"


/*
const ENDPOINT='http://localhost:4501/'
const socket=socketIO(ENDPOINT, {transports:['websocket']})
*/
const router = createBrowserRouter(createRoutesFromElements(
    <Route>
        <Route exact path="/" element={<Join/>}/>
        <Route path="/chat" element={<Chat/>}/>
        
    </Route>
))
function App() {
  
  return (<RouterProvider router={router}/>
  )
}

export default App
