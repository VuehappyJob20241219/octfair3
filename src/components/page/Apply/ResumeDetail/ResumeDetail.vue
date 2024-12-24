<template>
  <div class="resumeDetail_body_wrap">
    <div v-if="basicinformation" class="resumeDetail_body_basicInfo">
      <div class="inputRow"> <label for="resTitle">제목:</label> <input type="text" v-model="basicinformation.resTitle" />
      </div>
      <div class="inputRow">
        <label for="resTitle">이름:</label>
        <input type="text" v-model="basicinformation.userNm" />
      </div>
      <div class="inputRow">
        <label for="resTitle">이메일: </label>
        <input type="text" v-model="basicinformation.email" />
      </div>
      <div class="inputRow">
        <label for="resTitle">전화번호: </label>
        <input type="text" v-model="basicinformation.phone " />
      </div>
    </div>
    <div v-else>
      <div>기본 정보를 불러오는 중입니다....
      </div>
    </div>
    <div class="resumeDetail_body">
      <div class="resumeDetail_body_haeder">간단소개글</div>
      <div class="resumeDetail_body_guide">
        <p class="resumeDetail_body_guide_text">
          • 본인의 업무 경험을 기반으로 핵심역량과 업무 스킬을 간단히 작성해주세요. <br />
          • 3~5줄로 요약하여 작성하는 것을 추천합니다!
        </p>
      </div>
      <div>
        <textarea
          style="border: none; padding: 5px; height: auto"
          id="short_intro"
          placeholder="소개글을 입력해주세요."
        ></textarea>
      </div>
    </div>
    <div class="resumeDetail_body">
      <div class="resumeDetail_body_haeder">경력</div>
      <div class="resumeDetail_body_guide">
        <p class="resumeDetail_body_guide_text">
          • 담당하신 업무 중 우선순위가 높은 업무를 선별하여 최신순으로 작성해주세요. <br />
          • 신입의 경우, 직무와 관련된 대외활동, 인턴, 계약직 경력 등이 있다면 작성해주세요. <br />
          • 업무 또는 활동 시 담당했던 역할과 과정, 성과에 대해 자세히 작성해주세요. <br />
          • 현재 재직중이면 퇴사일을 해당월로 입력해주세요.
        </p>
      </div>
      <div class="listDiv">
        <button type="button" class="showTableBtn" id="career">+ 추가</button>
        <ul>
          <li class="list" id="careerList">
            <!-- 조회값 여기에 추가 -->
          </li>
          <li id="careerInputTable" style="display: none">
            <table class="col">
              <tbody>
                <tr>
                  <td>
                    <input
                      type="text"
                      id="company"
                      style="padding: 5px; width: 80%; margin: 0px"
                      placeholder="회사명"
                      required="required"
                    />
                  </td>
                  <td>
                    입사일 :
                    <input
                      type="month"
                      id="startDate"
                      style="padding: 5px; width: 80%; margin: 0px"
                      required="required"
                    />
                  </td>
                  <td>
                    퇴사일 :
                    <input
                      type="month"
                      id="endDate"
                      style="padding: 5px; width: 80%; margin: 0px"
                      required="required"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="text"
                      id="dept"
                      style="padding: 5px; width: 80%; margin: 0px"
                      placeholder="근무부서"
                      required="required"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      id="position"
                      style="padding: 5px; width: 80%; margin: 0px"
                      placeholder="직책/직급"
                      required="required"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      id="reason"
                      style="padding: 5px; width: 80%; margin: 0px"
                      placeholder="퇴사사유"
                      required="required"
                    />
                  </td>
                </tr>
                <tr>
                  <td colspan="3" style="padding: 5px; width: 80%; margin: 0px">
                    <textarea
                      style="height: 100px"
                      id="crrDesc"
                      required="required"
                      placeholder="  담당업무를 입력해주세요. - 진행한 업무를 다 적기 보다는 경력사항 별로 중요한 내용만 엄선해서 작성하는 것이 중요합니다! - 경력별 프로젝트 내용을 적을 경우, 역할/팀구성/기여도/성과를 기준으로 요약해서 작성해보세요!"
                    ></textarea>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="inputBtnGroup">
              <a class="btnType gray cancleBtn" id="career" href="#"><span>취소</span></a>
              <a class="btnType blue" href="javascript:insertCareer()"><span>저장</span></a>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="resumeDetail_body">
      <div class="resumeDetail_body_haeder">학력</div>
      <div class="resumeDetail_body_guide">
        <p class="resumeDetail_body_guide_text">• 최신순으로 작성해주세요.</p>
      </div>
      <div class="listDiv">
        <button type="button" class="showTableBtn" id="education">+ 추가</button>
        <ul>
          <li class="list" id="educationList">
            <!-- 조회값 여기에 추가 -->
          </li>
          <li id="educationInputTable" style="display: none">
            <table class="col">
              <tbody>
                <tr>
                  <td>
                    <select style="width: 80%" id="eduLevel">
                      <option value="none" selected="selected">학력구분</option>
                      <option value="고등학교">고등학교</option>
                      <option value="대학교">대학교</option>
                      <option value="대학원(석사)">대학원(석사)</option>
                      <option value="대학원(박사)">대학원(박사)</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="schoolName"
                      style="padding: 5px; width: 80%; margin: 0px"
                      placeholder="학교명"
                    />
                  </td>
                  <td>
                    <input type="text" id="major" style="padding: 5px; width: 80%; margin: 0px" placeholder="전공명" />
                  </td>
                </tr>
                <tr>
                  <td>입학일 : <input type="month" id="admDate" style="padding: 5px; width: 80%; margin: 0px" /></td>
                  <td>졸업일 : <input type="month" id="grdDate" style="padding: 5px; width: 80%; margin: 0px" /></td>
                  <td>
                    <select style="width: 80%" id="grdStatus">
                      <option value="none" selected="selected">졸업여부</option>
                      <option value="졸업">졸업</option>
                      <option value="재학">재학</option>
                      <option value="중퇴">중퇴</option>
                      <option value="휴학">휴학</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="inputBtnGroup">
              <a class="btnType gray cancleBtn" id="education" href="#"><span>취소</span></a>
              <a class="btnType blue" href="javascript:insertEdu()"><span>저장</span></a>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="resumeDetail_body">
      <div class="resumeDetail_body_haeder">스킬</div>
      <div class="resumeDetail_body_guide">
        <p class="resumeDetail_body_guide_text">
          • 개발 스택, 디자인 툴, 마케팅 툴 등 가지고 있는 직무와 관련된 스킬을 추가해보세요. <br />
          • 데이터 분석 툴이나 협업 툴 등의 사용해본 경험이 있으신 툴들도 추가해보세요
        </p>
      </div>
      <div class="listDiv">
        <button type="button" class="showTableBtn" id="skill">+ 추가</button>
      </div>
      <ul>
        <li class="list" id="skillList">
          <!-- 조회값 여기에 추가 -->
        </li>
        <li id="skillInputTable" style="display: none">
          <table class="row">
            <colgroup>
              <col width="30%" />
              <col width="70%" />
            </colgroup>
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    id="skillName"
                    style="padding: 5px; width: 80%; margin: 0px"
                    placeholder="스킬명"
                  />
                </td>
                <td>
                  <textarea style="height: auto" id="skillDetail" placeholder="스킬상세기재"></textarea>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="inputBtnGroup">
            <a class="btnType gray cancleBtn" id="skill" href="#"><span>취소</span></a>
            <a class="btnType blue" href="javascript:insertSkill()"><span>저장</span></a>
          </div>
        </li>
      </ul>
    </div>
    <div class="resumeDetail_body">
      <div class="resumeDetail_body_haeder">자격증 및 외국어</div>
      <div class="resumeDetail_body_guide">
        <p class="resumeDetail_body_guide_text">
          • 직무 관련 자격증, 외국어 자격증이나 수료한 교육 등이 있다면 간략히 작성해주세요. <br />
          • 지원하는 회사에서 요구하는 경우가 아니라면 운전면허증과 같은 자격증은 생략하는 것이 좋습니다!
        </p>
      </div>
      <div class="listDiv">
        <button type="button" class="showTableBtn" id="certification">+ 추가</button>
      </div>
      <ul>
        <li class="list" id="certificationList">
          <!-- 조회값 여기에 추가 -->
        </li>
        <li id="certificationInputTable" style="display: none">
          <table class="col">
            <colgroup>
              <col width="20%" />
              <col width="20%" />
              <col width="20%" />
              <col width="40%" />
            </colgroup>
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    id="certName"
                    style="padding: 5px; width: 80%; margin: 0px"
                    placeholder="자격증명"
                  />
                </td>
                <td>
                  <input type="text" id="grade" style="padding: 5px; width: 80%; margin: 0px" placeholder="등급" />
                </td>
                <td>
                  <input type="text" id="issuer" style="padding: 5px; width: 80%; margin: 0px" placeholder="발행처" />
                </td>
                <td>취득일자 : <input type="month" id="acqDate" style="padding: 5px; width: 80%; margin: 0px" /></td>
              </tr>
            </tbody>
          </table>
          <div class="inputBtnGroup">
            <a class="btnType gray cancleBtn" id="certification" href="#"><span>취소</span></a>
            <a class="btnType blue" href="javascript:insertCert()"><span>저장</span></a>
          </div>
        </li>
      </ul>
    </div>
    <div class="resumeDetail_body">
      <div class="resumeDetail_body_haeder">링크</div>
      <div class="resumeDetail_body_guide">
        <p class="resumeDetail_body_guide_text">
          • 깃허브, 노션으로 작성한 포트폴리오, 구글 드라이브 파일 등 업무 성과를 보여줄 수 있는 링크가 있다면
          작성해주세요.
        </p>
      </div>
      <div>
        <input
          style="border: none; padding: 5px"
          id="pfo_link"
          type="text"
          value=""
          placeholder="https://"
        />
      </div>
    </div>
    <div class="resumeDetail_body">
      <div class="resumeDetail_body_haeder">자기소개서</div>
      <div class="resumeDetail_body_guide">
        <p class="resumeDetail_body_guide_text">
          • 지원동기, 직무역량, 직무관련 성과와 경험, 포부 등 자유롭게 작성해 주세요.
        </p>
      </div>
      <div>
        <textarea
          style="border: none; padding: 5px; height: auto"
          id="personalStatement"
          rows=""
          cols=""
          placeholder="자기소개서를 입력해주세요."
        >
</textarea
        >
      </div>
    </div>
    <div class="resumeDetail_body">
								<div class="resumeDetail_body_haeder">첨부파일</div>
								<div class="resumeDetail_body_guide">
									<p class="resumeDetail_body_guide_text">• 포트폴리오, 경력기술서 등
										첨부파일이 있다면 등록해주세요.</p>
								</div>
								<div>
								<c:if test="${empty result.fileName}">
									<input id="resumeAttach" type="file">
								</c:if>
								<c:if test="${not empty result.fileName}">
								<div class="attach-container">
    								<a href=""><span class="attach-fileName"></span></a>
    								<button class="attach-delete" id="attach-delete" onclick="deleteAttach()">
        								<svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="#5f6368">
            								<path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" />
        								</svg>
    								</button>
								</div>
								</c:if>
								</div>
							</div>
          <div class="btnGroup">
							<button class="btnType gray">목록으로</button>
							<button class="btnType blue">저장하기</button>
							<button class="btnType blue">미리보기</button>
            </div>    
  </div>
</template>

<script setup>
import axios from 'axios';
import { Resume } from '../../../../api/axiosApi/resumeApi';
import { useUserInfo } from '../../../../stores/userInfo';

const basicinformation = ref();
const userInfo = useUserInfo();
const { user } = userInfo;

const basicInfo = async() => { 
  const param = {
    loginId:user.loginId,
    userNm:user.userNm,
    userType:user.userType,
  }
  await axios.post(Resume.BasicInfoResume, param).then((res)=> { 
    basicinformation.value = res.data.result
  }
  )
}

onMounted(() => { 
  basicInfo()
})
</script>

<style lang="scss" scoped>
.resumeDetail_body {
  margin: 20px 20px 60px;
}

.resumeDetail_body_basicInfo {
  margin: 20px;
}

.resumeDetail_body_haeder {
  margin-top: 15px;
  padding: 5px;
  font-size: 20px;
  border-bottom: 0.5px solid black;
}

.resumeDetail_body_guide {
  margin: 10px 0px;
  padding: 5px;
  background-color: #eaf2fe;
  border-radius: 5px;
  color: gray;
}

.inputRow {
  display: flex;
  width: 100%;
  align-items: center; /* 세로 정렬 */
  gap: 10px; /* label과 input 사이 간격 */
}

.inputRow label {
  width: 100px; /* 제목 영역 확보 */
  text-align: left; /* 라벨 텍스트 오른쪽 정렬 */
}

.inputRow input {
  flex-grow: 1; /* 입력 필드가 넓이를 차지하도록 설정 */
  padding: 5px;
  border: none; /* 기본 상태에서 테두리를 없앰 */
  outline: none; /* 포커스 상태에서 기본 outline 제거 */
  background-color: transparent; /* 배경색 투명 */
  transition: all 0.2s ease; /* 스타일 전환 애니메이션 */
}
.inputRow input:focus {
  border: 1px solid #007bff; /* 포커스 시 테두리 추가 */
  background-color: #f9f9f9; /* 포커스 시 배경색 변경 */
  border-radius: 4px; /* 테두리 모서리 둥글게 */
}

input,
textarea {
  font-size: 13px;
  width: 100%;
}

textarea {
  padding: 10px 0px;
  overflow: hidden;
  resize: none;
  min-height: 100px; /* 최소 높이를 설정 */
}

button {
  width: 100%;
  padding: 10px 0;
  display: block;
  font-size: 18px;
  font-weight: 600;
  text-align: left;
  border: none;
  border-radius: 0;
  color: #36f;
  background-color: transparent;
  border-bottom: 1px solid #f1f1f1;
}

button:hover {
  cursor: pointer;
}

button:active {
  color: red;
}

table {
  margin-top: 10px;
}

table td {
  background-color: #f9f9f9;
}

.deleteBtn {
  color: grey;
  text-align: center;
}

.inputBtnGroup {
  padding-top: 10px;
  text-align: right;
}

.btnGroup {
  border-top: 3px solid black;
  margin: 20px 0 50px 0;
  padding-top: 15px;
  text-align: center;
}
.res-comment {
  padding: 10px 0px;
  color: skyblue;
  text-align: center;
}
.attach-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 5px 0;
}

.attach-fileName {
  margin-left: 20px;
  font-size: 16px;
  color: blue;
  text-decoration: underline;
}

.attach-delete {
  width: 20px;
  height: 20px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: 10px;
}

.attach-delete svg {
  width: 100%;
  height: 100%;
}

.btnGroup{
   display: flex; /* 버튼을 수평으로 나열 */
    justify-content: space-between; /* 버튼 간 간격 */
    margin-top: 10px; /* 버튼과 테이블 간 간격 */
}

.btnType {
    display: inline-block; /* 버튼을 inline-block으로 설정 */
    padding: 10px 15px; /* 버튼 패딩 */
    border-radius: 5px; /* 둥글게 */
    text-decoration: none; /* 밑줄 제거 */
    color: white; /* 텍스트 색상 */
}

.btnType.gray {
    background-color: #6c757d; /* 회색 버튼 */
}

.btnType.blue {
    background-color: #007bff; /* 파란색 버튼 */
}
.btnType.gray:hover {
    background-color: #5a6268; /* 회색 버튼 호버 색상 */
}

.btnType.blue:hover {
    background-color: #0056b3; /* 파란색 버튼 호버 색상 */
}

</style>
