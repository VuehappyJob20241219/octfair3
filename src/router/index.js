import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login/Login.vue';
import DashBoard from '../views/DashBoard/DashBoard.vue';
import Notice from '../views/Board/Notice.vue';
import FirstNoticeDetail from '../components/page/Board/Notice/FirstNoticeDetail.vue';
import Applicant from '../views/Manage-user/Applicant.vue';
import Biz from '../views/Manage-user/Biz.vue';
import Resume from '../views/Apply/Resume.vue';
import Faq from '../views/Board/Faq.vue';
import CompanyEdit from '../views/Company/CompanyEdit.vue';
import CompanyInfo from '../views/Company/CompanyInfo.vue';
import Post from "../views/ManageHire/Post.vue";
import History from "../views/Apply/History.vue";

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
  },
  {
    path: '/vue',
    name: 'vue',
    component: DashBoard,
    children: [
      {
        path: 'board',
        name: 'board',
        children: [
          {
            path: 'notice.do',
            name: 'notice',
            component: Notice,
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
            path: 'faq.do',
            name: 'faq',
            component: Faq,
          },
        ],
      },
      {
        path: 'manage-user',
        name: 'manage-user',
        children: [
          {
            path: 'applicant.do',
            name: 'applicant',
            component: Applicant,
          },
          {
            path: 'biz.do',
            name: 'biz',
            component: Biz,
          },
        ],
      },
      {
        path: 'apply',
        name: 'apply',
        children: [
          {
            path: 'resume.do',
            name: 'resume',
            component: Resume,
          },
          {
            path: "history.do",
            name: "history",
            component: History,
          },
        ],
      },
      {
        path: 'manage-hire',
        name: 'manage-hire',
        children: [
          {
            path: 'post.do',
            name: 'post',
            component: Post,
          },
        ],
      },
      {
        path: 'company',
        name: 'company',
        children: [
          {
            path: 'companyUpdatePage.do',
            name: 'companyUpdate',
            component: CompanyEdit,
          },
          {
            path: 'companyDetailPage.do',
            name: 'companyDetailPage',
            component: CompanyInfo,
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

export default router;
