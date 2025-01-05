<template>
<div>
    <table>
        <thead>
                <tr>
                    <th></th>
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
                              <td colspan="7">삭제된 공고입니다</td>
                            </template>

                            <template v-else>
                              <td><input type="checkBox" @change="handleCheckboxChange(scrap.scrapIdx)" ></td>
                              <td>{{ scrap.postBizName }}</td>
                              <td>{{ scrap.postTitle }}</td>
                              <td>{{ scrap.postExpRequired }}</td>
                              <td>{{ scrap.postWorkLocation }}</td>
                              <td>{{ scrap.postEndDate }}</td>
                              <td><button class="apply-button">입사지원</button></td>    
                            </template>   

                        </tr>
                    </template>
                </template>
            </tbody>
    </table>

    <Pagination 
      :totalItems="scrapList?.scrapCnt || 0"
      :items-per-page="4"
      :max-pages-shown="5"
      :onClick="searchList"
      v-model="cPage"
    />

</div>
</template>

<script setup>
import { inject } from 'vue';
import { useScrapListQuery } from '../../hook/scrap/useScrapListQuery';

const cPage = ref(1);
const injectedValue = inject("provideValue");
const { data: scrapList, isLoading, refetch, isSuccess, isError }
    = useScrapListQuery(injectedValue, cPage);

//체크박스 체크된 스크랩 리스트 
const checkedList = inject("checkedList");

const handleCheckboxChange = (scrapIdx) => {
  const index = checkedList.value.indexOf(scrapIdx);
  index > -1 ? checkedList.value.splice(index, 1) : checkedList.value.push(scrapIdx);
};

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
  }

  /* 테이블 올렸을 때 */
  tbody tr:hover {
    background-color: #d3d3d3;
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
}
</style>