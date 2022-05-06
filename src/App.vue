<template>
  <router-view v-bind:customerIDprop="this.searchProp"></router-view>
</template>
<script src="https://js.pusher.com/7.0.3/pusher.min.js"></script>
<script>
export default {
  mounted() {
    var updateData = this;
    ZOHO.embeddedApp.init().then(() => {
      // ZOHO.CRM.API.getOrgVariable("Environment_Live").then(function (envData) {
      //   console.log(envData.Success.Content)
      //   var environment_live = envData.Success.Content;

      //   ZOHO.CRM.API.getOrgVariable("Oneview_URLs").then(function (url_data) {
      //     var fetch_urls = url_data.Success.Content;
      //     console.log(fetch_urls)
      //   });
      // });
    });

    var updateThis = this;
    var pusher = new Pusher("f438a49675321ff52b60", {
      cluster: "ap2",
    });
    var channel = pusher.subscribe("deft-summer-780");
    channel.bind("my-event", (pusherData) => {
      console.log("pusherData : ", pusherData);

      // var getPhone = pusherData;
      // var getEmail = "hr@tataskybb.com";
      var getPhone = pusherData.phone;
      var getEmail = pusherData.email;
      if (getPhone != null || getPhone != undefined || getPhone != "") {
        var req_data = {
          CustomerID: getPhone,
        };
        ZOHO.CRM.CONFIG.getCurrentUser().then(function (userdata) {
          if (userdata.users.length > 0) {
            var getLoginUser = userdata.users[0].email;
            if (getLoginUser == getEmail) {
              ZOHO.CRM.FUNCTIONS.execute("HobsGetCustomer", req_data).then(
                (hobsData) => {
                  console.log(hobsData);
                  if (hobsData.code == "success") {
                    if (hobsData.details.output != "error") {
                      var custID = hobsData.details.output;
                      updateThis.$router.push({
                        path: `/customer/${custID}`,
                      });
                    }
                  }
                }
              );
            }
          }
        });
      }
    });
  },
  data() {
    return {
      searchProp: "",
      environment: "",
      url_data: {},
    };
  },
  methods: {
    onCollapse(collapsed, type) {
      console.log(collapsed, type);
    },
    onBreakpoint(broken) {
      console.log(broken);
    },
    updateProp(value) {
      console.log("update prop fn called : ", value);
      this.searchProp = value;
      console.log(this.searchProp);
      this.$router.push({
        path: `/customer/${value}`,
      });
    },
  },
};
</script>

<style>
#components-layout-demo-responsive .logo {
  height: 32px;

  margin: 16px;
}
.logo_container {
  background: rgba(255, 255, 255, 0.2);
}
#components-layout-demo-responsive .ant-layout-sider {
  background: rgb(255, 255, 255);
}
.ant-layout-header {
  text-align: end;
  padding-left: unset !important;
}
.ant-layout {
  height: 100vh;
}
.tata_button {
  /* background: linear-gradient(90deg, rgb(223, 0, 147) 0%, 33.6872%, rgb(154, 0, 192) 61.3588%, 76.0085%, rgb(110, 0, 219) 100%) 0 100% no-repeat !important; */
  background: #07385d;
  color: white !important;
}
</style>