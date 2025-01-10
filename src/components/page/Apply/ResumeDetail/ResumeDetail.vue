<template>
  <ResumePreview v-if="ResumePreviewModalState.modalState" :idx="resumePreviewIdx" />
  <div class="resumeDetail_body_wrap">
    <div v-if="basicinformation" class="resumeDetail_body_basicInfo">
      <div class="flex-row" style="display: flex; align-items: center">
        <div class="photo-section" style="max-width: 200px; margin-left: 20px">
          <!-- 첨부파일 -->
          <div v-if="basicinformation.fileName">
            <div class="file-container">
              <div v-if="imageUrl" class="file-link">
                <img :src="imageUrl" class="my-image" />
              </div>
            </div>
            <div
              id="attach-delete"
              v-if="basicinformation.fileName"
              @click="deleteFile(basicinformation.resIdx)"
              style="text-align: center"
            >
              사진제거
            </div>
          </div>
          <!-- 신규등록 -->
          <div v-else>
            <div v-if="imageUrl">
              <img :src="imageUrl" @click="triggerFileInput" class="my-image" />
              <!-- <div v-if="!fileData.name" @click="triggerFileInput" style="text-align: center">
                이미지를 등록해주세요
              </div> -->
            </div>
            <input id="resumeAttach" type="file" ref="fileInput" @change="handlerFile" />
            <div class="" v-if="fileData.name" style="cursor: pointer">
              <div @click="deleteAttach" style="text-align: center">사진제거</div>
            </div>
          </div>
        </div>
        <!-- 내용 -->
        <div class="content-section" style="flex: 1; margin-left: 20px">
          <div class="inputRow">
            <input type="text" v-model="basicinformation.resTitle" style="font-size: 20px; font-weight: 900" />
          </div>
          <div class="inputRow"><strong>이름:</strong> {{ basicinformation.userNm }}</div>
          <div class="inputRow">
            <strong>나이:</strong> {{ basicinformation.birthday }} ({{
              basicinformation.sex === "1" ? "남성" : "여성"
            }})
          </div>
          <div class="inputRow">
            <strong>전화번호:</strong>
            {{ basicinformation.phone }}
          </div>
          <div class="inputRow">
            <strong>이메일:</strong>
            {{ basicinformation.email }}
          </div>
          <div class="inputRow">
            <strong>주소: </strong>
            {{ basicinformation.address }}
          </div>
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
            v-model="basicinformation.shortIntro"
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
          <button type="button" class="showTableBtn" id="career" @click="showAddCareer">+ 추가</button>
          <ul>
            <li class="list" id="careerList">
              <ResumeCareerView ref="resumeCareerView" :idx="basicinformation.resIdx" />
            </li>
            <li id="careerInputTable" class="inputTable" v-show="careerAddState">
              <table class="col">
                <tbody>
                  <tr>
                    <td>
                      <div class="inputRow">
                        <label style="padding: 5px">회사명:</label>
                        <input
                          type="text"
                          id="company"
                          placeholder="회사명"
                          required
                          v-model="careerInfo.company"
                          style="padding: 5px; width: 60%; margin: 5px"
                        />
                      </div>
                    </td>
                    <td>
                      <div class="inputRow">
                        <label style="padding: 5px">입사일:</label>
                        <input
                          type="date"
                          id="startDate"
                          required
                          v-model="careerInfo.start_date"
                          :max="today"
                          style="padding: 5px; width: 60%; margin: 5px"
                        />
                      </div>
                    </td>
                    <td>
                      <div class="inputRow">
                        <label style="padding: 5px">퇴사일:</label>
                        <input
                          type="date"
                          id="endDate"
                          required
                          v-model="careerInfo.end_date"
                          style="padding: 5px; width: 60%; margin: 5px"
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="inputRow">
                        <label style="padding: 5px">근무부서:</label>
                        <input
                          type="text"
                          id="dept"
                          placeholder="근무부서"
                          required
                          v-model="careerInfo.dept"
                          style="padding: 5px; width: 60%; margin: 5px"
                        />
                      </div>
                    </td>
                    <td>
                      <div class="inputRow">
                        <label style="padding: 5px">직책/직급:</label>
                        <input
                          type="text"
                          id="position"
                          placeholder="직책/직급"
                          required
                          v-model="careerInfo.position"
                          style="padding: 5px; width: 60%; margin: 5px"
                        />
                      </div>
                    </td>
                    <td>
                      <div class="inputRow">
                        <label style="padding: 5px">퇴사사유:</label>
                        <input
                          type="text"
                          id="reason"
                          placeholder="퇴사사유"
                          required
                          v-model="careerInfo.reason"
                          style="padding: 5px; width: 60%; margin: 5px"
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="3">
                      <textarea
                        id="crrDesc"
                        required
                        placeholder="담당업무를 입력해주세요."
                        v-model="careerInfo.crr_desc"
                        style="padding: 5px; width: 97%; margin: 5px"
                      ></textarea>
                      <div style="font-size: 12px; color: gray; margin: 5px 0; padding-left: 10px">
                        - 진행한 업무를 다 적기 보다는 경력사항 별로 중요한 내용만 엄선해서 작성하는 것이 중요합니다!<br />
                        - 경력별 프로젝트 내용을 적을 경우, 역할/팀구성/기여도/성과를 기준으로 요약해서 작성해보세요!
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="inputBtnGroup">
                <a class="btnType gray cancleBtn" id="career" @click="showAddCareer"><span>취소</span></a>
                <a class="btnType blue" @click="addCareer"><span>저장</span></a>
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
          <button type="button" class="showTableBtn" id="education" @click="showAddEdu">+ 추가</button>
          <ul>
            <li class="list" id="educationList">
              <ResumeEducationView ref="resumeEducationView" :idx="basicinformation.resIdx" />
            </li>
            <li id="educationInputTable" class="inputTable" v-show="eduAddState">
              <table class="col">
                <tbody>
                  <tr>
                    <td>
                      <div class="inputRow">
                        <label style="padding: 5px">교육 단계:</label>
                        <select style="width: 80%" id="eduLevel" v-model="educationInfo.eduLevel">
                          <option value="none" selected>교육 단계</option>
                          <option value="고등학교">고등학교</option>
                          <option value="대학교">대학교</option>
                          <option value="대학원(석사)">대학원(석사)</option>
                          <option value="대학원(박사)">대학원(박사)</option>
                        </select>
                      </div>
                    </td>
                    <td>
                      <div class="inputRow">
                        <label style="padding: 5px">학교명:</label>
                        <input
                          type="text"
                          id="schoolName"
                          style="padding: 5px; width: 80%; margin: 0px"
                          placeholder="학교명"
                          v-model="educationInfo.schoolName"
                        />
                      </div>
                    </td>
                    <td>
                      <div class="inputRow">
                        <label style="padding: 5px">전공명:</label>
                        <input
                          type="text"
                          id="major"
                          style="padding: 5px; width: 80%; margin: 0px"
                          placeholder="전공명"
                          v-model="educationInfo.major"
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="inputRow">
                        <label style="padding: 5px">입학일:</label>
                        <input
                          type="date"
                          id="admDate"
                          style="padding: 5px; width: 80%; margin: 0px"
                          v-model="educationInfo.admDate"
                        />
                      </div>
                    </td>
                    <td>
                      <div class="inputRow">
                        <label style="padding: 5px">졸업일:</label>
                        <input
                          type="date"
                          id="grdDate"
                          style="padding: 5px; width: 80%; margin: 0px"
                          v-model="educationInfo.grdDate"
                        />
                      </div>
                    </td>
                    <td>
                      <div class="inputRow">
                        <label style="padding: 5px">학적 상태:</label>
                        <select style="width: 80%" id="grdStatus" v-model="educationInfo.grdStatus">
                          <option value="none" selected>학적 상태</option>
                          <option value="졸업">졸업</option>
                          <option value="재학">재학</option>
                          <option value="중퇴">중퇴</option>
                          <option value="휴학">휴학</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="inputBtnGroup">
                <a class="btnType gray cancleBtn" id="education" @click="showAddEdu"><span>취소</span></a>
                <a class="btnType blue" @click="addEdu"><span>저장</span></a>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="resumeDetail_body">
        <div class="resumeDetail_body_haeder">보유기술 및 능력</div>
        <div class="resumeDetail_body_guide">
          <p class="resumeDetail_body_guide_text">
            • 개발 스택, 디자인 툴, 마케팅 툴 등 가지고 있는 직무와 관련된 스킬을 추가해보세요. <br />
            • 데이터 분석 툴이나 협업 툴 등의 사용해본 경험이 있으신 툴들도 추가해보세요
          </p>
        </div>
        <div class="listDiv">
          <button type="button" class="showTableBtn" id="skill" @click="showAddSkill">+ 추가</button>
        </div>
        <ul>
          <li class="list" id="skillList">
            <ResumeSkillView ref="resumeSkillView" :idx="basicinformation.resIdx" />
          </li>
          <li id="skillInputTable" class="inputTable" v-show="skillAddState">
            <table class="col">
              <colgroup>
                <col width="30%" />
                <col width="70%" />
              </colgroup>
              <tbody>
                <tr>
                  <td>
                    <label style="margin: 10px">보유기술 및 능력:</label>
                    <input
                      type="text"
                      id="skillName"
                      style="padding: 5px; width: 80%; margin: 10px"
                      placeholder="보유기술 및 능력"
                      v-model="skillInfo.skillName"
                    />
                  </td>
                  <td>
                    <label style="margin: 20px"> 상세내용:</label>
                    <textarea
                      style="height: auto; margin: 10px; width: 95%"
                      id="skillDetail"
                      placeholder=" 상세내용"
                      v-model="skillInfo.skillDetail"
                    ></textarea>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="inputBtnGroup">
              <a class="btnType gray cancleBtn" id="skill" @click="showAddSkill"><span>취소</span></a>
              <a class="btnType blue" @click="addSkill"><span>저장</span></a>
            </div>
          </li>
        </ul>
      </div>
      <!-- 자격증  -->
      <div class="resumeDetail_body">
        <div class="resumeDetail_body_haeder">자격증 및 외국어</div>
        <div class="resumeDetail_body_guide">
          <p class="resumeDetail_body_guide_text">
            • 직무 관련 자격증, 외국어 자격증이나 수료한 교육 등이 있다면 간략히 작성해주세요. <br />
            • 지원하는 회사에서 요구하는 경우가 아니라면 운전면허증과 같은 자격증은 생략하는 것이 좋습니다!
          </p>
        </div>
        <div class="listDiv">
          <button type="button" class="showTableBtn" id="certification" @click="showAddCert">+ 추가</button>
        </div>
        <ul>
          <li class="list" id="certificationList">
            <ResumeCertificationView ref="resumeCertificationView" :idx="basicinformation.resIdx" />
          </li>
          <li id="certificationInputTable" class="inputTable" v-show="certAddState">
            <table class="col">
              <colgroup>
                <col width="30%" />
                <col width="25%" />
                <col width="30%" />
                <col width="15%" />
              </colgroup>
              <tbody>
                <tr>
                  <td>
                    <div class="inputRow">
                      <label style="padding: 2px">자격증명:</label>
                      <input
                        type="text"
                        id="certName"
                        style="padding: 5px; width: 70%; margin: 0px"
                        placeholder="자격증명"
                        v-model="certificationInfo.certName"
                      />
                    </div>
                  </td>
                  <td>
                    <div class="inputRow">
                      <label style="padding: 2px">등급:</label>
                      <input
                        type="text"
                        id="grade"
                        style="padding: 5px; width: 80%; margin: 0px"
                        placeholder="등급"
                        v-model="certificationInfo.grade"
                      />
                    </div>
                  </td>
                  <td>
                    <div class="inputRow">
                      <label style="padding: 2px">발행처:</label>
                      <input
                        type="text"
                        id="issuer"
                        style="padding: 5px; width: 85%; margin: 0px"
                        placeholder="발행처"
                        v-model="certificationInfo.issuer"
                      />
                    </div>
                  </td>
                  <td>
                    <div class="inputRow">
                      <label style="padding: 2px">취득일자:</label>
                      <input
                        type="date"
                        id="acqDate"
                        style="padding: 5px; width: 70%; margin: 5px 0"
                        v-model="certificationInfo.acqDate"
                        :max="today"
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="inputBtnGroup">
              <a class="btnType gray cancleBtn" id="certification" @click="showAddCert"><span>취소</span></a>
              <a class="btnType blue" @click="addCert"><span>저장</span></a>
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
            v-model="basicinformation.proLink"
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
            v-model="basicinformation.perStatement"
          >
          </textarea>
        </div>
      </div>
      <div class="resumeDetail_body">
        <div class="resumeDetail_body_haeder">첨부파일</div>
        <div class="resumeDetail_body_guide">
          <p class="resumeDetail_body_guide_text">• 포트폴리오, 경력기술서 등 첨부파일이 있다면 등록해주세요.</p>
        </div>
        <!-- 첨부파일 -->
        <div class="listDiv">
          <button type="button" class="showTableBtn" id="education" @click="showAddAtt">+ 추가</button>
        </div>
        <ul>
          <li class="list" id="educationList">
            <!-- 첨부파일 리스트 출력 -->
            <ResumeAttachmentView ref="resumeAttachmentView" :idx="basicinformation.resIdx" />
          </li>
          <li id="educationInputTable" class="inputTable" v-show="attAddState">
            <table class="col">
              <colgroup>
                <col width="30%" />
                <col width="70%" />
              </colgroup>
              <tbody>
                <tr>
                  <td>
                    <div class="">
                      <label style="padding: 5px; margin: 5px">파일구분:</label>
                      <select
                        style="width: 80%; padding: 5px; margin: 5px"
                        id="attachmentCategory"
                        v-model="attachmentInfo.category"
                      >
                        <option value="none" selected>파일구분:</option>
                        <option value="포트폴리오">포트폴리오</option>
                        <option value="이력서">이력서</option>
                        <option value="증명서">증명서</option>
                        <option value="자격증">자격증</option>
                        <option value="기타">기타</option>
                      </select>
                    </div>
                  </td>
                  <td>
                    <div class="">
                      <label style="margin-top: 10px"> 파일 소개:</label>
                      <textarea
                        style="height: auto; margin: 10px; width: 95%"
                        id="attachmentDetail"
                        placeholder=" 파일 소개:"
                        v-model="attachmentInfo.content"
                      ></textarea>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <input id="AttachInput" type="file" ref="fileInput" @change="handlerAttFile" />
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="inputBtnGroup">
              <a class="btnType gray cancleBtn" id="education" @click="showAddAtt"><span>취소</span></a>
              <a class="btnType blue" @click="addAtt"><span>저장</span></a>
            </div>
          </li>
        </ul>
      </div>
      <div class="btnGroup">
        <button class="btnType gray list" @click="router.push('/vue/apply/resume.do')">목록으로</button>
        <button class="btnType blue button" @click="handlerSaveBtn()">저장하기</button>
        <button class="btnType gray list" @click="handerResumePreview(basicinformation.resIdx)">미리보기</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useModalStore } from "@/stores/modalState";
import axios from "axios";
import { ref, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserInfo } from "../../../../stores/userInfo";
import { useResumeAddAttMutation } from "../../../hook/resume/useResumeAddAttMutation";
import { useResumeAddCareerMutation } from "../../../hook/resume/useResumeAddCareerMutation";
import { useResumeAddCertMutation } from "../../../hook/resume/useResumeAddCertMutation";
import { useResumeAddEduMutation } from "../../../hook/resume/useResumeAddEduMutation";
import { useResumeAddSkillMutation } from "../../../hook/resume/useResumeAddSkillMutation";
import { useResumeBaseInfoQuery } from "../../../hook/resume/useResumeBaseInfoQuery";
import { useResumeSaveMutation } from "../../../hook/resume/useResumeSaveMutation";
import { useResumeUpdateQuery } from "../../../hook/resume/useResumeUpdateQuery";
import ResumeAttachmentView from "../ResumeList/ResumeAttachmentView.vue";
import ResumeCareerView from "../ResumeList/ResumeCareerView.vue";
import ResumeCertificationView from "../ResumeList/ResumeCertificationView.vue";
import ResumeEducationView from "../ResumeList/ResumeEducationView.vue";
import ResumeSkillView from "../ResumeList/ResumeSkillView.vue";

const basicinformation = ref();
const userInfo = useUserInfo();
const { user } = userInfo;
const ResumePreviewModalState = useModalStore();
const resumePreviewIdx = ref(0);
const careerAddState = ref(false);
const eduAddState = ref(false);
const skillAddState = ref(false);
const certAddState = ref(false);
const attAddState = ref(false);
const careerInfo = ref({});
const educationInfo = ref({});
const skillInfo = ref({});
const certificationInfo = ref({});
const attachmentInfo = ref({});
const router = useRouter();
const resumeCareerView = ref(null);
const resumeEducationView = ref(null);
const resumeSkillView = ref(null);
const resumeCertificationView = ref(null);
const resumeAttachmentView = ref(null);
const imageUrl = ref("/no_image.jpg");
const fileInput = ref(null); // 파일 입력 요소 참조
const attFileData = ref({});
const fileData = ref({});
const { query } = useRoute();
const resumeNum = query.resumeNum;

const {
  data: updateInfo,
  isLoading: updateIsLoading,
  isSuccess: updateIsSuccess,
  refetch: resumeUdateInfoRefetch,
  isError,
} = useResumeUpdateQuery(resumeNum);

const { data: basicInfo, isLoading, isSuccess, refetch } = useResumeBaseInfoQuery(resumeNum);

//달력에서 미래날짜 선택 불가
const today = computed(() => {
  let now_utc = new Date();
  let timeOff = new Date().getTimezoneOffset() * 60000;
  return new Date(now_utc - timeOff).toISOString().split("T")[0];
});

const { mutate: addCareer } = useResumeAddCareerMutation(basicinformation, careerInfo);
const { mutate: addEdu } = useResumeAddEduMutation(basicinformation, educationInfo);
const { mutate: addSkill } = useResumeAddSkillMutation(basicinformation, skillInfo);
const { mutate: addCert } = useResumeAddCertMutation(basicinformation, certificationInfo);
const { mutate: addAtt } = useResumeAddAttMutation(basicinformation, attachmentInfo, attFileData);
const { mutate: handlerSaveBtn } = useResumeSaveMutation(basicinformation, user, fileData);

const handlerAttFile = (e) => {
  const fileInfo = e.target.files;
  const fileInfoSplit = fileInfo[0].name.split(".");
  const fileExtension = fileInfoSplit[1].toLowerCase();
  if (fileExtension) {
    attFileData.value = fileInfo[0];
  } else {
    attFileData.value = {};
  }
};

const handlerFile = (e) => {
  const fileInfo = e.target.files;
  const fileInfoSplit = fileInfo[0].name.split(".");
  const fileExtension = fileInfoSplit[1].toLowerCase();
  if (fileExtension === "jpg" || fileExtension === "gif" || fileExtension === "png") {
    imageUrl.value = URL.createObjectURL(fileInfo[0]);
    fileData.value = fileInfo[0];
  } else {
    fileData.value = {};
  }
};

//사진 새로고침 확인해야될듯
// const { mutate: deleteFile } = useResumeDeleteFileMutation();

const deleteFile = async (idx) => {
  const param = {
    resIdx: idx,
  };
  await axios.post(ResumeAddTable.DeleteAttachFile, param).then((res) => {
    if (res.data.result === "success") {
      resumeUdateInfoRefetch();
      imageUrl.value = "/no_image.jpg";
      fileData.value = {};
    }
  });
};

const handerResumePreview = (idx) => {
  ResumePreviewModalState.setModalState();
  resumePreviewIdx.value = idx;
};

const showAddCareer = () => {
  careerAddState.value = !careerAddState.value;
  careerInfo.value = {};
};

const showAddEdu = () => {
  eduAddState.value = !eduAddState.value;
  educationInfo.value = {};
  educationInfo.value.eduLevel = "none";
  educationInfo.value.grdStatus = "none";
};

const showAddSkill = () => {
  skillAddState.value = !skillAddState.value;
  skillInfo.value = {};
};

const showAddCert = () => {
  certAddState.value = !certAddState.value;
  certificationInfo.value = {};
};

const showAddAtt = () => {
  attAddState.value = !attAddState.value;
  attachmentInfo.value = {};
  attachmentInfo.value.category = "none";
  attFileData.value = {};
  document.getElementById("AttachInput").value = ""; // 파일 입력 초기화
};

const deleteAttach = () => {
  fileData.value = {};
  document.getElementById("resumeAttach").value = ""; // 파일 입력 초기화
  imageUrl.value = "/no_image.jpg";
};

const getFileImage = () => {
  let param = new URLSearchParams();
  param.append("resIdx", basicinformation?.value?.resIdx);
  const postAction = {
    url: "/api/apply/resumeFileDownload.do",
    method: "POST",
    data: param,
    responseType: "blob",
  };
  axios(postAction).then((res) => {
    const url = window.URL.createObjectURL(new Blob([res.data]));
    imageUrl.value = url;
  });
};

const triggerFileInput = () => {
  fileInput.value.click();
};

watchEffect(() => {
  if (updateIsSuccess && updateInfo.value) {
    // 업데이트가 성공적으로 이루어졌을 때
    basicinformation.value = toRaw(updateInfo.value);
  }
});

watchEffect(() => {
  if (isSuccess && basicInfo.value) {
    basicinformation.value = toRaw(basicInfo.value);
  }
});

watch(() => basicinformation?.value?.fileName, getFileImage);
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
  font-weight: bold;
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
.list {
  list-style-type: none;
}
.inputTable {
  list-style-type: none;
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
  background-color: white; /* 배경색 투명 */
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

.btnType {
  display: inline-block;
  padding: 10px 15px; /* 버튼 크기 줄이기 */
  font-size: 14px; /* 글자 크기 줄이기 */
  border-radius: 4px; /* 둥근 모서리 */
  text-decoration: none;
  color: white;
}

.btnType.gray {
  text-align: center;
  margin: 5px;
  background-color: #6c757d; /* 회색 버튼 */
}

.btnType.gray.list {
  width: 20%;
}

.btnType.blue {
  text-align: center;
  margin: 5px;
  background-color: #36ade4; /* 파란색 버튼 */
}

.btnType.blue.button {
  width: 20%;
}

.btnType.gray:hover {
  background-color: #5a6268; /* 회색 버튼 호버 색상 */
}

.btnType.blue:hover {
  background-color: #0056b3; /* 파란색 버튼 호버 색상 */
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

table {
  margin-top: 10px;
  width: 100%;
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
  display: flex; /* 버튼을 가로로 배치 */
  justify-content: center; /* 버튼 그룹을 가운데 정렬 */
  gap: 10px; /* 버튼 간 간격 추가 */
  margin-top: 20px; /* 버튼 그룹 상단 여백 */
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
  width: 25px;
  height: 25px;
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
.file-download {
  cursor: pointer; /* 커서를 포인터로 변경 */
}
.file-container {
  display: flex;
  align-items: center;
  gap: 20px; /* 이름과 삭제 버튼 사이 간격 */
}

.file-link {
  cursor: pointer; /* 커서를 포인터로 변경 */
  color: #36f; /* 파란색 글씨 */
  transition: background-color 0.3s ease; /* 부드러운 배경색 변화 */
}

.file-link:hover {
  background-color: rgba(54, 114, 255, 0.1); /* 호버 시 배경색 변화 */
  text-decoration: underline; /* 호버 시 밑줄 효과 */
}

img {
  width: 200px;
  height: 200px;
}

.my-image {
  width: 170px; /* 가로 4.5cm에 해당하는 픽셀 */
  height: 229px; /* 세로 5.79cm에 해당하는 픽셀 */
  object-fit: cover; /* 이미지 비율을 유지하면서 잘리기 */
  border: 2px solid #ccc; /* 이미지 테두리 (선택 사항) */
  margin: 10px; /* 이미지 주변 여백 (필요에 따라 조정) */
}
</style>
