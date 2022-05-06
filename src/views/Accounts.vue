<script type="text/javascript" src="https://live.zwidgets.com/js-sdk/1.1/ZohoEmbededAppSDK.min.js"></script>

<template>
  <a-row :gutter="16" class="Account-row1">
    <!-- Account Info section -->
    <a-col :span="24">
      <a-card title="Account Information">
        <a slot="extra" @click="showEditGSTDrawer"
            ><a-icon type="edit" :style="{ fontSize: '20px',marginRight : '25px'}" />
          </a>
        <a
          slot="extra"
          @click="refreshAcctInfo"
          :style="{ marginRight: '20px', color: 'white' }"
          ><a-icon type="retweet" :style="{ fontSize: '20px' }" />
        </a>

        <a-row>
          <a-col :span="6">
            <label class="zw-field-title">If Safe custody Active</label>
            <div>{{ this.safeCustody }}</div>
          </a-col>
          <a-col :span="6">
            <label class="zw-field-title">GSTIN if available</label>
            <div>{{ this.gstIN }}</div>
          </a-col>
          <!-- <a-col :span="6">
            <label class="zw-field-title"
              >Annexure , in case of LDP plans</label
            >
            <div>NA</div>
          </a-col> -->
          <a-col :span="6">
            <label class="zw-field-title">Additional validity</label>
            <div>NA</div>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="6">
            <label class="zw-field-title">Last recharge status</label>
            <div>{{ this.lastRechargeStatus }}</div>
          </a-col>
          <a-col :span="6">
            <label class="zw-field-title"
              >Last recharge status - failure reason</label
            >
            <div>{{ this.lastRechargeFailure }}</div>
          </a-col>
          <!-- <a-col :span="6">
            <label class="zw-field-title">Payment Mode</label>
            <div>NA</div>
          </a-col> -->
          <a-col :span="6">
            <label class="zw-field-title">Relocation Order Status</label>
            <div>{{ this.relocationStatus }}</div>
          </a-col>
        </a-row>
      </a-card>
    </a-col>
    <!-- Bill/Invoice panel -->
    <a-col class="separate-col" :span="24">
      <a-collapse
        default-active-key="1"
        :expand-icon-position="expandIconPosition"
      >
        <a-collapse-panel key="1" header="Invoice"
          ><a
            slot="extra"
            @click="showEditCustDrawer"
            :style="{ marginRight: '20px', color: 'white' }"
            ><a-button type="primary"> Choose Date </a-button>
          </a>
          <a-row :style="{ paddingTop: '0px', fontWeight: 'Bold' }">
            <a-col :span="2"></a-col>
            <a-col :span="6"> Invoice Number </a-col>
            <a-col :span="4"> Payment Date </a-col>
            <a-col :span="5"> Product </a-col>
            <a-col :span="3"> Transaction Amount </a-col>
            <a-col :span="4"> Type of Payment </a-col>
          </a-row>

          <!-- <a-row
            :style="{
              textAlign: 'center',
              paddingTop: '0px',
              fontWeight: 'Bold',
            }"
          >
            <a-col> No Bills found </a-col>
          </a-row> -->

          <a-row v-for="item in this.billsList" :key="item.documentNumber[0]">
            <a-col :span="2">
                  <!-- <img src="https://cdn-icons.flaticon.com/png/512/2374/premium/2374449.png?token=exp=1651744280~hmac=f965f19ccb9db154f0b4b660a7653740"> -->
            </a-col>
            <a-col :span="6">
               <mail-outlined> </mail-outlined>
              {{ item.documentNumber[0] }}
            </a-col>
            <a-col :span="4">
              {{ item.paymentDate[0] }}
            </a-col>
            <a-col :span="5">
              {{ item.paymentMode[0] }}
            </a-col>
            <a-col :span="3">
              {{ item.transactionAmount[0] }}
            </a-col>
            <a-col :span="4">
              {{ item.typeOfPayment[0] }}
            </a-col>
          </a-row>
        </a-collapse-panel>
      </a-collapse>
    </a-col>
    <!-- Annexures -->
    <a-col class="separate-col" :span="24">
      <a-collapse
        default-active-key="1"
        :expand-icon-position="expandIconPosition"
      >
        <a-collapse-panel key="1" header="Annexures">
          <a-row :style="{ paddingTop: '0px', fontWeight: 'Bold' }">
            <a-col :span="4"> Annexure Date </a-col>
            <a-col :span="4"> CPH ID </a-col>
            <a-col :span="8"> Plan Name </a-col>
            <a-col :span="4"> Annexure </a-col>
          </a-row>
          <!-- <a-row :style="{ paddingTop: '0px', fontWeight: 'Bold' }">
            <a-col :span="5"> Annexure, incase of LDP Plans </a-col>
          </a-row> -->

          <a-row v-for="item in annexList" :key="item['cphId'][0]">
            <a-col :span="4">
              {{ item["annexureDate"][0] }}
            </a-col>
            <a-col :span="4">
              {{ item["cphId"][0] }}
            </a-col>
            <a-col :span="8">
              {{ item["planName"][0] }}
            </a-col>
            <a-col :span="4">
              <a-icon type="download" />
            </a-col>
          </a-row>
        </a-collapse-panel>
      </a-collapse>
    </a-col>
    <!-- Transaction History panel -->
    <a-col class="separate-col" :span="24">
      <a-collapse
        default-active-key="1"
        :expand-icon-position="expandIconPosition"
      >
        <a-collapse-panel key="1" header="Transaction History">
          <a-row :style="{ paddingTop: '0px', fontWeight: 'Bold' }">
            <a-col :span="3"> Payment ID </a-col>
            <a-col :span="3"> Payment Status </a-col>
            <a-col :span="4"> Payment Date </a-col>
            <a-col :span="3"> Payment Amount </a-col>
            <a-col :span="3"> Payment Source</a-col>
            <a-col :span="3"> Payment Method </a-col>
            <a-col :span="3"> Description </a-col>
          </a-row>
          <a-row v-for="paymItem in this.paymentList" :key="paymItem.paymentId">
            <a-col :span="3"> {{ paymItem.paymentId }} </a-col>
            <a-col :span="3"> {{ paymItem.paymentStatus }} </a-col>
            <a-col :span="4">
              {{
                new Date(paymItem.paymentDate).toDateString().substring(4, 16) +
                " " +
                new Date(paymItem.paymentDate).toLocaleTimeString()
              }}
            </a-col>
            <a-col :span="3"> {{ paymItem.paymentAmount }} </a-col>
            <a-col :span="3"> {{ paymItem.paymentSource }} </a-col>
            <a-col :span="3"> {{ paymItem.paymentMethod }} </a-col>
            <a-col :span="3"> {{ paymItem.paymentDescription }} </a-col>
          </a-row>
        </a-collapse-panel>
      </a-collapse>
    </a-col>
    <a-drawer
      title="Invoice Period"
      placement="right"
      :width="500"
      :visible="custEditVisible"
      @close="closeEditCustDrawer"
    >
      <a-form-model
        :model="form"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="From Date">
          <a-date-picker
            v-model="form.date1"
            type="date"
            placeholder="Choose 'From' date"
            style="width: 100%"
            valueFormat="DD-MMM-YYYY"
          />
        </a-form-model-item>
        <a-form-model-item label="To Date">
          <a-date-picker
            v-model="form.date2"
            type="date"
            placeholder="Choose 'To' date"
            style="width: 100%"
            valueFormat="DD-MMM-YYYY"
          />
        </a-form-model-item>
      </a-form-model>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit"> Submit </a-button>
        <a-button style="margin-left: 10px"> Cancel </a-button>
      </a-form-model-item>
    </a-drawer>
    <!--Drawer Screen For Edit GST-->
    <div>
        <a-drawer
      title="Edit GST Details"
      placement="right"
      :width="500"
      :visible="EditGSTVisible"
      @close="closeEditGSTDrawer"
    >
      <a-form-model
        :model="editForm"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="Edit GST">
          <a-input v-model="editForm.gst" />
        </a-form-model-item>
      </a-form-model>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button @click="successMsg" type="primary"> Submit </a-button>
        <a-button @click="closeEditGSTDrawer" style="margin-left: 10px">
          Cancel
        </a-button>
      </a-form-model-item>
    </a-drawer>
    </div>
    <!--Edit Drawer Screen End-->
  </a-row>
</template>

<script>
import { parseString } from "xml2js";

export default {
  mounted() {
    this.customerIDprop = this.$route.params.customerID;
    if (this.customerIDprop) {
      console.log("onload Account prop", this.customerIDprop);
      this.onLoadFunction();
    }
    var pusher = new Pusher("f438a49675321ff52b60", {
      cluster: "ap2",
    });
    var channel = pusher.subscribe("deft-summer-780");
    channel.bind("my-event", (pusherData) => {
      // console.log(("pusherData : ", pusherData);

      var getPhone = pusherData;
      var getEmail = "hr@tataskybb.com";
      // var getPhone = pusherData.phone;
      // var getEmail = pusherData.email;
      if (getPhone != null || getPhone != undefined || getPhone != "") {
        var req_data = {
          CustomerID: getPhone,
        };
        ZOHO.CRM.CONFIG.getCurrentUser().then(function (data) {
          if (data.users.length > 0) {
            var getLoginUser = data.users[0].email;
            if (getLoginUser == getEmail) {
              ZOHO.CRM.FUNCTIONS.execute("HobsGetCustomer", req_data).then(
                (data) => {
                  // console.log(data);
                  if (data.code == "success") {
                    if (data.details.output != "error") {
                      var custID = data.details.output;
                      this.$router.push({
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
      form: this.$form.createForm(this),
      visible: false,
      expandIconPosition: "right",
      disabled: true,
      customerIDprop: "",
      subsID: "",
      safeCustody: "N",
      gstIN: "NA",
      billsList: [],
      annexList: [],
      transactionHeads: [
        "Payment Status",
        "Allocation Status",
        "Payment Method",
        "Payment Date",
        "Payment Amount",
        "Payment Accounted",
        "Channel",
        "Payment Rejection Reaon",
        "Payment Reversal",
      ],

      searchCID: "",
      searchSNo: "",
      acctID: "",
      deviceBand: "",
      paymentList: [],
      lastRechargeStatus: "NA",
      lastRechargeFailure: "NA",
      relocationStatus: "NA",

      custEditVisible: false,
      EditGSTVisible : false,
      editForm: {
        gst: "",
      },

      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        date1: "",
        date2: "",
      },
    };
  },
  methods: {
    onLoadFunction() {
      ZOHO.embeddedApp.init().then(() => {
        this.getSubscriberDetails();
        this.getCustomerInfo();
        this.getRechargeDetails();
      });
    },
    showEditCustDrawer() {
      this.custEditVisible = true;
    },
    closeEditCustDrawer() {
      this.custEditVisible = false;
    },
    showEditGSTDrawer() {
      this.EditGSTVisible = true;
    },
    closeEditGSTDrawer() {
      this.EditGSTVisible = false;
    },
    successMsg() {
      this.$message.success("Edit Customer Response Submitted");
      this.EditGSTVisible = false;
    },
    getSubscriberDetails() {
      var updateInfo = this;
      var getSubsFunc = "soap_api_test1";
      var req2_data = {
        arguments: JSON.stringify({
          custID: this.customerIDprop,
        }),
      };

      // get subscriber data api call
      ZOHO.CRM.FUNCTIONS.execute(getSubsFunc, req2_data).then(function (
        subsapidata
      ) {
        var subsXmlResp = subsapidata.details.output;
        // parsing xml data
        parseString(subsXmlResp, function (err1, subsresult) {
          var subsData = subsresult;
          console.log("subsData : ", subsData);
          let subsenvelopeData = subsData["soap:Envelope"]["soap:Body"][0];
          let getSubsDetails =
            subsenvelopeData["ns4:GetSubscriberDetailsResponseMessage"][0][
              "ns4:subscriber"
            ][0];
          updateInfo.subsID = getSubsDetails["ns6:subscriberID"][0];
          updateInfo.acctID = getSubsDetails["ns6:CustomerAccountID"][0];
          updateInfo.getAnnexures(updateInfo.subsID);
          updateInfo.getPaymentHistory();
          updateInfo.getAccountDetails(updateInfo.acctID);
          // updateInfo.getBillSummary();
          let getSubsProducts = getSubsDetails["ns6:SubscriberProducts"];
          console.log("getSubsProducts " , getSubsProducts);

          getSubsProducts.forEach((prods, indx) => {
            if (
              prods["ns8:productType"][0] == "Safe_Custody" ||
              prods["ns8:name"][0] == "Safe_Custody" || prods["ns8:name"][0] == "SAFE_CUSTODY"
            ) {
              updateInfo.safeCustody = "Y";
            } 
          });
        });
      });
    },
    getCustomerInfo() {
      var updateInfo = this;
      var getCustFunc = "soap_api_test";
      var req_data = {
        arguments: JSON.stringify({
          custID: this.customerIDprop,
        }),
      };
      // get customer data api call
      ZOHO.CRM.FUNCTIONS.execute(getCustFunc, req_data).then(function (
        apidata
      ) {
        if (apidata.code == "success") {
          var custXmlResp = apidata.details.output;
          // parsing xml data to json
          parseString(custXmlResp, function (err, results) {
            var custData = results;
            console.log("Customer Info : ", custData);

            let envelopeData = custData["soap:Envelope"]["soap:Body"][0];
            let getCustDetails =
              envelopeData["ns4:GetCustomerDetailsResponseMessage"][0][
                "ns4:customer"
              ][0];
            let getCustomCust =
              getCustDetails["ns6:CustomCustomer"][0]["ns3:attributes"];
            // console.log((getCustomCust);
            getCustomCust.forEach((custom, indx) => {
              let customValueExists =
                Object.keys(custom).includes("ns3:attributeValue");
              if (custom["ns3:attributeName"][0] == "gst"  &&
                customValueExists == true) {
                updateInfo.gstIN = custom["ns3:attributeValue"][0];
              }
            });
          });
        }
      });
    },
    getAccountDetails(account_id) {
      var updateInfo = this;
      var getAcctFunc = "ov_getaccountdetails";
      var acct_data = {
        arguments: JSON.stringify({
          acctID: account_id,
        }),
      };

      // get subscriber data api call
      ZOHO.CRM.FUNCTIONS.execute(getAcctFunc, acct_data).then(function (
        acctapidata
      ) {
        var acctXmlResp = acctapidata.details.output;
        // parsing xml data
        parseString(acctXmlResp, function (err1, acctresult) {
          var acctData = acctresult;
          console.log("acctData : ", acctData);
        });
      });
    },
    refreshAcctInfo() {},
    getRechargeDetails() {
      var updateInfo = this;
      var getRechargeFunc = "ov_getrechargedetails";
      var recharge_data = {
        arguments: JSON.stringify({
          custID: this.customerIDprop,
        }),
      };
      ZOHO.CRM.FUNCTIONS.execute(getRechargeFunc, recharge_data).then(function (
        rechargeApidata
      ) {
        if (rechargeApidata.code == "success") {
          let rechargeXmlResp = rechargeApidata.details.output;
          if (rechargeXmlResp != "" && rechargeXmlResp != undefined) {
            // updateCust.custStatus = servStatuXmlResp;
            var rechargeJson = JSON.parse(rechargeXmlResp);
            console.log("rechargeApidata : ", rechargeJson);
            updateInfo.lastRechargeStatus = rechargeJson.TransactionStatus;
          }
        }
      });
    },
    getPaymentHistory() {
      var updatePaym = this;
      var paymHistList = [];
      var paymMap = {};
      if (this.acctID != null) {
        var getPaymFunc = "ov_getpaymenthistory";
        var paym_data = {
          arguments: JSON.stringify({
            acctID: this.acctID,
          }),
        };
        // get customer data api call
        ZOHO.CRM.FUNCTIONS.execute(getPaymFunc, paym_data).then(function (
          paymapidata
        ) {
          if (paymapidata.code == "success") {
            var paymXmlResp = paymapidata.details.output;
            // parsing xml data to json
            parseString(paymXmlResp, function (err, results) {
              var paymData = results;
              console.log("Payment Info : ", paymData);
              let envelopeData =
                paymData["soap:Envelope"]["soap:Body"][0][
                  "ns4:QueryPaymentResponseMessage"
                ][0];

              if (envelopeData["ns4:PaymentRecordList"].length > 0) {
                let paymRecords =
                  envelopeData["ns4:PaymentRecordList"][0][
                    "ns4:AccountPaymentRecords"
                  ][0]["ns4:PaymentRecord"];
                paymRecords.forEach((eachPaym, indx) => {
                  if (indx < 5 && paymHistList.length < 5) {
                    //paymentStatus: eachPaym["ns5:status"][0] -- Existing Payment Status
                    var paymentStatusVar = eachPaym["ns5:CustomPayment"][0]["ns3:attributes"][0]["ns3:attributeValue"][0];
                    console.log("Status var", paymentStatusVar);
                    paymMap = {
                      paymentId: eachPaym["ns5:paymentId"][0],
                      paymentStatus:paymentStatusVar,
                      paymentDate: eachPaym["ns5:paymentDate"][0]
                        ? eachPaym["ns5:paymentDate"][0]
                        : "",
                      paymentAmount:
                        eachPaym["ns5:paymentAmount"][0].amount[0] +
                        " " +
                        eachPaym["ns5:paymentAmount"][0].currency[0],
                      paymentSource: eachPaym["ns5:paymentSource"][0],
                      paymentMethod:
                        eachPaym["ns5:PaymentItem"][0]["ns5:PaymentMethod"][0][
                          "ns5:name"
                        ][0],
                      paymentDescription: eachPaym["ns5:paymentDescription"][0],
                    };
                    paymHistList.push(paymMap);
                  }
                });
                updatePaym.paymentList = paymHistList;
              }

              // let getCustDetails =
              //   envelopeData["ns4:GetCustomerDetailsResponseMessage"][0][
              //     "ns4:customer"
              //   ][0];
            });
          }
        });
      }
    },
    getBillSummary() {
      var updateBills = this;
      var getBillSummary = "ov_viewbillsummary";
      var bill_data = {
        arguments: JSON.stringify({
          acctID: this.acctID,
          fromDate: this.form.date1,
          toDate: this.form.date2,
        }),
      };
      // get customer data api call
      ZOHO.CRM.FUNCTIONS.execute(getBillSummary, bill_data).then(function (
        billapidata
      ) {
       
        // console.log((bill_data);
        if (billapidata.code == "success") {
          var billXmlResp = billapidata.details.output;
          parseString(billXmlResp, function (err, results) {
             console.log("get bill summary function", results);
            var billData = results;
            updateBills.billsList =
              billData[
                "ns2:viewBillSummaryDetailsResponse"
              ].showBalanceSummaryVO;
          });
        }
      });
    },
    onSubmit() {
      this.getBillSummary();
      this.custEditVisible = false;
      console.log("submit button on choose date");
    },
    getAnnexures(subscriber_id) {
      var updateAnnex = this;
      // var paramsMap = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://telecom.tcs.com/tsbb/service"><soapenv:Header/><soapenv:Body><ser:GetChangePlanAnnexureListRequestMessage><serviceInstanceAccountNumber>S5100065068</serviceInstanceAccountNumber></ser:GetChangePlanAnnexureListRequestMessage></soapenv:Body></soapenv:Envelope>';
      // var headerMap = { "Content-type": "application/xml" };
      // var annexRequest = {
      //   url: "http://103.195.200.17/tsbb-mobile-services/services/TsbbMobileService",
      //   body: paramsMap,
      //   headers: headerMap,
      // };
      // ZOHO.CRM.HTTP.post(annexRequest)
      //   .then(function (annexData) {
      //     console.log("annex response : ", annexData);
      //   })
      if (subscriber_id != null) {
        console.log(subscriber_id);
        var annexFunc = "ov_getchangeplan";
        var annex_data = {
          arguments: JSON.stringify({
            subsID: subscriber_id,
          }),
        };
        // get customer data api call
        ZOHO.CRM.FUNCTIONS.execute(annexFunc, annex_data).then(function (
          annexapidata
        ) {
          if (annexapidata.code == "success") {
            var annexXmlResp = annexapidata.details.output;
            // console.log("annex XML Resp : ", annexXmlResp);
            // parsing xml data to json
            parseString(annexXmlResp, function (err, annexResults) {
              var annexData = annexResults;
              // console.log(("annex JSON Data : ", annexData);
              console.log("Anax");
              console.log(annexData);
              var getAnnexList =
                annexData["ns2:GetChangePlanAnnexureListResponseMessage"]
                  .changePlanAnnexureDataVO[0].cphPlanDetailsVO;
              updateAnnex.annexList = getAnnexList;
            });
          }
        });
      }
    },
  },
};
</script>

<style>
.Account-row1.ant-row {
  padding-top: 0px !important;
  background: #f0f2f5;
}
.ant-card-head {
  /* background: linear-gradient(
      90deg,
      rgb(223, 0, 147) 0%,
      33.6872%,
      rgb(154, 0, 192) 61.3588%,
      76.0085%,
      rgb(110, 0, 219) 100%
    )
    0 100% no-repeat !important; */
  background: #07385d;
  color: white;
}
.ant-row {
  padding-top: 16px;
}

label.zw-field-title {
  font-weight: 700;
}

.status {
  padding-bottom: 16px;
}
.ant-switch-loading,
.ant-switch-disabled {
  opacity: initial;
}

.ant-input-password .anticon {
  font-size: 16px;
}
.anticon-user {
  font-size: 16px;
}
.ant-form-vertical .ant-form-item {
  padding-bottom: 0px;
}
.ssid-drawer-row .ant-row {
  padding-top: 0px !important;
}
.separate-col {
  padding-top: 10px;
}
</style>