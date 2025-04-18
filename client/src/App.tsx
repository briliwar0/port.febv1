import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import Checkout from "@/pages/checkout";
import UIDemo from "@/pages/ui-demo";
import AdminDashboard from "@/pages/admin";
import Login from "@/pages/login";
import Database from "@/pages/database";
import CustomCursor from "@/components/CustomCursor";
import AutomaticUI from "@/components/AutomaticUI";
import { Route, Switch } from "wouter";
import NotFound from "@/pages/not-found";

function App() {
  return (
    <>
      <CustomCursor />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/ui-demo" component={UIDemo} />
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/login" component={Login} />
        <Route path="/database" component={Database} />
        <Route component={NotFound} />
      </Switch>
      <Toaster />
      <AutomaticUI />
    </>
  );
}

export default App;
