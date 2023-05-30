<script lang="ts">
  export let title: string;
  export let isLoading: boolean;
  export let isSecondary: boolean = false;
</script>

<button
  disabled={isLoading}
  class:full-width={isSecondary}
  on:click
  class="bg-sky-600 items-center disabled:cursor-not-allowed disabled:opacity-60 sm:w-[85%] mt-5 mx-auto w-full flex-1 rounded-lg px-2 py-1 my-2 sm:px-3 flex justify-center sm:py-1 hover:scale-110 transition-all duration-500 text-white font-nunito font-semibold cursor-pointer"
  type="submit"
>
  <span class="m-2"> {title} </span>

  <span hidden={!isLoading}>
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
  </span>
</button>

<style>
  .full-width {
    @apply w-full rounded-full hover:scale-105;
  }
</style>
