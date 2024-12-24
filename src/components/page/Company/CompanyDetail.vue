<template>
  <div className="divComGrpCodList">
    <table className="table table-bordered">
      <colgroup>
        <col width="25%" />
        <col width="25%" />
        <col width="25%" />
        <col width="25%" />
      </colgroup>
      <thead>
        <tr>
          <th colSpan="4">기업로고</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan="4">
            <span id="preview"> </span>
          </td>
        </tr>
      </tbody>
      <thead>
        <tr>
          <th scope="col">사업자명</th>
          <th scope="col">사업자 대표</th>
          <th scope="col">연락처</th>
          <th scope="col">사업자 주소</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ companyDetail?.bizName }}</td>
          <td>{{ companyDetail?.bizCeoName }}</td>
          <td>{{ companyDetail?.bizContact }}</td>
          <td>{{ companyDetail?.bizAddr }}</td>
        </tr>
      </tbody>
      <thead>
        <tr>
          <th scope="col">사원수</th>
          <th scope="col">홈페이지 주소</th>
          <th scope="col">설립일</th>
          <th scope="col">매출액</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ companyDetail?.bizEmpCount }}</td>
          <td>{{ companyDetail?.bizWebUrl }}</td>
          <td>{{ companyDetail?.bizFoundDate }}</td>
          <td>{{ companyDetail?.bizRevenue }}</td>
        </tr>
      </tbody>
      <thead>
        <tr>
          <th colSpan="4">기업 소개</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan="4">{{ companyDetail?.bizIntro }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div style="text-align: right">
    <button>기업 지원 공고 확인하기</button>
  </div>
</template>

<script setup></script>

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
