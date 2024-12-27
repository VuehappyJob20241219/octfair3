<template>
  <FaqModal
    v-if="faqModalState.modalState"
    @postSuccess="searchList"
    @modalClose="() => (faqSeq = 0)"
    :idx="faq_idx"
  />
  <button @click="personalFaq">개인회원</button>
  <button @click="companyFaq">기업회원</button>
  <div class="divFaqList">
    <table>
      <colgroup>
        <col width="10%" />
        <col width="50%" />
        <col width="20%" />
        <col width="10%" />
        <col width="10%" />
      </colgroup> 

      <thead>
        <tr>
          <th scope="col">번호</th>
          <th scope="col">제목</th>
          <th scope="col">작성일</th>
          <th scope="col">작성자</th>
          <th scope="col" v-if="userInfo.user.userType==='M'">관리</th>
        </tr>
      </thead>
      
      <tbody>
        
        <template v-if="faqList" class="accordion">
        <template v-if="faqList.faqCnt > 0">
          <tr
            v-for="faq in faqList.faq" 
            :key="faq.faq_idx" 
            class="accordion-item">
            <!-- 제목 -->
            <td>{{ faq.faq_idx }}</td>
            <td class="accordion-header" 
                @click="toggleAccordion(faq.faq_idx)">{{ faq.title }}</td>
            <td>{{ faq.created_date.substr(0, 10) }}</td>
            <td>{{ faq.author }}</td>
            <td v-if="userInfo.user.userType==='M'">
              <button @click="handlerModal(faq.faq_idx)">관리</button> </td>
            <!-- 내용 -->
            <transition 
              @before-enter="beforeEnter" 
              @enter="enter" 
              @before-leave="beforeLeave" 
              @leave="leave">
              <td v-if="activeAccordion === faq.faq_idx" class="accordion-content">
                {{ faq.content }}
              </td>
            </transition>
          </tr>
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

const faq_fype = ref(userInfo.user.userType === "B" ? "1" : "2");

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
  searchList();
}

const companyFaq = () => {
  faq_fype.value = "2";
  searchList();
}

const toggleAccordion = (faq_idx) => {
  activeAccordion.value = activeAccordion.value === faq_idx ? null : faq_idx;  
};

const handlerModal = (idx) => {
  faqModalState.setModalState();
  faq_idx.value = idx;
};

const beforeEnter = (el) => {
  el.style.maxHeight = '0';  
};

const enter = (el) => {
  el.style.maxHeight = el.scrollHeight + 'px'; // 내용에 맞게 max-height 설정
};

const beforeLeave = (el) => {
  el.style.maxHeight = el.scrollHeight + 'px'; // leave 전에는 펼쳐진 상태로 유지
};

const leave = (el) => {
  el.style.maxHeight = '0';
  el.style.overflow = 'hidden';
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
  table-layout: auto;  /* 수정: table-layout을 auto로 설정하여 셀 크기를 내용에 맞게 조정 */

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

  .accordion {
  margin: 20px 0;
  }

  .accordion-item {
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    overflow: hidden;
  }

  .accordion-header {
    background: #f5f5f5;
    padding: 10px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
  }

  .accordion-header:hover {
    background: #e0e0e0;
  }

  .accordion-content {
  padding: 10px;
  background: #fff;
  border-top: 1px solid #ddd;
  overflow: hidden;
  word-break: break-word;
  max-width: 100%;
  }
}


</style>