import { defineStore } from "pinia";

export const useModalStore = defineStore("modalState", () => {
<<<<<<< HEAD
    const modalState = ref(false);
=======
  const modalState = ref(false);
>>>>>>> ae94c1ed9e58ca70f5fe35ddb16c9e0df3222b90

  const setModalState = () => {
    modalState.value = !modalState.value;
  };

<<<<<<< HEAD
    return { modalState, setModalState };
});
=======
  return { modalState, setModalState };
});
>>>>>>> ae94c1ed9e58ca70f5fe35ddb16c9e0df3222b90
