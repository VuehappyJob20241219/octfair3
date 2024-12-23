<template>
  <!-- <NoticeModal
    v-if="modalStateNotice.modalState"
    @postSuccess="searchList"
    @modalClose="() => (noticeIdx = 0)"
    :idx="noticeIdx"
  /> -->
  <div class="divNoticeList">
    현재 페이지:{{ cPage }} 총 개수: {{ noticeList?.noticeCnt }}
    <table>
      <colgroup>
        <col width="10%" />
        <col width="50%" />
        <col width="30%" />
        <col width="10%" />
      </colgroup>

      <thead>
        <tr>
          <th scope="col">번호</th>
          <th scope="col">제목</th>
          <th scope="col">작성일</th>
          <th scope="col">작성자</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="isLoading">...로딩중</template>
        <template v-if="isSuccess">
          <template v-if="noticeList.noticeCnt > 0">
            <tr v-for="notice in noticeList.notice" v-bind:key="notice.noticeIdx">
              <td>{{ notice.noticeIdx }}</td>
              <td @click="handlerDetail(notice.noticeIdx)">{{ notice.title }}</td>
              <td>{{ notice.createdDate}}</td>
              <td>{{ notice.author }}</td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="7">일치하는 검색 결과가 없습니다</td>
            </tr>
          </template>
        </template>
        <template v-if="isError">에러</template>
      </tbody>
    </table>
    <Pagination
      :totalItems="noticeList?.noticeCnt || 0"
      :items-per-page="5"
      :max-pages-shown="5"
      :onClick="searchList"
      v-model="cPage"
    />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import Pagination from "../../../common/Pagination.vue";
import { useNoticeListSearchQuery } from "../../../hook/notice/useNoticeListSearchQuery";

const router = useRouter();
const cPage = ref(1);
const injectedValue = inject("provideValue");
//const noticeList = ref();
// const modalStateNotice = useModalStore();
// const noticeIdx = ref(0);

// const searchList = async () => {
//   const param = new URLSearchParams({
//     ...injectedValue.value,
//     currentPage: cPage.value,
//     pageSize: 5,
//   });
//   const result = await axios.post("/api/board/noticeListJson.do", param);

//   return result.data;
// };

// const {
//   data: noticeList,
//   isLoading,
//   refetch,
//   isSuccess,
//   isError,
// } = useQuery({
//   //qeuryKey: ["noticeList"],
//   //검색
//   queryKey: ["noticeList", injectedValue, cPage],
//   queryFn: searchList,
//   staleTime: 1000 * 60,
//   // 신선한상태를 보장하는 시간 1분(매번(예 뒤로가기) 재조회를 하지않음)
//   // refetchInterval: 1000,  // 1초마다 데이터 가져옴
// });

const { data: noticeList, isLoading, refetch, isSuccess } = useNoticeListSearchQuery(injectedValue, cPage);

const handlerDetail = (param) => {
  router.push({
    name: "noticeDetail",
    params: { idx: param },
  });
  //url 스트링이여야 한다. 인덱스가 넘버엿어서 스트링으로 변환
};

// 검색
// watch([injectedValue, cPage], refetch);
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0px 0px 0px;
  font-size: 18px;
  text-align: left;

  th,
  td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    text-align: center;
  }

  th {
    background-color: #2676bf;
    color: #ddd;
  }

  /* 테이블 올렸을 때 */
  tbody tr:hover {
    background-color: #d3d3d3;
    opacity: 0.9;
    cursor: pointer;
  }
}
</style>
