import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login/Login.vue";
import DashBoard from "../views/DashBoard/DashBoard.vue";
import Notice from "../views/Board/Notice.vue";
import FirstNoticeDetail from "../components/page/Board/Notice/FirstNoticeDetail.vue";
import CompanyEdit from "../views/Company/CompanyEdit.vue";
import CompanyInfo from "../views/Company/CompanyInfo.vue";

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
          {
            //단일 라우터
            path: "notice.do/:idx",
            name: "noticeDetail",
            component: FirstNoticeDetail,
          },
          {
            //단일 라우터
            path: "notice.do/insert",
            name: "noticeInsert",
            component: FirstNoticeDetail,
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
