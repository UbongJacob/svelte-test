<script lang="ts">
  import { onMount } from "svelte";
  import toast from "svelte-french-toast";
  import { createForm } from "svelte-forms-lib";
  import * as yup from "yup";

  import AppTable from "../components/AppTable.svelte";
  import {
    addWorker,
    deleteWorker,
    getRandomImageURL,
    getWorkers,
    updateWorker,
    type Worker,
    type Workers,
  } from "../api/workers";
  import AppPrompt from "../components/AppPrompt.svelte";
  import AppFormField from "../components/AppFormField.svelte";
  import AppFormModal from "../components/AppFormModal.svelte";
  import { handleLogout } from "../api/auth";

  let isDeleteOpen: boolean = false;
  let isRequestLoading: boolean = false;
  let activeRow: Worker = null;
  let isFormVisible: boolean = false;
  export let isAuthenticated: boolean;

  interface InitialValues {
    name: string;
    role: string;
    age: number;
  }

  const initialValues: InitialValues = {
    name: "",
    role: "",
    age: 0,
  };

  const {
    form,
    errors,
    handleChange,
    handleSubmit,
    updateInitialValues,
    handleReset,
  } = createForm({
    initialValues,
    validationSchema: yup.object().shape({
      name: yup.string().required().min(2).label("Name").trim().max(100),
      role: yup.string().required().min(2).label("Role").trim().max(100),
      age: yup.number().required().moreThan(0).lessThan(100),
    }),
    onSubmit: (values) => {
      if (activeRow) {
        handleUpdate(values);
      } else {
        handleCreate(values);
      }
    },
  });

  const handleCreate = async (values: InitialValues) => {
    let imageURL = "https://picsum.photos/id/15/2500/1667";
    isRequestLoading = true;
    const imageResponse = await getRandomImageURL();
    if (imageResponse.ok) {
      // random number between 1 and 99
      let randomNum = Math.floor(Math.random() * 98) + 1;
      imageURL = imageResponse.data[randomNum].download_url;
    }

    const data: Omit<Worker, "id"> = {
      age: values.age,
      createdAt: new Date().toISOString(),
      name: values.name,
      role: values.role,
      avatar: imageURL,
    };
    const response = await addWorker(data);
    isRequestLoading = false;
    isFormVisible = false;
    if (response.ok) {
      toast.success("Worker added succesfully");
      tableRows = [...tableRows, response.data];
      handleReset();
    } else {
      toast.error(response.problem ?? response.originalError.toString());
    }
  };

  const handleUpdate = async (values: InitialValues) => {
    if (!activeRow) return toast.error("Invalid row id");

    let data: Partial<Omit<Worker, "id">> = {
      ...(activeRow.age !== values.age ? { age: values.age } : {}),
      ...(activeRow.name !== values.name ? { name: values.name } : {}),
      ...(activeRow.role !== values.role ? { role: values.role } : {}),
    };
    if (Object.keys(data).length < 1) {
      isFormVisible = false;
      updateInitialValues(initialValues);
      return toast.error("You made no changes");
    }
    data = { ...data, createdAt: new Date().toISOString() };

    isRequestLoading = true;
    const response = await updateWorker({ id: activeRow.id, data });
    isRequestLoading = false;
    isFormVisible = false;
    if (response.ok) {
      toast.success("Worker Updated succesfully");
      const index = tableRows.findIndex(({ id }) => id === response.data.id);
      tableRows[index] = response.data;
      handleReset();
      updateInitialValues(initialValues);
    } else {
      toast.error(response.problem ?? response.originalError.toString());
    }
  };

  const handleDelete = async () => {
    if (!activeRow) return toast.error("Invalid row id");

    isRequestLoading = true;
    const response = await deleteWorker(activeRow.id);
    isRequestLoading = false;
    isDeleteOpen = false;
    if (response.ok) {
      tableRows = tableRows.filter(({ id }) => id !== activeRow.id);
      activeRow = null;
      toast.success("Worker Deleted Succesfully");
    } else {
      toast.error(response.problem ?? response.originalError.toString());
    }
  };

  const tableHeads = ["Name", "Age", "Date Created"];
  let tableRows: Workers = [];

  onMount(async () => {
    if (isAuthenticated) {
      const response = await getWorkers();
      if (response.ok) {
        toast.success("Workers gotten succesfully");
        tableRows = response.data;
      } else {
        toast.error(response.problem ?? response.originalError.toString());
      }
    }
  });
</script>

<main
  class="bg-white min-h-screen flex flex-col items-center justify-center overflow-y-scroll"
>
  <AppTable
    on:rowEdit={(e) => {
      activeRow = e.detail;
      isFormVisible = true;
      updateInitialValues({
        age: e.detail.age,
        name: e.detail.name,
        role: e.detail.role,
      });
    }}
    on:rowDelete={(e) => {
      activeRow = e.detail;
      isDeleteOpen = true;
    }}
    on:addRow={() => (isFormVisible = true)}
    {tableHeads}
    {tableRows}
  />
  <AppFormModal
    title="Add Worker"
    subtitle="Please complete the form below to add a worker"
    on:submit={handleSubmit}
    isVisible={isFormVisible}
    onRequestClose={() => {
      activeRow = null;
      isFormVisible = false;
      updateInitialValues(initialValues);
    }}
  >
    <AppFormField
      label="Name"
      error={$errors.name}
      on:change={handleChange}
      on:blur={handleChange}
      bind:value={$form.name}
    />

    <AppFormField
      error={$errors.role}
      label="Role"
      on:change={handleChange}
      on:blur={handleChange}
      bind:value={$form.role}
    />

    <AppFormField
      on:change={handleChange}
      on:blur={handleChange}
      error={$errors.age}
      label="Age"
      type="number"
      value={$form.age}
    />

    <button
      disabled={isRequestLoading}
      class="bg-sky-600 items-center disabled:opacity-60 sm:w-[85%] mt-5 mx-auto w-full flex-1 rounded-lg px-2 py-1 my-2 sm:px-3 flex justify-center sm:py-2 hover:scale-110 transition-all duration-500 text-white font-nunito font-semibold cursor-pointer"
      type="submit"
    >
      <span class="m-2"> {!!activeRow ? "Update" : "Submit"} </span>

      <span hidden={!isRequestLoading}>
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
  </AppFormModal>

  <AppPrompt
    isLoading={isRequestLoading}
    title={`${activeRow?.name}`}
    onYesClicked={handleDelete}
    isVisible={isDeleteOpen}
    onRequestClose={() => (isDeleteOpen = false)}
  />

  <button
    on:click={handleLogout}
    type="button"
    class="bg-red-600 rounded-md px-3 py-2 hover:bg-red-400 hover:scale-110 transition-all duration-300 text-white mb-20"
    >Logout</button
  >
</main>
