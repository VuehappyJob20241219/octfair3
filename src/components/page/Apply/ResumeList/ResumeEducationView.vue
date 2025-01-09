<template>
  <template v-if="isLoading">
    <p>로딩 중입니다...</p>
  </template>
  <template v-if="isSuccess">
    <!-- <template v-if="isSuccess && educationProperties?.edu.length > 0"> -->
    <div class="contents">
      <table class="career-table">
        <colgroup>
          <col width="20%" />
          <col width="15%" />
          <col width="25%" />
          <col width="20%" />
          <col width="10%" />
          <col width="10%" />
        </colgroup>
        <thead>
          <tr>
            <th>기간</th>
            <th>학력</th>
            <th>학교명</th>
            <th>전공</th>
            <th>구분</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody v-for="(edu, index) in educationProperties.edu" :key="index">
          <tr>
            <td>
              <span>
                {{ edu.admDate.substr(0, 7) }}
                ~
                {{ edu.grdDate.substr(0, 7) }}
              </span>
            </td>
            <td>
              <span>{{ edu.eduLevel }}</span>
            </td>
            <td>
              <span>{{ edu.schoolName }}</span>
            </td>
            <td>
              <span>{{ edu.major }}</span>
            </td>
            <td>
              <span>{{ edu.grdStatus }}</span>
            </td>
            <td rowspan="2">
              <button @click="deleteEdu(edu.eduIdx)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20px"
                  viewBox="0 -960 960 960"
                  width="20px"
                  fill="#5f6368"
                >
                  <path
                    d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z"
                  />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  <template v-else>
    <div class="contents">
      <p class="res-comment">학력사항을 추가할 수 있습니다.</p>
    </div>
  </template>
</template>

<script setup>
import { useQuery } from "@tanstack/vue-query";
import { resumeDetailEduApi } from "../../../../api/resume/resumeDetailEduApi";
import { useResumeDeleteEduMutation } from "../../../hook/resume/useResumeDeleteEduMutation";

const props = defineProps(["idx"]);
const { mutate: deleteEdu } = useResumeDeleteEduMutation(props.idx);

const {
  data: educationProperties,
  isLoading,
  isSuccess,
} = useQuery({
  queryKey: ["detailEdu"],
  queryFn: () => resumeDetailEduApi(props.idx),
  staleTime: 60000, // 1분 데이터를 신선하게 유지하며, 새로고침해도 API 재요청이 발생하지 않음. 새로고침 시 API 재요청이 발생하여 최신 데이터를 가져옴.
  cacheTime: 300000, // 5분 동안 캐시된 데이터가 메모리 내에 유지되는 기간. 이 시간이 지나면 데이터가 삭제되고 이후 요청 시에는 서버에 요청하여 최신 데이터를 가져옴.
});
</script>

<style lang="scss" scoped>
.career-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th,
  td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
  }

  thead {
    background-color: #f5f5f5;
    th {
      font-weight: bold;
    }
  }

  .date-cell {
    font-weight: bold;
    background-color: #fafafa;
  }

  .description-cell {
    text-align: left;
    background-color: #fcfcfc;
    font-style: italic;
    padding: 15px;
    white-space: pre-wrap;
  }
}

.delete-btn {
  background: none;
  border: none;
  cursor: pointer;

  &:hover svg {
    fill: #d32f2f;
  }
}

.contents {
  padding: 5px;

  .res-comment {
    font-size: 16px;
    text-align: center;
    color: #88cfec;
  }

  &.empty-state {
    text-align: center;
    color: #888;
  }
}

.fetch-btn {
  margin-top: 15px;
  padding: 8px 16px;
  background-color: #1976d2;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #1565c0;
  }
}
</style>
