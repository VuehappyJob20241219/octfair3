import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { Login } from "../api/axiosApi/loginApi";

export const useUserInfo = defineStore(
  "userInfo",
  () => {
    const user = ref();
    const isAuthenticated = ref(false);

    async function setUserData(loginInfo) {
      const param = new URLSearchParams(loginInfo);
      const result = await axios.post(Login.login, param);
      user.value = result.data;
      return result.data.result;
    }

    async function setAuthenticated() {
      isAuthenticated.value = !isAuthenticated.value;
    }

    return { user, setUserData, isAuthenticated, setAuthenticated };
  },
  { persist: { storage: sessionStorage } }
);
