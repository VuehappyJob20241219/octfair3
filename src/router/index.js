import { createRouter, createWebHistory } from "vue-router";
import { useUserInfo } from "../stores/userInfo";

import QnaDetail from "../components/page/Board/Qna/QnaDetail.vue";
import BizPostDetail from "../components/page/ManageHire/BizPost/BizPostDetail.vue";
import BizPostInsert from "../components/page/ManageHire/BizPost/BizPostInsert.vue";
import History from "../views/Apply/History.vue";
import Resume from "../views/Apply/Resume.vue";
import ResumePost from "../views/Apply/ResumePost.vue";
import Faq from "../views/Board/Faq.vue";
import Notice from "../views/Board/Notice.vue";
import Qna from "../views/Board/Qna.vue";
import CompanyEdit from "../views/Company/CompanyEdit.vue";
import CompanyInfo from "../views/Company/CompanyInfo.vue";
import DashBoard from "../views/DashBoard/DashBoard.vue";
import Join from "../views/Join/JoinApplicant.vue";
import Login from "../views/Login/Login.vue";
import Applicant from "../views/Manage-user/Applicant.vue";
import Biz from "../views/Manage-user/Biz.vue";
import ManageHireApplicant from "../views/ManageHire/ManageHireApplicant.vue";
import BizPost from "../views/ManageHire/BizPost.vue";
import Mypage from "../views/Mypage/Mypage.vue";
import Withdraw from "../views/Mypage/Withdraw.vue";
import NotFound from "../views/NotFound.vue";

const routes = [{
        path: "/",
        name: "login",
        component: Login,
    },
    {
        path: "/join",
        name: "join",
        component: Join,
    },
    {
        path: "/vue",
        name: "vue",
        component: DashBoard,
        children: [{
                path: "board",
                name: "board",
                children: [{
                        path: "notice.do",
                        name: "notice",
                        component: Notice,
                    },
                    // qna 경로
                    {
                        path: "qna.do",
                        name: "qna",
                        component: Qna,
                    },
                    {
                        path: "qna.do/insert",
                        name: "qnaInsert",
                        component: QnaDetail,
                    },
                    {
                        path: "qna.do/:idx",
                        name: "qnaDetail",
                        component: QnaDetail,
                    },
                    // {
                    //   //단일 라우터
                    //   path: "notice.do/:idx",
                    //   name: "noticeDetail",
                    //   component: FirstNoticeDetail,
                    // },
                    // {
                    //   //단일 라우터
                    //   path: "notice.do/insert",
                    //   name: "noticeInsert",
                    //   component: FirstNoticeDetail,
                    // },
                    {
                        path: "faq.do",
                        name: "faq",
                        component: Faq,
                    },
                ],
            },
            {
                path: "manage-user",
                name: "manage-user",
                children: [{
                        path: "applicant.do",
                        name: "applicant",
                        component: Applicant,
                    },
                    {
                        path: "biz.do",
                        name: "biz",
                        component: Biz,
                    },
                ],
            },
            {
                path: "apply",
                name: "apply",
                children: [{
                        path: "resume.do",
                        name: "resume",
                        component: Resume,
                    },
                    {
                        path: "resume-new.do",
                        name: "resume-new",
                        component: ResumePost,
                    },
                    //  {
                    //   path: "resume-detail.do?resumeNum=:idx",
                    //   name: "MyResumes",
                    //   component: ResumePost,
                    // },
                    {
                        path: "resume-detail.do",
                        name: "MyResumes",
                        component: ResumePost,
                        props: (route) => ({ resumeNum: route.query.resumeNum }), // 쿼리 파라미터 전달
                      },
                    {
                        path: "history.do",
                        name: "history",
                        component: History,
                    },
                ],
            },
            {
              path: "manage-hire",
              name: "manage-hire",
              children: [{
                      path: "post.do",
                      name: "post",
                      component: BizPost,
                  },
                  {
                      path: "bizPostInsert.do",
                      name: "bizPostInsert",
                      component: BizPostInsert,
                  },
                  {
                      path: "bizPostDetail.do/:postIdx",
                      name: "bizPostDetail",
                      component: BizPostDetail,
                  },
                  {
                      path: "applicant.do",
                      name: "hireApplicant",
                      component: ManageHireApplicant,
                  },
              ],
            },
            {
                path: "company",
                name: "company",
                children: [{
                        path: "companyUpdatePage.do",
                        name: "companyUpdate",
                        component: CompanyEdit,
                    },
                    {
                        path: "companyDetailPage.do",
                        name: "companyDetailPage",
                        component: CompanyInfo,
                    },
                ],
            },
            {
                path: "mypage",
                name: "mypage",
                children: [{
                        path: "update.do",
                        name: "update",
                        component: Mypage,
                    },
                    {
                        path: "withdraw.do",
                        name: "withdraw",
                        component: Withdraw,
                    },
                ],
            },
        ],
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory("/"),
    routes,
});

router.beforeEach(async(to, from) => {
    const userInfo = useUserInfo();

    if (!userInfo.isAuthenticated && !(to.name == "login")) {
        alert("로그인이 필요합니다.");
        return { name: "login" };
    }
});

export default router;
