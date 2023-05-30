<!-- App.svelte -->
<script>
  import { Router, Route } from "svelte-routing";
  import { Toaster } from "svelte-french-toast";

  import Home from "./routes/Home.svelte";
  import Login from "./routes/Login.svelte";
  import Register from "./routes/Register.svelte";
  import Dashboard from "./routes/Dashboard.svelte";
  import PageNotFound from "./routes/PageNotFound.svelte";
  import ProtectedRoute from "./routes/ProtectedRoute.svelte";
  import { userDetails } from "./api/auth";

  $: isAuthenticated = !!userDetails;
</script>

<Toaster />
<Router>
  <Route path="/login" component={Login} />
  <Route path="/register" component={Register} />
  <Route path="/dashboard">
    <ProtectedRoute {isAuthenticated} redirectPath="/login">
      <Dashboard {isAuthenticated} />
    </ProtectedRoute>
  </Route>
  <Route path="/" component={Home} />
  <Route path="*" component={PageNotFound} />
</Router>
