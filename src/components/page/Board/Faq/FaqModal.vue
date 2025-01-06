<template>
  <teleport to="body">
      <div class="backdrop">
          <div class="container">             
                유형 :  &nbsp;
                  <input type="radio" value="1" v-model="faqDetail.faq_type">개인회원 &nbsp; &nbsp;
                  <input type="radio" value="2" v-model="faqDetail.faq_type">기업회원                           
              <label> 제목 : <input type="text" v-model="faqDetail.title"/> </label>
              <label>
                  내용 :
                  <input type="text" v-model="faqDetail.content"/>
              </label>
              <div class="button-box">                  
                  <button v-if="props.idx" @click="handlerDeleteBtn">삭제</button>
                  <button @click="props.idx ? handlerUpdateBtn() : handlerSaveBtn() ">
                      {{ props.idx ? "수정" : "등록"}}</button>
                  <button @click="handlerModal">닫기</button>                    
              </div>
          </div>
      </div>
  </teleport>
</template>

<script setup>
import { useModalStore } from '@/stores/modalState';
import { useUserInfo } from '../../../../stores/userInfo';
import axios from 'axios';

const userInfo = useUserInfo();
const modalState = useModalStore();
const emit = defineEmits(["postSuccess", "modalClose"]);
const props = defineProps(['idx']);

const faqDetail = ref({
  faq_type: null,
  title: '',
  content: ''
});

const handlerModal = () => {
  modalState.setModalState();
};

const handlerSaveBtn = () => {
  const textData = {
      ...faqDetail.value,
      loginId: userInfo.user.loginId,
      context: faqDetail.value.content,
  };
  if(!faqDetail.value.faq_type){
    alert("회원유형을 선택해 주세요")
    return;
  }
  if(!faqDetail.value.title || faqDetail.value.title.trim() === ""){
    alert("제목을 입력해 주세요")
    return;
  }
  if(!faqDetail.value.content || faqDetail.value.content.trim() === ""){
    alert("내용을 입력해 주세요")
    return;
  }
  axios.post('/api/board/faqSaveRe.do', textData).then((res)=>{
      if(res.data.result === 'success'){
          modalState.setModalState();
          emit("postSuccess"); 
      }
  });
};

const handlerDeleteBtn = () => {
  axios.post('/api/board/faqDeleteRe.do', { faqSeq : props.idx })
  .then((res)=>{
      if(res.data.result === 'success'){
          modalState.setModalState();
          emit("postSuccess");
      }
  });
};

const handlerUpdateBtn = () =>{
  const textData = {
      ...faqDetail.value,
      faqSeq: props.idx,
      context: faqDetail.value.content,
  };
  axios.post('/api/board/faqUpdateRe.do', textData).then((res) => {
      if(res.data.result === 'success'){
          modalState.setModalState();
          emit("postSuccess");
      }
  });
};

const searchDetail = () =>{
  axios.post('/api/board/faqDetailRe.do', { faqSeq : props.idx }).then((res)=> {
      faqDetail.value=res.data.detail;      
  });
};

onMounted(()=>{
  props.idx && searchDetail();
});

onUnmounted(() => {
  emit("modalClose");
});

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
