<script type="text/javascript" src="https://live.zwidgets.com/js-sdk/1.1/ZohoEmbededAppSDK.min.js"></script>

<template>
  <a-row :gutter="16" class="Network-row1">
    <!-- Device status section -->
    <a-col :span="24">
      <!--Router Image 1 -->
      <a-card title="Device Status">
        <!-- <a slot="extra" :style="{ marginRight: '10px' }">
          <img
            width="40px"
            src="https://img.icons8.com/external-tulpahn-detailed-outline-tulpahn/64/000000/external-wifi-router-work-from-home-tulpahn-detailed-outline-tulpahn.png"
          />
        </a>
        <a slot="extra" href="#" :style="{ color: 'black' }">
          <a-icon type="reload" />
        </a> -->
        <a
          slot="extra"
          @click="rebootDevice"
          :style="{ marginRight: '20px', color: 'white' }"
          ><a-button type="primary"> Reboot Device </a-button>
        </a>

        <!-- <a-icon type="retweet" :style="{ fontSize: '20px' }" /> -->
        <a-spin :spinning="deviceStatusSpinning">
          <div>
            <a-row>
              <a-col :span="4">
                <label class="zw-field-title">Broadband</label><br />
                <div>
                  <a-switch
                    :checked="this.deviceStatus.wifiChecked"
                    :disabled="disabled"
                    checked-children="On"
                    un-checked-children="Off"
                    style="margin-top: 5px"
                  />
                </div>
              </a-col>
              <a-col :span="6">
                <label class="zw-field-title">Serial Number</label>
                <div>{{ this.deviceStatus.serialNo }}</div>
              </a-col>
              <a-col :span="6">
                <label class="zw-field-title">Device Type</label>
                <div>{{ this.deviceStatus.deviceType }}</div>
              </a-col>
              <a-col :span="6">
                <label class="zw-field-title">Last Connected</label>
                <div>{{ this.deviceStatus.lastConTime }}</div>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="4">
                <label class="zw-field-title">Landline</label>
                <div>
                  <a-switch
                    :checked="this.deviceStatus.voipChecked"
                    :disabled="disabled"
                    checked-children="On"
                    un-checked-children="Off"
                    style="margin-top: 5px"
                  />
                  <br />
                </div>
              </a-col>
              <a-col :span="6">
                <label class="zw-field-title">Device Name</label>
                <div>{{ this.deviceStatus.deviceName }}</div>
              </a-col>
              <a-col :span="6">
                <label class="zw-field-title">Registered</label>
                <div>{{ this.deviceStatus.regisTime }}</div>
              </a-col>
              <a-col :span="6">
                <label class="zw-field-title">Uptime</label>
                <div>{{ this.deviceStatus.upTime }}</div>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="4">
                <label class="zw-field-title">Power Level</label>
                <div
                  v-bind:class="{ greenPower: isActive, redPower: hasError }"
                  v-if="this.ssidInfo.powerLevel">
                     {{renderPowerLevel(this.ssidInfo.powerLevel)}}
                </div>
              </a-col>
              <a-col :span="4">
                <label class="zw-field-title">Model Name</label>
                <div>
                  {{ this.deviceStatus.modelName }}
                </div>
              </a-col>
              <!-- <a-col :span="6">
            <label class="zw-field-title">Reboot Count for 24hrs</label>
            <div>NA</div>
          </a-col> -->
            </a-row>
          </div>
        </a-spin>
      </a-card>
    </a-col>
    <!-- 5Ghz panel -->
    <a-col :span="24">
      <a-collapse :expand-icon-position="expandIconPosition">
        <a-collapse-panel key="1" header="5 GHz">
          <a
            slot="extra"
            href="#"
            :style="{ fontSize: '25px', color: 'black' }"
          >
            <a-icon type="wifi" />
          </a>

          <!-- <a-row>
            <a-col :span="24" :style="{ textAlign: 'Center' }">
              No Devices found
            </a-col>
          </a-row> -->

          <a-row v-for="item in this.fiveGhzList" :key="item.hostIP">
            <a-col :span="2">
              <img
                width="30px"
                src="https://img.icons8.com/external-vitaliy-gorbachev-lineal-vitaly-gorbachev/60/000000/external-router-5g-vitaliy-gorbachev-lineal-vitaly-gorbachev-1.png"
              />
            </a-col>
            <!--Wifi Image above average-->
            <a-col :span="2">
              <img
                width="30px"
                src="https://img.icons8.com/external-those-icons-fill-those-icons/24/000000/external-wifi-mobile-telephone-those-icons-fill-those-icons-1.png"
            /></a-col>
            <!-- <a-col :span="2">
              <img width="30px" :src="getImgUrl(item.hostSS)" />
            </a-col> -->
            <a-col :span="4">
              <label class="zw-field-title"> {{ item.hostIP }} </label>
            </a-col>
            <a-col :span="10"> {{ item.hostName }} </a-col>
          </a-row>
        </a-collapse-panel>
      </a-collapse>
    </a-col>
    <!-- 2Ghz panel -->
    <a-col :span="24">
      <a-collapse :expand-icon-position="expandIconPosition">
        <a-collapse-panel key="1" header="2.4 GHz">
          <a
            slot="extra"
            href="#"
            :style="{ fontSize: '25px', color: 'black' }"
          >
            <a-icon type="wifi" />
          </a>
          <a-row v-for="item in this.twoGhzList" :key="item.hostIP">
            <a-col :span="2">
              <img
                width="30px"
                src="https://img.icons8.com/external-vitaliy-gorbachev-lineal-vitaly-gorbachev/60/000000/external-router-5g-vitaliy-gorbachev-lineal-vitaly-gorbachev-1.png"
              />
            </a-col>
            <!--Wifi Image -->
            <a-col :span="2">
              <img width="30px" :src="getImgUrl(item.hostSS)" />
              <!-- {{ item.hostSS }} -->
            </a-col>
            <a-col :span="4">
              <label class="zw-field-title"> {{ item.hostIP }} </label>
            </a-col>
            <a-col :span="10"> {{ item.hostName }} </a-col>
          </a-row>
        </a-collapse-panel>
      </a-collapse>
    </a-col>
    <!-- Settings panel -->
    <a-col :span="24">
      <a-collapse :expand-icon-position="expandIconPosition">
        <a-collapse-panel key="1" header="Settings">
          <!-- <a
            slot="extra"
            href="#"
            :style="{ fontSize: '25px', color: 'black' }"
          >
            <a-icon type="setting" />
          </a> -->
          <a slot="extra" @click="showDrawer"
            ><a-icon
              type="edit"
              :style="{ fontSize: '20px', color: 'black' }"
            />
          </a>

          <a-row>
            <a-col :span="8">
              <label class="zw-field-title">2.4 GHz SSID Name</label>
              <div>{{ this.ssidInfo.twoGhzSSIDname }}</div>
            </a-col>
            <a-col :span="8">
              <label class="zw-field-title">5 Ghz SSID Name</label>
              <div>{{ this.ssidInfo.fiveGhzSSIDname }}</div>
            </a-col>
            <!-- <a-col :span="8">
              <label class="zw-field-title">Router Password</label>
              <div>*************</div>
            </a-col> -->
          </a-row>

          <!-- <a-row>
            <a-col :span="8">
              <a-button type="primary"  > Reboot Device </a-button>
            </a-col>
            <a-col :span="6">
              <a-button type="primary" @click="showDrawer"> Change PPPOE Password </a-button>
            </a-col>
            
          </a-row> -->
        </a-collapse-panel>
      </a-collapse>
    </a-col>
    <!-- Other Info -->
    <!-- <a-col :span="24">
      <a-collapse :expand-icon-position="expandIconPosition">
        <a-collapse-panel header="Other Info">
          <a
            slot="extra"
            href="#"
            :style="{ fontSize: '25px', color: 'black' }"
          >
            <a-icon type="setting" />
          </a>

          <a-row>
            <a-col :span="6">
              <label class="zw-field-title">DHCP Enabled</label>
              <div>
                <a-icon
                  type="check-circle"
                  theme="twoTone"
                  two-tone-color="#52c41a"
                  style="margin-left: 30px"
                />
              </div>
              <div>
                <a-icon
                  type="close-circle"
                  theme="twoTone"
                  two-tone-color="Red"
                  style="margin-left: 30px"
                />
              </div>
            </a-col>
            <a-col :span="6">
              <label class="zw-field-title">DHCP Max Address</label>
              <div>192.168.1.254</div>
            </a-col>
            <a-col :span="6">
              <label class="zw-field-title">DHCP Min Address</label>
              <div>192.168.1.254</div>
            </a-col>
            <a-col :span="6">
              <label class="zw-field-title"
                >DHCP Lease Time (Days:Hours:Minutes)</label
              >
              <div>01.00.00</div>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="6">
              <label class="zw-field-title">Router IP Address</label>
              <div>192.168.1.254</div>
            </a-col>
            <a-col :span="6">
              <label class="zw-field-title">Router Subnet Mask</label>
              <div>255.255.255.0</div>
            </a-col>
            <a-col :span="6">
              <label class="zw-field-title">DNS Servers</label>
              <div></div>
            </a-col>
          </a-row>
        </a-collapse-panel>
      </a-collapse> 
    </a-col> -->
    <!-- Drawer screen -->
    <div>
      <a-drawer
        title="Edit SSID Info"
        :width="420"
        :visible="visible"
        :body-style="{ paddingBottom: '80px' }"
        @close="onClose"
      >
        <a-form :form="form" layout="vertical" hide-required-mark>
          <a-row :gutter="16" class="ssid-drawer-row">
            <!-- Update Name/Password -->
            <a-col :span="24">
              <a-form-item label="Update Name/Password">
                <a-radio-group
                  name="radioGroup"
                  :value="ssidInfo.defaultParam"
                  @change="updateSSIDparam(ssidInfo.defaultParam)"
                >
                  <a-radio value="Name"> SSID Name </a-radio>
                  <a-radio value="Password"> SSID Password </a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <!-- Select Band -->
            <a-col :span="24" v-if="this.deviceBand === 'Dual'">
              <a-form-item label="Select Band">
                <a-radio-group
                  name="radioGroup"
                  :default-value="ssidInfo.defaultBandParam"
                  @change="updateBandparam(ssidInfo.defaultBandParam)"
                >
                  <a-radio value="two"> 2.4Ghz </a-radio>
                  <a-radio value="five"> 5Ghz </a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <!-- Enter name -->
            <a-col :span="24">
              <a-form-item label="SSID Name" :hidden="ssidInfo.hideName">
                <a-input
                  required
                  placeholder="Please enter user name"
                  v-model="ssidInfo.enteredName"
                >
                  <a-icon slot="suffix" type="user" />
                </a-input>
              </a-form-item>
            </a-col>
            <!-- Re enter name  -->
            <a-col :span="24">
              <a-form-item
                label="Re-enter SSID Name"
                :hidden="ssidInfo.hideRename"
              >
                <a-input
                  required
                  placeholder="Please enter user name"
                  v-model="ssidInfo.reenteredName"
                  @change="reEnterNameChange"
                >
                  <a-icon slot="suffix" type="user" />
                </a-input>
              </a-form-item>
            </a-col>
            <!-- Enter password  -->
            <a-col :span="24">
              <a-form-item
                label="Enter SSID Password"
                :hidden="ssidInfo.hidePwd"
              >
                <a-input-password
                  required
                  placeholder="input ssid password"
                  v-model="ssidInfo.enteredPwd"
                />
              </a-form-item>
            </a-col>
            <!-- Re enter password  -->
            <a-col :span="24">
              <a-form-item
                label="Re-enter SSID Password"
                :hidden="ssidInfo.hideRepwd"
              >
                <a-input-password
                  required
                  placeholder="input ssid password"
                  v-model="ssidInfo.reenteredPwd"
                  @change="reEnterPwdChange"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        <div
          :style="{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e9e9e9',
            padding: '10px 16px',
            background: '#fff',
            textAlign: 'right',
            zIndex: 1,
          }"
        >
          <a-button :style="{ marginRight: '8px' }" @click="onClose">
            Cancel
          </a-button>
          <a-button type="primary" @click="onSubmit"> Submit </a-button>
        </div>
      </a-drawer>
    </div>
  </a-row>
</template>

<script>
export default {
  mounted() {
    this.searchCID = this.$route.params.customerID;
    if (this.searchCID) {
      // console.log("onload N/w prop", this.customerIDprop);
      // this.searchCID = this.customerIDprop;
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
  props: ["customerIDprop"],
  data() {
    return {
      form: this.$form.createForm(this),
      visible: false,
      expandIconPosition: "right",
      disabled: true,
      isActive: false,
      hasError: false,
      searchCID: "",
      searchSNo: "",
      deviceBand: "",
      deviceStatusSpinning: false,
      deviceStatus: {
        serialNo: "NA",
        deviceName: "NA",
        modelName: "NA",
        deviceType: "NA",
        regisTime: "NA",
        lastConTime: "NA",
        upTime: "NA",
        wifiChecked: false,
        voipChecked: false,
      },
      fiveGhzList: [],
      temptwoGhzList: [],
      twoGhzList: [],
      transIDList: [],
      rebootTransIDList: [],
      twoGhzSSList: [],
      fiveGhzSSList: [],
      wifiRange: {
        range1: 0,
        range2: -50,
        range3: -67,
        range4: -80,
      },
      rangeValue: {
        range1: "Excellent",
        range2: "Good",
        range3: "Average",
        range4: "Bad",
      },
      wifiIcons: {
        range1:
          "https://img.icons8.com/external-those-icons-fill-those-icons/24/000000/external-wifi-mobile-telephone-those-icons-fill-those-icons.png",
        range2:
          "https://img.icons8.com/external-those-icons-fill-those-icons/24/000000/external-wifi-mobile-telephone-those-icons-fill-those-icons-1.png",
        range3:
          "https://img.icons8.com/external-those-icons-fill-those-icons/24/000000/external-wifi-mobile-telephone-those-icons-fill-those-icons-1.png",
        range4:
          "https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-wifi-mobile-telephone-those-icons-lineal-those-icons.png",
      },
      ssidInfo: {
        twoGhzSSIDname: "NA",
        fiveGhzSSIDname: "NA",
        enteredName: "",
        reenteredName: "",
        enteredPwd: "",
        reenteredPwd: "",
        defaultParam: "Name",
        defaultBandParam: "two",
        hideName: false,
        hideRename: false,
        hidePwd: true,
        hideRepwd: true,
        powerLevel: "NA",
      },
    };
  },
  methods: {
    reEnterNameChange(e) {
      var oldValue = this.ssidInfo.enteredName;
      var newValue = this.ssidInfo.reenteredName;
      if (!oldValue.includes(newValue) && !e.inputType.includes("delete")) {
        this.$message.error({
          content: "Re entered name mismatches",
          bottom: "100px",
        });
      }
    },
    reEnterPwdChange(e) {
      var oldValue = this.ssidInfo.enteredPwd;
      var newValue = this.ssidInfo.reenteredPwd;
      if (!oldValue.includes(newValue) && !e.inputType.includes("delete")) {
        this.$message.error({
          content: "Re entered password mismatches",
          bottom: "100px",
        });
      }
    },
    getImgUrl(range) {
      if (range == "Excellent") {
        return this.wifiIcons.range1;
      } else if (range == "Good") {
        return this.wifiIcons.range2;
      } else if (range == "Average") {
        return this.wifiIcons.range3;
      } else if (range == "Bad") {
        return this.wifiIcons.range4;
      } else if (range == "" || range == null || range == undefined) {
        return this.wifiIcons.range4;
      }
    },
    showDrawer() {
      this.visible = true;
      this.ssidInfo.enteredName = this.ssidInfo.twoGhzSSIDname;
    },
    onClose() {
      this.visible = false;
    },
    convertDecimal(inputVal)
      {
        console.log("Enter Convrt" , inputVal);
        // var numb= 212421434.533423131231;
        var rounded = Math.round((inputVal + Number.EPSILON) * 100) / 100;
//              var c = inputVal.splice(".");
// // // ["dasd", "rttewrtert"]
// var d = c.join('');
// // dasdrttewrtert
        // console.log(rounded);
        return rounded;
//    
        
      },
    onSubmit() {
      if (this.ssidInfo.defaultParam == "Name") {
        var value1 = this.ssidInfo.enteredName;
        var value2 = this.ssidInfo.reenteredName;
        if (value1 != value2) {
          this.$message.error({
            content: "Re entered name mismatches",
            bottom: "100px",
          });
        } else {
          // this.visible = false;
          this.updateSSIDInfo();
        }
      } else if (this.ssidInfo.defaultParam == "Password") {
        var value3 = this.ssidInfo.enteredPwd;
        var value4 = this.ssidInfo.reenteredPwd;
        if (value3 != value4) {
          this.$message.error({
            content: "Re entered password mismatches",
            bottom: "100px",
          });
        } else {
          // this.visible = false;
          this.updateSSIDInfo();
        }
      }
    },
    updateSSIDparam(changeValue) {
      if (changeValue == "Name") {
        this.ssidInfo.defaultParam = "Password";
        this.ssidInfo.hideName = !this.ssidInfo.hideName;
        this.ssidInfo.hideRename = !this.ssidInfo.hideRename;
        this.ssidInfo.hidePwd = !this.ssidInfo.hidePwd;
        this.ssidInfo.hideRepwd = !this.ssidInfo.hideRepwd;
      } else if (changeValue == "Password") {
        this.ssidInfo.defaultParam = "Name";
        this.ssidInfo.hideName = !this.ssidInfo.hideName;
        this.ssidInfo.hideRename = !this.ssidInfo.hideRename;
        this.ssidInfo.hidePwd = !this.ssidInfo.hidePwd;
        this.ssidInfo.hideRepwd = !this.ssidInfo.hideRepwd;
      }
    },
    updateBandparam(changeValue) {
      if (changeValue == "two") {
        this.ssidInfo.defaultBandParam = "five";
        this.ssidInfo.enteredName = this.ssidInfo.fiveGhzSSIDname;
      } else if (changeValue == "five") {
        this.ssidInfo.defaultBandParam = "two";
        this.ssidInfo.enteredName = this.ssidInfo.twoGhzSSIDname;
      }
    },
    changeSpinning(module) {
      if (module) {
        if (module == "deviceStatus") {
          this.deviceStatusSpinning = !this.deviceStatusSpinning;
        }
        //  else if (module == "plan") {
        //   this.planSpinning = !this.planSpinning;
        // } else if (module == "ticket") {
        //   this.ticketSpinning = !this.ticketSpinning;
        // }
      }
    },
    onLoadFunction() {
      // ----------- loading effect --------
      var statusSpinning = this;
      statusSpinning.changeSpinning("deviceStatus");
      setTimeout(function () {
        statusSpinning.changeSpinning("deviceStatus");
      }, 5000);
      // ---------------  1. Find device using customer id   --------------------
      var getFunc = this;
      var updateDeviceInfo = this.deviceStatus;
      var paramsMap = {
        UserInfo: { LoginName: getFunc.searchCID },
        Creator: "ZohoOneView",
        AppId: "RestAPI",
      };
      var headerMap = { "Content-type": "application/json" };
      var request = {
        url: "https://ftacs.tataskybroadband.com/FTACSWS_REST/api/Device/UserInfo",
        body: paramsMap,
        headers: headerMap,
      };
      ZOHO.CRM.HTTP.post(request)
        .then(function (data) {
          // console.log("find device using cid : ", data);
          var parseDevData = JSON.parse(data).Devices[0];
          updateDeviceInfo.serialNo = parseDevData.Sn;
          getFunc.searchSNo = parseDevData.Sn;
          getFunc.deviceStatus.modelName = parseDevData.ModelName;
          if (
            parseDevData.ModelName == "G-140W-C" ||
            parseDevData.ModelName == "G-140W-F" ||
            parseDevData.ModelName == "G-140W-G" ||
            parseDevData.ModelName == "G-2425G-A"
          ) {
            updateDeviceInfo.deviceName = "Nokia";
          } else {
            updateDeviceInfo.deviceName = "Genexis";
          }
          if (parseDevData.ModelName != "G-140W-G") {
            getFunc.deviceBand = "Dual";
          } else {
            getFunc.deviceBand = "Single";
          }
        })
        .then(() => {
          // ------------------- 2. get device status  -----------------------
          var deviceStatusParam = {
            Device: { Sn: getFunc.searchSNo },
            Creator: "ZohoOneView",
            AppId: "RestAPI",
          };
          var headerMap = { "Content-type": "application/json" };
          var deviceStatusRequest = {
            url: "https://ftacs.tataskybroadband.com/FTACSWS_REST/api/Device/Status",
            body: deviceStatusParam,
            headers: headerMap,
          };
          ZOHO.CRM.HTTP.post(deviceStatusRequest).then(function (
            deviceStatusData
          ) {
            // console.log("get device status : ", deviceStatusData);
            var parseDevStatus = JSON.parse(deviceStatusData);
            if (parseDevStatus.Online == true) {
              updateDeviceInfo.wifiChecked = true;

              //-------------- 3. Device Uptime, Internet Uptime and VoIP Status  ----------------------
              var deviceUptimeParam = {
                Device: {
                  Sn: getFunc.searchSNo,
                },
                ParameterNames: [
                  "InternetGatewayDevice.DeviceInfo.UpTime",
                  "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Uptime",
                  "InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.Line.1.Status",
                ],
                Source: 0,
                Names: true,
                Values: true,
                Attributes: true,
                Creator: "ZohoOneView",
                AppId: "RestAPI",
              };
              // call getDeviceParameters function to update 'Uptime' field data
              getFunc.getDeviceParameters("Uptime", deviceUptimeParam);
            }
          });

          // ------------------- 4. request device information  -----------------------------
          var deviceInfoParam = {
            Device: { Sn: getFunc.searchSNo },
            Creator: "ZohoOneView",
            AppId: "RestAPI",
          };
          var headerMap = { "Content-type": "application/json" };
          var deviceInfoRequest = {
            url: "https://ftacs.tataskybroadband.com/FTACSWS_REST/api/Device/Info",
            body: deviceInfoParam,
            headers: headerMap,
          };
          ZOHO.CRM.HTTP.post(deviceInfoRequest).then(function (deviceInfoData) {
            var parseDevInfo = JSON.parse(deviceInfoData);
            // console.log("request device information : ", deviceInfoData);
            if (parseDevInfo.ModelName == "G-140W-G") {
              updateDeviceInfo.deviceType = "Single Band";
            } else {
              updateDeviceInfo.deviceType = "Dual Band";
            }
            updateDeviceInfo.regisTime = parseDevInfo.Created;
            updateDeviceInfo.lastConTime = parseDevInfo.Updated;
          });

          // -------------------- 5. fetch all connected devices  ---------------------------
          var connDeviceParam = {
            Device: {
              Sn: this.searchSNo, //Device serial number
            },
            ParameterNames: ["InternetGatewayDevice.LANDevice.1.Hosts.Host."],
            Names: true,
            Values: true,
            Attributes: true,
            Creator: "ZohoOneView",
            AppId: "RestAPI",
          };
          this.getDeviceParameters("ConnectedDevices", connDeviceParam);

          // --------------------- 6. fetch signal strength   -------------------------------------
          var devSignalStn = {
            Device: {
              Sn: getFunc.searchSNo,
            },
            ParameterNames: [
              "InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.AssociatedDevice.",
            ],
            Names: true,
            Values: true,
            Attributes: true,
            Creator: "ZohoOneView",
            AppId: "RestAPI",
          };
          getFunc.getSignalStrength(devSignalStn);

          // -------------------- 7. Fetch SSID Info  --------------------------------------
          getFunc.getSSIDInfo();

          // -------------------- 8. Fetch optical power data  -----------------------------
          getFunc.getOpticalPower();
        });
    },
    // this is a common function used to receive response for different parameters.
    // using paramSection, for different parameters, data is fetched and updated.
    getDeviceParameters(paramSection, deviceParams) {
      var updateDeviceParams = this;
      var headerMap = { "Content-type": "application/json" };
      var deviceParamsRequest = {
        url: "https://ftacs.tataskybroadband.com/FTACSWS_REST/api/Parameter",
        body: deviceParams,
        headers: headerMap,
      };
      ZOHO.CRM.HTTP.post(deviceParamsRequest).then(function (deviceParamsData) {
        var jsonParseResp = JSON.parse(deviceParamsData);
        // console.log(("deviceParamsData : ", deviceParamsData);
        if (jsonParseResp.ErrorCode == 100) {
          if (paramSection == "Uptime") {
            // console.log("Device Uptime, Internet Uptime and VoIP Status");
            // console.log(deviceParamsData);
            let parseDeviceParams = jsonParseResp.Parameters;
            parseDeviceParams.forEach((dparams, indx) => {
              if (dparams.Name == "InternetGatewayDevice.DeviceInfo.UpTime") {
                var seconds = Number(dparams.Value);
                var d = Math.floor(seconds / (3600 * 24));
                var h = Math.floor((seconds % (3600 * 24)) / 3600);
                var m = Math.floor((seconds % 3600) / 60);
                var s = Math.floor(seconds % 60);

                var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
                var hDisplay =
                  h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
                var mDisplay =
                  m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
                var sDisplay =
                  s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
                var deviceUptimeValue =
                  dDisplay + hDisplay + mDisplay + sDisplay;
                updateDeviceParams.deviceStatus.upTime = deviceUptimeValue;
              } else if (
                dparams.Name ==
                "InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.Line.1.Status"
              ) {
                if (dparams.Value == "Up") {
                  updateDeviceParams.deviceStatus.voipChecked = true;
                } else {
                  updateDeviceParams.deviceStatus.voipChecked = false;
                }
              }
            });
          } else if (paramSection == "ConnectedDevices") {
            let respParams = JSON.parse(deviceParamsData).Parameters;
            console.log("List of connected devices : ", respParams);
            let twoGhzDevices = [];
            let fiveGhzDevices = [];
            var twoGhzobject = {
              hostName: "",
              hostIP: "",
              hostSignal: "",
            };
            var unique2Ghz = [];
            var unique5Ghz = [];
            new Promise(() => {
              respParams.forEach((dparams1, indx) => {
                if (
                  dparams1.Name.includes("InternetGatewayDevice.LANDevice.1")
                ) {
                  // && dparams1.Value == "true"
                  if (
                    dparams1.Name.endsWith("Active") &&
                    dparams1.Value == "true"
                  ) {
                    // console.log(dparams1.Name);
                    let twoGhzObj = dparams1.Name.split("Active")[0];
                    twoGhzDevices.push(twoGhzObj);
                    var common2GhzHost =
                      "InternetGatewayDevice.LANDevice.1.Hosts.Host.";
                    let unique2GhzObj = {
                      ["Device" +
                      dparams1.Name.split(".Active")[0].split(
                        common2GhzHost
                      )[1]]: "",
                    };
                    unique2Ghz.push(unique2GhzObj);
                    // console.log(twoGhzDevices);
                  }
                } else if (
                  dparams1.Name.includes("InternetGatewayDevice.LANDevice.5")
                ) {
                  // && dparams1.Value == "true"
                  if (dparams1.Name.endsWith("Active")) {
                    // console.log(dparams1.Name);
                    let fiveGhzObj = dparams1.Name.split("Active")[0];
                    fiveGhzDevices.push(fiveGhzObj);
                    var common5GhzHost =
                      "InternetGatewayDevice.LANDevice.5.Hosts.Host.";
                    let unique5GhzObj = {
                      ["Device" +
                      dparams1.Name.split(".Active")[0].split(
                        common5GhzHost
                      )[1]]: "",
                    };
                    unique5Ghz.push(unique5GhzObj);
                    // console.log(twoGhzDevices);
                  }
                }
              });
              var u2ghzkeys = Object.keys(unique2Ghz);
              // console.log("twoGhzDevices", twoGhzDevices);
              // console.log("unique 2ghz obj", unique2Ghz);
              respParams.forEach((dparams2, indx2) => {
                var parsedParams2 = dparams2.Name;
                if (
                  parsedParams2.includes("InternetGatewayDevice.LANDevice.1")
                ) {
                  twoGhzDevices.forEach((twoGhzItem, i) => {
                    // console.log(twoGhzItem)
                    var constructTwoGhzName = twoGhzItem + "HostName";
                    var constructTwoGhzIP = twoGhzItem + "IPAddress";
                    var constructTwoGhzMac = twoGhzItem + "MACAddress";

                    if (parsedParams2 == constructTwoGhzName) {
                      var getParsedValue = dparams2.Value;
                      // updateDeviceParams.twoGhzList1.push(getParsedValue);
                      // twoGhzobject.hostName = getParsedValue;
                    } else if (parsedParams2 == constructTwoGhzIP) {
                      var getParsedIPValue = dparams2.Value;
                      // twoGhzobject.hostIP = getParsedIPValue;
                    } else if (parsedParams2 == constructTwoGhzMac) {
                      var getParsedMacValue = dparams2.Value;
                      // twoGhzobject.hostIP = getParsedIPValue;
                    }
                    unique2Ghz.forEach((uniqItem, ind) => {
                      var common2GhzHost =
                        "InternetGatewayDevice.LANDevice.1.Hosts.Host.";
                      var getDeviceNo =
                        "Device" +
                        twoGhzItem.split(common2GhzHost)[1].split(".")[0];
                      var parseUniqItem = Object.keys(uniqItem);
                      if (
                        getDeviceNo == parseUniqItem[0] &&
                        parsedParams2 == constructTwoGhzName
                      ) {
                        unique2Ghz[ind].hostName = getParsedValue;
                      } else if (
                        getDeviceNo == parseUniqItem[0] &&
                        parsedParams2 == constructTwoGhzIP
                      ) {
                        unique2Ghz[ind].hostIP = getParsedIPValue;
                      } else if (
                        getDeviceNo == parseUniqItem[0] &&
                        parsedParams2 == constructTwoGhzMac
                      ) {
                        unique2Ghz[ind].hostMac = getParsedMacValue;
                      }
                    });
                  });
                } else if (
                  parsedParams2.includes("InternetGatewayDevice.LANDevice.5")
                ) {
                  fiveGhzDevices.forEach((fivGhzItem, i) => {
                    // console.log(twoGhzItem)
                    var constructFiveGhzName = fivGhzItem + "HostName";
                    var constructFiveGhzIP = fivGhzItem + "IPAddress";
                    var constructFiveGhzMac = fivGhzItem + "IPAddress";

                    if (parsedParams2 == constructFiveGhzName) {
                      var getParsedValue2 = dparams2.Value;
                    } else if (parsedParams2 == constructFiveGhzIP) {
                      var getParsedIPValue2 = dparams2.Value;
                    } else if (parsedParams2 == constructFiveGhzMac) {
                      var getParsedMacValue2 = dparams2.Value;
                    }
                    unique5Ghz.forEach((uniqItem2, ind2) => {
                      var common5GhzHost =
                        "InternetGatewayDevice.LANDevice.1.Hosts.Host.";
                      var getDeviceNo2 =
                        "Device" +
                        fivGhzItem.split(common5GhzHost)[1].split(".")[0];
                      var parseUniqItem2 = Object.keys(uniqItem2);
                      if (
                        getDeviceNo2 == parseUniqItem2[0] &&
                        parsedParams2 == constructFiveGhzName
                      ) {
                        unique5Ghz[ind2].hostName = getParsedValue2;
                      } else if (
                        getDeviceNo2 == parseUniqItem2[0] &&
                        parsedParams2 == constructFiveGhzIP
                      ) {
                        unique5Ghz[ind2].hostIP = getParsedIPValue2;
                      } else if (
                        getDeviceNo2 == parseUniqItem2[0] &&
                        parsedParams2 == constructFiveGhzMac
                      ) {
                        unique5Ghz[ind2].hostMac = getParsedMacValue2;
                      }
                    });
                  });
                }
              });
              console.log("unique2Ghz ", unique2Ghz)
              console.log("unique5Ghz ", unique5Ghz)
              updateDeviceParams.temptwoGhzList = unique2Ghz;
              updateDeviceParams.fiveGhzList = unique5Ghz;
            });
          } else if (paramSection == "SSIDinfo") {
            // console.log("SSIDinfo : ", jsonParseResp);
            let parseSSIDParams = jsonParseResp.Parameters;
            parseSSIDParams.forEach((ssidID, indx) => {
              if (
                ssidID.Name ==
                "InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.SSID"
              ) {
                updateDeviceParams.ssidInfo.twoGhzSSIDname = ssidID.Value;
              } else if (
                ssidID.Name ==
                "InternetGatewayDevice.LANDevice.1.WLANConfiguration.5.SSID"
              ) {
                updateDeviceParams.ssidInfo.fiveGhzSSIDname = ssidID.Value;
              }
            });
          } else if (paramSection == "updateSSIDinfo") {
            // console.log("update SSID INFO : ", jsonParseResp);
          } else if (paramSection == "OpticalPower") {
            console.log("OpticalPower : ", jsonParseResp);
            let parseDeviceParams = jsonParseResp.Parameters;
            let opticalValue = parseDeviceParams[0].Value;
            updateDeviceParams.ssidInfo.powerLevel = opticalValue;
            if (opticalValue >= -26 && opticalValue <= -8) {
              updateDeviceParams.isActive = true;
              updateDeviceParams.hasError = false;
            } else {
              updateDeviceParams.hasError = true;
              updateDeviceParams.isActive = false;
            }
          }
        }
      });
    },
    secondsToHms(d) {
      d = Number(d);
      var h = Math.floor(d / 3600);
      var m = Math.floor((d % 3600) / 60);
      var s = Math.floor((d % 3600) % 60);

      var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
      var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
      var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
      return hDisplay + mDisplay + sDisplay;
    },
    renderPowerLevel(powerValue)
    {
      // console.log("PowerVal ",powerValue);
      let newpower = powerValue;
      let finalPowerValue = "";
      let firstValue = "";
      let secondValue = "";
      if(newpower.indexOf("-") == "0")
      {
        if(newpower.includes(".") == true)
        {
        var finalPowerValueTemp =  newpower.split(".");
        firstValue = finalPowerValueTemp[0].substring(1);
        secondValue = finalPowerValueTemp[1].substring(0,2);
        finalPowerValue="-"+firstValue +"."+secondValue; 
        }
        else
        {
          finalPowerValue = newpower.substring(0,2);
      }
      }
      else if(newpower.indexOf(".") == "0")
      {
        var finalPowerValueTemp =  newpower.split(".");
        firstValue = finalPowerValueTemp[0];
        secondValue = finalPowerValueTemp[1].substring(0,2);
        finalPowerValue=firstValue +"."+secondValue; 
      }
      else
      {
        finalPowerValue = newpower.substring(0,2);
      }

return finalPowerValue;
    },
    refreshDeviceStatus() {
      console.log("refresh device status");
      // var connDeviceParam = {
      //   Device: {
      //     Sn: this.searchSNo, //Device serial number
      //   },
      //   ParameterNames: ["InternetGatewayDevice.LANDevice.1.Hosts.Host."],
      //   Names: true,
      //   Values: true,
      //   Attributes: true,
      //   Creator: "ZohoOneView",
      //   AppId: "RestAPI",
      // };
      // this.getDeviceParameters("ConnectedDevices", connDeviceParam);

      // to fetch signal strength
      // var devSignalStn = {
      //   Device: {
      //     Sn: this.searchSNo,
      //   },
      //   ParameterNames: [
      //     "InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.AssociatedDevice.",
      //   ],
      //   Names: true,
      //   Values: true,
      //   Attributes: true,
      //   Creator: "ZohoOneView",
      //   AppId: "RestAPI",
      // };
      // var updateThis = this;
      // updateThis.getSignalStrength(devSignalStn);

      // var transID = "";
      // .then(function(response) {
      //   alert(response);
      // })
      // new Promise(function (resolve, reject) {
      // transID = await updateThis.getSignalStrength(devSignalStn);
      // console.log( "transid" , transID);
      // return transID;
      // setTimeout(() => resolve(1), 3000);
      // })
      // .then(function (result) {
      //   console.log(result)
      // console.log("after 1")
      // alert(transID); // 1
      // return result * 2;
      // })
      // .then(function (result) {
      //   console.log("after 2");
      //   alert(result); // 2
      //   // return result * 2;
      // })
      // .then(function (result) {
      //   console.log("after 3");
      //   alert(result); // 4
      //   // return result * 2;
      // });

      // fetch transaction status
      // var transParam = {
      //   TransactionId: 145513204,
      //   Creator: "ZohoOneView",
      //   AppId: "RestAPI",
      // };
      // this.getTransactionStatus(transParam);

      // fetch transaction parameters
      // var transParams1 = {
      //   Device: {
      //     Sn: this.searchSNo, //Device Serial Number
      //   },
      //   TransactionId: 145513520, //Transaction ID
      //   Creator: "ZohoOneView",
      //   AppId: "RestAPI",
      // };
      // this.getTransactionParams(transParams1);
    },
    getSignalStrength(deviceParams) {
      var updateThis = this;
      var headerMap = { "Content-type": "application/json" };
      var deviceParamsRequest = {
        url: "https://ftacs.tataskybroadband.com/FTACSWS_REST/api/Transaction/Parameter",
        body: deviceParams,
        headers: headerMap,
      };
      ZOHO.CRM.HTTP.post(deviceParamsRequest).then(function (
        deviceParamsData1
      ) {
        // console.log("device signal strength : ", deviceParamsData1);
        var jsonParseParam = JSON.parse(deviceParamsData1);
        if (jsonParseParam.ErrorCode == "100") {
          updateThis.transIDList.push(jsonParseParam.Id);

          // after receiving Transaction ID, check for status (async) for every 2 secs.
          updateThis.checkTransactionStatus();

          // var transParam = { TransactionId: jsonParseParam.Id, Creator: "ZohoOneView", AppId: "RestAPI", };
          // updateThis.getTransactionStatus(transParam);
        }
      });
    },
    checkTransactionStatus() {
      var getThis = this;

      // untill all transaction IDs in the list completed, check status for every 2 secs.
      if (getThis.transIDList.length > 0) {
        setTimeout(function () {
          getThis.asyncApi();
          getThis.checkTransactionStatus();
        }, 2000);
      }
    },
    asyncApi() {
      if (this.transIDList.length > 0) {
        console.log("Asynch API Call");
        var updateThis = this;
        updateThis.transIDList.forEach((tID, indx) => {
          var parseTransId = tID;
          var transParam = {
            TransactionId: parseTransId,
            Creator: "ZohoOneView",
            AppId: "RestAPI",
          };
          var headerMap = { "Content-type": "application/json" };
          var deviceParamsRequest = {
            url: "https://ftacs.tataskybroadband.com/FTACSWS_REST/api/Transaction",
            body: transParam,
            headers: headerMap,
          };
          ZOHO.CRM.HTTP.post(deviceParamsRequest).then(function (
            transParamsData2
          ) {
            // console.log("transaction status : ", transParamsData2);
            // if the transaction is completed, fetch the response for the respective transaction
            var jsonParseTrans = JSON.parse(transParamsData2);
            if (
              jsonParseTrans.ErrorCode == "100" &&
              jsonParseTrans.CompletedCount > 0 &&
              jsonParseTrans.PendingCount == 0 &&
              jsonParseTrans.FailedCount == 0
            ) {
              // remove that transaction ID from queue
              updateThis.transIDList.splice(indx, 1);
              var transParams1 = {
                Device: {
                  Sn: updateThis.searchSNo,
                },
                TransactionId: parseTransId,
                Creator: "ZohoOneView",
                AppId: "RestAPI",
              };
              updateThis.getTransactionParams(transParams1);
            }
          });
        });
      }
    },
    // getTransactionStatus(transParam) {
    //   var updateThis = this;
    //   var parseTransId = transParam.TransactionId;
    //   var headerMap = { "Content-type": "application/json" };
    //   var deviceParamsRequest = {
    //     url: "https://ftacs.tataskybroadband.com/FTACSWS_REST/api/Transaction",
    //     body: transParam,
    //     headers: headerMap,
    //   };
    //   ZOHO.CRM.HTTP.post(deviceParamsRequest).then(function (
    //     deviceParamsData2
    //   ) {
    //     console.log("transaction status");
    //     console.log(deviceParamsData2);
    //     var jsonParseStatus = JSON.parse(deviceParamsData2);
    //     if (jsonParseStatus.ErrorCode == "100") {
    //       var transParams1 = {
    //         Device: {
    //           Sn: updateThis.searchSNo,
    //         },
    //         TransactionId: parseTransId,
    //         Creator: "ZohoOneView",
    //         AppId: "RestAPI",
    //       };
    //       updateThis.getTransactionParams(transParams1);
    //     }
    //   });
    // },
    getTransactionParams(transParams) {
      var getThis = this;
      var wifiRange = getThis.wifiRange;
      var rangeValue = getThis.rangeValue;
      var headerMap = { "Content-type": "application/json" };
      var deviceParamsRequest = {
        url: "https://ftacs.tataskybroadband.com/FTACSWS_REST/api/Parameter/Transaction",
        body: transParams,
        headers: headerMap,
      };
      ZOHO.CRM.HTTP.post(deviceParamsRequest).then(function (
        deviceParamsData3
      ) {
        console.log("transaction params");
        // console.log(deviceParamsData3);
        var jsonParameters = JSON.parse(deviceParamsData3);
        if (
          jsonParameters.ErrorCode == "100" &&
          jsonParameters.Parameters.length > 0
        ) {
          let twoGhzDevices3 = [];
          let fiveGhzDevices3 = [];
          var unique2Ghz3 = [];
          var unique5Ghz3 = [];
          new Promise(() => {
            jsonParameters.Parameters.forEach((dparams3, indx3) => {
              if (dparams3.Name.includes("InternetGatewayDevice.LANDevice.1")) {
                // && dparams1.Value == "true"
                if (dparams3.Name.endsWith("Active")) {
                  let twoGhzObj3 = dparams3.Name.split("Active")[0];
                  twoGhzDevices3.push(twoGhzObj3);
                } else if (dparams3.Name.endsWith(".MACAddress")) {
                  var common2GhzWLAN =
                    "InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.AssociatedDevice.";
                  let unique2GhzObj3 = {
                    ["Device" +
                    dparams3.Name.split(".MACAddress")[0].split(
                      common2GhzWLAN
                    )[1]]: [dparams3.Value][0],
                  };
                  unique2Ghz3.push(unique2GhzObj3);
                }
              } else if (
                dparams3.Name.includes("InternetGatewayDevice.LANDevice.5")
              ) {
                // && dparams1.Value == "true"
                if (dparams3.Name.endsWith("Active")) {
                  // console.log(dparams1.Name);
                  let fiveGhzObj3 = dparams3.Name.split("Active")[0];
                  fiveGhzDevices3.push(fiveGhzObj3);
                } else if (dparams3.Name.endsWith(".MACAddress")) {
                  let unique5GhzObj3 = { [dparams3.Value]: "" };
                  unique5Ghz3.push(unique5GhzObj3);
                }
              }
            });

            jsonParameters.Parameters.forEach((dparams4, indx4) => {
              var parsedParams4 = dparams4.Name;
              if (parsedParams4.includes("InternetGatewayDevice.LANDevice.1")) {
                twoGhzDevices3.forEach((twoGhzItem3, i3) => {
                  var constructTwoGhzMac3 = twoGhzItem3 + "MACAddress";
                  var constructTwoGhzSS3 = twoGhzItem3 + "SignalStrength";

                  if (parsedParams4 == constructTwoGhzMac3) {
                    var getParsedMacValue4 = dparams4.Value;
                  } else if (parsedParams4 == constructTwoGhzSS3) {
                    var strength = dparams4.Value;
                    var getParsedSSValue4 = "";
                    if (
                      wifiRange.range1 >= strength &&
                      wifiRange.range2 < strength
                    ) {
                      getParsedSSValue4 = rangeValue.range1;
                    } else if (
                      wifiRange.range2 >= strength &&
                      wifiRange.range3 <= strength
                    ) {
                      getParsedSSValue4 = rangeValue.range2;
                    } else if (
                      wifiRange.range3 > strength &&
                      wifiRange.range4 < strength
                    ) {
                      getParsedSSValue4 = rangeValue.range3;
                    } else if (wifiRange.range4 >= strength) {
                      getParsedSSValue4 = rangeValue.range4;
                    }
                  }
                  unique2Ghz3.forEach((uniqItem4, ind4) => {
                    var common2GhzHost4 =
                      "InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.AssociatedDevice.";
                    var getDeviceNo4 =
                      "Device" +
                      twoGhzItem3.split(common2GhzHost4)[1].split(".")[0];
                    var parseUniqItem4 = Object.keys(uniqItem4);
                    if (
                      getDeviceNo4 == parseUniqItem4[0] &&
                      parsedParams4 == constructTwoGhzMac3
                    ) {
                      unique2Ghz3[ind4].hostMac = getParsedMacValue4;
                    } else if (
                      getDeviceNo4 == parseUniqItem4[0] &&
                      parsedParams4 == constructTwoGhzSS3
                    ) {
                      unique2Ghz3[ind4].hostSS = getParsedSSValue4;
                    }
                  });
                });
              }
              // else if (
              //   parsedParams2.includes("InternetGatewayDevice.LANDevice.5")
              // ) {
              //   fiveGhzDevices.forEach((fivGhzItem, i) => {
              //     // console.log(twoGhzItem)
              //     var constructFiveGhzName = fivGhzItem + "HostName";
              //     var constructFiveGhzIP = fivGhzItem + "IPAddress";
              //     var constructFiveGhzMac = fivGhzItem + "IPAddress";

              //     if (parsedParams2 == constructFiveGhzName) {
              //       var getParsedValue2 = dparams2.Value;
              //     } else if (parsedParams2 == constructFiveGhzIP) {
              //       var getParsedIPValue2 = dparams2.Value;
              //     } else if (parsedParams2 == constructFiveGhzMac) {
              //       var getParsedMacValue2 = dparams2.Value;
              //     }
              //     unique5Ghz.forEach((uniqItem2, ind2) => {
              //       var common5GhzHost =
              //         "InternetGatewayDevice.LANDevice.1.Hosts.Host.";
              //       var getDeviceNo2 =
              //         "Device" +
              //         fivGhzItem.split(common5GhzHost)[1].split(".")[0];
              //       var parseUniqItem2 = Object.keys(uniqItem2);
              //       if (
              //         getDeviceNo2 == parseUniqItem2[0] &&
              //         parsedParams2 == constructFiveGhzName
              //       ) {
              //         unique5Ghz[ind2].hostName = getParsedValue2;
              //       } else if (
              //         getDeviceNo2 == parseUniqItem2[0] &&
              //         parsedParams2 == constructFiveGhzIP
              //       ) {
              //         unique5Ghz[ind2].hostIP = getParsedIPValue2;
              //       } else if (
              //         getDeviceNo2 == parseUniqItem2[0] &&
              //         parsedParams2 == constructFiveGhzMac
              //       ) {
              //         unique5Ghz[ind2].hostMac = getParsedMacValue2;
              //       }
              //     });
              //   });
              // }
            });

            // console.log(twoGhzDevices3);
            // console.log(fiveGhzDevices3);

            // console.log(unique2Ghz3);
            // console.log(unique5Ghz3);
            getThis.twoGhzSSList = unique2Ghz3;
            getThis.fiveGhzSSList = unique5Ghz3;
            // new Promise(() => {
            var tempUniq2Ghz = getThis.temptwoGhzList;
            unique2Ghz3.forEach((u2, i2) => {
              tempUniq2Ghz.forEach((uniqItem, ind) => {
                if (uniqItem.hostMac == u2.hostMac) {
                  tempUniq2Ghz[ind].hostSS = u2.hostSS;
                }
              });
            });
            getThis.twoGhzList = tempUniq2Ghz;
            getThis.fiveGhzList = tempUniq2Ghz;
            // console.log("after uniq ", getThis.twoGhzList);
            // });
          });
        }
      });
    },
    getSSIDInfo() {
      console.log("getSSIDInfo called");
      var ssidParamList = [];
      if (this.deviceBand == "Dual") {
        ssidParamList = [
          "InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.SSID",
          "InternetGatewayDevice.LANDevice.1.WLANConfiguration.5.SSID",
        ];
      } else if (this.deviceBand == "Single") {
        ssidParamList = [
          "InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.SSID",
        ];
      }
      var deviceSSIDParam = {
        Device: {
          Sn: this.searchSNo,
        },
        ParameterNames: ssidParamList,
        Source: 0,
        Names: true,
        Values: true,
        Attributes: true,
        Creator: "ZohoOneView",
        AppId: "RestAPI",
      };
      this.getDeviceParameters("SSIDinfo", deviceSSIDParam);
    },
    // update SSID Info
    updateSSIDInfo() {
      console.log("update SSIDInfo called");
      var ssidParamList = [];
      if (this.ssidInfo.defaultBandParam == "two") {
        if (this.ssidInfo.defaultParam == "Name") {
          ssidParamList = [
            {
              Name: "InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.SSID",
              Value: this.ssidInfo.enteredName,
            },
          ];
        } else if (this.ssidInfo.defaultParam == "Password") {
          ssidParamList = [
            {
              Name: "InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.PreSharedKey.1.KeyPassphrase",
              Value: this.ssidInfo.enteredPwd,
            },
          ];
        }
      } else if (this.ssidInfo.defaultBandParam == "five") {
        if (this.ssidInfo.defaultParam == "Name") {
          ssidParamList = [
            {
              Name: "InternetGatewayDevice.LANDevice.1.WLANConfiguration.5.SSID",
              Value: this.ssidInfo.enteredName,
            },
          ];
        } else if (this.ssidInfo.defaultParam == "Password") {
          ssidParamList = [
            {
              Name: "InternetGatewayDevice.LANDevice.1.WLANConfiguration.5.PreSharedKey.1.KeyPassphrase",
              Value: this.ssidInfo.enteredPwd,
            },
          ];
        }
      }
      var deviceSSIDParam = {
        Device: {
          Sn: this.searchSNo,
        },
        Parameters: ssidParamList,
        Push: true,
        EndSession: true,
        Reprovision: 0,
        Priority: 0,
        Creator: "ZohoOneView",
        AppId: "RestAPI",
      };
      // console.log(deviceSSIDParam);
      // this.getDeviceParameters("updateSSIDinfo", deviceSSIDParam);
      // var headerMap = { "Content-type": "application/json" };
      // var deviceParamsRequest = {
      //   url: "https://ftacs.tataskybroadband.com/FTACSWS_REST/api/Parameter",
      //   body: deviceSSIDParam,
      //   headers: headerMap,
      // };
      // ZOHO.CRM.HTTP.put(deviceParamsRequest).then(function (deviceParamsData) {
      //   var jsonParseResp = JSON.parse(deviceParamsData);
      //   console.log(jsonParseResp)
      // })
    },
    getOpticalPower() {
      console.log("optical power function called");
      var ssidParamList = [];
      if (
        this.deviceStatus.deviceName == "Nokia" ||
        this.deviceStatus.deviceName == "G-140W-C" ||
        this.deviceStatus.deviceName == "G-140W-F" ||
        this.deviceStatus.deviceName == "G-140W-G" ||
        this.deviceStatus.deviceName == "G-2425G-A"
      ) {
        ssidParamList = ["InternetGatewayDevice.X_ALU_OntOpticalParam.RXPower"];
      } else if (this.deviceStatus.deviceName == "Genexis Earth-4222") {
        ssidParamList = ["InternetGatewayDevice.GX_OntOpticalParam.RXPower"];
      }
      var deviceSSIDParams = {
        Device: {
          Sn: this.searchSNo,
        },
        ParameterNames: ssidParamList,
        Source: 0,
        Names: true,
        Values: true,
        Attributes: true,
        Creator: "GISAPP",
        AppId: "RestAPI",
      };
      this.getDeviceParameters("OpticalPower", deviceSSIDParams);
    },
    rebootDevice() {
      var updateThis = this;
      var headerMap = { "Content-type": "application/json" };
      var deviceParams = {
        Device: { Sn: this.deviceStatus.serialNo },
        Push: true,
        Priority: 0,
        Creator: "ZohoOneView",
        AppId: "RestAPI",
      };
      var deviceParamsRequest = {
        url: "https://ftacs.tataskybroadband.com/FTACSWS_REST/api/Device/Reboot",
        body: deviceParams,
        headers: headerMap,
      };
      ZOHO.CRM.HTTP.put(deviceParamsRequest).then(function (deviceParamsData) {
        var jsonParseParam = JSON.parse(deviceParamsData);
        console.log("reboot device request : ", jsonParseParam);
        // response : {  "Id": 147385671, "ErrorCode": 100, "Message": "" }
        if (jsonParseParam.ErrorCode == "100") {
          updateThis.rebootTransIDList.push(jsonParseParam.Id);
          updateThis.checkRebootStatus();
          this.$message.success("Reboot request submitted");
        }
      });
    },
    checkRebootStatus() {
      var getThis = this;
      // untill all transaction IDs in the list completed, check status for every 2 secs.
      if (getThis.rebootTransIDList.length > 0) {
        setTimeout(function () {
          getThis.rebootAsyncApi();
          getThis.checkRebootStatus();
        }, 2000);
      }
    },
    rebootAsyncApi() {
      if (this.rebootTransIDList.length > 0) {
        // ------ loading effect  ---------
        var statusSpinning = this;
        statusSpinning.changeSpinning("deviceStatus");
        setTimeout(function () {
          statusSpinning.changeSpinning("deviceStatus");
        }, 5000);

        console.log("Reboot Asynch API Call");
        var updateThis = this;
        updateThis.rebootTransIDList.forEach((tID, indx) => {
          var parseTransId = tID;
          var transParam = {
            TransactionId: parseTransId,
            Creator: "ZohoOneView",
            AppId: "RestAPI",
          };
          var headerMap = { "Content-type": "application/json" };
          var deviceParamsRequest = {
            url: "https://ftacs.tataskybroadband.com/FTACSWS_REST/api/Transaction",
            body: transParam,
            headers: headerMap,
          };
          ZOHO.CRM.HTTP.post(deviceParamsRequest).then(function (
            transParamsData2
          ) {
            // console.log("transaction status : ", transParamsData2);
            // if the transaction is completed, fetch the response for the respective transaction
            var jsonParseTrans = JSON.parse(transParamsData2);
            if (
              jsonParseTrans.ErrorCode == "100" &&
              jsonParseTrans.CompletedCount > 0 &&
              jsonParseTrans.PendingCount == 0 &&
              jsonParseTrans.FailedCount == 0
            ) {
              // remove that transaction ID from queue
              updateThis.rebootTransIDList.splice(indx, 1);
              this.$message.success("Device rebooted successfully");
            }
          });
        });
      }
    },
  },
};
</script>

<style>
.Network-row1.ant-row {
  padding-top: 0px !important;
}
.ant-card-head {
  /* background: linear-gradient(90deg, rgb(223, 0, 147) 0%, 33.6872%, rgb(154, 0, 192) 61.3588%, 76.0085%, rgb(110, 0, 219) 100%) 0 100% no-repeat !important; */
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
.greenPower {
  background-color: rgb(135, 208, 104);
  width: fit-content;
  padding: 0 7px;
  border-radius: 4px;
}
.redPower {
  background-color: #f50;
  width: fit-content;
  padding: 0 7px;
  border-radius: 4px;
}
</style>