<script>
  import { Link } from "svelte-routing";
</script>

<main
  class="bg-white min-h-screen gap-10 flex flex-col items-center justify-center"
>
  <h1 class="text-7xl p-10 font-sans">This is the landing page</h1>

  <nav class="flex gap-7">
    <Link
      class="font-semibold bg-sky-600 px-3 py-2 rounded-full text-white hover:scale-110 transition-all uppercase font-mono hover:bg-orange-600"
      to="/register">Register</Link
    >
    <Link
      class="font-semibold bg-sky-600 px-3 py-2 rounded-full text-white hover:scale-110 transition-all uppercase font-mono hover:bg-orange-600"
      to="/login">Login</Link
    >
  </nav>
</main>
