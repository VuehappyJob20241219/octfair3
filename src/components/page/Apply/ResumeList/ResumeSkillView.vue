<template>
  <template v-if="skillProperties.skill.length > 0">
    <div class="contents">
      <table class="career-table">
        <colgroup>
          <col width="30%" />
          <col width="60%" />
          <col width="10%" />
        </colgroup>
        <thead>
          <tr>
            <th>보유기술 및 능력</th>
            <th>상세내용</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody v-for="(skill, index) in skillProperties.skill" :key="index">
          <tr>
            <td >
              <span>
                {{ skill.skillName }}
              </span>
            </td>
            <td>
              <span>{{ skill.skillDetail }}</span>
            </td>
          
            <td rowspan="2">
              <button @click="DeleteSkill(skill.skillIdx)">
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
      <p class="res-comment">보유기술 및 능력을 추가할 수 있습니다.</p>
    </div>
  </template>
</template>

<script setup>
import axios from "axios";
import { ResumeAddTable } from "../../../../api/axiosApi/resumeApi";

const skillProperties = ref({
  skill: [],
});
const props = defineProps(["idx"]);

const skillDetail = async () => {
  await axios.post(ResumeAddTable.ListSkill, { resIdx: props.idx }).then((res) => {
    skillProperties.value = res.data;
  });
};

const DeleteSkill = async (idx) => {
  const param = {
    resIdx: props.idx,
    skillIdx: idx,
  };
  await axios.post(ResumeAddTable.DeleteSkill, param).then((res) => {
    if (res.data.result === "success") {
      skillDetail();
    }
  });
};

defineExpose({
  skillDetail,
});

onMounted(() => {
  skillDetail();
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
    color: #88CFEC;
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
