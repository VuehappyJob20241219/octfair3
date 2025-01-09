<template>
  <BizModal v-if="modalStateBiz.modalState" :bizIdx="bizIdx" @postSuccess="() => refetch()" />
  <div v-if="isLoading">로딩중 입니다</div>
  <div v-if="isSuccess" class="divManage-bizList">
    <table>
      <colgroup>
        <col width="15%" />
        <col width="10%" />
        <col width="15%" />
        <col width="20%" />
        <col width="20%" />
        <col width="10%" />
      </colgroup>
      <thead>
        <tr>
          <th scope="col">사업자번호</th>
          <th scope="col">사업자명</th>
          <th scope="col">대표자</th>
          <th scope="col">연락처</th>
          <th scope="col">홈페이지</th>
          <th scope="col">관리</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="bizList">
          <template v-if="bizList.bizCnt > 0">
            <tr v-for="biz in bizList.biz" v-bind:key="biz.bizIdx">
              <td>{{ biz.bizIdx }}</td>
              <td>{{ biz.bizName }}</td>
              <td>{{ biz.bizCeoName }}</td>
              <td>{{ biz.bizContact }}</td>
              <td>{{ biz.bizWebUrl }}</td>
              <td>
                <div class="button-box">
                  <button @click="handlerModal(biz.bizIdx)">수정</button>
                </div>
              </td>
            </tr>
          </template>
        </template>
      </tbody>
    </table>
    <Pagination :totalItems="bizList?.bizCnt || 0" :items-per-page="5" :max-pages-shown="5" v-model="cPage" />
  </div>
</template>

<script setup>
import { useModalStore } from "../../../stores/modalState";
import Pagination from "../../common/Pagination.vue";
import { useBizListSearchQuery } from "../../hook/biz/useBizListSearchQuery";


const cPage = ref(1);
const modalStateBiz = useModalStore();
const bizIdx = ref("");
const injectedValue = inject("provideValue");

const {
  data: bizList,
  isLoading,
  isSuccess,
  isError,
  refetch,
} = useBizListSearchQuery(injectedValue, cPage);

const handlerModal = (idx) => {
  bizIdx.value = idx;
  modalStateBiz.setModalState();
};
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

.button-box {
  text-align: middle;
  margin-top: 0px;
}

button {
  background-color: #3bb2ea;
  border: none;
  color: white;
  padding: 5px 5px;
  text-align: right;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 1px 1px;
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
