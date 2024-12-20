import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login/Login.vue";
import DashBoard from "../views/DashBoard/DashBoard.vue";
import Notice from "../views/Board/Notice.vue";
import Post from "../views/ManageHire/Post.vue";
import FirstNoticeDetail from "../components/page/Board/Notice/FirstNoticeDetail.vue";
import Applicant from "../views/Manage-user/Applicant.vue";
import Resume from "../views/Apply/Resume.vue";
import Faq from "../views/Board/Faq.vue";

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
          {
            path: "faq.do",
            name: "faq",
            component: Faq,
          }
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
          }
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
