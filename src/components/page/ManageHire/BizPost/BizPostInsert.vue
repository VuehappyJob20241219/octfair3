<template>
    <ContextBox>공고 등록</ContextBox>
    <div>
      <table>
        <thead>
      <tr>
        <th>채용제목<span className="font_red">*</span></th>
        <td colSpan='3'>
          <input
            type="text"
            name="title"
            placeholder="채용 제목을 입력하세요"
            v-model="postInput.title"
             />
        </td>
      </tr>
      <tr>
        <th>경력 여부<span className="font_red">*</span></th>
        <td>
          <div className="checkbox-group" >
              <label v-for="checkbox in checkBox" :key="checkbox.id">
                <input
                  type="checkbox"
                  :name="'checkbox-' + checkbox.id"
                  :checked="checkbox.checked"
                  @click=handleCheckboxChange(checkbox.id)
                />
                {{checkbox.label}}
              </label>            
          </div>
        </td>
        <th>경력</th>
        <td>
          <select
            v-model="postInput.expYears"
            name="expYears"
            :disabled="!checkBox || !checkBox.find(checkbox => checkbox.id === 2 && checkbox.checked)">
              <option v-for="year in years" :key={year} :value=year>
                {{year}}
              </option>
          </select>
        </td>
      </tr>
      <tr>
        <th>급여<span className="font_red">*</span></th>
        <td>
          <input
            type="text"
            name="salary"
            v-model="postInput.salary"
            placeholder="급여는 숫자만 입력 가능합니다"
          />
        </td>
        <th>모집인원<span className="font_red">*</span></th>
        <td>
          <input
            type="text"
            name="openings"
            v-model="postInput.openings"
            placeholder="모집인원은 숫자만 입력 가능합니다"
          />
        </td>
      </tr>
      <tr>
        <th>근무지역<span className="font_red">*</span></th>
        <td>
          <input
            type="text"
            name="workLocation"
            placeholder="근무지역을 입력하세요"
            v-model="postInput.workLocation"
          />
        </td>
        <th>포지션 설명<span className="font_red">*</span></th>
        <td>
          <input
            type="text"
            name="posDescription"
            v-model="postInput.posDescription"
          />
        </td>
      </tr>
      <tr>
        <th>채용기간<span className="font_red">*</span></th>
        <td colSpan={3} className="date">
          시작<input type="date"
        label="시작 날짜"
        v-model="postInput.startDate"
      /> ~ 
      종료<input type="date"
        label="종료 날짜"
        v-model="postInput.endDate"
      />
        </td>
      </tr>
      <tr>
        <th>채용절차<span className="font_red">*</span></th>
        <td colSpan='3'>
          <div className="recruit-process-wrapper" >
            <input
              type="text"
              name="hirProcess"
              v-model="postInput.recruitProcess"
              placeholder="과정을 하나씩 적은 후 절차등록 버튼을 눌러주세요"
            />
            <button @click="handleClick"  >
              절차등록
            </button>
            <button @click="handleClickRefresh">
              초기화
            </button>
          </div>
          <label className="recruit-process-list" >
            {{recruitProcessList.join(" - ")}} 
          </label>
        </td>
      </tr>
      <tr>
        <th>자격조건<span className="font_red">*</span></th>
        <td colSpan='3'>
          <input
            type="text"
            name="reqQualifications"
            placeholder="자격조건을 입력하세요"
            v-model="postInput.reqQualifications"
          />
        </td>
      </tr>
      <tr>
        <th>우대사항</th>
        <td colSpan='3'>
          <input
            type="text"
            name="prefQualifications"
            placeholder="우대사항을 입력하세요"
            v-model="postInput.prefQualifications"
          />
        </td>
      </tr>
      <tr>
        <th>업무</th>
        <td colSpan='3'>
          <input
            type="text"
            name="duties"
            placeholder="업무내용을 입력하세요"
            v-model="postInput.duties"
          />
        </td>
      </tr>
      <tr>
        <th>혜택&복지</th>
        <td colSpan='3'>
          <input
            type="text"
            name="benefits"
            placeholder="혜택 및 복지내용을 입력하세요"
            v-model="postInput.benefits"
          />
        </td>
      </tr>
      <tr>
        <th>첨부파일</th>
        <td colSpan='3'>
          <input type="file" @change="handlerFile" />
        </td>
      </tr>
    </thead>
      </table>
      <button @click="handlerInsertBtn">등록</button>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
const postInput = ref({});
const years = ["1년 이상", "2년 이상", "3년 이상", "4년 이상"];
postInput.value.expYears= years[0];
const checkBox = reactive([
      { id: 1, label: "신입", checked: false },
      { id: 2, label: "경력", checked: false },
      { id: 3, label: "경력무관", checked: false },
    ]);
const recruitProcessList = reactive([]);
const fileData = ref("");

//체크박스 상태 변경
const handleCheckboxChange = (id) => {
    
      const updatedCheckBox = checkBox.map((checkBox) =>
        checkBox.id === id ? { ...checkBox, checked: !checkBox.checked } : checkBox
      );

      checkBox.splice(0, checkBox.length, ...updatedCheckBox);

      const selectedValues = updatedCheckBox
        .filter((checkBox) => checkBox.checked) //선택된 항목만 추출
        .map((checkBox) => checkBox.label); //라벨값만 추출
  
      // expRequired 값 갱신
      postInput.value.expRequired = selectedValues.join(", "); // expRequired에 체크된 값 저장   
    
};

const handleClick = () => {
    const trimmedProcess = postInput.value.recruitProcess.trim(); //공백 제거
    if (trimmedProcess === "") return; //빈 값 방지

    if (recruitProcessList.length >= 4) {
      alert("채용 절차는 최대 4단계까지만 가능합니다.");
      return;
    }
    recruitProcessList.push(trimmedProcess); //기존값 + 새로입력한값
    recruitProcessList.join(" - ");
    postInput.value.hirProcess=recruitProcessList.join(" - ");
    console.log(postInput.value.hirProcess);
     //입력 필드 초기화
    postInput.value.recruitProcess=""; // recruitProcess 상태를 초기화
};

//채용과정 초기화 버튼
const handleClickRefresh = () => {
  recruitProcessList.splice(0, checkBox.length);
  postInput.value.recruitProcess=""; // recruitProcess 상태를 초기화
};
const handlerInsertBtn = () => {
  const reqiredFields = {
      title: "채용제목을", 
      expRequired: "경력 여부를",
      salary: "급여를", 
      openings: "모집인원을", 
      workLocation: "근무지역을", 
      posDescription: "포지션 설명을", 
      startDate: "시작 날짜를",
      endDate: "종료 날짜를",
      hirProcess: "채용 절차를",
      reqQualifications: "자격조건을"      
  };

  for (const [key, Value] of Object.entries(reqiredFields)) {
  // console.log(`Key: ${key}, Value: ${value}`);
  let numberRules = /[0-9]/;
  if (!postInput.value[key]) {
    // 해당 필드가 비어있을 때만 알림을 띄움
    alert(`${Value} 입력해 주세요`);
    return;  // 반복문 종료
  }

  if (!numberRules.test(postInput.value.salary)) {
        alert("급여는 숫자만 입력됩니다.");
        return;
  }

  if (!numberRules.test(postInput.value.openings)) {
        alert("모집인원은 숫자만 입력됩니다.");
        return;
  }
}

  for (const input in postInput.value) {
    console.log(`${input}`);
    if (reqiredFields[input.name] && !input) {
      // 해당 필드가 비어있을 때만 알림을 띄움
      alert(`"${reqiredFields[input.name]}" 입력해 주세요`);
      return;  // 알림을 띄운 후, 즉시 종료하여 다른 필드는 검사하지 않음
    }
  }

  handlerInsert();
}

const handlerInsert = async () => {
  const textData = {
    ...postInput.value,
  };
  const formData = new FormData();
  if (fileData.value) {
    formData.append("file", fileData.value);
  }
  formData.append(
    "text",
    new Blob([JSON.stringify(textData)], {
      type: "application/json",
    }),
  );
  console.log(formData);
  axios.post(`/api/manage-hire/managehireSaveFileForm.do`, formData).then((res) => {
    if (res.data.result === "success") {
      console.log("success");
    }
  });
}

const handlerFile = (e) => {
  const fileinfo = e.target.files;
  const fileinfoSplit = fileinfo[0].name.split(".");
  // const fileExtension = fileinfoSplit[1].toLowerCase();
  // if (
  //   fileExtension === "jpg" ||
  //   fileExtension === "gif" ||
  //   fileExtension === "png" ||
  //   fileExtension === "webp"
  // ) {
  //   imageUrl.value = URL.createObjectURL(fileinfo[0]);
  // }
  fileData.value = fileinfo[0];
};


</script>

<style lang="scss" scoped>
label {
  display: flex;
  flex-direction: column;
}

select {
  font-size: 13px;
  width: 100px;
  height: 30px;
}
input[type="text"] {
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
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