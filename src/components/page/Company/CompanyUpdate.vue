<template>
  <table>
    <colgroup>
      <col width="12%" />
      <col width="38%" />
      <col width="12%" />
      <col width="38%" />
    </colgroup>
    <tbody>
      <tr>
        <th>사업자명</th>
        <td>
          <input type="text" v-model="companyDetail.bizName" />
        </td>
        <th>사업자 대표</th>
        <td>
          <input type="text" v-model="companyDetail.bizCeoName" />
        </td>
      </tr>
      <tr>
        <th>연락처</th>
        <td>
          <input type="text" v-model="companyDetail.bizContact" />
        </td>
        <th>사업자 주소</th>
        <td>
          <input type="text" v-model="companyDetail.bizAddr" />
        </td>
      </tr>
      <tr>
        <th>사원수</th>
        <td>
          <select v-model="companyDetail.bizEmpCount">
            <option value="10명 이하">10명 이하</option>
            <option value="50명 이하">50명 이하</option>
            <option value="100명 이하">100명 이하</option>
            <option value="1000명 이하">1000명 이하</option>
            <option value="1000명 이상">1000명 이상</option>
          </select>
        </td>
        <th>홈페이지 주소</th>
        <td>
          <input type="text" v-model="companyDetail.bizWebUrl" />
        </td>
      </tr>
      <tr>
        <th>설립일</th>
        <td>
          <input type="date" v-model="companyDetail.bizFoundDate" />
        </td>
        <th>매출액</th>
        <td>
          <select v-model="companyDetail.bizRevenue">
            <option value="10억 이하">10억 이하</option>
            <option value="100억 이하">100억 이하</option>
            <option value="1000억 이하">1000억 이하</option>
            <option value="1000억 이상">1000억 이상</option>
          </select>
        </td>
      </tr>
      <tr>
        <th>기업소개</th>
        <td colspan="3" style="width: 95%">
          <textarea rows="10" v-model="companyDetail.bizIntro"></textarea>
        </td>
      </tr>
      <tr>
        <th>기업로고</th>
        <td colspan="3">
          <input type="file" />
        </td>
      </tr>
      <tr>
        <th>미리보기</th>
        <td colspan="3">
          <img :src="imageUrl" />
        </td>
      </tr>
    </tbody>
  </table>
  <div class="button-box">
    <button @click="props.idx ? null : companyInsertDetail()">{{ props.idx ? '수정' : '등록' }}</button>
    <button>삭제</button>
    <button @click="$router.go(-1)">돌아가기</button>
  </div>
</template>

<script setup>
import axios from 'axios';
import { useUserInfo } from '../../../stores/userInfo';

const props = defineProps(['idx']);

const userInfo = useUserInfo();
const companyDetail = ref({});
const imageUrl = ref('');
const fileData = ref('');

const apiSuccess = () => {
  router.go(-1);
};

const companyInsertDetail = async () => {
  const textData = {
    bizName: companyDetail.value.bizName,
    bizCeoName: companyDetail.value.bizCeoName,
    bizContact: companyDetail.value.bizContact,
    bizAddr: companyDetail.value.bizAddr,
    bizEmpCount: companyDetail.value.bizEmpCount,
    bizWebUrl: companyDetail.value.bizWebUrl,
    bizFoundDate: companyDetail.value.bizFoundDate,
    bizRevenue: companyDetail.value.bizRevenue,
    bizIntro: companyDetail.value.bizIntro,
    loginId: userInfo.user.loginId,
  };
  const formData = new FormData();
  if (fileData.value) formData.append('file', fileData.value);
  formData.append('text', new Blob([JSON.stringify(textData)], { type: 'application/json' }));

  axios.post('/api/company/companySaveBody.do', formData).then((res) => {
    if (res.data.result === 'success') {
      alert('회사가 등록되었습니다.');
    } else {
      alert('공부하세요!');
    }
  });
};

const handlerFile = (e) => {
  const fileInfo = e.target.files;
  const fileInfoSplit = fileInfo[0].name.split('.');
  const fileExtension = fileInfoSplit[1].toLowerCase();
  if (fileExtension === 'jpg' || fileExtension === 'gif' || fileExtension === 'png' || fileExtension === 'webp') {
    imageUrl.value = URL.createObjectURL(fileInfo[0]);
  }
  fileData.value = fileInfo[0];
};

// const handlerValidation = () => {
//   const today = new Date();
//   const addressPattern = /^[\w\s가-힣]+$/;
//   const urlPattern = /^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+([\/?%&=]*)?$/;
// };
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0px 0px 0px;
  font-size: 13px;
  text-align: left;

  th {
    text-align: center;
    background-color: #ccc;
    color: black;
  }

  td {
    padding: 8px;
    border-bottom: 1px solid #ddd;
    text-align: left;
    height: 30px;
  }
}
input,
select,
textarea {
  width: 95%;
  height: 90%;
}

.button-box {
  text-align: center;
  margin-top: 10px;
}
button {
  background-color: #3bb2ea;
  border: none;
  color: white;
  padding: 10px 22px;
  text-align: right;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
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
