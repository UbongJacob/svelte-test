<script lang="ts">
  import { Link, navigate } from "svelte-routing";
  import { createForm } from "svelte-forms-lib";
  import * as yup from "yup";
  import toast from "svelte-french-toast";

  import HeroImage from "../assets/hero.svg";
  import AppLogo from "../assets/logo.png";
  import AppButton from "../components/AppButton.svelte";
  import { addUser } from "../api/auth";
  import AppFormField from "../components/AppFormField.svelte";

  let isRequestLoading = false;
  let isPasswordVisible = false;

  interface InitialValues {
    email: string;
    password: string;
    confirmpassword: string;
  }

  const initialValues: InitialValues = {
    email: "",
    password: "",
    confirmpassword: "",
  };

  const schema = yup.object().shape({
    email: yup.string().required().email().label("Email").trim(),
    password: yup.string().required().min(2).label("Password").trim().max(100),
    confirmpassword: yup
      .string()
      .required()
      .min(2)
      .label("Confirm Password")
      .trim()
      .max(100),
  });

  const { form, errors, handleChange, handleSubmit, handleReset } = createForm({
    initialValues,
    validationSchema: schema,
    onSubmit: (values) => {
      handleRegister(values);
    },
  });

  const handleRegister = async (values: InitialValues) => {
    if (values.password !== values.confirmpassword)
      return toast.error("Password Do Not Match");

    isRequestLoading = true;
    const response = await addUser({
      email: values.email.toLowerCase(),
      password: values.password,
    });
    isRequestLoading = false;

    if (response.ok) {
      toast.success("Registration Succesfull");
      navigate("/login", { replace: true });
      handleReset();
    } else {
      toast.error(response.problem ?? response.originalError.toString());
    }
  };
</script>

<main class="lg:flex min-h-screen bg-indigo-100 lg:bg-white">
  <section class="lg:w-1/2 xl:max-w-screen-sm">
    <div class="py-3 flex justify-center lg:justify-start lg:px-12">
      <div class="cursor-pointer flex items-center">
        <img src={AppLogo} class="w-36 ml-2" alt="logo" draggable={false} />
      </div>
    </div>
    <div
      class="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-3 xl:px-24 xl:max-w-2xl"
    >
      <h1
        class="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
                  xl:text-bold"
      >
        Register here!
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
          autocomplete="password-new"
          error={$errors.password}
          label="Password"
          type={isPasswordVisible ? "text" : "password"}
          on:change={handleChange}
          on:blur={handleChange}
          bind:value={$form.password}
        />
        <AppFormField
          autocomplete="password-new"
          error={$errors.confirmpassword}
          label="ConfirmPassword"
          type={isPasswordVisible ? "text" : "password"}
          on:change={handleChange}
          on:blur={handleChange}
          bind:value={$form.confirmpassword}
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
          on:click={handleSubmit}
          isSecondary
          isLoading={isRequestLoading}
          title="Register"
        />

        <Link
          class="text-orange-600 font-mono font-bold hover:scale-110 m-3 transition-all  duration-300"
          to="/login">Already have an accout? <strong>Login</strong></Link
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
