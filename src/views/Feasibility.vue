<script type="text/javascript" src="https://live.zwidgets.com/js-sdk/1.1/ZohoEmbededAppSDK.min.js"></script>
<script src="ZSDK.js"></script>
<script src="ZohoCrmHelper.js"></script>

<template>
  <div class="full_page">
    <div class="header_fes">
      <a-button class="header_button" type="primary"> New Lead </a-button>
    </div>
    <div class="search_container">
      <div style="margin: auto">
        <img
          class="image_logo"
          src="https://i.ibb.co/dP4yhwS/TP-Fiber-Horizontal-On-White-RGB-removebg-preview.png"
          height="200px"
        />
        <div class="global-search-wrapper" style="width: 300px">
          <a-auto-complete
            class="global-search"
            size="large"
            style="width: 100%"
            placeholder="Search by City / Locality / Society / Pincode"
            option-label-prop="title"
            @select="onSelect"
            @search="handleSearch"
          >
            <template slot="dataSource">
              <a-select-option
                v-for="item in dataSource"
                :key="item.id"
                :title="
                  item.City + ' / ' + item.Locality + ' / ' + item.Society + ' / ' + item.Pincode
                "
              >
                {{ item.City + " / " + item.Locality + " / " + item.Society  + ' / ' + item.Pincode}}
              </a-select-option>
            </template>
          </a-auto-complete>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.onLoadFunction();
  },
  data() {
    return {
      dataSource: [],
    };
  },

  methods: {
    onLoadFunction() {
      ZOHO.embeddedApp.init().then(() => {
        console.log("entered onload zoho init fn");
      });
    },
    newlead(obj)
    {
      console.log("Button Click")
      ZOHO.CRM.UI.Record.create({Entity:"Leads"})
      .then(function(data){
          console.log(data)
      })
    },
    onSelect(value) {
      console.log("onSelect function", value);
       this.$message.success('Congratulations! Selected location is feasible');
    },

    handleSearch(value) {
      console.log("Search handler "+value)
      var updateDatasrc = this;

      if (value) {
        
      ZOHO.CRM.API.searchRecord({Entity:"GIS",Type:"criteria",Query:"((City:starts_with:"+value+")or(Locality:starts_with:"+value+")or(Society:starts_with:"+value+")or(Pincode:starts_with:"+value+"))"})
      .then(function(SearchResponse){
        
         updateDatasrc.dataSource = SearchResponse.data;
      })
        // var config = {
        //   "select_query":
        //     "select Name, City from GIS where City = '" + value + "'",
        // };
        // ZOHO.CRM.API.coql(config).then(function (respdata) {
        //   console.log(respdata);
        // });
        // var searchQuery = {
        //   Entity: "GIS",
        //   // Type: "criteria",
        //   // Query: "(Name:equals:" + value + ")",
        // };
        ZOHO.CRM.API.getAllRecords(searchQuery).then(function (respdata) {
          if (respdata.data) {
            updateDatasrc.dataSource = respdata.data;
          } else {
            updateDatasrc.dataSource = [];
          }
        });
      } else {
        updateDatasrc.dataSource = [];
      }
    },

    searchResult(query) {
      return new Array(this.getRandomInt(5))
        .join(".")
        .split(".")
        .map((item, idx) => ({
          query,
          category: `${query}${idx}`,
          count: this.getRandomInt(200, 100),
        }));
    },
    onSearch(value) {
      console.log("onsearch function");
      var req_data = {
        CustomerID: value,
      };
      console.log(value);
      ZOHO.embeddedApp.init().then(() => {
        console.log("Zoho SDK INTIT Done");
        console.log(this.searchString);
        ZOHO.CRM.FUNCTIONS.execute("HobsGetCustomer", req_data).then((data) => {
          console.log(data);
          if (data.code == "success") {
            if (data.details.output != "error") {
            } else {
              this.$notification.open({
                message: `Notification Right`,
                description: "Invalid Data",
              });
            }
          } else {
            this.$notification.open({
              message: `Notification Right`,
              description: "Invalid Data",
            });
          }
        });
      });
    },
  },
};
</script>

<style>
.ant-select-auto-complete.ant-select-lg .ant-input , .global-search{
    height: 75px;
        border-radius: 100px;
}

.ant-select-auto-complete.ant-select .ant-select-selection--single {
   height: 74px;
       border-radius: 100px;
}
.global-search , .global-search-wrapper
{
  width:600px !important;
}
</style>