<script type="text/javascript" src="https://live.zwidgets.com/js-sdk/1.1/ZohoEmbededAppSDK.min.js"></script>
<script src="https://js.pusher.com/7.0.3/pusher.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
<script src="https://live.zwidgets.com/js-sdk/1.1/ZohoEmbededAppSDK.min.js"></script>
<template>
  <div class="full_page">
    <!-- <div class="logo_container">
        <div class="logo" >
          <img src="https://seeklogo.com/images/T/tata-sky-broadband-logo-829A17636E-seeklogo.com.png" />
        </div>
      </div> -->
    {{ message }}
    <div class="header">
      <div class="logo_container">
        <img
          src="https://i.ibb.co/dP4yhwS/TP-Fiber-Horizontal-On-White-RGB-removebg-preview.png"
          height="90px"
        />
      </div>
      <div class="button_container">
        <a-button class="header_button" type="primary" @click="newlead">
          New Lead
        </a-button>
        <router-link class="button_center" to="/feasibility">
          <a-button class="header_button" type="primary">
            Check Feasibility
          </a-button>
        </router-link>
      </div>
    </div>
    <div class="search_container">
      <div style="margin: auto">
        <div>
          <h2 style="font-style: italic; color: #5d5d5d">
            "Your most unhappy customers are your greatest source of learning."
          </h2>
          <h2 style="text-align: end; color: #5d5d5d"><p>- Bill Gates</p></h2>
        </div>
        <img
          width="200px"
          src="https://th.bing.com/th/id/R.3d892946d2801ef245395c0f6d2dfbe2?rik=KlP%2f%2fS%2bl%2bsEmOg&riu=http%3a%2f%2fpurepng.com%2fpublic%2fuploads%2flarge%2fpurepng.com-white-paper-planpaper-planeaeroplanepaper-gliderpaper-dartaircraftfolded-paperpaperboardclipart-1421526588182ggsx5.png&ehk=KstF2Q1H7hrF6hvyl%2fZFk9VYEdTaWO6%2fDbBjJUCcEIE%3d&risl=&pid=ImgRaw&r=0"
        />
        <div>
          <h1 style="font-weight: 700; margin-top: 50px" class="titlehome">
            Welcome to Tata Play Fiber Support
          </h1>
        </div>
        <a-input-search
          placeholder="Search by RMN/CID"
          style="width: 80%"
          @value="
            {
              searchString;
            }
          "
          enter-button
          @search="onSearch"
        />
      </div>
          <!-- defaultValue="C2102939095" -->
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    var getThis = this;
    // var pusher = new Pusher("f438a49675321ff52b60", {
    //   cluster: "ap2",
    // });
    // var channel = pusher.subscribe("deft-summer-780");
    // channel.bind("my-event", (data) => {
    //   console.log(data);
    //   this.customerID = data;
    //   // getThis.searchProp = data;
    //   // this.updateProp(data);
    //   // app.message = app.message+data.email+"<-"+data.phone+"("+data.event+")";
    // });

    // console.log("searchclient prop : ", this.customerIDprop)
    // this.customerID = this.customerIDprop;
    this.onLoadFunction();
  },
  props: ["customerIDprop"],
  data() {
    return {
      message: "",
      customerID: "",
    };
  },
  methods: {
    onLoadFunction() {
      ZOHO.embeddedApp.init().then(() => {
        console.log("entered onload zoho init fn");
      });
    },
    newlead(obj) {
      console.log("Button Click");
      ZOHO.CRM.UI.Record.create({ Entity: "Leads" }).then(function (data) {
        console.log(data);
      });
    },
    onSearch(value) {
      //this.$router.push({ path: 'home' })
      var req_data = {
        CustomerID: value,
      };
      // console.log(this.searchString);
      ZOHO.CRM.FUNCTIONS.execute("HobsGetCustomer", req_data).then((data) => {
        // console.log(data);
        if (data.code == "success") {
          if (data.details.output != "error") {
            var custID = data.details.output;
            console.log(custID);
            this.$router.push({
              path: `/customer/${custID}`,
              // name: "customer",
              // params: { searchProp: custID },
            });
          } else {
            this.$message.error({
              content: "Invaild Value passed",
              bottom: "100px",
            });
          }
        } else {
          this.$message.error({
            content: "Invaild Value passed",
            bottom: "100px",
          });
        }
      });
    },
  },
};
</script>



<style>
.logo_container {
  margin: auto;
  margin-left: 20px;
}
.button_container {
  text-align: end;
  width: 100%;
  margin: auto;
}
.button_center {
  margin-top: auto;
  margin-bottom: auto;
}
.full_page {
  height: 100vh;
  background-image: url(https://images.unsplash.com/photo-1604147706283-d7119b5b822c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80);
}
.search_container {
  text-align: center;
  height: calc(82vh - 66px);
  width: 100vw;
  display: flex;
  margin: auto;
  flex-direction: column;
}
.header {
  display: flex;
}

.header_fes {
  display: flex;
  flex-direction: row-reverse;
  height: 66px;
  background: #5087c712;
}
.header_button {
  /* background: linear-gradient(90deg, rgb(223, 0, 147) 0%, 33.6872%, rgb(154, 0, 192) 61.3588%, 76.0085%, rgb(110, 0, 219) 100%) 0 100% no-repeat !important; */
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 10px;
  color: white;
  border-color: #e1e1e1 !important;
}
.search_container .ant-input {
  height: 55px;
  border-radius: 100px;
  padding: 7px 27px;
  font-size: 18px;
}
.search_container .ant-btn {
  border-radius: 0px 100px 100px 0px;
  height: 54px;
  width: 75px;
}
.header {
  height: 66px;
  background: #5087c712;
}
.titlehome {
  background: linear-gradient(
    90deg,
    rgb(223, 0, 147) 0%,
    33.6872%,
    rgb(154, 0, 192) 61.3588%,
    76.0085%,
    rgb(110, 0, 219) 100%
  );
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.anticon {
  font-size: 24px;
}
.image_logo {
  margin: auto;
  /* padding: 20px; */
}
</style>