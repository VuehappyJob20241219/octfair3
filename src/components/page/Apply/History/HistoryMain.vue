<template>
<div>
    <table>
        <thead>
                <tr>
                    <th>지원일</th>
                    <th>지원내역</th>
                    <th>공고진행상태</th>
                    <th>열람</th>
                    <th>취소/삭제</th>
                </tr>
            </thead>
            <tbody>
              <template v-if="isLoading">...로딩중</template>
              <template v-if="isSuccess">
                <template v-if="historyList.historyCnt > 0">
                  <tr v-for="list in historyList.history" :key="list.appId">
                      <td>
                        <p>지원완료</p>
                        <p>{{ list.applyDate }}</p>
                      </td>
                      <td>
                        <p>{{ list.bizName }}</p>
                        <p>{{ list.postTitle }}</p>
                        <p @click="handlerResume">지원이력서</p>
                      </td>
                      <td>
                        <p>{{ list.status }}</p>
                      </td>
                      <td>
                        <p>{{ list.viewed }}</p>
                      </td>
                      <td>
                        <p>지원취소</p>
                      </td>
                      
                  </tr>
                </template>
              </template>
            </tbody>
    </table>

    <Pagination
      :totalItems="historyList?.historyCnt || 0"
      :items-per-page="4"
      :max-pages-shown="5"
      :onClick="searchList"
      v-model="cPage"
    />
</div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import Pagination from '../../../common/Pagination.vue';
import { useHistoryListQuery } from '../../../hook/history/useHistoryListQuery';
import { inject } from 'vue';

const router = useRouter();
const cPage = inject("cPage"); // Provide에서 받아온 현재 페이지 상태
const injectedValue = inject("provideValue");
const { data: historyList, isLoading, refetch, isSuccess, isError }
  = useHistoryListQuery(injectedValue, cPage);

const handlerResume = (param) => {
  router.push({
    name: "",
    params: { idx: param },
  });
  }

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