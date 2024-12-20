<template>
    <div class="divManage-applicantList">
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
                    <th scope="col">회원번호</th>
                    <th scope="col">회원ID</th>
                    <th scope="col">회원명</th>
                    <th scope="col">이메일</th>
                    <th scope="col">회원가입날짜</th>
                    <th scope="col">관리</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="applicantList">
                    <template v-if="applicantList.applicantCnt > 0">
                        <tr v-for="applicant in applicantList.applicant" v-bind:key="applicant.userIdx">
                            <td>{{ applicant.userIdx }}</td>
                            <td>{{ applicant.loginId }}</td>
                            <td>{{ applicant.name }}</td>
                            <td>{{ applicant.email }}</td>
                            <td>{{ applicant.regdate }}</td>
                            <td>{{ }}</td>
                        </tr>
                    </template>
                </template>
            </tbody>
        </table>
        <Pagination 
            :totalItems="applicantList?.applicantCnt || 0" 
            :items-per-page="5" :max-pages-shown="5"
            :onClick="applicantList" v-model="cPage" />
    </div>



</template>

<script setup>
import axios from "axios";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const applicantList = ref();
const cPage = ref(1);

const searchList = async () => {
    // const param = new URLSearchParams({
    //     searchName: route.query.searchName || "",
    //     currentPage: cPage.value,
    //     pageSize: 5,
    // });
    const data = {
        searchName: route.query.searchName || "",
        currentPage: (cPage.value).toString(),
        pageSize: (5).toString(),
    };
    console.log(data);
    await axios
        .post("/api/manage-user/applicantListBody.do", data)
        .then((res) => {
            applicantList.value = res.data;
        })
        .catch(() => { });
}

watch(route, searchList);

onMounted(() => {
    searchList();
});

</script>

<style lang="scss" scoped>
table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0px 0px 0px;
    font-size: 18px;
    text-align: left;

    th,
    td {
        padding: 8px;
        text-align: left;
        border-bottom: 1px solid #ddd;
        text-align: center;
    }

    th {
        background-color: #2676bf;
        color: #ddd;
    }

    /* 테이블 올렸을 때 */
    tbody tr:hover {
        background-color: #d3d3d3;
        opacity: 0.9;
        cursor: pointer;
    }
}
</style>