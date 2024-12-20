<template>  
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
        <template >...로딩중</template>
        <template v-if="faqList">
          <template v-if="faqList.faqCnt>0" >
            <tr v-for="faq in faqList.faq" :key="faq.faqInx"
              @click="handlerModal(faq.faqInx)">
              <td>{{ faq.faqIdx }}</td>
              <td>{{ faq.title }}</td>
              <td>{{ faq.createdDate.substr(0,10) }}</td>
              <td>{{ faq.author }}</td>
            </tr>
          </template>
          <template >
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
import axios from 'axios';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Pagination from '../../../common/Pagination.vue';
import { useModalStore } from '../../../../stores/modalState';

const route = useRoute();
const faqList = ref();
const cPage = ref(1);
const faqIdx = ref(0);
const modalState = useModalStore();

const searchList = async() => {
    const param = new URLSearchParams({
        searchTitle: '',
        searchStDate:'',
        searchEdDate: '',
        currentPage: cPage.value,
        pageSize:5
    });   
    console.log('넘겨주는 데이터',param);  
    await axios.post('/api/board/faqListRe.do', param).then((res)=>{      
      console.log(res.data);     
        faqList.value = res.data;    
        console.log(res.data);   
    });
};

const handlerModal = (idx) => {
    console.log(idx);
    modalState.setModalState();
    faqIdx.value = idx;
};

//watch(route, searchList);

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
