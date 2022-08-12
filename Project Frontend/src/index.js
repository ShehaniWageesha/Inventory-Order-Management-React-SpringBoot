/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "layouts/Admin/Admin.js";
import RTLLayout from "layouts/RTL/RTL.js";
import NurseLayout from "layouts/Admin/Nurse"

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import {exact} from "prop-types";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {store,persistor} from "./Redux/store";

const hist = createBrowserHistory();

ReactDOM.render(
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={hist}>
          <Switch>
            <Route path="/nurse" render={props => <NurseLayout {...props} />} />
            <Route path="/admin" render={props => <AdminLayout {...props} />} />
            <Route path="/rtl" render={props => <RTLLayout {...props} />} />
            <Redirect from="/" to="/admin/dashboard" />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>,
  document.getElementById("root")
);
