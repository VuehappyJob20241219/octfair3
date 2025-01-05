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
                        <p class="post-title">{{ list.postTitle }}</p>
                        <p class="hover-text" @click="handlerResume(list.resIdx)">지원이력서</p>
                      </td>
                      <td>
                        <p>{{ list.status }}</p>
                      </td>
                      <td>
                      
                        <p>{{ list.viewed === '1' ? '열람' : '미열람' }}</p>
                      </td>
                      <td>
                        <button class="cancel-button" @click="handlerCancle(list.appId)">지원취소</button>
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

    <ResumePreview
      v-if ="modalStore.modalState"
      :idx = "selectedResumeIdx"
      ></ResumePreview>
</div>
</template>

<script setup>
import Pagination from '../../../common/Pagination.vue';
import { inject } from 'vue';
import { useHistoryListQuery } from '../../../hook/history/useHistoryListQuery';
import ResumePreview from '../ResumeDetail/ResumePreview.vue'; //이력서 모달
import { useModalStore } from "@/stores/modalState"; //피냐 등록된 모달 상태관리
import { useHistoryCancleMutation } from '../../../hook/history/useHistoryCancleMutation'; //지원취소소

const cPage = inject("cPage"); // Provide에서 받아온 현재 페이지 상태
const injectedValue = inject("provideValue");
const { data: historyList, isLoading, refetch, isSuccess, isError }
  = useHistoryListQuery(injectedValue, cPage);

const modalStore = useModalStore();
const selectedResumeIdx = ref(null);

const handlerResume = (param) => {
  selectedResumeIdx.value = param;
  modalStore.setModalState(); //모달 열기
}

const {mutate: handlerCancle} = useHistoryCancleMutation();


</script>



<style lang="scss" scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0px 0px 0px;
  font-size: 16px; /* 글자 크기 유지 */
  //border: 2px solid #666363; /* 테이블 전체 외곽 테두리 추가 */


  th,
  td {
    padding: 4px 8px; /* 여백을 줄여서 간격 좁히기 */
    text-align: center;
    border-bottom: 1px solid #ddd;
    line-height: 1.2; /* 줄 간격을 좁혀서 세로 간격 줄이기 */
    border-right: 1px solid #ddd; /* 세로줄 추가 */
    vertical-align: middle;
  }

  th {
    background-color: #bebebe; /* 회색 배경 */
    color: #333; /* 검정 글씨 */
    font-weight: 600; /* 제목 부분 글씨 굵게 */
    height: 70px; /* 제목 셀의 세로 높이 늘리기 */
  }

  td {
    border-right: 1px solid #ddd; /* 세로줄 추가 */
    vertical-align: middle; /* 내용 세로 정렬 */
    
  }
  td p {
    margin: 0; /* <p> 태그의 기본 여백 제거 */
    padding: 4px 0; /* 상하 여백 추가 */
    line-height: 1.5; /* 줄 간격 조정 */
}

  /* 마지막 칼럼에서 오른쪽 경계선 제거 */
  td:last-child {
    border-right: none;
  }

  tbody tr {
    transition: background-color 0.2s ease; /* 부드러운 효과 */
  }

  tbody tr:hover {
    background-color: #f9f9f9; /* 마우스 오버 시 밝은 색 */
    opacity: 0.9;
    cursor: pointer;
  }

  .post-title {
    font-weight: 700; /* 글자 굵기 설정 */
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2); /* 텍스트에 그림자 추가 */
  }

  .post-title:hover {
  color: red; /* 마우스 오버 시 글자 색상 변경 */
}

  .hover-text {
    font-weight: normal;
    color: black;
    transition: all 0.3s ease;
  }

  .hover-text:hover {
   font-weight: bold;
   color: red;
  }
  .cancel-button {
    background-color: #ff4d4f; /* 빨간색 배경 */
    color: #fff; /* 글씨 색상 흰색 */
    border: none; /* 테두리 제거 */
    border-radius: 8px; /* 둥근 모서리 */
    padding: 15px 23px; /* 버튼 내부 여백 */
    font-size: 14px; /* 글자 크기 */
    font-weight: bold; /* 글자 굵기 */
    cursor: pointer; /* 클릭 가능 표시 */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
    transition: all 0.3s ease; /* 부드러운 효과 */
  }
  .cancel-button:hover {
    background-color: #d9363e; /* 호버 시 더 어두운 빨간색 */
    transform: scale(1.1); /* 크기 10% 확대 */
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2); /* 그림자 강조 */
  }
}

</style>