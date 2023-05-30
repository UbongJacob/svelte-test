<script lang="ts">
  export let isVisible: boolean;
  export let onRequestClose: () => void;
  export let className: string = "";
</script>

<!-- MODAL BODY -->
<div
  class={`justify-center items-center  flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[10001] outline-none focus:outline-none  transition-all  ${
    isVisible ? " translate-y-0 " : "translate-y-full"
  }`}
>
  <!-- MODAL CONTENT -->
  <div
    class={`p-5 max-h-[98%] rounded-lg overflow-y-auto ${
      className ? className : "bg-white"
    }`}
  >
    <slot />
  </div>
</div>

<!-- MODAL OVERLAY -->
<div
  class={`opacity-40 fixed inset-0 z-[10000] bg-black transition-all duration-200  ${
    isVisible ? " translate-y-0 " : "translate-y-full"
  }`}
/>

<button
  type="button"
  on:click={() => onRequestClose()}
  class={`fixed top-6 right-6 gap-2  z-[10000000] flex transition-all ${
    isVisible ? "translate-x-0" : " translate-x-32"
  } `}
>
  <p class="text-lg font-semibold">Close</p>
  <span class="text-orange-500 animate-bounce text-2xl">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      ><path
        fill="currentColor"
        d="M8.27 3L3 8.27v7.46L8.27 21h7.46C17.5 19.24 21 15.73 21 15.73V8.27L15.73 3M9.1 5h5.8L19 9.1v5.8L14.9 19H9.1L5 14.9V9.1m4.12-1.39L7.71 9.12L10.59 12l-2.88 2.88l1.41 1.41L12 13.41l2.88 2.88l1.41-1.41L13.41 12l2.88-2.88l-1.41-1.41L12 10.59"
      /></svg
    >
  </span>
</button>
