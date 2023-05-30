<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import type { Worker, Workers } from "../api/workers";

  export let tableHeads: string[];
  export let tableRows: Workers;

  const dispatch = createEventDispatcher();

  const handleEdit = (row: Worker) => {
    dispatch("rowEdit", row);
  };
  const handleDelete = (row: Worker) => {
    dispatch("rowDelete", row);
  };
</script>

<section class="container mx-auto p-6 font-mono">
  <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
    <div class="w-full overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr
            class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600"
          >
            {#each tableHeads as tableHead, headerIndex (headerIndex)}
              <th class="px-4 py-3">{tableHead}</th>
            {/each}
            <th class="px-4 py-3">
              <button
                on:click={() => dispatch("addRow")}
                class=" bg-green-600 rounded-lg px-2 mr-1 md:mr-2 py-1 my-2 sm:px-3 sm:py-2 hover:scale-125 transition-all duration-500 text-white font-sans font-semibold cursor-pointer"
                type="button"
              >
                Add
              </button></th
            >
          </tr>
        </thead>
        <tbody class="bg-white">
          {#each tableRows as row, rowIndex (rowIndex)}
            <tr class="text-gray-700 relative">
              <td class="px-4 py-3 border">
                <div class="flex items-center text-sm">
                  <div class="relative w-8 h-8 mr-3 rounded-full md:block">
                    <img
                      class="object-cover w-full h-full rounded-full"
                      src={row.avatar}
                      alt={row.name}
                      loading="lazy"
                    />
                    <div
                      class="absolute inset-0 rounded-full shadow-inner"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p class="font-semibold text-black">{row.name}</p>
                    <p class="text-xs text-gray-600">{row.role}</p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3 text-ms font-semibold border">{row.age}</td>
              <td class="px-4 py-3 text-sm border">{row.createdAt}</td>

              <td
                class="flex justify-end px-4 py-3 text-ms font-semibold border"
              >
                <div class="group">
                  <button
                    class=" bg-slate-600 rounded-lg text-xs px-2 mr-1 md:mr-2 py-1 my-2 sm:px-3 sm:py-2 hover:scale-125 transition-all duration-500 text-white font-sans font-semibold cursor-pointer"
                    type="button"
                  >
                    Actions
                  </button>

                  <div
                    class={`group-hover:flex z-50 flex-col hidden absolute right-1 bg-gray-400 px-5 py-3 rounded-lg shadow-md border border-gray-600 ${
                      tableRows.length - 2 > rowIndex ? "top-12" : "bottom-10"
                    }`}
                  >
                    <button
                      on:click={() => handleEdit(row)}
                      class=" bg-orange-600 rounded-lg text-xs px-2 py-1 my-2 sm:px-3 sm:py-2 hover:scale-125 transition-all duration-500 text-white font-sans font-semibold cursor-pointer"
                      type="button"
                    >
                      EDIT
                    </button>
                    <button
                      on:click={() => handleDelete(row)}
                      class=" bg-red-600 rounded-lg px-2 text-xs py-1 my-2 sm:px-3 sm:py-2 hover:scale-125 transition-all duration-500 text-white font-sans font-semibold cursor-pointer"
                      type="button"
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</section>
