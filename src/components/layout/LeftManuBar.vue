<template>
  <a href="">
    <img :src="logo" alt="happyjob" />
  </a>
  <div class="logo-box">
    <img :src="vue_logo" alt="logoImage" />
    <div class="user-info">
      <div>{{ userInfo.user.loginId }}</div>
      <button @click="handlerLogout">로그아웃</button>
    </div>
  </div>
  <ul>
    <li v-for="menu in userInfo.user.usrMnuAtrt" :key="menu.grp_num" class="parent-menu">
      {{ menu.mnu_nm }}
      <div class="child-menu-box" @click="handlerClick(menu.mnu_id, $event)" :id="menu.mnu_id">
        <template v-for="node in menu.nodeList" :key="node.mnu_id">
          <router-link :to="'/vue' + node.mnu_url" class="router-link">
            <div class="child-menu-link" :id="node.mnu_id" @click="handlerMenuLinkClick(node.mnu_id, $event)">
              {{ node.mnu_nm }}
            </div>
          </router-link>
        </template>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { useUserInfo } from "@/stores/userInfo";
import logo from "../../assets/logo.png";
import vue_logo from "../../assets/vue_logo.png";

const userInfo = useUserInfo();
const router = useRouter();

const handlerClick = (menuId, e) => {
  const childMenuId = document.getElementById(menuId);
  const childMenuClass = document.getElementsByClassName("child-menu-box");
  Array.from(childMenuClass).forEach((childMenu) => {
    childMenu.classList.remove("active");
  });

  if (e) {
    if (e.currentTarget.id === menuId) {
      childMenuId?.classList.toggle("active");
    } else {
      childMenuId?.classList.remove();
    }
  }
};

const handlerMenuLinkClick = (menuId, e) => {
  const childLinkId = document.getElementById(menuId);
  const childLinkClass = document.getElementsByClassName("child-menu-link");
  Array.from(childLinkClass).forEach((childLink) => {
    childLink.classList.remove("active-link");
  });

  if (e.currentTarget.id === menuId) {
    childLinkId?.classList.toggle("active-link");
  } else {
    childLinkId?.classList.remove();
  }
};

const handlerLogout = () => {
  sessionStorage.setItem("userInfo", "");
  router.push("/");
};
</script>

<style lang="scss" scoped>
a {
  cursor: pointer;
}

button {
  background-color: white;
  color: black;
  border: none;
  border-radius: 50px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition:
    background-color 0.3s,
    transform 0.2s;
}
button:hover {
  background-color: #ffffff;
  transform: translateY(-2px);
}
button:active {
  background-color: ivory;
  transform: translateY(0);
}

.logo-box {
  background: #2676bf;
  border-radius: 10px;

  img {
    top: 22px;
    left: 14px;
    width: 66px;
    height: 66px;
    padding: 10px;
  }

  .user-info {
    position: relative;
    right: 120px;
    top: 30px;
    float: right;
  }
}

ul {
  border-radius: 10px;
  background: skyblue;
  list-style-type: none;
  padding: 0;
}

.parent-menu {
  font-weight: bold;
  padding-top: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #d6effc;
  color: #602e2e;

  &:hover {
    transition: 1s;
    .child-menu-box {
      opacity: 1;
      display: block;
      height: 100%;
      margin-top: 30px;
    }
  }

  .child-menu-box {
    display: none;
    opacity: 0;
    transition:
      opacity 0.2s,
      visibility 0s;
    background: #2e9acc;
    height: 0;
    padding-left: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    margin: 0;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;

    div {
      margin: 10px 0 10px 0;
      &:hover {
        text-decoration: underline;
        color: white;
        cursor: pointer;
      }
    }
  }

  .active {
    opacity: 1;
    display: block;
    height: 100%;
    margin-top: 30px;
  }

  .active-link {
    text-decoration: underline;
    color: white;
  }

  img {
    padding-left: 10px;
    padding-right: 10px;
  }

  .router-link {
    color: #602e2e;
    text-decoration: none;

    visibility: visible;
    height: 100%;
    margin-top: 30px;
  }
}
</style>
