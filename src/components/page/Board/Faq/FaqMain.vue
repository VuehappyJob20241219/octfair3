<template>   
  <div class="divFaqList">
  <b-button :pressed.sync="myToggle==='personal'" 
            :variant="myToggle === 'personal' ? 'primary' : 'secondary'" 
            @click="personalFaq">일반회원</b-button>
  <b-button :pressed.sync="myToggle==='company'" 
            :variant="myToggle === 'company' ? 'primary' : 'secondary'" 
            @click="companyFaq">기업회원</b-button> 
    <table>
      <colgroup>
        <col width="10%" />
        <col width="50" />
        <col width="15%" />
        <col width="15%" />
        <col v-if="userInfo.user.userType === 'M'" width="10%" />
      </colgroup>

      <thead>
        <tr>
          <th scope="col">번호</th>
          <th scope="col">제목</th>
          <th scope="col">작성일</th>
          <th scope="col">작성자</th>
          <th v-if="userInfo.user.userType === 'M'" width="10%">관리</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="isLoading">...로딩중</template>
        <template v-if="isSuccess">
          <template v-if="faqList.faqCnt > 0">
            <template v-for="faq in faqList.faq" :key="faq.faq_idx">
              <tr>
                <td>{{ faq.disPlayInx }}</td>
                <td @click="toggleFaqAnswer(faq.faq_idx)">
                  {{ faq.title }}
                </td>
                <td>{{ faq.created_date.substr(0, 10) }}</td>
                <td>{{ faq.author }}</td>
                <td v-if="userInfo.user.userType === 'M'">
                  <b-button pill @click="handlerUpdate(faq.faq_idx)"
                    >관리</b-button>
                </td>
              </tr>
              <tr>                             
                <td class="answerWindow" v-show="faqAnswer === faq.faq_idx" :colspan="userInfo.user.userType === 'M' ? 5 : 4">
                  {{ faq.content }}
                </td>                
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
    <FaqModal
    v-if="faqModalState.modalState"
    @postSuccess="searchList"
    @modalClose="() => (faqSeq = 0)"
    :idx="faq_idx"
  />
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { useModalStore } from "../../../../stores/modalState";
import { useUserInfo } from "../../../../stores/userInfo";
import Pagination from "../../../common/Pagination.vue";
import FaqModal from "./FaqModal.vue";
import { useFaqListSearchQuery } from "../../../hook/faq/useFaqListSearchQuery";
import { computed, inject,} from "vue";

const injectedValue = inject("provideValue");
const cPage = ref(1);
const userInfo = useUserInfo();
const isPersonalUser = userInfo.user.userType === "A" || userInfo.user.userType === "M";
const myToggle = ref(isPersonalUser ? "personal" : "company");
const faq_fype = ref(isPersonalUser ? "1" : "2");
const router = useRouter();

const faq_idx = ref(0);
const faqModalState = useModalStore();
const faqAnswer = ref(null);

const { data: faqList, isSuccess, isLoading,  } = useFaqListSearchQuery(injectedValue, cPage, faq_fype);

const personalFaq = () => {
  faq_fype.value = "1";
  myToggle.value = 'personal';
};

const companyFaq = () => {
  faq_fype.value = "2";  
  myToggle.value = 'company';
};

const toggleFaqAnswer = (faq_idx) => {
  faqAnswer.value = faqAnswer.value === faq_idx ? null : faq_idx;
};

const handlerUpdate = (faq_idx) =>{
  router.push({
    name: 'faqDetail',
    params: { idx: faq_idx},
  })
}

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

  .answerWindow {
  background-color: #f5f5f5; 
  }
  
}


</style>
