import React from "react";
import { BrowserRouter } from "react-router-dom";
import { StartRoutes } from "./Components/Routes/StartRoutes";
import { Provider } from "react-redux";
import { authenticationStore } from "./Redux/AuthenticationStore";


function App() {

  return (
    <>
      <Provider store={authenticationStore}>
          <BrowserRouter>
            <StartRoutes />
          </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;