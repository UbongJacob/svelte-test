import { create } from "apisauce";

const apiClient = create({
  baseURL: "https://6473e10a7de100807b1a3eaf.mockapi.io",
});

const picsumApi = create({
  baseURL: "https://picsum.photos/v2",
});

export interface Worker {
  createdAt: string;
  name: string;
  avatar: string;
  age: number;
  role: string;
  id: string;
}

interface UnsplashPhoto {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export type Workers = Worker[];

export const getWorkers = async () => await apiClient.get<Workers>("/Workers");

export const addWorker = async (params: Omit<Worker, "id">) =>
  await apiClient.post<Worker>("/Workers", params);

export const updateWorker = async (params: {
  id: string;
  data: Partial<Omit<Worker, "id">>;
}) => await apiClient.put<Worker>(`/Workers/${params.id}`, params.data);

export const deleteWorker = async (brandXid: string) =>
  await apiClient.delete<Worker>(`/Workers/${brandXid}`);

export const getRandomImageURL = async () =>
  await picsumApi.get<UnsplashPhoto[]>("/list?limit=100");
