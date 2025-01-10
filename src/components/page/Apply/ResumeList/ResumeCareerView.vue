<template>
  <template v-if="isLoading">
    <p>로딩 중입니다...</p>
  </template>
  <template v-if="isSuccess && careerProperties?.career.length > 0">
    <div class="contents">
      <table class="career-table">
        <colgroup>
          <col width="20%" />
          <col width="30%" />
          <col width="13%" />
          <col width="12%" />
          <col width="15%" />
          <col width="10%" />
        </colgroup>
        <thead>
          <tr>
            <th>기간</th>
            <th>회사명</th>
            <th>부서명</th>
            <th>직급/직책</th>
            <th>퇴사사유</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody v-for="(career, index) in careerProperties.career" :key="index">
          <tr>
            <td rowspan="3">
              <span>
                {{ career.startDate.substr(0, 7) }}
                ~
                {{ career.endDate.substr(0, 7) }}
              </span>
            </td>
            <td>
              <span>{{ career.company }}</span>
            </td>
            <td>
              <span>{{ career.dept }}</span>
            </td>
            <td>
              <span>{{ career.position }}</span>
            </td>
            <td>
              <span>{{ career.reason }}</span>
            </td>
            <td rowspan="3">
              <button @click="deleteCareer(career.crrIdx)">
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
          <tr>
            <th colspan="4" class="custom-th">담당업무</th>
          </tr>
          <tr>
            <td colspan="4" style="white-space: pre-wrap; text-align: left">
              {{ career.crrDesc }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  <template v-else>
    <div class="contents">
      <p class="res-comment">경력사항을 추가할 수 있습니다.</p>
    </div>
  </template>
</template>

<script setup>
import { useQuery } from "@tanstack/vue-query";
import { resumeDetailCareerApi } from "../../../../api/resume/resumeDetailCareerApi";
import { useResumeDeleteCareerMutation } from "../../../hook/resume/useResumeDeleteCareerMutation";

const props = defineProps(["idx"]);
const { mutate: deleteCareer } = useResumeDeleteCareerMutation(props.idx);

const {
  data: careerProperties,
  isLoading,
  isSuccess,
} = useQuery({
  queryKey: ["detailCareer"],
  queryFn: () => resumeDetailCareerApi(props.idx),
});
</script>

<style lang="scss" scoped>
.career-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  .custom-th {
    border: 1px solid #ddd;
    padding: 3px;
    text-align: center;
    font-weight: bold;
    background-color: #f5f5f5; /* thead 배경색과 동일 */
  }
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
