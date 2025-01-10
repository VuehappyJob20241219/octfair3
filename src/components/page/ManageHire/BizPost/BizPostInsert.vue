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
            v-model="postDetail.title"
             />
        </td>
      </tr>
      <tr v-if="params.postIdx">
        <th>(수정 전 경력)</th>
        <td class="modify_ex">{{expRequired}}{{" "}}{{expYears}}</td>
      </tr>
      <tr>
        <th>경력 여부<span className="font_red">*</span></th>
        <td>
          <div className="checkbox-group" >
              <label v-for="checkbox in checkBox" :key="checkbox.id" class="checkbox-container">
                <input
                  type="checkbox"
                  :name="'checkbox-' + checkbox.id"
                  :checked="checkbox.checked"
                  @click=handleCheckboxChange(checkbox.id)
                  class="checkbox-input"
                />
                <span class="checkbox-custom"></span>
                {{checkbox.label}}
              </label>            
          </div>
        </td>
        <th>경력</th>
        <td>
          <select
            v-model="postDetail.expYears"
            name="expYears"
            :disabled="!checkBox || !checkBox.find(checkbox => checkbox.id === 2 && checkbox.checked)">
            <option disabled value="">경력 선택</option>
              <option value="1년 이상">
                1년 이상
              </option>
              <option value="2년 이상">
                2년 이상
              </option>
              <option value="3년 이상">
                3년 이상
              </option>
              <option value="4년 이상">
                4년 이상
              </option>
          </select>
        </td>
      </tr>
      <tr>
        <th>급여(단위: 만원)<span className="font_red">*</span></th>
        <td>
          <input
            type="text"
            name="salary"
            v-model="postDetail.salary"
            placeholder="급여는 숫자만 입력 가능합니다"
          />
        </td>
        <th>모집인원<span className="font_red">*</span></th>
        <td>
          <input
            type="text"
            name="openings"
            v-model="postDetail.openings"
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
            v-model="postDetail.workLocation"
          />
        </td>
        <th>포지션 설명<span className="font_red">*</span></th>
        <td>
          <input
            type="text"
            name="posDescription"
            v-model="postDetail.posDescription"
          />
        </td>
      </tr>
      <tr>
        <th>채용시작일<span className="font_red">*</span></th>
        <td className="date">
          <input type="date"
        label="시작 날짜"
        v-model="postDetail.startDate"
      /></td>
        <th>채용종료일<span className="font_red">*</span></th>
        <td className="date">
          <input type="date"
        label="종료 날짜"
        v-model="postDetail.endDate"
      />
        </td>
        
      </tr>
      <tr v-if="params.postIdx">
        <th>(수정 전 채용절차)</th>
        <td colspan="3" class="modify_ex">{{hirProcess}}</td>
      </tr>
      <tr>
        <th rowspan="2">채용절차<span className="font_red">*</span></th>
        <td colspan="2">          
            <input
              type="text"
              name="hirProcess"
              v-model="postDetail.recruitProcess"
              placeholder="과정을 하나씩 적은 후 절차등록 버튼을 눌러주세요"
            />          
        </td>
        <td>
            <b-button variant="outline-success" @click="handleClick"  >
              절차등록
            </b-button>
            <b-button variant="danger" @click="handleClickRefresh">
              초기화
            </b-button>   
        </td>        
      </tr>
      <tr>
        <td colspan="3">
          <label className="recruit-process-list" placeholder="입력된 채용절차가 표시됩니다.">
            {{ recruitProcessList.length > 0 ? recruitProcessList.join(" - ") : "입력된 채용절차가 표시됩니다." }}
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
            v-model="postDetail.reqQualifications"
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
            v-model="postDetail.prefQualifications"
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
            v-model="postDetail.duties"
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
            v-model="postDetail.benefits"
          />
        </td>
      </tr>
      <tr>
        <th>첨부파일</th>
        <td  class="fileClass">
          <input type="file" style="display: none" id="fileInput" @change="handlerFile" />
          <label class="img-label" htmlFor="fileInput">파일 첨부하기</label>
          <span>{{ fileData.name }}</span>
        </td>
      </tr>
    </thead>
      </table>
      <div class="button-box">
      <b-button  variant="primary"  @click="handlerInsertBtn">
          {{ params.postIdx ? "수정" : "등록" }}
      </b-button>
      <b-button
                variant="secondary"
                @click="$router.go(-1)"
              >
                뒤로가기
              </b-button>
            </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useBizPostDetailInsertMutation } from '../../../hook/bizPost/useBizPostDetailInsertMutation';
import { useBizPostDetailQuery } from '../../../hook/bizPost/useBizPostDetailQuery';
import { useRoute } from 'vue-router';

const expRequired = ref(null);
const expYears = ref(null);
const hirProcess = ref(null);
const { params } = useRoute();
const postDetail = ref({
  expYears : ''
});
const route = useRoute();
 
const checkBox = reactive([
      { id: 1, label: "신입", checked: false },
      { id: 2, label: "경력", checked: false },
      { id: 3, label: "경력무관", checked: false },
    ]);
const recruitProcessList = reactive([]);
const fileData = ref("");



if(Object.keys(params).length>0){
  const { data: detail , refetch, isSuccess } = useBizPostDetailQuery(params);

  watchEffect(() => {
  if (isSuccess.value && detail.value) {
    postDetail.value = toRaw(detail.value.postDetail); 
    expRequired.value=detail.value.postDetail.expRequired;
    expYears.value=detail.value.postDetail.expYears;
    hirProcess.value=detail.value.postDetail.hirProcess; 
    }  
  });
}

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
      postDetail.value.expRequired = selectedValues.join(", "); // expRequired에 체크된 값 저장   
    
};

const handleClick = () => {
    let trimmedProcess = "";
    if(recruitProcessList.length != 0){
      trimmedProcess = postDetail.value.recruitProcess.trim(); //공백 제거
    }else{
      trimmedProcess = postDetail.value.recruitProcess;
    }
    
    if (trimmedProcess === "") return; //빈 값 방지

    if (recruitProcessList.length >= 8) {
      alert("채용 절차는 최대 8단계까지만 가능합니다.");
      return;
    }
    
    recruitProcessList.push(trimmedProcess); //기존값 + 새로입력한값
    recruitProcessList.join(" - ");
    postDetail.value.hirProcess=recruitProcessList.join(" - ");
     //입력 필드 초기화
    postDetail.value.recruitProcess=""; // recruitProcess 상태를 초기화
};

//채용과정 초기화 버튼
const handleClickRefresh = () => {
  recruitProcessList.length = 0;
  postDetail.value.recruitProcess=""; // recruitProcess 상태를 초기화
  postDetail.value.hirProcess="";
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
    let numberRules = /[0-9]/;
    if (!postDetail.value[key]) {
    // 해당 필드가 비어있을 때만 알림을 띄움
      alert(`${Value} 입력해 주세요`);
      return;  // 반복문 종료
      }

    if (!numberRules.test(postDetail.value.salary)) {
        alert("급여는 숫자만 입력됩니다.");
        return;
      }

    if (!numberRules.test(postDetail.value.openings)) {
        alert("모집인원은 숫자만 입력됩니다.");
        return;
      }
  }

  if (new Date(postDetail.value.endDate) < new Date(postDetail.value.startDate)) {
    alert("종료일자는 시작일자보다 나중이어야 합니다.");
    return;
  }

  if (new Date(postDetail.value.endDate) < new Date()) {
    alert("종료일자는 현재일자보다 나중이어야 합니다.");
    return;
  }

  for (const input in postDetail.value) {
    if (reqiredFields[input.name] && !input) {
      // 해당 필드가 비어있을 때만 알림을 띄움
      alert(`"${reqiredFields[input.name]}" 입력해 주세요`);
      return;  // 알림을 띄운 후, 즉시 종료하여 다른 필드는 검사하지 않음
    }
  }

  if (!postDetail.value.expRequired.includes('경력')){
    postDetail.value.expYears = "";
  }

  if(postDetail.value.appStatus && postDetail.value.appStatus != '대기중'){
    alert("'대기중'상태가 아닌 공고는 수정할 수 없습니다.");
    return;
  }

  handlerInsert();
}

const { mutate:handlerInsert} = useBizPostDetailInsertMutation(postDetail,fileData,params);


const handlerFile = (e) => {
  const fileinfo = e.target.files;
  fileData.value = fileinfo[0];
  console.log(fileData.value);
};


</script>

<style lang="scss" scoped>

table {
  width: 100%;
  border-collapse: collapse;
  border: black;
  margin: 20px 0px 0px 0px;
  font-size: 13px;
  text-align: left;

  th {
    text-align: center;
    background-color: #ccc;
  }

  td {
    border-bottom: 1px solid #ddd;
    text-align: left;
    height: 50px;
    text-align: center;
  }
}

.modify_ex{
  background-color: #eeedae;
}

label {
  display: flex;
  flex-direction: column;
}

// select {
//   font-size: 13px;
//   width: 100px;
//   height: 30px;
// }
// input[type="text"] {
//   padding: 8px;
//   margin-top: 5px;
//   margin-bottom: 5px;
//   border-radius: 4px;
//   border: 1px solid #ccc;
// }
input,
select,
textarea {
  width: 95%;
  height: 95%;
  border: none;
  vertical-align: middle;
}
.button-box {
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: 10px;
}

.button-submit {
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

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-left: 10px;
}

.checkbox-container {
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  padding-left: 30px; /* 체크박스를 왼쪽에 고정 */
  user-select: none; /* 텍스트 선택 방지 */
}

.checkbox-input {
  position: absolute;
  opacity: 0; /* 기본 체크박스를 숨깁니다 */
  pointer-events: none; /* 체크박스 자체에 이벤트를 차단 */
}

.checkbox-custom {
  position: absolute;
  left: 0;
  top: 0;
  width: 20px;
  height: 20px;
  background-color: #f0f0f0;
  border: 2px solid #ccc;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.checkbox-input:checked + .checkbox-custom {
  background-color: #4caf50; /* 체크된 상태에서 배경색 */
  border-color: #4caf50;
}

.checkbox-input:checked + .checkbox-custom:after {
  content: '';
  position: absolute;
  left: 6px;
  top: 2px;
  width: 8px;
  height: 14px;
  border: solid white;
  border-width: 0 4px 4px 0;
  transform: rotate(45deg);
}

.checkbox-container:hover .checkbox-custom {
  border-color: #4caf50;
}

.checkbox-container:active .checkbox-custom {
  background-color: #e0e0e0;
}

.checkbox-label {
  font-size: 16px;
  margin-left: 10px;
}

.img-label {
  height:35px;
  margin-top:5px;
  margin-right: 10px;
  padding: 6px 25px;
  background-color: #ccc;
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.9);
  cursor: pointer;

  &:hover {
    background-color: #45a049;
    color: white;
  }

  &:active {
    background-color: #3e8e41;
    box-shadow: 0 2px #666;
    transform: translateY(2px);
  }
}

.fileClass {
  padding-left: 10px;
  display:flex;
  text-align: left;
}

span{
  vertical-align: middle;
}
</style>