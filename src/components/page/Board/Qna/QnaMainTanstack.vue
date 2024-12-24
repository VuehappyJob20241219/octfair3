<template>
    <!-- 테이블뷰 -->
    <div class="divNoticeList">
        현재 페이지: {{ cPage }} 총 개수: {{ noticeList?.noticeCnt || 0 }}
        <table>
            <colgroup>
                <col width="10%" />
                <col width="50%" />
                <col width="30%" />
                <col width="10%" />
            </colgroup>
            <thead>
                <tr>
                    <th scope="col">번호</th>
                    <th scope="col">제목</th>
                    <th scope="col">작성일</th>
                    <th scope="col">작성자</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="isLoading">...로딩중</template>
                <template v-if="isSuccess">
                    <template v-if="noticeList.noticeCnt > 0">
                        <tr v-for="notice in noticeList.notice" :key="notice.noticeIdx"
                            v-on:click="handlerGetDetailBtn(notice.noticeIdx)">
                            <td>{{ notice.noticeIdx }}</td>
                            <td>{{ notice.title }}</td>
                            <td>{{ notice.createdDate.substr(0, 10) }}</td>
                            <td>{{ notice.author }}</td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr>
                            <td colspan="7">일치하는 검색 결과가 없습니다</td>
                        </tr>
                    </template>
                </template>
                <template v-if="isError">...에러</template>
            </tbody>
        </table>

        <!-- 페이지네이션 -->
        <Pagination 
            :totalItems="noticeList?.noticeCnt || 0"
            :items-per-page="itemPerPage"
            :max-pages-shown="5"
            :onClick="searchList"
            v-model="cPage"
        />
    </div>
    <router-view></router-view>
</template>

<script setup>
import { useRouter } from 'vue-router';
import Pagination from '../../../common/Pagination.vue';

const router = useRouter();
const injectedSearchValue= inject('providedSearchValue');
const itemPerPage = ref(12);
const cPage = ref(1);

const handlerGetDetailBtn = (param) => {
    router.push({ // URLpath를 push해도 되고 router(index.js)에 명시된 name을 push해도 된다.
        name: 'qnaDetail',
        params: { idx : param },
    });
};

// 기존방식: 조건을 onMounted()와 watch()에서 감지하여 searchList를 실행하는 방식 (+ searchList는 NoticeMain 내장, Detail은 Modal방식)
// 아래방식: 조건을 TanStack-useQuery가 감지하여 searchList를 실행하는 방식 (+ searchList는 모듈화하여 외부에, Detail은 별도Page방식)
const {
    data: qnaList, // useQuery(useNoticeListSearchQuery) 내 callback함수 return값이 입력된다
    isLoading,
    isSuccess,
    isError,
    isStale, // 캐시유지 주기
    refetch, // 자동갱신 주기
} = useNoticeListGetQuery(injectedSearchValue, cPage, itemPerPage);
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
