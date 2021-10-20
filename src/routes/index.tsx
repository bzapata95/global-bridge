import { Switch } from "react-router-dom";
import Route from "./Route";

import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Dashboard from "../pages/Main/Dashboard";
import { Users } from "../pages/Main/Users";
import { CreateUser } from "../pages/Main/Users/create";
import { Forms } from "../pages/Main/Forms";
import { Automation } from "../pages/Main/Automation";

export function Routes() {
  return (
    <Switch>
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/" isPrivate exact component={Dashboard} />
      <Route path="/users" isPrivate exact component={Users} />
      <Route path="/users/create" isPrivate exact component={CreateUser} />
      <Route path="/forms" isPrivate exact component={Forms} />
      <Route path="/automation" isPrivate exact component={Automation} />
    </Switch>
  );
}
