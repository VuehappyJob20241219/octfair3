<template>
    <div class="divManage-bizList">
        <table>
            <colgroup>
                <col width="15%" />
                <col width="10%" />
                <col width="10%" />
                <col width="25%" />
                <col width="20%" />
                <col width="10%" />
            </colgroup>
            <thead>
                <tr>
                    <th scope="col">사업자번호</th>
                    <th scope="col">사업자명</th>
                    <th scope="col">대표자</th>
                    <th scope="col">연락처</th>
                    <th scope="col">홈페이지</th>
                    <th scope="col">관리</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="bizList">
                    <template v-if="bizList.applicantCnt > 0">
                        <tr v-for="biz in bizList.biz" v-bind:key="biz.bizIdx">
                            <td>{{ biz.userIdx }}</td>
                            <td>{{ biz.name }}</td>
                            <td>{{ biz.bizCeoName }}</td>
                            <td>{{ biz.bizContact }}</td>
                            <td>{{ biz.bizWebUrl }}</td>
                            <td><div class="button-box">
                                <button @click="handlerModal()">수정</button>
                            </div></td>
                        </tr>
                    </template>
                </template>
            </tbody>

        </table>
    </div>
</template>

<script setup>
import axios from "axios";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import Pagination from "../../common/Pagination.vue";
import { useModalStore } from "../../../stores/modalState";

const route = useRoute();
const biztList = ref();
const cPage = ref(1);
const modalStateApplicant = useModalStore();
const loginId = ref("");

</script>
