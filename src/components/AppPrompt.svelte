<script lang="ts">
  import { onMount } from "svelte";
  import AppModal from "./AppModal.svelte";

  export let isVisible: boolean;
  export let onRequestClose: () => void;
  export let onYesClicked;
  export let isLoading: boolean;
  export let title: string;

  function handleClick() {
    if (!isLoading) {
      onYesClicked();
    }
  }
</script>

<AppModal {isVisible} {onRequestClose}>
  <h4 class="font-sans font-semibold text-lg text-center">
    Are you sure you want to delete
  </h4>

  <h5 class="font-sans font-semibold text-lg text-center mt-2">
    {title}
  </h5>

  <div class="flex justify-between gap-10 p-2 mt-5 flex-wrap">
    <button
      disabled={isLoading}
      on:click={handleClick}
      class="bg-red-600 flex-1 rounded-lg px-2 py-1 my-2 sm:px-3 flex justify-center sm:py-2 hover:scale-110 transition-all duration-500 text-white font-nunito font-semibold cursor-pointer"
      type="button"
    >
      {#if !isLoading}
        YES
      {:else if isLoading}
        <svg
          class="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      {/if}
    </button>

    {#if !isLoading}
      <button
        on:click={onRequestClose}
        class="bg-orange-600 flex-1 rounded-lg px-2 py-1 my-2 sm:px-3 sm:py-2 hover:scale-110 transition-all duration-500 text-white font-nunito font-semibold cursor-pointer"
        type="button"
      >
        NO
      </button>
    {/if}
  </div>
</AppModal>
