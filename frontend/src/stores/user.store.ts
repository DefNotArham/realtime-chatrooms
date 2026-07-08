import { create } from "zustand";

import api from "../lib/api.ts";

type UserStoreType = {
  createUser: (clientId: string) => Promise<void>;
};

const useUserStore = create<UserStoreType>(() => ({
  createUser: async (clientId: string) => {
    try {
      await api.post("/user/create-user", { clientId });
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useUserStore;
