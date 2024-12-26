import { createRouter, createWebHistory } from "vue-router";
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
import Login from "../views/Login/Login.vue";
import Applicant from "../views/Manage-user/Applicant.vue";
import Biz from "../views/Manage-user/Biz.vue";
import Post from "../views/ManageHire/Post.vue";
import ManageHireApplicant from "../views/ManageHire/ManageHireApplicant.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/vue",
    name: "vue",
    component: DashBoard,
    children: [
      {
        path: "board",
        name: "board",
        children: [
          {
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
        children: [
          {
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
        children: [
          {
            path: "resume.do",
            name: "resume",
            component: Resume,
          },
          {
            path: "resume-new.do",
            name: "resume-new",
            component: ResumePost,
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
        children: [
          {
            path: "post.do",
            name: "post",
            component: Post,
          },
          {
            path: "bizPostInsert.do",
            name: "bizPostInsert",
            component: BizPostInsert,
          },
          {
            path: "bizPostDetail.do/:idx",
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
        children: [
          {
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
    ],
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;
