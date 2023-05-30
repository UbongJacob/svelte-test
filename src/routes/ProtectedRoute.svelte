<script lang="ts">
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";

  export let isAuthenticated: boolean;
  export let redirectPath: string;

  onMount(() => {
    if (!isAuthenticated) navigate(redirectPath);
  });
</script>

<slot />
