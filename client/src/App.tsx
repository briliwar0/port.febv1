import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import Checkout from "@/pages/checkout";
import UIDemo from "@/pages/ui-demo";
import CustomCursor from "@/components/CustomCursor";
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
        <Route component={NotFound} />
      </Switch>
      <Toaster />
    </>
  );
}

export default App;
