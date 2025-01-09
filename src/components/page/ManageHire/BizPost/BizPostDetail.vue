<template>
  <ContextBox>공고 상세 보기</ContextBox>
  <ApplyUserResumeModal
    v-if="modalState.modalState"
    @modalClose="() => ((postIdx = 0), (bizIdx = 0))"
    :pIdx="postIdx"
    :bIdx="bizIdx"
    :postDetail="postDetail"
    :bizDetail="bizDetail"
    :scrap="null"
  />
  <template v-if="isLoading">...로딩중</template>
  <template v-if="isSuccess">
  <div class="mt-2">
        <div>
          <div>
            <div class="p-2" style="width: 100%">
              <div>
                <h2 class="titleStyle">{{postDetail?.title}}</h2>
                <div class="my-1">
                  <div>
                    <a
                      :href="`/vue/company/companyDetailPage.do/${postDetail.postIdx}/${bizDetail.bizIdx}`"
                      class="text-dark"
                    >
                      <h4>{{bizDetail.bizName}}</h4>
                    </a>
                  </div>
                </div>
                <div>
                  <div class="d-flex align-items-center">
                    <span>
                      {{postDetail.workLocation}} | {{postDetail?.expRequired}}{{" "}}{{postDetail?.expYears}}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <template v-if="userType === 'A'">            
                <div class="p-2 d-flex justify-content-center">
                  <template v-if="isClicked.isScraped">
                    <template v-if="postDetail?.postIdx">
                    <b-button
                      variant="warning"
                      size="lg"
                      style="width: 150px; margin-right: 20px"
                       @click="handlerSaveScrap(params.postIdx)"
                    >
                      스크랩
                    </b-button>
                    </template>
                  </template>
                  <template v-else>
                    <b-button
                      variant="outline-warning"
                      size="lg"
                      style="
                        width: 150px;
                        margin-right: 20px;
                        color: #ffc107;
                        border-color: #ffc107"
                      @click="handlerSaveScrap(params.postIdx)"
                    >
                      스크랩
                    </b-button>                  
                  </template>
                  <template v-if="isClicked.isApplyed">
                    <b-button
                      variant="primary"
                      size="lg"
                      style=" width: 150px"
                      @click="handlerModal(postDetail.postIdx, bizDetail.bizIdx)"
                    >
                      입사지원
                    </b-button>
                  </template>
                  <template v-else>
                    <b-button
                      variant="outline-primary"
                      size="lg"
                      style="
                        width: 150px;
                        color: #007bff;
                        border-color: #007bff;"
                      @click="handlerModal(postDetail.postIdx, bizDetail.bizIdx)"
                    >
                      입사지원
                    </b-button>
                  </template>
                </div>
              </template>
          </div>
        </div>
      </div>

      <div class="detailsContainer">
        <div class="postDetailContainer">
          <div>
            <h5>■ 포지션 소개 </h5>
            <span class="p-4">{{postDetail?.posDescription}}</span>
          </div>
          <div class="mt-5">
            <h5>■ 주요업무 </h5>
            <span class="p-4">{{postDetail?.duties}}</span>
          </div>
          <div class="mt-5">
            <h5>■ 자격요건 </h5>
            <span class="p-4">{{postDetail?.reqQualifications}}</span>
          </div>
          <div class="mt-5">
            <h5>■ 급여 </h5>
            <span class="p-4">{{postDetail?.salary}}만원</span>
          </div>
          <div class="mt-5">
            <h5>■ 모집인원 </h5>
            <span class="p-4">{{postDetail?.openings}} 명</span>
          </div>
          <div class="mt-5">
            <h5>■ 우대사항 </h5>
            <span class="p-4">{{postDetail?.prefQualifications}}</span>
          </div>
          <div class="mt-5">
            <h5>■ 혜택 & 복지 </h5>
            <span class="p-4">{{postDetail?.benefits}}</span>
          </div>
          <div class="mt-5">
            <h5>■ 첨부 파일 </h5>
            <span class="fileDown" @click="handleDown(postDetail.postIdx,bizDetail.bizIdx)">{{postDetail?.fileName}}</span>
          </div>
        </div>
        <div class="bizDetailContainer">
          <aside class="company-info">
								<div class="align">
									<img :src="bizDetail.logicalPath" :alt="bizDetail.bizName" width="150" height="150">
								</div>
								<h4>기업 정보</h4>
								<p>
									<strong>기업명:</strong> {{bizDetail.bizName}}
								</p>
								<p>
									<strong>연락처:</strong> {{bizDetail.bizContact}}
								</p>
								<p>
									<strong>사원수:</strong> {{bizDetail.bizEmpCount}}
								</p>
								<p> 
									<strong>주소:</strong> {{bizDetail.bizAddr}}
								</p>
								<p>
									<strong>대표명:</strong> {{bizDetail.bizCeoName}}
								</p>
								<div class="align">
									<a :href="`/vue/company/companyDetailPage.do/${postDetail.postIdx}/${bizDetail.bizIdx}`" class="company-info-link">기업정보→</a>
								</div>
								<div class="date">
									<span class="remaining">남은 기간</span>
									<div class="date-details">
										<div class="date-item">
											<span class="date-item">시작일</span><br> <span
												class="date-item">마감일</span>
										</div>
										<div class="date-item">
											<span class="date-item" id="startDate">{{postDetail.startDate}}시</span><br> <span
												class="date-item" id="endDate">{{postDetail.endDate}}시</span>
										</div>
									</div>
								</div>								
							</aside>
        </div>        
        
        <div class="d-flex justify-content-center m-2">
          <template v-if="userType === 'B' && postDetail.appStatus === '대기중'">
            <div>
              <b-button
                variant="primary"
                size="lg"
                class="mx-1"
                @click="navigatePost(`${postDetail.postIdx}`)"              
              >
                수정하기
              </b-button>
              <b-button
                variant="danger"
                size="lg"
                class="mx-1"
                @click="handleDelete(postDetail.postIdx,bizDetail.bizIdx)"              
              >
                삭제하기
              </b-button>
              <b-button
                variant="secondary"
                size="lg"
                @click="$router.go(-1)"
              >
                뒤로가기
              </b-button>
            </div>
          </template>
          <template v-else>
            <template v-if="userType === 'M'">
              <b-button
                variant="outline-success"
                class="me-2"
                @click="handlerUpdateAppStatus({ postIdx: postDetail.postIdx, status: '승인' })"
              >
                승인
              </b-button>
              <b-button
                variant="outline-danger"
                class="me-2"
                @click="handlerUpdateAppStatus({ postIdx: postDetail.postIdx, status: '불허' })"
              >
                불허
              </b-button>
              <b-button
                variant="secondary"
                size="lg"
                @click="$router.go(-1)"
              >
                뒤로가기
              </b-button>
            </template>
            <template v-else>
            <b-button variant="secondary" size="lg" @click="$router.go(-1)">
              뒤로가기
            </b-button>
          </template>
        </template>
        </div>
      </div>      
    </template>
    <template v-if="isError">에러 발생!!!</template>    
</template>

<script setup>
import { useModalStore } from "@/stores/modalState";
import axios from "axios";
import "bootstrap-vue-3";
import { useRoute, useRouter } from "vue-router";
import ApplyUserResumeModal from "../../Apply/ResumeList/ApplyUserResumeModal.vue";
import { useScrapSaveMutation } from "../../../hook/scrap/useScrapSaveMutation";
import { useBizPostDetailQuery } from "../../../hook/bizPost/useBizPostDetailQuery";
import { useBizPostDetailDeleteMutation } from "../../../hook/bizPost/useBizPostDetailDeleteMutation";
import { useBizPostStatusUpdateMutation } from "../../../hook/bizPost/useBizPostStatusUpdateMutation";
import router from "../../../../router";

const { params } = useRoute();
const postDetail = ref(null);
const bizDetail = ref(null);
const isClicked = ref(null);
const userType = ref(null);
const route = useRouter();
const postIdx = ref(0);
const bizIdx = ref(0);
const modalState = useModalStore();



const { data: detail , isLoading, refetch, isSuccess, isError } = useBizPostDetailQuery(params);

const navigatePost = (param) => {
  route.push({ name: "bizPostModify", params: { postIdx: param } }); // 지정된 URL로 이동
  
};

const { mutate: handleDelete } = useBizPostDetailDeleteMutation(postDetail, bizDetail);
const { mutate: handlerUpdateAppStatus } = useBizPostStatusUpdateMutation();

const handleDown = (pIdx, bIdx) => {
  const params = {
    postIdx: pIdx,
    bizIdx: bIdx,
  };
  const download = {
    url: "/api/manage-hire/managehireDownloadBody.do",
    method: "POST",
    data: params,
    responseType: "blob",
  };
  axios(download)
    .then((res) => {
      // 다운로드한 파일을 브라우저에서 처리
      const file = new Blob([res.data], { type: "application/octet-stream" });
      const fileURL = URL.createObjectURL(file);
      console.log();
      // 파일 이름을 서버에서 받은 파일 이름으로 설정
      const fileName = postDetail.value.fileName;

      // 다운로드 링크 생성
      const link = document.createElement("a");
      link.href = fileURL;
      link.download = fileName;
      link.click(); // 자동으로 다운로드 시작

      // 다운로드 후 URL 객체 해제
      URL.revokeObjectURL(fileURL);
    })
    .catch((error) => {
      console.error("파일 다운로드 실패:", error);
    });
};

const handlerModal = (pIdx, bIdx) => {
  modalState.setModalState();
  postIdx.value = pIdx;
  bizIdx.value = bIdx;
};


//신효 - 스크랩 등록
const { mutate: handlerSaveScrap } = useScrapSaveMutation(params.postIdx);

watchEffect(() => {
  if (isSuccess.value && detail.value) {
    postDetail.value = detail.value.postDetail;
    bizDetail.value = detail.value.bizDetail;
    isClicked.value = detail.value.isClicked;
    userType.value = detail.value.userType;
  }
});
</script>

<style lang="scss" scoped>

.detailsContainer {
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 20px;
    padding: 20px;
  }

.bizDetailContainer {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
}

.postDetailContainer {
  padding: 20px;
  background-color: #f9fafb;
  border-radius: 8px;
}

.postTitleAndButtonContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.bizImg {
  max-width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 8px;
}


// 스크랩 버튼
.scrapButton {
  background-color: #007bff;

  &:hover {
    background-color: #0056b3;
  }
}

// 입사지원 버튼
.applyButton {
  background-color: #ffc107;

  &:hover {
    background-color: #ffa000;
  }
}

//    기업정보 버튼
.bizInfoButton {
  background-color: #eeeeee;
  color: #333;
  border: 1px solid #ccc;

  &:hover {
    background-color: #e0e0e0;
    color: #333;
    border-color: #bbb;
  }
}

//    뒤로가기 버튼
.backButton {
  background-color: #6c757d;

  &:hover {
    background-color: #5a6268;
  }
}

  // 로딩중
  .loadingText {
    font-size: 2rem;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  /* 기업 정보 섹션 */
.company-info {
	background-color: #fff;
	padding: 20px;
	border-radius: 8px;
	box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
}

.company-info h3 {
	font-size: 24px;
	margin-bottom: 15px;
}

.company-info-link {
	display: inline-block;
	padding: 5px 10px;
	background-color: white; /* 흰색 배경 */
	color: black; /* 글자색 검정 */
	text-align: center;
	text-decoration: none; /* 밑줄 제거 */
	border-radius: 5px; /* 모서리 둥글게 */
	font-size: 12px;
	cursor: pointer; /* 마우스 커서 포인터로 변경 */
	border: 1px solid black; /* 검정 테두리 */
	transition: background-color 0.3s ease, color 0.3s ease;
	/* 호버 시 부드러운 효과 */
}

.company-info-link:hover {
	background-color: black; /* 호버 시 배경 검정 */
	color: white; /* 글자색 흰색 */
}

.align {
	text-align: center; /* 내부 요소 가로 중앙 정렬 */
	margin-bottom: 15px;
}

.align img {
	border-radius: 5px;
}
/* 날짜 부분 css */
.company-info {
	margin-top: 20px; /* 위쪽 여백 조정 */
}

.date {
	text-align: center; /* 가운데 정렬 */
	font-size: 1.2em; /* 글자 크기 조정 */
	margin-top: 30px; /* 남은 기간과 위 요소들 사이 간격 조정 */
}

.remaining {
	font-weight: bold; /* 남은 기간 텍스트 강조 */
	font-size: 1.5em; /* 남은 기간 글자 크기 조정 */
	margin-bottom: 10px; /* 아래쪽 여백 조정 */
}

.date-details {
	display: flex; /* Flexbox를 사용하여 아이템을 나란히 정렬 */
	justify-content: space-around; /* 공간을 균등하게 배분 */
	margin-top: 10px; /* 날짜 항목과 상위 요소 간격 조정 */
}

.date-item {
	text-align: center; /* 각 날짜 항목 중앙 정렬 */
}

.date-label {
	margin-bottom: 10px; /* 레이블과 값 사이의 아래쪽 여백 */
	color: red; /* 레이블 색상 빨간색 */
}

.date-value {
	margin-top: 10px; /* 값과 레이블 사이의 위쪽 여백 */
	color: red; /* 값 색상 빨간색 */
}

.downloadDiv {
	font-size: 1.2em; /* 글자 크기 조정 */
	margin-top: 60px; /* 남은 기간과 위 요소들 사이 간격 조정 */
}

.titleStyle{
  font-family: 'Nanum Barun Gothic', sans-serif;
}
.fileDown {
    cursor: pointer; /* 마우스를 갖다대면 손가락 모양 */
    font-weight: bold; /* 글씨를 두껍게 */
    color: #007BFF; /* 파일 링크 색상 (파란색) */
    text-decoration: underline; /* 밑줄 추가 */
    transition: color 0.3s ease, text-decoration 0.3s ease; /* 부드러운 색상 전환과 밑줄 효과 */
}

.fileDown:hover {
    color: #0056b3; /* 마우스 올렸을 때 색상 */
    text-decoration: none; /* 마우스 올렸을 때 밑줄 제거 */
}
</style>
