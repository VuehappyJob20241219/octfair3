<template>
  <div>
    <!-- 이미지뷰 -->
    <div class="gallery-container" v-if="qnaList?.qnaCnt > 0">
      <div
        class="card"
        v-for="qna in qnaList.notice"
        :key="qna.noticeIdx"
        v-on:click="handlerGetDetailBtn(qna.noticeIdx)"
      >
        <div class="image-wrapper">
          <img v-if="qna.logicalPath" :src="`/api${qna.logicalPath}`" />
          <img v-else src="../../../../assets/logo.png" />
        </div>
        <div class="title">{{ qna.title }}</div>
      </div>
    </div>

    <!-- 페이지네이션 -->
    <div class="page-navigate-styled">
      <Pagination
        :totalItems="qnaList?.qnaCnt || 0"
        :items-per-page="itemPerPage"
        :max-pages-shown="5"
        :onClick="searchList"
        v-model="cPage"
      />
    </div>

    <!-- 모달 -->
    <QnaDetail v-if="modalStore.modalState" :idx="noticeIdx" v-on:postSuccess="searchList" @modalClose="qnaIdx = 0" />
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useNoticeListGetQuery } from "../../../../hook/notice/useNoticeListGetQuery";
import axios from "axios";
import Pagination from "../../../common/Pagination.vue";
import { useModalStore } from "@/stores/modalState";
import { useRouter } from "vue-router";

const route = useRoute();
const injectedSearchValue = inject("providedSearchValue");
// const noticeList = ref();
const itemPerPage = ref(12);
const cPage = ref(1);
const qnaIdx = ref(0);
const modalStore = useModalStore();
const queryClient = useQueryClient();
const router = useRouter();

const searchList = () => {
  // // 기존방식
  // const param = {
  //     searchTitle: route.query.searchTitle || '',
  //     searchStDate: route.query.searchStDate || '',
  //     searchEdDate: route.query.searchEdDate || '',
  //     currentPage: cPage.value.toString(),
  //     pageSize: itemPerPage.value.toString(),
  // };
  // axios.post('/api/board/noticeListBody.do', param) // '/api/board/noticeListBodyThumb.do' 로 보내면 썸네일 처리
  //     .then((res) => { noticeList.value = res.data; });

  // Tanstack방식
  queryClient.invalidateQueries({
    // 'noticeList'란 key로 NoticeMain에 있는 useQuery를 가동시켜 list 새로고침
    queryKey: ["qnaList"],
  });
};

const handlerGetDetailBtn = (param) => {
  // 기존방식
  modalStore.setModalState();
  qnaIdx.value = param;

  // // Tanstack방식
  // router.push({ // URLpath를 push해도 되고 router(index.js)에 명시된 name을 push해도 된다.
  //     name: 'noticeDetail',
  //     params: { idx : param },
  // });
};

// // 기존방식: 조건을 onMounted()와 watch()에서 감지하여 searchList를 실행하는 방식 (+ searchList는 NoticeMain 내장, Detail은 Modal방식)
// onMounted(() => { searchList(); });
// watch((route), () => searchList());
// 아래방식: 조건을 TanStack-useQuery가 감지하여 searchList를 실행하는 방식 (+ searchList는 모듈화하여 외부에, Detail은 별도Page방식)
const {
  data: noticeList, // useQuery(useNoticeListSearchQuery) 내 callback함수 return값이 입력된다
  isLoading,
  isSuccess,
  isError,
  isStale, // 캐시유지 주기
  refetch, // 자동갱신 주기
} = useQnaListGetQuery(injectedSearchValue, cPage, itemPerPage);
</script>

<style lang="scss" scoped>
.gallery-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  padding: 16px;
}

.card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s;
}

.card:hover {
  transform: scale(1.2);
}

.image-wrapper {
  width: 100%;
  height: 150px;
  background: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.title {
  padding: 8px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
}

.page-navigate-styled {
  margin-top: 20px;
}
</style>
