<script lang="ts">
  import { Link } from "svelte-routing";
  import * as Yup from "yup";
  import { createForm } from "svelte-forms-lib";
  import { navigate } from "svelte-routing";

  import HeroImage from "../assets/hero.svg";
  import AppLogo from "../assets/logo.png";
  import AppButton from "../components/AppButton.svelte";
  import { authStorageName, getUsers } from "../api/auth";
  import toast from "svelte-french-toast";
  import AppFormField from "../components/AppFormField.svelte";

  let isRequestLoading = false;
  let isPasswordVisible = false;

  const handleLogin = async ({ email, password }: InitialValues) => {
    isRequestLoading = true;
    const response = await getUsers();
    console.log(response.data);
    isRequestLoading = false;
    if (response.ok) {
      const loggedInUser = response.data.find(
        (user) =>
          user.email.toLowerCase() === email.toLowerCase() &&
          user.password === password
      );
      if (loggedInUser) {
        sessionStorage.setItem(authStorageName, JSON.stringify(loggedInUser));
        toast.success("Logged In successful");
        navigate("/dashboard", { replace: true });
      } else {
        toast.error("Logged In Failed");
      }
    }
  };

  interface InitialValues {
    email: string;
    password: string;
  }

  const initialValues: InitialValues = {
    email: "",
    password: "",
  };

  const schema = Yup.object().shape({
    email: Yup.string().required().email().label("Email").trim(),
    password: Yup.string().required().min(2).label("Password").trim().max(100),
  });
  const { form, errors, handleChange, handleSubmit } = createForm({
    initialValues,
    validationSchema: schema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });
</script>

<main class="lg:flex min-h-screen bg-indigo-100 lg:bg-white">
  <section class="lg:w-1/2 xl:max-w-screen-sm">
    <div class="py-12 flex justify-center lg:justify-start lg:px-12">
      <div class="cursor-pointer flex items-center">
        <img src={AppLogo} class="w-36 ml-2" alt="logo" draggable={false} />
      </div>
    </div>
    <div
      class="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-3 xl:px-24 xl:max-w-2xl"
    >
      <span class="block">Welcome Back</span>
      <h1
        class="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
                    xl:text-bold"
      >
        Login here!
      </h1>

      <section class="mt-2 flex flex-col">
        <AppFormField
          autocomplete="email"
          label="Email"
          error={$errors.email}
          on:change={handleChange}
          on:blur={handleChange}
          bind:value={$form.email}
        />

        <AppFormField
          autocomplete="password"
          error={$errors.password}
          label="Password"
          type={isPasswordVisible ? "text" : "password"}
          on:change={handleChange}
          on:blur={handleChange}
          bind:value={$form.password}
        />
        <button
          on:click={() => (isPasswordVisible = !isPasswordVisible)}
          class={`bg-sky-900 flex-1 w-max rounded-lg px-2 py-1 my-2 sm:px-3 flex justify-center sm:py-2 transition-all  text-white font-nunito font-semibold cursor-pointer ${
            isPasswordVisible && "bg-red-700"
          }`}
          type="button"
          >{isPasswordVisible ? "Hide Password" : "View Password"}
        </button>

        <AppButton
          isLoading={isRequestLoading}
          isSecondary
          on:click={handleSubmit}
          title="Login"
        />

        <Link
          class="text-orange-600 font-mono font-bold hover:scale-110 m-3 transition-all  duration-300"
          to="/register">Do not have an account? <strong>Register</strong></Link
        >
      </section>
    </div>
  </section>

  <section
    class="hidden lg:flex items-center justify-center bg-indigo-100 flex-1 h-screen"
  >
    <div class="max-w-xs transform duration-200 hover:scale-110 cursor-pointer">
      <img class="h-full w-full" src={HeroImage} alt="hero" draggable={false} />
    </div>
  </section>
</main>
