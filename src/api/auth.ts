import toast from "svelte-french-toast";
import { create } from "apisauce";
import { navigate } from "svelte-routing";

const apiClient = create({
  baseURL: "https://6473e10a7de100807b1a3eaf.mockapi.io",
});

interface User {
  email: string;
  password: string;
  id: string;
}

export const getUsers = async () => await apiClient.get<User[]>("/users");

export const addUser = async (params: Omit<User, "id">) =>
  await apiClient.post<Worker>("/users", params);

export const authStorageName: Readonly<string> = "AUTH";

export const userDetails = sessionStorage.getItem(authStorageName);

export const handleLogout = () => {
  sessionStorage.removeItem(authStorageName);
  toast.success("Logged out successfully");
  navigate("/login", { replace: true });
};
