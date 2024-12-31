<template>
  <ContextBox>공고 상세 보기</ContextBox>
  <template v-if="isLoading">...로딩중</template>
  <template v-if="isSuccess">
  <b-container class="mt-2">
        <div>
          <b-stack direction="horizontal" :style="{ gap: '3rem' }" class="me-3">
            <div class="p-2" style="width: 60%">
              <b-row>
                <h1>{{postDetail?.title}}</h1>
                <b-row class="my-1">
                  <b-col>
                    <a
                      :href="`/vue/company/companyDetailPage.do/${postDetail.postIdx}/${bizDetail.bizIdx}`"
                      class="text-dark"
                    >
                      <h4>{{bizDetail.bizName}}</h4>
                    </a>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col class="d-flex align-items-center">
                    <span>
                      {{postDetail.workLocation}} | {{postDetail?.expRequired}}{{" "}}{{postDetail?.expYears}}
                    </span>
                  </b-col>
                </b-row>
              </b-row>
            </div>
            <template v-if="userType === 'A'">            
                <div class="p-2 d-flex justify-content-center">
                  <template v-if="isClicked.isScraped">
                    <b-button
                      variant="warning"
                      size="lg"
                      style="width: 150px; margin-right: 20px"
                      @click=handlerSaveScrap
                    >
                      스크랩
                    </b-button>
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
                      @click=handlerSaveScrap
                    >
                      스크랩
                    </b-button>                  
                  </template>
                  <template v-if="isClicked.isApplyed">
                    <b-button
                      variant="primary"
                      size="lg"
                      style=" width: 150px"
                      @click="handlerModal(postDetail, bizDetail)"
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
                      @click="handlerModal(postDetail, bizDetail)"
                    >
                      입사지원
                    </b-button>
                  </template>
                </div>
              </template>
          </b-stack>
        </div>
      </b-container>

      <b-container class="mt-5">
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
            <span class="p-4">{{postDetail?.salary}}</span>
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
            <h5>■ 첨부 파일일 </h5>
            <span class="p-4">{{postDetail?.benefits}}</span>
          </div>
        </div>
        <template v-if="userType === 'b'">
          <div class="d-flex justify-content-center mt-5 ">
            <span style="color: red">
              '대기중' 공고만 수정 및 삭제 가능합니다.
            </span>
          </div>
        </template>
        
        <div class="d-flex justify-content-center m-2">
          <template v-if="userType === 'B' && postDetail?.appStatus === '대기중'">
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
                variant="secondary"
                size="lg"
                @click="navigatePost('back')"
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
                @click="handlerUpdateAppStatus(postDetail.postIdx, '승인')"
              >
                승인
              </b-button>
              <b-button
                variant="outline-danger"
                class="me-2"
                @click="handlerUpdateAppStatus(postDetail.postIdx, '불허')"
              >
                불허
              </b-button>
              <b-button
                variant="secondary"
                size="lg"
                @click="navigatePost('back')"
              >
                뒤로가기
              </b-button>
            </template>
            <template v-else>
            <b-button variant="secondary" size="lg" @click="navigatePost('back')">
              뒤로가기
            </b-button>
          </template>
        </template>
        </div>
      </b-container>
    </template>
    <template v-if="isError">에러 발생!!!</template>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { useQuery } from "@tanstack/vue-query";
import 'bootstrap-vue-3';

const { params } = useRoute();
const postDetail = ref(null);
const bizDetail = ref(null);
const isClicked = ref(null);
const userType = ref(null);
const router = useRouter();

const searchList = async () => {
  const result = await axios.post(
    "/api/manage-hire/readPostDetailBody.do",
    params,
  );
  if(result.data){
    postDetail.value = result.data.postDetail;
    bizDetail.value = result.data.bizDetail;
    isClicked.value = result.data.isClicked;
    userType.value = result.data.userType;
  }
  return result.data;
};

const {
  data,
  isLoading,
  refetch,
  isSuccess,
  isError,
} = useQuery({
  queryKey: ["bizPostDetail"],
  queryFn: searchList,
});
// const { postDetail, bizDetail, isClicked } = data || {};

const navigatePost= (param) => {
  if (param === 'back') {
      router.go(-1);  // 뒤로가기
    } else {
      router.push({ name: "bizPostModify", params: { postIdx: param } });  // 지정된 URL로 이동
    }
}


</script>

<style lang="scss" scoped>
.postDetailsContainer {
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

  // 기본 버튼 스타일
  button {
    background-color: #3bb2ea;
    border: none;
    color: white;
    padding: 10px 22px;
    text-align: center;
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
</style>
