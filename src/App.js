import './App.css';
import Home from "./Home";
import {RouterProvider} from "react-router-dom";
import {router} from "./routes";

function App() {
  return (
      <RouterProvider  router={router}/>
  );
}

export default App;
