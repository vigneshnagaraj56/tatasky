<template>
  <a-layout id="components-layout-demo-responsive">
    <a-layout-sider breakpoint="lg" collapsed-width="0">
      <div class="logo_container" style="margin-left: 0px">
        <div class="logo_menu">
          <img
            height="70px"
            src="https://i.ibb.co/P4QqmPf/TP-Fiber-Master-On-White-RGB.jpg"
          />
        </div>
      </div>
      <a-menu
        theme="light"
        mode="inline"
        :default-selected-keys="['Home']"
        @click="handleClick"
      >
        <a-menu-item key="Home">
          <!-- <router-link to="/Home"> -->
          <a-icon type="user" />
          <span class="nav-text">Home</span>
          <!-- </router-link> -->
        </a-menu-item>
        <a-menu-item key="Account">
          <!-- <router-link to="/about"> -->
          <a-icon type="video-camera" />
          <span class="nav-text">Account</span>
          <!-- </router-link> -->
        </a-menu-item>
        <a-menu-item key="Network">
          <!-- <router-link to="/network"> -->
          <a-icon type="upload" />
          <span class="nav-text">Network</span>
          <!-- </router-link> -->
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header :style="{ background: '#fff' }">
        <router-link class="button_center" to="/feasibility">
          <a-button class="header_button" type="primary">
            Check Feasibility
          </a-button>
        </router-link>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px 0' }">
        <div :style="{ background: '#fff', minHeight: '360px' }">
          <CustomerDetails
            v-if="submenu === 'Home'"
          ></CustomerDetails> 
<!-- Initially, this is provided as a attribute to pass CustID as props v-bind:customerIDprop="searchProp". Later it is removed -->
          <NetworkInfo
            v-else-if="submenu === 'Network'"
          ></NetworkInfo>

          <AccountsInfo
            v-else-if="submenu === 'Account'"
          >
          </AccountsInfo>

          <!-- <a-empty
            v-else-if="submenu === 'Account'"
            image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
            :image-style="{
              height: '100%',
            }"
            description = "Yet to be constructed"
          >
          </a-empty> -->
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import CustomerDetails from "./Customer_Details.vue";
import NetworkInfo from "./Network_Info.vue";
import AccountsInfo from "./Accounts.vue";

export default {
  mounted() {
    console.log("searchprop", this.searchProp);
  },
  components: {
    CustomerDetails,
    NetworkInfo,
    AccountsInfo,
  },
  props: ["searchProp"],
  data() {
    return {
      customerSendID: "",
      submenu: "Home",
    };
  },
  methods: {
    changeSubMenu(value) {
      console.log(value);
    },
    handleClick(e) {
      this.submenu = e.key;
      console.log(e.key);
    },
  },
};
</script>
<style >
.logo_menu {
  height: 86px;
  margin: 0px;
  text-align: center;
  padding-top: 10px;
}

.ant-layout-header {
  background: #5087c712 !important;
}
</style>