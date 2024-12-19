import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login/Login.vue";
import DashBoard from "../views/DashBoard/DashBoard.vue";
import Notice from "../views/Board/Notice.vue";
import SecondNoticeDetail from "../components/page/Board/Notice/secondNoticeDetail.vue";

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
            component: SecondNoticeDetail,
          },
          {
            //단일 라우터
            path: "notice.do/insert",
            name: "noticeInsert",
            component: SecondNoticeDetail,
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
