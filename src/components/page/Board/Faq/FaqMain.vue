<template>
  <FaqModal
    v-if="faqModalState.modalState"
    @postSuccess="searchList"
    @modalClose="() => (faqSeq = 0)"
    :idx="faq_idx"
  />
  <b-button :pressed.sync="myToggle==='personal'" variant="primary"  @click="personalFaq">개인회원</b-button>
  <b-button :pressed.sync="myToggle==='company'" variant="primary"  @click="companyFaq">기업회원</b-button>  
  <div class="divFaqList">
    <table>
      <colgroup>
        <col width="10%" />
        <col width="40%" />
        <col width="15%" />
        <col width="15%" />
        <col width="10%" />
      </colgroup>

      <thead>
        <tr>
          <th scope="col">번호</th>
          <th scope="col">제목</th>
          <th scope="col">작성일</th>
          <th scope="col">작성자</th>
          <th scope="col" v-if="userInfo.user.userType === 'M'">관리</th>
        </tr>
      </thead>

      <tbody>
        <template v-if="faqList">
          <template v-if="faqList.faqCnt > 0">
            <template v-for="faq in faqList.faq" :key="faq.faq_idx">
              <tr>
                <!-- 제목 -->
                <td>{{ faq.faq_idx }}</td>
                <td @click="toggleAccordion(faq.faq_idx)">
                  {{ faq.title }}
                </td>
                <td>{{ faq.created_date.substr(0, 10) }}</td>
                <td>{{ faq.author }}</td>
                <td v-if="userInfo.user.userType === 'M'">
                  <b-button pill @click="handlerModal(faq.faq_idx)"
                    >관리</b-button
                  >
                </td>
              </tr>
              <tr>
                <!-- 내용 -->
                <transition
                  @before-enter="beforeEnter"
                  @enter="enter"
                  @before-leave="beforeLeave"
                  @leave="leave"
                >
                  <td v-if="activeAccordion === faq.faq_idx" colspan="4">
                    {{ faq.content }}
                  </td>
                </transition>
              </tr>
            </template>
          </template>
          <template v-else>
            <div>일치하는 검색 결과가 없습니다.</div>
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
const activeAccordion = ref(null);

const myToggle = ref(userInfo.user.userType ==="A"? "personal" : "company");

const faq_fype = ref(userInfo.user.userType === "A" ? "1" : "2");

const searchList = async () => {
  const param = new URLSearchParams({
    searchTitle: route.query.searchTitle || "",
    searchStDate: route.query.searchStDate || "",
    searchEdDate: route.query.searchEdDate || "",
    currentPage: cPage.value,
    pageSize: 5,
    faq_type: faq_fype.value,
  });
  const response = await axios.post("/api/board/faqListRe.do", param);
  faqList.value = response.data;
};

const personalFaq = () => {
  faq_fype.value = "1";
  myToggle.value = 'personal'; // 개인회원 버튼 활성화
  searchList();
};

const companyFaq = () => {
  faq_fype.value = "2";
  myToggle.value = 'company'; // 기업회원 버튼 활성화
  searchList();
};

const toggleAccordion = (faq_idx) => {
  activeAccordion.value = activeAccordion.value === faq_idx ? null : faq_idx;
};

const handlerModal = (idx) => {
  faqModalState.setModalState();
  faq_idx.value = idx;
};

const beforeEnter = (el) => {
  el.style.maxHeight = "0";
};

const enter = (el) => {
  el.style.maxHeight = el.scrollHeight + "px"; // 내용에 맞게 max-height 설정
};

const beforeLeave = (el) => {
  el.style.maxHeight = el.scrollHeight + "px"; // leave 전에는 펼쳐진 상태로 유지
};

const leave = (el) => {
  el.style.maxHeight = "0";
  el.style.overflow = "hidden";
};



onMounted(() => {
  searchList();
});

watch(route, searchList);
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0px 0px 0px;
  font-size: 18px;
  text-align: left;
  table-layout: auto; /* 수정: table-layout을 auto로 설정하여 셀 크기를 내용에 맞게 조정 */

  th,
  td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    text-align: center;
    word-wrap: break-word;
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
