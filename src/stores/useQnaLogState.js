import { defineStore } from "pinia";
import { ref } from "vue";

export const useQnaLogState = defineStore("qnaLogState", {
    // 상태 정의
    state: () => ({
        loginState: ref("All"), // 초기 상태값
    }),

    // 액션 정의
    actions: {
        setQnaLogState(state) {
            this.loginState = state; // 상태 변경
        },
    },
});