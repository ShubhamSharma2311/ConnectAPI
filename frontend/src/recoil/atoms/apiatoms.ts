import { atom } from "recoil";

interface API {
  _id: string;
  name: string;
  description: string;
  pricing: string;
}

export const apiState = atom<API[]>({
  key: "apiState",
  default: [],
});
