<script lang="ts">
  export let error: string;
  export let label: string;
  export let value: any;
  export let type: "text" | "number" | "password" | "email" = "text";
  export let autocomplete: string = "";

  $: name = label.toLowerCase();
</script>

<div class="mt-5">
  <label class="app-input-label" for={name}>{label}</label>
  <div class:app-input-error={!!error} class="app-input-container">
    <input
      {type}
      class="app-input"
      id={name}
      {name}
      on:change
      on:blur
      {value}
      {autocomplete}
    />
  </div>
  {#if error}
    <small
      class="bg-yellow-300 text-sm md:text-base text-start font-mono mt-1 tracking-wider px-2 rounded-md"
      >{error}</small
    >
  {/if}
</div>
