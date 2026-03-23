import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import Machines from "@/pages/Machines";
import MachineDetail from "@/pages/MachineDetail";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/maskiner" component={Machines} />
      <Route path="/maskine/:id" component={MachineDetail} />
      {/* All other menu links redirect to Home */}
      <Route path="/solis-traktor" component={Home} />
      <Route path="/trailer" component={Home} />
      <Route path="/finansiering" component={Home} />
      <Route path="/om-os" component={Home} />
      <Route path="/kontakt" component={Home} />
      <Route component={Home} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
