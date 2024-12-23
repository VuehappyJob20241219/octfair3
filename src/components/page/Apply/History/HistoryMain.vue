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
                <tr>
                    <td>ㅇㅇ</td>
                    <td>ㅇㅇ</td>
                    <td>ㅇㅇ</td>
                    <td>ㅇㅇ</td>
                    <td>ㅇㅇ</td>
                </tr>
            </tbody>
    </table>

    <!-- <Pagination
      :totalItems="noticeList?.noticeCnt || 0"
      :items-per-page="5"
      :max-pages-shown="5"
      :onClick="searchList"
      v-model="cPage"
    /> -->
</div>
</template>

<script setup>
import Pagination from '../../../common/Pagination.vue';

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