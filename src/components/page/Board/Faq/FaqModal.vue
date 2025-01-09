<template>
  <teleport to="body">
      <div class="backdrop">
          <div class="container">             
                유형 :  &nbsp;
                  <input type="radio" value="1" v-model="detailValue.faq_type">개인인회원 &nbsp; &nbsp;
                  <input type="radio" value="2" v-model="detailValue.faq_type">기업회원                           
              <label> 제목 : <input type="text" v-model="detailValue.title"/> </label>
              <label>
                  내용 :
                  <input type="text" v-model="detailValue.content"/>
              </label>
              <div class="button-box">                  
                  <button v-if="params.idx" @click="handlerDeleteBtn">삭제</button>
                  <button @click="params.idx ? handlerUpdateBtn() : handlerSaveBtn() ">
                      {{ params.idx ? "수정" : "등록"}}</button>
                  <button @click="$router.go(-1)">닫기</button>                    
              </div>
          </div>
      </div>
  </teleport>
</template>

<script setup>
import { useUserInfo } from '../../../../stores/userInfo';
import { useRoute } from 'vue-router';
import { useFaqDetailSearchQuery } from "../../../hook/faq/useFaqDetailSearchQuery";
import { useFaqDetailUpdateMutation } from '../../../hook/faq/useFaqDetailUpdateMutation';
import { useFaqDetailDeleteMutation } from '../../../hook/faq/useFaqDetailDeleteMutation';
import { useFaqDetailInsertMutation } from '../../../hook/faq/useFaqDetailInsertMutation';

const userInfo = useUserInfo();
const emit = defineEmits(["postSuccess", "modalClose"]);
const { params } = useRoute();
const detailValue = ref({});
const loginId = userInfo.user.loginId;

const { mutate: handlerSaveBtn } = useFaqDetailInsertMutation(detailValue, loginId);
const { mutate: handlerDeleteBtn } = useFaqDetailDeleteMutation(params.idx);
const { mutate: handlerUpdateBtn } = useFaqDetailUpdateMutation(detailValue, params.idx);
const { data:faqDetail, isSuccess } = useFaqDetailSearchQuery(params.idx);

watchEffect(()=>{
    if( isSuccess.value && faqDetail.value){
        detailValue.value = toRaw(faqDetail.value.detail);
    }
})
</script>

<style lang="scss" scoped>
.backdrop {
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  flex-flow: row wrep;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
  font-weight: bold;
}

label {
  display: flex;
  flex-direction: column;
}

input[type="text"] {
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.container {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  position: relative;
  width: 600px;
}

.button-box {
  text-align: right;
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
