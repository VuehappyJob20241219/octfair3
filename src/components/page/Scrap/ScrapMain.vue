<template>
<div>
    <table>
        <thead>
                <tr>
                    <th><input type="checkBox" @change="handleCheckAll" ></th>
                    <th>기업명</th>
                    <th>공고제목</th>
                    <th>자격요건</th>
                    <th>근무지역</th>
                    <th>마감일</th>
                    <th>지원</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="isLoading">...로딩중</template>
                <template v-if="isSuccess">
                    <template v-if="scrapList.scrapCnt > 0">
                        <tr v-for="scrap in scrapList.scrapList" :key="scrap.scrapIdx">

                            <template v-if="!scrap.postIdx">
                              <td colspan="7" class="deleted">기업에서 삭제된 공고입니다</td>
                            </template>

                            <template v-else>
                              <td><input type="checkBox" @change="handleCheckboxChange(scrap.scrapIdx)" :checked="checkedList.includes(scrap.scrapIdx)"></td>
                              <td>{{ scrap.postBizName }}</td>
                              <td class="post-title" @click="handlerPost(scrap.postIdx)">{{ scrap.postTitle }}</td>
                              <td>{{ scrap.postExpRequired }}</td>
                              <td>{{ scrap.postWorkLocation }}</td>
                              <td>{{ scrap.postEndDate }}</td>
                              <td><button class="apply-button" @click="handlerModal(scrap.postIdx, scrap.postBizIdx, scrap)">입사지원</button></td>    
                            </template>   

                        </tr>
                    </template>
                </template>
            </tbody>
    </table>

    <Pagination 
      :totalItems="scrapList?.scrapCnt || 0"
      :items-per-page="5"
      :max-pages-shown="5"
      :onClick="searchList"
      v-model="cPage"
      class="pagination-center"
    />

    <ApplyUserResumeModal 
      v-if="modalStore.modalState"
      :pIdx = "selectedPostIdx"
      :bIdx = "selectedBizIdx"
      :scrap = "selectedScrapList"
    />


</div>
</template>

<script setup>
import { computed, inject, ref } from 'vue';
import { useModalStore } from '../../../stores/modalState';
import { useScrapListQuery } from '../../hook/scrap/useScrapListQuery';
import ApplyUserResumeModal from '../Apply/ResumeList/ApplyUserResumeModal.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const cPage = ref(1);
const injectedValue = inject("provideValue");
const modalStore = useModalStore(); 
const selectedPostIdx = ref(null);
const selectedBizIdx = ref(null);
const selectedScrapList = ref(null);

const { data: scrapList, isLoading, refetch, isSuccess, isError }
    = useScrapListQuery(injectedValue, cPage);

//체크박스 체크된 스크랩 리스트 
const checkedList = inject("checkedList");

const handleCheckboxChange = (scrapIdx) => {
  const index = checkedList.value.indexOf(scrapIdx);
  index > -1 ? checkedList.value.splice(index, 1) : checkedList.value.push(scrapIdx);
};

//체크박스 전체 선택
const isCheckedAll = computed(() => {
  // scrapList.scrapList가 비어있지 않고 체크된 리스트가 정확한지 확인
  if (!scrapList.value || !scrapList.value.scrapList) return false;
  return scrapList.value.scrapList.every((scrap) => checkedList.value.includes(scrap.scrapIdx));
});

const handleCheckAll = () => {
  if (scrapList.value && scrapList.value.scrapList) {
    // 전체 선택일 경우
    if (isCheckedAll.value) {
      checkedList.value = []; // 체크박스 해제
    } else {
      // 전체 선택
      checkedList.value = scrapList.value.scrapList.map((scrap) => scrap.scrapIdx)
    }
  }
};

//입사지원
const handlerModal = (postIdx, bizIdx, scrapList) => {
  selectedPostIdx.value = postIdx;
  selectedBizIdx.value = bizIdx;
  selectedScrapList.value = scrapList;
  modalStore.setModalState();
};

//공고 상세보기 
const handlerPost = (postIdx) => {
  if (!router) {
    return;
  }
  router.push({ name: "bizPostDetail", params: { postIdx } });
}

// const handleCheckboxChange = (scrapIdx) => {
//   // 체크박스를 선택하면 `scrapIdx` 값을 배열에 추가
//   if (!checkedList.value.includes(scrapIdx)) {
//     checkedList.value.push(scrapIdx);
//   } else {
//     // 체크박스를 해제하면 `scrapIdx` 값을 배열에서 제거
//     const index = checkedList.value.indexOf(scrapIdx);
//     if (index > -1) {
//       checkedList.value.splice(index, 1);
//     }
//   }
// };


</script>




<style lang="scss" scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0px 0px 0px;
  font-size: 18px;
  text-align: left;
  background-color: rgba(255, 255, 255, 0.719);
 

  th,
  td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    border-right: 1px solid #ddd; /* 세로줄 추가 */
    text-align: center;
  }

  th {
    background-color: #DCE1E6;
    color: #000000;
    height: 60px; /* 제목 부분 높이 지정 */
    border-bottom: 2px solid rgba(0, 0, 0, 0.3);
  }

  /* 테이블 올렸을 때 */
  tbody tr:hover {
    background-color: #DCE1E6;
    opacity: 0.9;
    cursor: pointer;
  }

  .apply-button {
    background-color: #3d922dd7; /* 빨간색 배경 */
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
  .apply-button:hover {
    background-color: #3d922dd7;
    transform: scale(1.1); /* 크기 10% 확대 */
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2); /* 그림자 강조 */
  }
  .post-title {
    font-weight: 700; /* 글자 굵기 설정 */
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2); /* 텍스트에 그림자 추가 */
    transition: all 0.3s ease; /* 부드러운 애니메이션 효과 */
  }

  .post-title:hover {
    color: red; /* 마우스 오버 시 글자 색상 변경 */
    transform: scale(1.1); /* 글자 크기 확대 */
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4); /* 텍스트 그림자 확대 */
  }
  .deleted {
    background-color: rgba(0, 0, 0, 0.1); /* 은은하게 어두운 배경 */
    color: #333; /* 어두운 회색 텍스트 */
    //font-size: 0.9rem; /* 글자 크기 작게 */
    //font-style: italic; /* 글자 기울이기 */
    // font-weight: bold; /* 글자 굵게 */
    text-align: center; /* 텍스트 중앙 정렬 */
    padding: 10px 0; /* 여백 추가 */
  
    //border-radius: 5px; /* 모서리를 둥글게 */
    //box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2); /* 부드러운 그림자 */
  }
  .pagination-center {
    display: block;
    margin: 80px auto; /* 위 아래 여백, 양옆 자동 정렬 */
  }
}
</style>