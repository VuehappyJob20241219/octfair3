<template>
  <FaqModal
    v-if="faqModalState.modalState"
    @postSuccess="searchList"
    @modalClose="() => (faqSeq = 0)"
    :idx="faq_idx"
  />
  <div class="divFaqList">
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
        <template v-if="faqList">
          <template v-if="faqList.faqCnt > 0">
            <tr v-for="faq in faqList.faq" :key="faq.faq_idx">
              <td>{{ faq.faq_idx }}</td>
              <td @click="handlerModal(faq.faq_idx)">{{ faq.title }}</td>
              <td>{{ faq.created_date.substr(0, 10) }}</td>
              <td>{{ faq.author }}</td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="7">일치하는 검색 결과가 없습니다</td>
            </tr>
          </template>
        </template>
      </tbody>
    </table>
    <Pagination
      :totalItems="faqList?.faqCnt || 0"
      :items-per-page="5"
      :max-pages-shown="5"
      :onClick="searchList"
      v-model="cPage"
    />
  </div>
</template>
<script setup>
import axios from "axios";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useModalStore } from "../../../../stores/modalState";
import { useUserInfo } from "../../../../stores/userInfo";
import Pagination from "../../../common/Pagination.vue";
import FaqModal from "./FaqModal.vue";

const route = useRoute();
const faqList = ref();
const cPage = ref(1);
const faq_idx = ref(0);
const faqModalState = useModalStore();
const userInfo = useUserInfo();

const faq_fype = userInfo.user.userType === "B" ? 1 : 2;

const searchList = async () => {
  const param = new URLSearchParams({
    searchTitle: route.query.searchTitle || "",
    searchStDate: route.query.searchStDate || "",
    searchEdDate: route.query.searchEdDate || "",
    currentPage: cPage.value,
    pageSize: 5,
    faq_type: faq_fype,
  });
  await axios.post("/api/board/faqListRe.do", param).then((res) => {
    faqList.value = res.data;
  });
};

const handlerModal = (idx) => {
  faqModalState.setModalState();
  axios.post("/api/board/faqDetail.do", { faqSeq: idx }).then((res) => {
    faqList.value = res.data;
  });
};

watch(route, searchList);

onMounted(() => {
  searchList();
});
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
