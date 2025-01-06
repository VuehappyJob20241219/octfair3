<template>
  <template v-if="attachmentProperties.attachment.length > 0">
    <div class="contents">
      <table class="att-table">
        <colgroup>
          <col width="30%" />
          <col width="60%" />
          <col width="10%" />
        </colgroup>
        <thead>
          <tr>
            <th>파일구분</th>
            <th>파일소개</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody v-for="(att, index) in attachmentProperties.attachment" :key="index">
          <tr style="overflow: hidden">
            <td rowspan="2">
              <span>
                {{ att.category }}
              </span>
            </td>
            <td style="word-break: break-word">
              <!-- 줄 바꿈 및 최대 너비 설정 -->
              <span>
                {{ att.content }}
              </span>
            </td>
            <td rowspan="2">
              <button @click="DeleteAttachment(att.attIdx)">
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
            <td colspan="1" v-if="att.fileName" class="file-link">
              <span @click="ResumeFileDownload(att.attIdx)">{{ att.fileName }}</span>
            </td>
            <td colspan="1" v-else="">
              <span>첨부된 파일이 없습니다.</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  <template v-else>
    <div class="contents">
      <p class="res-comment">파일을 추가할 수 있습니다.</p>
    </div>
  </template>
</template>

<script setup>
import axios from "axios";
import { onMounted } from "vue";
import { ResumeAddTable } from "../../../../api/axiosApi/resumeApi";

const attachmentProperties = ref({
  attachment: [],
});
const props = defineProps(["idx"]);
const emit = defineEmits(["postSuccess"]);

const attachmentDetail = async () => {
  await axios.post(ResumeAddTable.ListAttachment, { resIdx: props.idx }).then((res) => {
    attachmentProperties.value = res.data;
  });
};

const DeleteAttachment = async (idx) => {
  const param = {
    resIdx: props.idx,
    attIdx: idx,
  };
  await axios.post(ResumeAddTable.DeleteAttachment, param).then((res) => {
    if (res.data.result === "success") {
      attachmentDetail();
    }
  });
};

const ResumeFileDownload = (attIdx) => {
  let param = new URLSearchParams();
  param.append("attIdx", attIdx);
  const postAction = {
    url: "/api/apply/AttachmentFileDownload.do",
    method: "POST",
    data: param,
    responseType: "blob",
  };
  axios(postAction).then((res) => {
    const url = window.URL.createObjectURL(new Blob([res.data]));
    // attIdx에 맞는 파일 정보를 찾기
    const attachment = attachmentProperties.value.attachment.find((item) => item.attIdx === attIdx);
    console.log("attachment", attachment);
    if (attachment) {
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", attachment.fileName); // 인덱스를 사용하지 않고 객체를 직접 참조
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  });
};

defineExpose({
  attachmentDetail,
});

onMounted(() => {
  attachmentDetail();
});
</script>

<style lang="scss" scoped>
.att-table {
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

.file-link {
  color: #36f; /* 파란색 글씨 */
  transition: background-color 0.3s ease; /* 부드러운 배경색 변화 */
}

.file-link:hover {
  background-color: rgba(54, 114, 255, 0.1); /* 호버 시 배경색 변화 */
  text-decoration: underline; /* 호버 시 밑줄 효과 */
}
</style>
