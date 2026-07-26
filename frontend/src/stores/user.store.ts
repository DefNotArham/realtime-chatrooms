import { create } from "zustand";
import axios from "axios";

import api from "../lib/api.ts";

type UserStoreType = {
  createUser: (clientId: string) => Promise<void>;
  editUsername: (
    clientId: string,
    newUsername: string,
  ) => Promise<string | null>;
  editUsernameError: string | null;
};

const useUserStore = create<UserStoreType>((set) => ({
  editUsernameError: null,

  createUser: async (clientId: string) => {
    try {
      await api.post("/user/create-user", { clientId });
    } catch (error) {
      console.log(error);
    }
  },

  editUsername: async (clientId: string, newUsername: string) => {
    set({ editUsernameError: null });

    try {
      const response = await api.post("/user/edit-username", {
        clientId,
        newUsername,
      });

      return response.data.existingUser.username;
    } catch (error) {
      console.log(error);

      if (axios.isAxiosError(error)) {
        set({
          editUsernameError:
            error.response?.data?.message ?? "Something went wrong",
        });
      }

      setTimeout(() => {
        set({ editUsernameError: null });
      }, 3000);

      return null;
    }
  },
}));

export default useUserStore;
