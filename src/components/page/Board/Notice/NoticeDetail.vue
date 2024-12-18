<template>
  <div>
    <div>
      <context-box>공지사항 상세조회</context-box>
      <div>
        <input type="text" v-model="number" />
        <input type="text" v-model="number2" />
        {{ fullNum }}
      </div>
      <div v-if="isLoading">기다려 주세요</div>
      <div v-else>
        <label> 제목 :<input type="text" v-model="detailValue.title" /> </label>
        <label>
          내용 :
          <input type="text" v-model="detailValue.content" />
        </label>
        파일 :<input type="file" style="display: none" id="fileInput" />
        <label class="img-label" htmlFor="fileInput"> 파일 첨부하기 </label>
        <!-- <div>
        <div v-if="imageUrl">
          <label>미리보기</label>
          <img :src="imageUrl" />
        </div>
        <div v-else>
          <label>파일명</label>
        </div>
      </div> -->
        <div class="button-box">
          <button @click="handlerUpdateBtn">저장</button>
          <button>삭제</button>
          <button @click="$router.go(-1)">뒤로가기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQuery } from "@tanstack/vue-query";
import { useRoute } from "vue-router";
import axios from "axios";
import { computed, watchEffect } from "vue";

const { params } = useRoute();
const detailValue = ref({});

const number = ref(0);
const number2 = ref(0);
const fullNum = computed(() => {
  return `${number.value}+${number2.value}`;
});
// computed 계산된 속성, 우리가 값을 내기 전에 복잡한 로직을 수행하는 경우가 있어서
// 근데 그것을 매번 할 수 가 없어서
// 같은 로직을 매번 사용하는 수고를 덜어줌
// 왜냐? -> 계산된 속성(computed) 최초에 한 번만 로직을 수행하고,
// 그 이후에는 computed에 저장된 값만 사용함

const searchDetail = async () => {
  const result = await axios.post(`/api/board/noticeDetailBody.do`, { noticeSeq: params.idx });
  return result.data;
};

const {
  data: noticeDetail,
  isLoading,
  isSuccess,
} = useQuery({
  queryKey: ["noticeDetail"],
  queryFn: searchDetail,
});
// useQuery 화면이 시작될 때 자동 실행

const handlerUpdateBtn = () => {
  const textData = {
    title: noticeDetail.value.detail.title,
    content: noticeDetail.value.detail.content,
    noticeSeq: params.idx,
  };
  console.log("데이터 찍기", detailValue.value);
  // const formData = new FormData();
  // if (fileData.value) {
  //   formData.append("file", fileData.value);
  // }
  // formData.append(
  //   "text",
  //   new Blob([JSON.stringify(textData)], {
  //     type: "application/json",
  //   })
  // );

  // axios.post(`/api/board/noticeUpdateFileForm.do`, textData).then((res) => {
  //   if (res.data.result === "success") {
  //     modalStateNotice.setModalState();
  //     emit("postSuccess");
  //   }
  // });
};

watchEffect(() => {
  if (isSuccess.value && noticeDetail.value) {
    detailValue.value = toRaw(noticeDetail.value.detail);
    //toRaw 뭔지 찾아봐
  }
});
</script>

<style lang="scss" scoped>
.backdrop {
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  flex-flow: row wrep;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
  font-weight: bold;
}

label {
  display: flex;
  flex-direction: column;
}

input[type="text"] {
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.container {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  position: relative;
  width: 400px;
}

img {
  width: 100px;
  height: 100px;
}

.img-label {
  margin-top: 10px;
  padding: 6px 25px;
  background-color: #ccc;
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.9);
  cursor: pointer;

  &:hover {
    background-color: #45a049;
    color: white;
  }

  &:active {
    background-color: #3e8e41;
    box-shadow: 0 2px #666;
    transform: translateY(2px);
  }
}

.button-box {
  text-align: right;
  margin-top: 10px;
}
button {
  background-color: #3bb2ea;
  border: none;
  color: white;
  padding: 10px 22px;
  text-align: right;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 12px;
  box-shadow: 0 4px #999;
  transition: 0.3s;

  &:hover {
    background-color: #45a049;
  }

  &:active {
    background-color: #3e8e41;
    box-shadow: 0 2px #666;
    transform: translateY(2px);
  }
}
</style>
