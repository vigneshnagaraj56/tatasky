<script type="text/javascript" src="https://live.zwidgets.com/js-sdk/1.1/ZohoEmbededAppSDK.min.js"></script>
<script src="https://www.gstatic.com/charts/loader.js"></script>

<template>
  <div style="background-color: #f0f2f5; padding: 20px">
    <!-- FIRST ROW - NOTIFICATION PANEL :style="{ display: notificationVisibility }"-->
    <a-row :gutter="16" >
      <a-col :span="24">
        <a-card title="Notifications" :bordered="false" :style="{ display: notificationVisibility }">
          <a-carousel style="display: none" arrows>
            <div
              slot="prevArrow"
              class="custom-slick-arrow"
              style="left: 10px; zindex: 1"
            >
              <a-icon type="left-circle" />
            </div>
            <div
              slot="nextArrow"
              class="custom-slick-arrow"
              style="right: 10px"
            >
              <a-icon type="right-circle" />
            </div>
            <div><h3>1</h3></div>
            <div><h3>2</h3></div>
            <div><h3>3</h3></div>
            <div><h3>4</h3></div>
          </a-carousel>
          <!-- NMS Notification -->
          <div>
            <a-row>
              <a-col :span="8">
                <label class="zw-field-title">Network Entity</label>
                <div  style="word-wrap: break-word;">{{ this.notifData.NetworkEntity }}</div>
              </a-col>
              <a-col :span="6">
                <label class="zw-field-title">Ticket ID</label>
                <div>{{ this.notifData.nmsticketid }}</div>
              </a-col>
              <a-col :span="6">
                <label class="zw-field-title">Ticket Type</label>
                <div>{{ this.notifData.tickettype }}</div>
              </a-col>
              <a-col :span="4">
                <label class="zw-field-title">Impact Type</label>
                <div>{{ this.notifData.impacttype }}</div>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="8">
                <label class="zw-field-title">Probable Cause</label>
                <div>{{ this.notifData.probablecause }}</div>
              </a-col>
              <a-col :span="6">
                <label class="zw-field-title">Created Time</label>
                <div>
                {{
                      new Date(this.notifData.createdtime)
                        .toDateString()
                        .substring(4, 16) +
                      " " +
                      new Date(this.notifData.createdtime).toLocaleTimeString()
                       }}
                </div>
              </a-col>
              <a-col :span="6">
                <label class="zw-field-title">Cleared Time</label>
                <div>
                {{
                      new Date(this.notifData.clearedtime)
                        .toDateString()
                        .substring(4, 16) +
                      " " +
                      new Date(this.notifData.clearedtime).toLocaleTimeString()
                       }}
                </div>
              </a-col>
              <a-col :span="4">
                <label class="zw-field-title">Ticket Status</label>
                <div v-if="this.notifData.ticketstatus == 'Resolved' || this.notifData.ticketstatus == 'In Progress'"
                  v-bind:class="{ greenPower: isActive, redPower: hasError }"
                 >
                  {{ this.notifData.ticketstatus }}
                </div>
                <div v-if="this.notifData.ticketstatus != 'Resolved' && this.notifData.ticketstatus != 'In Progress'">{{ this.notifData.ticketstatus }}</div>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="8">
                <label class="zw-field-title">Owner Group</label>
                <div>{{ this.notifData.ownergroup }}</div>
              </a-col>
              <a-col :span="6">
                <label class="zw-field-title">Assigned Group</label>
                <div>{{ this.notifData.assignedgroup }}</div>
              </a-col>
              <a-col :span="6">
                <label class="zw-field-title">Estimate Time to Resolve</label>
                <div> {{
                      new Date(this.notifData.etr)
                        .toDateString()
                        .substring(4, 16) +
                      " " +
                      new Date(this.notifData.etr).toLocaleTimeString()
                       }}</div>
              </a-col>
            </a-row>
          </div>
          <!-- Due for recharge / Plan Expiry Notification -->
          <div style="textalign: center; display: none">
            <p>
              Your current plan is expiring on {{ this.planInfo.planExpDate }}
            </p>
          </div>
          <!-- Customer Offers / Campaigns Notifications -->
          <div style="textalign: center; display: none">
            <p>
              Starting at ₹2,999 per month billed monthly - 250 Mbps Upload &
              250 Mbps Download
            </p>
          </div>
        </a-card>
      </a-col>
    </a-row>

    <!-- SECOND ROW -->
    <a-row :gutter="16" style="display: flex">
      <!-- SECOND ROW-CUSTOMER PANEL -->
      <a-col :span="12" style="flex: 1">
        <!-- <a-icon type="user" /> -->

        <a-card
          class="zw-firstrow-col"
          title="Customer Information"
          :bordered="false"
          style="height: 100%"
        >
          <a
            slot="extra"
            @click="refreshCustInfo"
            :style="{ marginRight: '20px' }"
            ><a-icon type="retweet" :style="{ fontSize: '20px' }" />
          </a>
          <a slot="extra" @click="showEditCustDrawer"
            ><a-icon type="edit" :style="{ fontSize: '20px' }" />
          </a>
          <a-spin :spinning="custSpinning">
            <div class="spin-content">
              <div class="zw-main-container">
                <div class="zw-sub-container">
                  <a-row>
                    <a-col :span="10">
                      <label class="zw-field-title">{{
                        this.custInfo.custName
                      }}</label>
                    </a-col>
                    <a-col :span="8">
                      <a-tag
                        color="#87d068"
                        v-if="this.custInfo.custStatus == 'Active'"
                        >{{ this.custInfo.custStatus }}</a-tag
                      >
                      <a-tag
                        color="#f50"
                        v-else-if="this.custInfo.custStatus == 'Deactivated'"
                        >{{ this.custInfo.custStatus }}</a-tag
                      >
                      <a-tag color="#2db7f5" v-else>{{
                        this.custInfo.custStatus
                      }}</a-tag>
                    </a-col>
                    <a-col :span="6">
                         <div>Safe Custody
                           <a-tag
                        color="#87d068" :style="{ float: 'Right' }" 
                        v-if="this.custInfo.safeCustody == 'Y'"
                        >{{ this.custInfo.safeCustody }}</a-tag
                      >
                           <a-tag
                        color="#f50" :style="{ float: 'Right' }"
                        v-else-if="this.custInfo.safeCustody == 'N'"
                        >{{ this.custInfo.safeCustody }}</a-tag
                      > 
                         </div>
                    </a-col>
                  </a-row>

                  <a-row>
                    <a-col :span="12">
                      <label class="zw-field-title">Customer ID</label>
                      <div>{{ this.custInfo.custID }}</div>
                    </a-col>
                    <a-col :span="12">
                      <label class="zw-field-title">Account ID</label>
                      <div>{{ this.custInfo.acctID }}</div>
                    </a-col>
                  </a-row>

                  <a-row>
                    <a-col :span="12">
                      <label class="zw-field-title">Subscriber ID</label>
                      <div>{{ this.custInfo.subsID }}</div>
                    </a-col>
                    <a-col :span="12">
                      <label class="zw-field-title">Email</label>
                      <div>{{ this.custInfo.custEmail }}</div>
                    </a-col>
                  </a-row>

                  <a-row>
                    <a-col :span="12">
                      <label class="zw-field-title">RMN</label>
                      <div>{{ this.custInfo.custRMN }}</div>
                    </a-col>
                    <!-- <a-col :span="12">
                      <label class="zw-field-title">Alternate Number</label>
                      <div>{{ this.custInfo.custAltno }}</div>
                    </a-col> -->
                    <a-col :span="12">
                      <label class="zw-field-title">Landline Number</label>
                      <div>{{ this.custInfo.custLandno }}</div>
                    </a-col>
                  </a-row>

                  <a-row>
                    <a-col :span="12">
                      <label class="zw-field-title">DOB</label>
                      <div>{{ this.parseDateTime(this.custInfo.custDOB) }}</div>
                    </a-col>
                    <a-col :span="12">
                      <label class="zw-field-title"
                        >New / Existing Customer</label
                      >
                      <div>{{ this.custInfo.custType }}</div>
                    </a-col>
                  </a-row>

                  <a-row>
                    <a-col :span="12">
                      <label class="zw-field-title">Network Identifier</label>
                      <div>{{ this.custInfo.networkIdentifier }}</div>
                    </a-col>
                  </a-row>

                  <a-row>
                    <a-col :span="12">
                      <label class="zw-field-title">Installation Address</label>
                      <div>{{ this.custInfo.custInstAddr }}</div>
                    </a-col>
                    <a-col :span="12">
                      <label class="zw-field-title">Billing Address</label>
                      <div>{{ this.custInfo.custBillAddr }}</div>
                    </a-col>
                  </a-row>
                </div>
              </div>
            </div>
          </a-spin>
        </a-card>
      </a-col>

      <!-- SECOND ROW-PLAN DETAILS PANEL -->
      <a-col :span="12">
        <a-card title="Plan Details" class="zw-firstrow-col" :bordered="false">
          <a
            slot="extra"
            @click="refreshPlanInfo(customerIDprop)"
            href="#"
            :style="{ marginRight: '20px' }"
            ><a-icon type="retweet" :style="{ fontSize: '20px' }" />
          </a>
          <!-- <a slot="extra" @click="showDrawer"
            ><a-icon type="edit" :style="{ fontSize: '20px' }" />
          </a> -->
          <a-spin :spinning="planSpinning">
            <div class="spin-content">
              <div class="zw-main-container">
                <div class="zw-sub-container">
                  <a-row>
                    <a-col :span="12">
                      <label class="zw-field-title">Plan Rental</label>
                      <div>{{ this.planInfo.plan }}</div>
                    </a-col>
                    <a-col :span="12">
                      <label class="zw-field-title">Speed</label>
                      <div>{{ this.planInfo.speed }}</div>
                    </a-col>
                  </a-row>

                  <a-row>
                    <a-col :span="12">
                      <label class="zw-field-title">Data Usage</label>
                      <div>{{ this.planInfo.dataQuota }}</div>
                    </a-col>
                    <a-col :span="12">
                      <label class="zw-field-title">Validity</label>
                      <div>{{ this.planInfo.validity }}</div>
                    </a-col>
                  </a-row>

                  <a-row>
                    <a-col :span="12">
                      <label class="zw-field-title">Voice Enabled</label>
                      <div>{{ this.planInfo.voiceEnabled }}</div>
                    </a-col>
                    <a-col :span="12">
                      <label class="zw-field-title"
                        >Customer Activation Date</label
                      >
                      <div>{{ this.planInfo.custActDate }}</div>
                    </a-col>
                  </a-row>

                  <a-row>
                    <a-col :span="12">
                      <label class="zw-field-title">Plan Activation Date</label>
                      <div>{{ this.planInfo.planActDate }}</div>
                    </a-col>
                    <a-col :span="12">
                      <label class="zw-field-title">Next Recharge Date</label>
                      <div>{{ this.planInfo.nxtRechDate }}</div>
                    </a-col>
                  </a-row>

                  <a-row>
                    <a-col :span="12">
                      <label class="zw-field-title">Plan Expiry Date</label>
                      <div>{{ this.planInfo.planExpDate }}</div>
                    </a-col>
                    <a-col :span="12">
                      <label class="zw-field-title">Wallet Balance</label>
                      <div>{{ this.planInfo.wallBal }}</div>
                    </a-col>
                  </a-row>

                  <a-row>
                    <a-col :span="12">
                      <label class="zw-field-title"
                        >Security Deposit Amount</label
                      >
                      <div>{{ this.planInfo.secDepAmt }}</div>
                    </a-col>
                    <a-col :span="12">
                      <label class="zw-field-title">Next Recharge Amount</label>
                      <div>{{ this.planInfo.nxtRecAmt }}</div>
                    </a-col>
                  </a-row>

                  <a-row>
                    <a-col :span="12">
                      <label class="zw-field-title">Any add-on attached</label>
                      <div>{{ this.planInfo.addOnAttach }}</div>
                    </a-col>
                    <a-col :span="12">
                      <label class="zw-field-title">Any Multiplier</label>
                      <div>{{ this.planInfo.multiplier }}</div>
                    </a-col>
                  </a-row>

                  <a-row>
                    <a-col :span="12">
                      <label class="zw-field-title"
                        >Recurring Charges Cost</label
                      >
                      <div>{{ this.planInfo.plan }}</div>
                    </a-col>
                  </a-row>

                  <a-row>
                    <a-col :span="12">
                      <a-button type="primary" @click="showDrawer">
                        View Consumption Details
                      </a-button>
                    </a-col>
                  </a-row>
                </div>
              </div>
            </div>
          </a-spin>
        </a-card>
      </a-col>
    </a-row>

    <!-- THIRD ROW -->
    <a-row :gutter="16" style="display: flex">
      <!-- THIRD ROW-ORDER MENU -->
      <a-col :span="12" style="flex: 1">
        <div style="height: 100%">
          <!-- <a-menu v-model="current" mode="horizontal" style="color: white !important">
            <a-menu-item key="mail"> Last Order History </a-menu-item>
          </a-menu> -->
          <a-card title="Last Order History" style="height: 100%">
            <a-row>
              <a-col :span="12">
                <label class="zw-field-title">Order ID</label>
                <div>{{ this.lastOrder.orderID }}</div>
              </a-col>
              <a-col :span="12">
                <label class="zw-field-title">Service Type</label>
                <div>{{ this.lastOrder.serviceType }}</div>
              </a-col>
            </a-row>

            <a-row>
              <a-col :span="12">
                <label class="zw-field-title">Last Order Type</label>
                <div>{{ this.lastOrder.orderType }}</div>
              </a-col>
              <a-col :span="12">
                <label class="zw-field-title">Last Order Status</label>
                <div>{{ this.lastOrder.orderStatus }}</div>
              </a-col>
            </a-row>

            <a-row>
              <a-col :span="12">
                <label class="zw-field-title">Order Line Type</label>
                <div>{{ this.lastOrder.orderLineTyp }}</div>
              </a-col>
              <a-col :span="12">
                <label class="zw-field-title">Customer Requested Date</label>
                <div>{{ this.lastOrder.custReqDate }}</div>
              </a-col>
            </a-row>

            <a-row>
              <a-col :span="24">
                <div class="viewAll-container">
                  <!-- <div class="viewAll">View All</div> -->
                  <a-button @click="showAllOrders">View All</a-button>
                </div>
              </a-col>
            </a-row>
          </a-card>
        </div>
      </a-col>

      <!-- THIRD ROW-TICKET HISTORY -->
      <a-col :span="12" style="flex: 1">
        <a-card
          title="Tickets & Interaction History"
          :bordered="false"
          style="height: 100%;position: absolute;overflow: auto scroll; width: 98% !important;"
        >
                 <a slot="extra" :style="{ marginRight: '20px' }"> <a-switch 
                   :checked="this.hobsAndDeskTicketTrigger"
                    checked-children="HOBS"
                    un-checked-children="DESK"
                    @click="updateTicketTrigger"
                  />
                  </a>
               
          <a
            slot="extra"
            @click="refreshTicketHistory(customerIDprop)"
            href="#"
            :style="{ marginRight: '20px' }"
            >
            <a-icon type="retweet" :style="{ fontSize: '20px' }" />
          </a>
          <a slot="extra" @click="showNewTicketDrawer"
            ><a-icon type="plus" />
          </a>
          <a-spin :spinning="ticketSpinning">
            <div class="spin-content">
             <!-- Showing HOBS tickets-->
              <a-list v-if="hobsAndDeskTicketTrigger === true"
                item-layout="horizontal"
                :data-source="this.ticketHistory"
               >
                <a-list-item slot="renderItem" slot-scope="item">
                <div style="width:65%;padding-left:5px;" >
                  <a-list-item-meta description="">

                    <a slot="title" @click="viewTicketDrawer(item['ns4:itemID'][0])">{{
                      item["ns4:itemID"][0]}}-{{item['ns4:itemCategoryID'][0]}}-{{item['ns4:itemTypeID'][0]}}-{{item['ns4:itemSubTypeID'][0]}}</a>
                  </a-list-item-meta>
                </div>
                  <!-- <div>
                  //   {{
                  //     new Date(item.ticketdate)
                  //       .toDateString()
                  //       .substring(4, 16) +
                  //     " " +
                  //     new Date(item.ticketdate).toLocaleTimeString()
                  //   }}
                  // </div> -->
                  <div style="width:35%">
                    {{
                      new Date(item["ns4:openDate"][0])
                        .toDateString()
                        .substring(4, 16) +
                      " " +
                      new Date(item["ns4:openDate"][0]).toLocaleTimeString()
                       }}
                  </div>
                  
                </a-list-item>
                <!-- <a-pagination
                  @change="onPageChange"
                  :total="50"
                  show-less-items
                /> -->
              </a-list>
              <!-- Showing Zoho Desk tickets-->
              <a-list v-else-if="hobsAndDeskTicketTrigger === false"
                item-layout="horizontal"
                :data-source="this.deskTickets"
               >
                <a-list-item slot="renderItem" slot-scope="item">
                  <a-list-item-meta description="">
                    <a slot="title" @click="viewTicketDrawer(item.ticketID)">{{
                      item.tickettitle
                    }}</a>
                  </a-list-item-meta>
                  <div>
                    {{
                      new Date(item.ticketdate)
                        .toDateString()
                        .substring(4, 16) +
                      " " +
                      new Date(item.ticketdate).toLocaleTimeString()
                    }}
                  </div>
                  
                </a-list-item>
                <!-- <a-pagination
                  @change="onPageChange"
                  :total="50"
                  show-less-items
                /> -->
              </a-list>
            </div>
          </a-spin>
        </a-card>
      </a-col>
    </a-row>

    <!-- FOURTH ROW -->
    <a-row :gutter="16" style="display: flex">
      <!-- THIRD ROW-ORDER MENU -->
      <a-col :span="12" style="flex: 1">
        <div style="height: 100%">
          <!-- <a-menu v-model="current" mode="horizontal" style="color: white !important">
            <a-menu-item key="mail"> Last Order History </a-menu-item>
          </a-menu> -->
          <a-card title="Interaction History" style="height: 100%">
            <a-row :style="{ paddingTop: '0px', fontWeight: 'Bold' }">
              <a-col class="zw-field-title" :span="3"> Interaction ID </a-col>
              <a-col class="zw-field-title" :span="4"> Interaction Mode </a-col>
              <a-col class="zw-field-title" :span="4"> Interaction Date </a-col>
              <a-col class="zw-field-title" :span="3"> Category </a-col>
              <a-col class="zw-field-title" :span="3"> Type </a-col>
              <a-col class="zw-field-title" :span="4"> Subtype </a-col>
              <a-col class="zw-field-title" :span="3"> Added By </a-col>
            </a-row>
            <a-row
              v-for="tickInt in this.ticketInterationList"
              :key="tickInt.Interaction_Id"
            >
              <a-col :span="3">
                <!-- <label class="zw-field-title">Interaction ID</label> -->
                <a @click="viewTicketInteraction(tickInt.Interaction_Id)">
                  <div>{{ tickInt.Interaction_Id }}</div>
                </a>
              </a-col>
              <a-col :span="4">
                <!-- <label class="zw-field-title">Interaction Mode</label> -->
                <div>{{ tickInt.Name }}</div>
              </a-col>
              <a-col :span="4">
                <!-- <label class="zw-field-title">Interaction Date</label> .split("+05:30").slice(0, -6)
                <div>{{ new Date(tickInt.Interaction_Date).toDateString().substring(4, 16)}} {{new Date(tickInt.Interaction_Date).toLocaleTimeString()}}</div>-->
                <div>{{ new Date(tickInt.Interaction_Date).toDateString().substring(4, 16)}} {{tickInt.Interaction_Date.slice(11,16)}}</div>
              </a-col>
              <a-col :span="3">
                <!-- <label class="zw-field-title">Category</label> -->
                <div>{{ tickInt.Category }}</div>
              </a-col>
              <a-col :span="3">
                <!-- <label class="zw-field-title">Category</label> -->
                <div>{{ tickInt.Interaction_Type }}</div>
              </a-col>
              <a-col :span="4">
                <!-- <label class="zw-field-title">Category</label> -->
                <div>{{ tickInt.Interaction_Subtype }}</div>
              </a-col>
              <a-col :span="3">
                <!-- <label class="zw-field-title">Category</label> -->
                <div>{{ tickInt.CreatedBy }}</div>
              </a-col>
            </a-row>
          </a-card>
        </div>
      </a-col>
    </a-row>

    <!-- VIEW CONSUMPTION DRAWER -->
    <a-drawer
      title="View Consumption"
      :width="720"
      :visible="visible"
      :body-style="{ paddingBottom: '80px' }"
      @close="onClose"
    >
      <div>
        <div>
          <div :style="{ display: 'flex'}">
          <h2>{{this.planInfo.dataQuota}}</h2><span :style="{ padding: '5px'}"><a-tag color="cyan" style="font-weight:700;">{{this.planInfo.planExpDate+" - "+this.planInfo.planActDate}}</a-tag></span></div>
          <a-tooltip :title="this.planInfo.dataQuota">
            
            <a-progress
              :percent="this.planInfo.dataAvailPercent"
               :show-info="false" strokeColor="#52c41a"/>
          </a-tooltip>
        </div>
        
        <div :style="{ display: 'flex', margin: '20px 0px' }">
          <img height="350px" :src="GetChartURL()"/>
        </div>

        <!-- <a-progress type="dashboard" :percent="this.planInfo.dataAvailPercent" /> -->
        <div>
          <div :style="{ display: 'flex' }">
            <a-statistic
              title="Total Quota"
              :value="this.planInfo.totData "
              style="margin-right: 50px"
            />
            <a-statistic
              title="Upload Quota"
              :value="this.planInfo.baseQuota "
              style="margin-right: 50px"
            />
            <a-statistic
              title="Download Quota"
              :value="this.planInfo.consumedData "
              style="margin-right: 50px"
            />
          </div>
        
        </div>
      </div>
    </a-drawer>
    <!-- NEW TICKET DRAWER  -->
    <a-drawer
      title="Create a new ticket"
      :width="720"
      :visible="ticketVisible"
      :body-style="{ paddingBottom: '80px' }"
      @close="onTicketClose"
    >
      <a-form-model :model="ticketCreation">
        <!-- <a-form
        :form="form"
        layout="vertical"
        hide-required-mark
        class="newTicketDrawer"
      > -->
        <a-row :gutter="16" :style="{ paddingTop: '0px' }">
          <a-col :span="12">
            <a-form-model-item label="Category">
              <a-select
                v-model="ticketCreation.tickCategory"
                placeholder="Please select a category"
                @change="categoryChange"
              >
                <a-select-option value="Request"> Request </a-select-option>
                <a-select-option value="Complaint"> Complaint </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="Source">
              <a-select
                v-model="ticketCreation.tickSource"
                placeholder="Please select a source"
                disabled
              >
                <a-select-option value="SELFCARE"> Self-care </a-select-option>
                <a-select-option value="syshobs">
                  System - HOBS
                </a-select-option>
                <a-select-option value="appl"> Appellate </a-select-option>
                <a-select-option value="care"> Care </a-select-option>
                <a-select-option value="inb"> Inbound </a-select-option>
                <a-select-option value="outb"> Outbound </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="Type">
              <a-select
                v-model="ticketCreation.tickType"
                placeholder="Please choose the type"
                @change="typeChange"
              >
                <a-select-option
                  v-for="types in ticketCreation.tickTypeList"
                  :key="types"
                >
                  {{ types }}
                  <!-- THE BELOW FORMAT IS USED WHEN TYPE LIST IS RECEIVED FROM SOAP REQUEST
                     <a-select-option
                  v-for="types in ticketCreation.tickTypeList"
                  :key="types.refValue[0]"
                >
                  {{ types.displayText[0] }} -->
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="Subtype">
              <a-select
                v-model="ticketCreation.tickSubType"
                placeholder="Please choose the sub type"
                @change="subtypeChange"
              >
                <a-select-option
                  v-for="stypes in ticketCreation.tickSubTypeList"
                  :key="stypes"
                >
                  {{ stypes }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="Resolution Code">
              <a-select
                v-model="ticketCreation.tickResolution"
                placeholder="Please choose the sub type"
                @change="resolutionChange"
              >
                <a-select-option
                  v-for="resol in ticketCreation.tickResolutionList"
                  :key="resol"
                >
                  {{ resol }}
                </a-select-option>
              </a-select>
              <!-- <a-select placeholder="Please choose the resolution code">
                <a-select-option value="calldrp">
                  Call Dropped
                </a-select-option>
                <a-select-option value="infoprd">
                  Info Provided
                </a-select-option>
              </a-select> -->
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="Outcome">
              <a-select
                v-model="ticketCreation.tickOutcome"
                placeholder="Please choose the outcome"
              >
                <a-select-option value="FTR"> FTR </a-select-option>
                <a-select-option value="NFTR"> NFTR </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <!-- <a-form-model :model="ticketCreation"> -->
            <a-form-model-item label="Description">
              <a-textarea
                v-model="ticketCreation.tickDescrip"
                v-decorator="[
                  'description',
                  {
                    rules: [
                      {
                        required: true,
                        message: 'Please enter url description',
                      },
                    ],
                  },
                ]"
                :rows="4"
                placeholder="please enter description"
              />
            </a-form-model-item>
            <!-- </a-form-model> -->
          </a-col>
        </a-row>
        <!-- </a-form> -->
        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="onTicketSubmit"> Submit </a-button>
          <a-button @click="onTicketClose" style="margin-left: 10px">
            Cancel
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </a-drawer>
    <!-- VIEW TICKET INFO DRAWER -->
    <a-drawer
      title="View Ticket Info"
      placement="right"
      :width="720"
      :visible="ticketviewerVisible"
      @close="onViewTicketClose"
    >
    <!--showig desk ticket drawer-->
      <div v-if="hobsAndDeskTicketTrigger === false">
      <div class="ticket-info-row">
        <div class="ticket-info-title"><b>Ticket Number </b></div>
        :
        <div class="ticket-info-value">
          # {{ this.viewTicketInfo.ticketNumber }}
        </div>
      </div>
      <div class="ticket-info-row">
        <div class="ticket-info-title"><b>Date </b></div>
        :
        <div class="ticket-info-value">{{ this.viewTicketCF["Date"] }}</div>
      </div>
      <div class="ticket-info-row">
        <div class="ticket-info-title"><b>Subject </b></div>
        :
        <div class="ticket-info-value">{{ this.viewTicketInfo.subject }}</div>
      </div>
      <div class="ticket-info-row">
        <div class="ticket-info-title"><b>Description </b></div>
        :
        <div class="ticket-info-value">
          {{ this.viewTicketInfo.description }}
        </div>
      </div>
      <div class="ticket-info-row">
        <div class="ticket-info-title"><b>Status </b></div>
        :
        <div class="ticket-info-value">{{ this.viewTicketInfo.status }}</div>
      </div>
      <div class="ticket-info-row">
        <div class="ticket-info-title"><b>Ticket With The Team </b></div>
        :
        <div class="ticket-info-value">
          {{ this.viewTicketCF["Ticket Team"] }}
        </div>
      </div>
      <div class="ticket-info-row">
        <div class="ticket-info-title"><b>Channel </b></div>
        :
        <div class="ticket-info-value">{{ this.viewTicketInfo.channel }}</div>
      </div> 
      <div class="ticket-info-row">
        <div class="ticket-info-title"><b>Customer ID </b></div>
        :
        <div class="ticket-info-value">{{ this.custInfo.custID }}</div>
      </div>
      <div class="ticket-info-row">
        <div class="ticket-info-title"><b>Customer RMN </b></div>
        :
        <div class="ticket-info-value">{{ this.custInfo.custRMN }}</div>
      </div>
      <div class="ticket-info-row">
        <div class="ticket-info-title"><b>Type </b></div>
        :
        <div class="ticket-info-value">{{ this.viewTicketCF.Type }}</div>
      </div>
      <div class="ticket-info-row">
        <div class="ticket-info-title"><b>Sub Type </b></div>
        :
        <div class="ticket-info-value">{{ this.viewTicketCF["Sub Type"] }}</div>
      </div>
      <div class="ticket-info-row">
        <div class="ticket-info-title"><b>Remarks </b></div>
        :
        <div class="ticket-info-value">{{ this.viewTicketCF.Remarks }}</div>
      </div> 
      </div>
      <!--Showing HOBS ticket Drawer this.viewTicketInfo['ns4:itemID']-->
      <div v-else-if="hobsAndDeskTicketTrigger === true">
       
      <div class="ticket-info-row">
        <div class="ticket-info-title"><b>Service Request Number</b></div>
        :
        <div class="ticket-info-value" v-if="this.viewTicketInfo['ns4:itemID']">
           {{ this.viewTicketInfo['ns4:itemID'][0] }}
        </div>
      </div>
      <div class="ticket-info-row">
        <div class="ticket-info-title"><b>Service Request Date </b></div>
        :
        <div class="ticket-info-value" v-if="this.viewTicketInfo['ns4:openDate']">
           {{  new Date(this.viewTicketInfo['ns4:openDate'][0])
                        .toDateString()
                        .substring(4, 16) }}</div>
      </div>
      <div class="ticket-info-row">
        <div class="ticket-info-title"><b>Category</b></div>
        :
        <div class="ticket-info-value" v-if="this.viewTicketInfo['ns4:itemCategoryID']">
           {{ this.viewTicketInfo['ns4:itemCategoryID'][0]  }}
        </div>
      </div>
      <div class="ticket-info-row">
        <div class="ticket-info-title"><b>Type</b></div>
        :
        <div class="ticket-info-value" v-if="this.viewTicketInfo['ns4:itemTypeID']">
           {{ this.viewTicketInfo['ns4:itemTypeID'][0] }}
        </div>
      </div>
      <div class="ticket-info-row">
        <div class="ticket-info-title"><b>Subtype</b></div>
        :
        <div class="ticket-info-value" v-if="this.viewTicketInfo['ns4:itemSubTypeID']">
           {{ this.viewTicketInfo['ns4:itemSubTypeID'][0] }}
        </div>
      </div>
      <div class="ticket-info-row">
        <div class="ticket-info-title"><b>Status</b></div>
        :
        <div class="ticket-info-value" v-if="this.viewTicketInfo['ns4:StatusList']">
           {{ this.viewTicketInfo['ns4:StatusList'][0]['ns4:ItemStatus'][0]['ns4:subStatus'][0] }}
        </div>
      </div>
      <div class="ticket-info-row">
        <div class="ticket-info-title"><b>Age/Resolution Time</b></div>
        :
        <div class="ticket-info-value" v-if="this.viewTicketInfo['ns4:targetResolutionDate']">
           {{  new Date(this.viewTicketInfo['ns4:targetResolutionDate'][0])
                        .toDateString()
                        .substring(4, 16) +
                      " " +
                      new Date(this.viewTicketInfo['ns4:targetResolutionDate'][0]).toLocaleTimeString()
                       }}
        </div>
      </div>
      <div class="ticket-info-row">
        <div class="ticket-info-title"><b>Created By</b></div>
        :
        <div class="ticket-info-value" v-if="this.viewTicketInfo['ns4:openedByGroup']">
           {{ this.viewTicketInfo['ns4:openedByGroup'][0]['ns4:assignedGroup'][0] }}
        </div>
      </div>
     


      </div>
    </a-drawer>
    <!-- EDIT CUSTOMER DETAILS DRAWER -->
    <a-drawer
      title="Edit Customer Details"
      placement="right"
      :width="500"
      :visible="custEditVisible"
      @close="closeEditCustDrawer"
    >
      <a-form-model
        :model="editForm"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="Edit Email">
          <a-input v-model="editForm.email" />
        </a-form-model-item>
        <a-form-model-item label="Edit RMN">
          <a-input v-model="editForm.rmn" />
        </a-form-model-item>
        <!-- <a-form-model-item label="Edit GST">
          <a-input v-model="editForm.gst" />
        </a-form-model-item> -->
      </a-form-model>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button @click="successMsg" type="primary"> Submit </a-button>
        <a-button @click="closeEditCustDrawer" style="margin-left: 10px">
          Cancel
        </a-button>
      </a-form-model-item>
    </a-drawer>
    <!-- VIEW TICKET INTERACTION HISTORY DRAWER -->
    <a-drawer
      title="View Ticket Interaction"
      placement="right"
      :width="720"
      :visible="ticketInteractionVisible"
      @close="onTicketInteractionClose"
    >
      <div class="ticket-info-row">
        <div class="ticket-info-title"><b>Interaction ID </b></div>
        :
        <div class="ticket-info-value">
          {{ this.ticketIntData.Interaction_Id }}
        </div>
      </div>
      <div class="ticket-info-row">
        <div class="ticket-info-title"><b>Interaction Mode </b></div>
        :
        <div class="ticket-info-value">{{ this.ticketIntData.Name }}</div>
      </div>
      <div class="ticket-info-row">
        <div class="ticket-info-title"><b>Category </b></div>
        :
        <div class="ticket-info-value">
          {{ this.ticketIntData.Category }}
        </div>
      </div>
      <div class="ticket-info-row">
        <div class="ticket-info-title"><b>Interaction Type </b></div>
        :
        <div class="ticket-info-value">
          {{ this.ticketIntData.Interaction_Type }}
        </div>
      </div>
      <div class="ticket-info-row">
        <div class="ticket-info-title"><b>Interaction Subtype </b></div>
        :
        <div class="ticket-info-value">
          {{ this.ticketIntData.Interaction_Subtype }}
        </div>
      </div>
      <div class="ticket-info-row">
        <div class="ticket-info-title"><b>Resolution Code </b></div>
        :
        <div class="ticket-info-value">
          {{ this.ticketIntData.Resolution_Code }}
        </div>
      </div>
      <div class="ticket-info-row">
        <div class="ticket-info-title"><b>Interaction Message </b></div>:
        <div class="ticket-info-value">
          {{ this.ticketIntData.Interaction_Message }}
        </div>
      </div>
      <div class="ticket-info-row">
        <div class="ticket-info-title"><b>Interaction Outcome </b></div>:
        <div class="ticket-info-value">
          {{ this.ticketIntData.Interaction_Outcome }}
        </div>
      </div>
      <div class="ticket-info-row">
        <div class="ticket-info-title"><b>Added By </b></div>:
        <div class="ticket-info-value">
          {{ this.ticketIntData.CreatedBy }}
        </div>
      </div>
    </a-drawer>
    <!-- VIEW ALL ORDERS DRAWER -->
    <a-drawer
      title="View All Orders"
      placement="right"
      :width="600"
      :visible="ordersViewerVisible"
      @close="onViewOrdersClose"
    >
      <a-list item-layout="vertical" :data-source="this.lastOrder.allOrders">
        <a-list-item slot="renderItem" slot-scope="item">
        
         <a-row>
              <a-col style="padding: 2px;">
                  <label class="zw-field-title">Order ID : </label>
                  <div  style="word-wrap: break-word; float: right;">{{item.orderID}}</div>
              </a-col>
              <a-col style="padding: 2px;">
                 <label class="zw-field-title">Requested Date : </label>
                 <div  style="word-wrap: break-word; float: right;">
                     {{
                      new Date(item.requestDate)
                        .toDateString()
                        .substring(4, 16) +
                      " " +
                      new Date(item.requestDate).toLocaleTimeString()
                       }}</div>
              </a-col>
              <a-col style="padding: 2px;">
                 <label class="zw-field-title">Order Status : </label>
                 <div  style="word-wrap: break-word; float: right;">{{item.orderStatus}}</div>
              </a-col>
              <a-col style="padding: 2px;">
                 <label class="zw-field-title">Order Type : </label>
                 <div  style="word-wrap: break-word; float: right;">{{item.orderType}}</div>
              </a-col>
              <a-col style="padding: 2px;">
                 <label class="zw-field-title">Order Channel : </label>
                 <div  style="word-wrap: break-word; float: right;">{{item.orderChannel}}</div>
              </a-col>
              
        </a-row>

          <a-list-item-meta>
           
            <!--<div v-if="item.orderID">
             1 {{ item.orderID}}
            </div> -->
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </a-drawer>
  </div>
</template>

<script>

import fs from "fs";
import { parseString } from "xml2js";


export default {
  mounted() {
    this.customerIDprop = this.$route.params.customerID;
    this.onLoadFunction();
    console.log(this.$route.params.customerID);
  },
  // props: ["customerIDprop"],
  data() {
    return {
      customerIDprop: "",
      current: ["mail"],
      custSpinning: false,
      planSpinning: false,
      ticketSpinning: false,
      form: this.$form.createForm(this),
      visible: false,
      ticketviewerVisible: false,
      ticketVisible: false,
      custEditVisible: false,
      ordersViewerVisible: false,
      isActive : false,
      hasError : false,
      custInfo: {
        custName: "Customer Name",
        custStatus: "NA",
        custID: "NA",
        acctID: "NA",
        subsID: "NA",
        custEmail: "NA",
        custRMN: "NA",
        custAltno: "NA",
        custLandno: "NA",
        custDOB: "NA",
        custType: "NA",
        networkIdentifier: "NA",
        custInstAddr: "NA",
        custBillAddr: "NA",
        safeCustody : "N"
      },
      planInfo: {
        plan: "NA",
        speed: "NA",
        dataQuota: "NA",
        validity: "NA",
        voiceEnabled: "N",
        custActDate: "NA",
        planActDate: "NA",
        nxtRechDate: "NA",
        planExpDate: "NA",
        wallBal: "NA",
        secDepAmt: "NA",
        nxtRecAmt: "NA",
        addOnAttach: "NA",
        multiplier: "NA",
        dataAvailPercent: 0,
        dataDownPercent: 0,
        dataUplPercent: 0,
        hoverAvailData: "",
        hoverDownData: "",
        hoverUplData: "",
        totData: 0,
        baseQuota: 0,
        consumedData: 0,
      },
      lastOrder: {
        orderID: "",
        serviceType: "",
        orderType: "",
        orderStatus: "",
        orderLineTyp: "",
        custReqDate: "",
        allOrders: [],
      },
      ticketHistory: [],
      deskTickets: [],
      ticketStartIndx: 0,
      ticketEndIndx: 5,
      notifData: "",
      ticketCreation: {
        tickCategory: "",
        tickSource: "Inbound",
        tickType: "",
        tickTypeList: [],
        tickSubType: "",
        tickSubTypeList: [],
        tickResolution: "",
        tickResolutionList: [],
        tickOutcome: "",
        tickDescrip: "",
      },
      viewTicketInfo: {},
      viewTicketCF: {},
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      editForm: {
        email: "",
        rmn: "",
        gst: "",
      },
      ticketInterationList: [],
      ticketInteractionVisible: false,
      ticketIntData: {},
      notificationVisibility: "block !important",
      hobsAndDeskTicketTrigger : true,
    };
  },
  methods: {
    // on load function
    onLoadFunction() {
      console.log("onload prop", this.customerIDprop);
      ZOHO.embeddedApp.init().then(() => {
        console.log("entered onload zoho init fn");
        // this.customerIDprop = this.$route.params.customerID;
        if (this.customerIDprop) {
          this.refreshCustInfo(this.customerIDprop);
          this.refreshPlanInfo(this.customerIDprop);
          this.refreshLastOrder(this.customerIDprop);
          this.refreshTicketHistory(this.customerIDprop);
          this.refreshNotification(this.customerIDprop);
          this.refreshTicketInteraction(this.customerIDprop);
        }
      });
    },
    GetChartURL()
    {
      return "	https://quickchart.io/chart?c=%7B%0A%20%20%22type%22%3A%20%22outlabeledPie%22%2C%0A%20%20%22data%22%3A%20%7B%0A%20%20%20%20%22labels%22%3A%20%5B%22Upload%22%2C%20%22Download%22%5D%2C%0A%20%20%20%20%22datasets%22%3A%20%5B%7B%0A%20%20%20%20%20%20%20%20%22backgroundColor%22%3A%20%5B%22%23FF3784%22%2C%20%22%2336A2EB%22%5D%2C%0A%20%20%20%20%20%20%20%20%22data%22%3A%20%5B"+this.planInfo.dataDownPercent+"%2C%20"+this.planInfo.dataUplPercent+"%5D%0A%20%20%20%20%7D%5D%0A%20%20%7D%2C%0A%20%20%22options%22%3A%20%7B%0A%20%20%20%20%22plugins%22%3A%20%7B%0A%20%20%20%20%20%20%22legend%22%3A%20false%2C%0A%20%20%20%20%20%20%22outlabels%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22text%22%3A%20%22%25l%20%25p%22%2C%0A%20%20%20%20%20%20%20%20%22color%22%3A%20%22white%22%2C%0A%20%20%20%20%20%20%20%20%22stretch%22%3A%2035%2C%0A%20%20%20%20%20%20%20%20%22font%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22resizable%22%3A%20true%2C%0A%20%20%20%20%20%20%20%20%20%20%22minSize%22%3A%2012%2C%0A%20%20%20%20%20%20%20%20%20%20%22maxSize%22%3A%2018%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D"
    },
    RenderData(bytes)
    {
      var decimals=2;
      if (bytes === 0) 
      return '0 Bytes';
      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    },
    // refresh icon - spinning in each tab
    changeSpinning(module) {
      if (module) {
        if (module == "cust") {
          this.custSpinning = !this.custSpinning;
        } else if (module == "plan") {
          this.planSpinning = !this.planSpinning;
        } else if (module == "ticket") {
          this.ticketSpinning = !this.ticketSpinning;
        }
      }
    },
    // call customer details api call
    refreshCustInfo(getCustID) {
      var callCustSpinning = this;
      callCustSpinning.changeSpinning("cust");
      setTimeout(function () {
        callCustSpinning.changeSpinning("cust");
      }, 500);
      var updateCust = this.custInfo;

      var getServStatusFunc = "ov_getservicestatus";
      var servreq_data = {
        arguments: JSON.stringify({
          custID: getCustID,
        }),
      };
      ZOHO.CRM.FUNCTIONS.execute(getServStatusFunc, servreq_data).then(
        function (servStatusApidata) {
          if (servStatusApidata.code == "success") {
            let servStatuXmlResp = servStatusApidata.details.output;
            console.log("Service Status",servStatuXmlResp);
            if (servStatuXmlResp != "" && servStatuXmlResp != undefined) {
              updateCust.custStatus = servStatuXmlResp;
            }
          }
        }
      );

      var custData = "";
      var subsData = "";
      var getCustFunc = "soap_api_test";
      var req_data = {
        arguments: JSON.stringify({
          custID: getCustID,
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
            custData = results;
            console.log("Customer Info : ", custData);
            let envelopeData = custData["soap:Envelope"]["soap:Body"][0];
            let getCustDetails =
              envelopeData["ns4:GetCustomerDetailsResponseMessage"][0][
                "ns4:customer"
              ][0];
            // console.log(getCustDetails);
            let getParty = getCustDetails.Party[0].IndividualName[0];
            let middleNameExists = Object.keys(getParty).includes("middleName");
            updateCust.custName =
              getParty.formOfAddress[0] +
              ". " +
              getParty.givenName[0] +
              (middleNameExists == true ? " " + getParty.middleName[0] : "") +
              " " +
              getParty.familyName[0];
            updateCust.custDOB =
              getCustDetails.Party[0].dateOfBirth[0].split("+05:30")[0];
            updateCust.custID = getCustDetails["ns6:CustomerID"][0];
            updateCust.custEmail =
              getCustDetails[
                "ns6:CustomerContact"
              ][0].ContactMedium[0].primaryEmailID[0];
            updateCust.custRMN =
              getCustDetails[
                "ns6:CustomerContact"
              ][0].ContactMedium[0].telephoneNumber[0];

            var customIndividualPartyList =
              getCustDetails.Party[0].CustomIndividualParty[0][
                "ns3:individualAttributes"
              ][0]["ns3:Attribute"];
            customIndividualPartyList.forEach((customInd, indx) => {
              let customIndValueExists =
                Object.keys(customInd).includes("ns3:attributeValue");
              // Alternate Number fetch and check
              if (
                customInd["ns3:attributeName"][0] == "alternateContactNumber" &&
                customIndValueExists == true
              ) {
                updateCust.custAltno = customInd["ns3:attributeValue"][0];
              } else {
                updateCust.custAltno = "NA";
              }

              // Landline Number fetch and check
              // if (
              //   customInd["ns3:attributeName"][0] == "landlineno" &&
              //   customIndValueExists == true
              // ) {
              //   updateCust.custLandno = customInd["ns3:attributeValue"][0];
              // } else {
              //   updateCust.custLandno = "NA";
              // }
            });

            var addrObj = getCustDetails["ns6:CustomerContact"][0].ContactMedium[0]
                .Address[0];
            let addLine1 = Object.keys(addrObj).includes("ns7:addressLine1");
            let addLine2 = Object.keys(addrObj).includes("ns7:addressLine2");
            let addLine4 = Object.keys(addrObj).includes("ns7:addressLine4");
            let addLine5 = Object.keys(addrObj).includes("ns7:addressLine5");
            let addLine6 = Object.keys(addrObj).includes("ns7:addressLine6");
            let addCity = Object.keys(addrObj).includes("ns7:city");
            let addState = Object.keys(addrObj).includes("ns7:stateOrProvince");
            let addPincode = Object.keys(addrObj).includes("ns7:pinCode");
            updateCust.custInstAddr =
              (addLine1 == true ? addrObj["ns7:addressLine1"][0] + "\n" : "") +
              (addLine2 == true ? addrObj["ns7:addressLine2"][0] + "\n" : "") +
              (addLine4 == true ? addrObj["ns7:addressLine4"][0] + "\n" : "") +
              (addLine5 == true ? addrObj["ns7:addressLine5"][0] + "\n" : "") +
              (addLine6 == true ? addrObj["ns7:addressLine6"][0] + "\n" : "") +
              (addCity == true ? addrObj["ns7:city"][0] + "\n" : "") +
              (addState == true
                ? addrObj["ns7:stateOrProvince"][0] + "\n"
                : "") +
              (addPincode == true ? addrObj["ns7:pinCode"][0] : "");

            // let instAddr =
            //   getCustDetails["ns6:CustomerContact"][0].ContactMedium[0]
            //     .Address[0];
            // updateCust.custInstAddr =
            //   instAddr["ns7:addressLine1"][0] +
            //   "\n" +
            //   instAddr["ns7:addressLine2"][0] +
            //   "\n" +
            //   instAddr["ns7:addressLine4"][0] +
            //   "\n" +
            //   instAddr["ns7:addressLine5"][0] +
            //   "\n" +
            //   instAddr["ns7:addressLine6"][0] +
            //   "\n" +
            //   instAddr["ns7:city"][0] +
            //   "\n" +
            //   instAddr["ns7:pinCode"][0] +
            //   "\n" +
            //   instAddr["ns7:stateOrProvince"][0];

            let getCustomCustList =
              getCustDetails["ns6:CustomCustomer"][0]["ns3:attributes"];
            getCustomCustList.forEach((customItem, indx) => {
              if (
                customItem["ns3:attributeName"][0] == "Network_Identifier" &&
                customItem["ns3:attributeValue"][0] != null
              ) {
                updateCust.networkIdentifier =
                  customItem["ns3:attributeValue"][0];
              }
            });
          });
        }
      });

      var getSubsFunc = "soap_api_test1";
      var req2_data = {
        arguments: JSON.stringify({
          custID: getCustID,
        }),
      };

      // get subscriber data api call
      ZOHO.CRM.FUNCTIONS.execute(getSubsFunc, req2_data).then(function (
        subsapidata
      ) {
        var subsXmlResp = subsapidata.details.output;
        // parsing xml data
        parseString(subsXmlResp, function (err1, subsresult) {
          subsData = subsresult;
          // console.log("get subsciber details : ", subsData);
          let subsenvelopeData = subsData["soap:Envelope"]["soap:Body"][0];
          let getSubsDetails =
            subsenvelopeData["ns4:GetSubscriberDetailsResponseMessage"][0][
              "ns4:subscriber"
            ];
          getSubsDetails.forEach((subs, indx) => {
            if (subs["ns6:subscriberStatus"][0] == "ACTIVE") {
              updateCust.subsID = subs["ns6:subscriberID"][0];
              if (subs["ns6:subscriberID"][0] != "") {
                updateCust.custType = "Existing";
              } else if (subs["ns6:subscriberID"][0] == "") {
                updateCust.custType = "New";
              }
              updateCust.acctID = subs["ns6:CustomerAccountID"][0];
                let getSubsProducts = subs["ns6:SubscriberProducts"];
                getSubsProducts.forEach((prods, indx) => {
            if (
              prods["ns8:productType"][0] == "Safe_Custody" ||
              prods["ns8:name"][0] == "Safe_Custody" || prods["ns8:name"][0] == "SAFE_CUSTODY"
            ) {
              updateCust.safeCustody = "N";
            } 

          });
            }
          });
        });
      });
    },
    //Update Ticket Trigger
    updateTicketTrigger(eventVal)
    {
      this.hobsAndDeskTicketTrigger = !this.hobsAndDeskTicketTrigger;
    },
    // call plan details api call
    refreshPlanInfo(getCustID1) {
      let getPlanArg = getCustID1;
      var callPlanSpinning = this;
      callPlanSpinning.changeSpinning("plan");
      setTimeout(function () {
        callPlanSpinning.changeSpinning("plan");
      }, 500);
      var updatePlan = this.planInfo;
      var getCustVar = this.custInfo;
      var getSubsFunc2 = "soap_api_test1";
      var req2_data2 = {
        arguments: JSON.stringify({
          custID: getPlanArg,
        }),
      };
      var subsData2 = "";
      var updatedSubsID = "";
      var updatedAcctID = "";
      var updatedCustID = "";
      var planRentalAmt = 0;

      //----------------------- get subscriber data api call   --------------------------------
      ZOHO.CRM.FUNCTIONS.execute(getSubsFunc2, req2_data2).then(function (
        subsapidata2
      ) {
        var subsXmlResp2 = subsapidata2.details.output;
        // parsing xml data
        parseString(subsXmlResp2, function (err2, subsresult2) {
          subsData2 = subsresult2;
          console.log("getSubsDetails2 : ", subsresult2);
          let subsenvelopeData2 = subsresult2["soap:Envelope"]["soap:Body"][0];
          let getSubscriberDetails2 =
            subsenvelopeData2["ns4:GetSubscriberDetailsResponseMessage"][0][
              "ns4:subscriber"
            ];

          // getSubsDetails2.forEach((subs, indx) => {
          //   if (subs["ns6:subscriberStatus"][0] == "ACTIVE") {
          //     updateCust.subsID = subs["ns6:subscriberID"][0];
          //   }
          // })
           
          var getSubsDetails2 ;
          for (const subs2 of getSubscriberDetails2) {
            if (subs2["ns6:subscriberStatus"][0] == "ACTIVE") {
              getSubsDetails2 = subs2;
            }
          }

          updatedSubsID = getSubsDetails2["ns6:subscriberID"][0];
          updatedAcctID = getSubsDetails2["ns6:CustomerAccountID"][0];
          updatedCustID = getSubsDetails2["ns6:CustomerId"][0];
          callPlanSpinning.getAccountDetails(updatedAcctID);
          var custActivationDate = new Date(
            getSubsDetails2["ns6:activatedDate"][0]
          );
          updatePlan.custActDate = custActivationDate
            .toDateString()
            .substring(4, 16);

          let getSubsProducts = getSubsDetails2["ns6:SubscriberProducts"];
          console.log(getSubsProducts);
          getSubsProducts.forEach((prods, indx) => {
            if (prods["ns8:productType"][0] == "PACKAGE") {
              var getPrice =
                prods["ns8:productPrice"][0]["ns8:ProductOfferingPrice"][0][
                  "ns8:price"
                ][0]["amount"][0];
              updatePlan.plan = "₹ " + getPrice;
              planRentalAmt = getPrice;
            }
            if (prods["ns8:productType"][0] == "PackageQoS") {
              var getSpeed = prods["ns8:name"][0];
              updatePlan.speed = getSpeed;
            }
            if (
              prods["ns8:productType"][0] == "Addon" ||
              prods["ns8:productType"][0] == "Voice"
            ) {
              updatePlan.voiceEnabled = "Y";
            }
            if (prods["ns8:productType"][0] == "Addon") {
              updatePlan.addOnAttach = prods["ns8:name"][0];
              updatePlan.multiplier = "Y";
            }

            //get lanline Val in customer info section
            if(prods["ns8:name"] == "Landline_Add-on" || prods["ns8:name"] == "Landline_Add-on VNO")
            {
              let getProductLandlineChar =prods["ns8:ProductCharacteristicValue"];
               getProductLandlineChar.forEach((prodsChar, indx_Char) => {
                 let ProductSpecChar = prodsChar["ns8:ProductSpecCharacteristic"][0];
                 if(ProductSpecChar["ns8:name"] == "DID_NUMBER")
                 {
                   let ProductSpecCharVal_Att = ProductSpecChar["ns8:ProductSpecCharacteristicValue"][0]["ns8:value"][0];
                   let ProductDID_Val = JSON.parse(ProductSpecCharVal_Att);
                   getCustVar.custLandno = ProductDID_Val.valueList.attrValueList[0];
                   console.log("DID Val",ProductDID_Val.valueList.attrValueList[0] );
                 }
               });
            }

            // if (prods.includes("ns8:productType")) {
            //   console.log("sdfgh")
            // }
          });

        });

        //------------------------- get service balance api call  ----------------------
        var getServBalFunc = "getservbalance";
        var servBal_arg = {
          arguments: JSON.stringify({
            subsID: updatedSubsID,
          }),
        };
        ZOHO.CRM.FUNCTIONS.execute(getServBalFunc, servBal_arg).then(function (
          servBalapidata
        ) {
          // var servBalResp = JSON.parse(servBalapidata.details.output);
          // updatePlan.dataQuota = servBalResp.DataQuota;
          // updatePlan.validity = servBalResp.Validity;
          // updatePlan.planExpDate = servBalResp.PlanExpiryDate;
          var subsXmlResp3 = servBalapidata.details.output;
          // parsing xml data
          parseString(subsXmlResp3, function (err3, subsresult3) {
            var subsData3 = subsresult3;
            console.log("subsData3 : ", subsData3);
            let subsenvelopeData3 =
              subsData3["ns2:getServiceBalanceQuotaResponse"]
                .basicPlanQuotaVO[0];
            let getDataquota =
              parseInt(subsenvelopeData3.currentUsageVO[0].downloadOctets[0]) +
              parseInt(subsenvelopeData3.currentUsageVO[0].uploadOctets[0]);
              let getBalVO = parseInt(subsenvelopeData3.balanceVO[0].totalOctets[0]);
              console.log(typeof(getDataquota));
 updatePlan.dataQuota =
              callPlanSpinning.RenderData(getDataquota) + "/ " + callPlanSpinning.RenderData(getBalVO) ;
            updatePlan.dataAvailPercent = (( parseInt(subsenvelopeData3.currentUsageVO[0].downloadOctets[0]) +
              parseInt(subsenvelopeData3.currentUsageVO[0].uploadOctets[0]))/parseInt(subsenvelopeData3.balanceVO[0].totalOctets[0]))*100;
            let downOctets =
              callPlanSpinning.RenderData(subsenvelopeData3.currentUsageVO[0].downloadOctets[0]);
            let uplOctets = callPlanSpinning.RenderData(subsenvelopeData3.currentUsageVO[0].uploadOctets[0]);
            updatePlan.consumedData = callPlanSpinning.RenderData(subsenvelopeData3.currentUsageVO[0].downloadOctets[0]);
            updatePlan.baseQuota = callPlanSpinning.RenderData(subsenvelopeData3.currentUsageVO[0].uploadOctets[0]);
            updatePlan.totData = callPlanSpinning.RenderData(subsenvelopeData3.balanceVO[0].totalOctets[0]);
            updatePlan.dataUplPercent =  Math.round((parseInt(subsenvelopeData3.currentUsageVO[0].uploadOctets[0])/getDataquota)*100);
            updatePlan.dataDownPercent = Math.round((parseInt(subsenvelopeData3.currentUsageVO[0].downloadOctets[0])/getDataquota)*100);
            var planActivationDate = new Date(
              subsData3[
                "ns2:getServiceBalanceQuotaResponse"
              ].basicPlanQuotaVO[0].startTime[0]
            );
            updatePlan.planActDate = planActivationDate
              .toDateString()
              .substring(4, 16);
            var planExpiringDate = new Date(
              subsData3[
                "ns2:getServiceBalanceQuotaResponse"
              ].basicPlanQuotaVO[0].endTime[0]
            );
            updatePlan.planExpDate = planExpiringDate
              .toDateString()
              .substring(4, 16);
            const diffTime = Math.abs(planActivationDate - planExpiringDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            updatePlan.validity = diffDays + " days";
          });
        });

        // get wallet balance api call
        var getWalBalFunc = "getwalletbalance";
        var walBal_arg = {
          arguments: JSON.stringify({
            acctID: updatedAcctID,
          }),
        };
        ZOHO.CRM.FUNCTIONS.execute(getWalBalFunc, walBal_arg).then(function (
          walBalapidata
        ) {
          console.log(walBalapidata);
          var walBalXmlResp = walBalapidata.details.output;
          let walBalAmt = walBalXmlResp / 100;
          updatePlan.wallBal = "₹ " + walBalXmlResp / 100;

          // console.log("walBalAmt : ", walBalAmt);
          // console.log(" planRentalAmt : ", planRentalAmt);
          if (walBalAmt > planRentalAmt) {
            updatePlan.nxtRecAmt = "₹ " + (walBalAmt - planRentalAmt);
          } else if (walBalAmt < planRentalAmt) {
            updatePlan.nxtRecAmt = "₹ " + (planRentalAmt - walBalAmt);
          }
        });

        // get security deposit api call
        var getSecDepFunc = "getsecdepamt";
        var secDep_arg = {
          arguments: JSON.stringify({
            custID: updatedCustID,
          }),
        };
        console.log("UpdatedCustID" + secDep_arg);
        ZOHO.CRM.FUNCTIONS.execute(getSecDepFunc, secDep_arg).then(function (
          secDepapidata
        ) {
          console.log(secDepapidata);
          var secDepResp = secDepapidata.details.output;
          updatePlan.secDepAmt = "₹ " + secDepResp;
        });

        // get end user api call
        var getEndUserFunc = "ov_getenduserdetails";
        var endUser_arg = {
          arguments: JSON.stringify({
            acctID: updatedAcctID,
          }),
        };
        ZOHO.CRM.FUNCTIONS.execute(getEndUserFunc, endUser_arg).then(function (
          endUserapidata
        ) {
          var endUserXmlResp = endUserapidata.details.output;
          // parsing xml data
          parseString(endUserXmlResp, function (err4, subsresult4) {
            console.log("endUserapidata : ", subsresult4);
            let subsenvelopeData4 =
              subsresult4["soap:Envelope"]["soap:Body"][0][
                "ns4:GetEndUserDetailsResponseMessage"
              ][0]["ns4:endUserDetails"][0]["ns14:networkActivationDate"][0];
            updatePlan.nxtRechDate = new Date(subsenvelopeData4)
              .toDateString()
              .substring(4, 16);
          });
        });
      });
    },
    getAccountDetails(accountID) {
      var getAcctFunc = "ov_getaccountdetails";
      var acct_data = {
        arguments: JSON.stringify({
          acctID: accountID,
        }),
      };
      var updateInfo = this;
      // get subscriber data api call
      ZOHO.CRM.FUNCTIONS.execute(getAcctFunc, acct_data).then(function (
        acctapidata
      ) {
        var acctXmlResp = acctapidata.details.output;
        // parsing xml data
        parseString(acctXmlResp, function (err2, acctresult) {
          let acctEnvelopeData =
            acctresult["soap:Envelope"]["soap:Body"][0][
              "ns4:GetAccountDetailsResponseMessage"
            ][0]["ns4:account"][0]["ns6:CustomerAccountContact"][0][
              "ns6:contact"
            ][0].ContactMedium[0];
          // console.log(acctEnvelopeData);
          if (acctEnvelopeData.ContactType[0] == "BILLING") {
            var addrObj = acctEnvelopeData.Address[0];
            let addLine1 = Object.keys(addrObj).includes("ns7:addressLine1");
            let addLine2 = Object.keys(addrObj).includes("ns7:addressLine2");
            let addLine4 = Object.keys(addrObj).includes("ns7:addressLine4");
            let addLine5 = Object.keys(addrObj).includes("ns7:addressLine5");
            let addCity = Object.keys(addrObj).includes("ns7:city");
            let addState = Object.keys(addrObj).includes("ns7:stateOrProvince");
            let addPincode = Object.keys(addrObj).includes("ns7:pinCode");
            updateInfo.custInfo.custBillAddr =
              (addLine1 == true ? addrObj["ns7:addressLine1"][0] + "\n" : "") +
              (addLine2 == true ? addrObj["ns7:addressLine2"][0] + "\n" : "") +
              (addLine4 == true ? addrObj["ns7:addressLine4"][0] + "\n" : "") +
              (addLine5 == true ? addrObj["ns7:addressLine5"][0] + "\n" : "") +
              (addCity == true ? addrObj["ns7:city"][0] + "\n" : "") +
              (addState == true
                ? addrObj["ns7:stateOrProvince"][0] + "\n"
                : "") +
              (addPincode == true ? addrObj["ns7:pinCode"][0] : "");
          }
        });
      });
    },
    // get last order api call function
    refreshLastOrder(getCustID) {
      var updateLastOrder = this.lastOrder;
      var getLastOrdFunc = "getlastorderstatus";
      var reqOrderdata = {
        arguments: JSON.stringify({
          custID: getCustID,
        }),
      };
      // get customer data api call
      ZOHO.CRM.FUNCTIONS.execute(getLastOrdFunc, reqOrderdata).then(function (
        lastOrderapidata
      ) {
        var orderJsonResp = JSON.parse(
          lastOrderapidata.details.output
        ).customerSummary;
        updateLastOrder.orderID = orderJsonResp.orderId;
        updateLastOrder.serviceType = orderJsonResp.serviceType;
        updateLastOrder.orderType = orderJsonResp.orderType;
        updateLastOrder.orderStatus = orderJsonResp.orderStatus;
        updateLastOrder.orderLineTyp = orderJsonResp.orderLineType;
        updateLastOrder.custReqDate = orderJsonResp.customerRequestedDate;
      });
    },
    // call ticket history api call function
    refreshTicketHistory(getCustID) {
      var callTickSpinning = this;
      callTickSpinning.changeSpinning("ticket");
      setTimeout(function () {
        callTickSpinning.changeSpinning("ticket");
      }, 500);
      var updateDeskTicketHistory = this.deskTickets;
      var updateTickHistory = this.ticketHistory;
      var tickHistJsonData = {};
      var ticketMap = {};
      var getTicHisFunc = "getticketdetails1";
      var reqTickdata = {
        arguments: JSON.stringify({
          custID: getCustID,
        }),
      };
      // get customer data api call
      ZOHO.CRM.FUNCTIONS.execute(getTicHisFunc, reqTickdata).then(function (
        tickHistapidata
      ) {
        var tickResp = JSON.parse(tickHistapidata.details.output);
        var ticketLists = tickResp.data;
        
        ticketLists.forEach((ticketLoop, indx) => {
          if (indx < 5 && updateDeskTicketHistory.length < 5) {
            var tickettit =
              "#" + ticketLoop.ticketNumber + " - " + ticketLoop.subject;
            var tickdate = ticketLoop.createdTime;
            var tickid = ticketLoop.id;
            ticketMap = {
              tickettitle: tickettit,
              ticketdate: tickdate,
              ticketID: tickid,
            };
            updateDeskTicketHistory.push(ticketMap);
          }
        });
       });
        var getHobsTicketFunc = "ov_gethobsticket";
        var hobsTickdata = {
          arguments: JSON.stringify({
            custID: getCustID,
          }),
        };
        // get customer data api call
        ZOHO.CRM.FUNCTIONS.execute(getHobsTicketFunc, hobsTickdata).then(
          function (hobsTicketapidata) {
            var tickXmlResp = hobsTicketapidata.details.output;
            parseString(tickXmlResp, function (err5, tickHistresult) {
              tickHistJsonData = tickHistresult;
              console.log(tickHistJsonData);
              let tickHistRoot =
                tickHistJsonData["soap:Envelope"]["soap:Body"][0][
                  "ns4:FindWorkItemResponse"
                ][0]["ns4:item"];
              tickHistRoot.forEach((tick, indx) => {
                if (indx < 5 && updateTickHistory.length < 5) {
                  // var tickettit =
                  //   tick["ns4:itemID"][0] +
                  //   " - " +
                  //   tick["ns4:itemSubTypeID"][0];
                  // var tickdate = tick["ns4:openDate"][0];
                  // ticketMap = { tickettitle: tickettit, ticketdate: tickdate };
                  updateTickHistory.push(tick);
                }
              });
               console.log("updateTickHistory" + updateTickHistory);
            });
          }
         
        );
     
    },
    // get notifications api call function
    refreshNotification(getCustID) {
      var updateNotif = this;
      var getNotifFunc = "ov_getnotifications";
      var reqNotidata = {
        arguments: JSON.stringify({
          custID: getCustID,
        }),
      };
      // get customer data api call
      ZOHO.CRM.FUNCTIONS.execute(getNotifFunc, reqNotidata).then(function (
        notifapidata
      ) {
        var notifJsonResp = notifapidata.details.output;
        console.log("notification : ", notifJsonResp);
        var notifData = notifJsonResp.split("},{")[0];
        
        var notifDataJson = JSON.parse(notifData);
        
        updateNotif.notifData = notifDataJson;
        
         if (notifDataJson.cid != null)
        // if (notifDataJson.results != null)
         {
            console.log("notification status : ", notifDataJson.ticketstatus);
           if(notifDataJson.ticketstatus == "Resolved" || notifDataJson.ticketstatus == "Clear")
           {
             console.log("1");
              updateNotif.hasError = false;
              updateNotif.isActive = true;
           }
           else if(notifDataJson.ticketstatus == "In Progress" || notifDataJson.ticketstatus == "In progress")
           {
             console.log("2");
             updateNotif.hasError = true;
             updateNotif.isActive = false;
           }
           else if(notifDataJson.ticketstatus != "In Progress" && notifDataJson.ticketstatus != "Resolved" && notifDataJson.ticketstatus != "Clear")
           {
             console.log("3");
             updateNotif.hasError = false;
             updateNotif.isActive = false;
           }
       
          updateNotif.notifData = notifDataJson;
        } else {
          updateNotif.notificationVisibility = "none !important";
        }
        console.log("notification Data : ",  updateNotif.notifData);
      });
    },
    parseDateTime(value) {
      var parsedDate = new Date(value);
      parsedDate = parsedDate.toDateString().substring(4, 16);
      return parsedDate;
    },
    onPageChange(data) {
      // console.log(data);
    },
    refreshTicketInteraction(getCustID) {
      var updateIntHist = this;
      var searchQuery = "(CustomerId:equals:" + getCustID + ")";
      ZOHO.CRM.API.searchRecord({
        Entity: "HOBS_Interaction_History",
        Type: "criteria",
        Query: searchQuery,
      }).then(function (ticketData) {
        // console.log(ticketData.data);
        var newHobsTicketList = [];
        var ticketDetails = ticketData.data;
        // console.log(ticketDetails);
        ticketDetails.forEach((tick, indx) => {
                if (indx < 5 && newHobsTicketList.length < 5) {
                  newHobsTicketList.push(tick);
                }
              });
              console.log("Final List");
              console.log( newHobsTicketList);
        // updateIntHist.ticketInterationList = ticketData.data;
         updateIntHist.ticketInterationList = newHobsTicketList;
        // if (ticketData.data[0].Probing_template_Steps != "Leave it blank") {
        //   tickCreateInfo.tickDescrip =
        //     ticketData.data[0].Probing_template_Steps;
        // }
      });
    },
    onTicketInteractionClose() {
      this.ticketInteractionVisible = false;
      this.ticketIntData = {};
    },
    viewTicketInteraction(interaction_id) {
      var updateTickInt = this;
      this.ticketInteractionVisible = true;
      this.ticketInterationList.forEach((ticketLoop, indx) => {
        if (ticketLoop.Interaction_Id == interaction_id) {
          updateTickInt.ticketIntData = ticketLoop;
        }
      });
    },
    successMsg() {
      this.$message.success("Edit Customer Response Submitted");
      this.custEditVisible = false;
    },
    // open drawer
    showDrawer() {
      this.visible = true;
    },
    showNewTicketDrawer() {
      this.ticketVisible = true;
      console.log("show ticket drawer");
      var updateTicketInfo = this.ticketCreation;
      updateTicketInfo.tickCategory = null;
      updateTicketInfo.tickType = null;
      updateTicketInfo.tickSubType = null;
      updateTicketInfo.tickDescrip = null;
      var getTypeFunc = "ov_gettypesubtype";
      var getType_data = {
        arguments: JSON.stringify({
          get_arg: "Get_Type",
        }),
      };
      ZOHO.CRM.FUNCTIONS.execute(getTypeFunc, getType_data).then(function (
        getTypeApidata
      ) {
        // console.log(getTypeApidata.details.output);
        if (getTypeApidata.code == "success") {
          let getTypeListResp = getTypeApidata.details.output;
          updateTicketInfo.tickTypeList = getTypeListResp.split(",");
        }
      });
    },
    categoryChange() {
      var getTicketInfo = this.ticketCreation;
      if (getTicketInfo.tickCategory == "Complaint") {
        var tickCat = "COMP";
      } else if (getTicketInfo.tickCategory == "Request") {
        var tickCat = "REQ";
      }
      var paramsMap1 =
        '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://telecom.tcs.com/tsbb/service"><soapenv:Header/><soapenv:Body><ser:tsbbGetTypeListRequest><lang>ENG</lang><category>' +
        tickCat +
        "</category><channel>SELFCARE</channel></ser:tsbbGetTypeListRequest></soapenv:Body></soapenv:Envelope>";

      var headerMap1 = { "Content-type": "application/soap+xml" };

      var request1 = {
        url: "http://103.195.200.17/tsbb-mobile-services/services/TsbbMobileService",
        body: paramsMap1,
        headers: headerMap1,
      };

      // ZOHO.CRM.HTTP.post(request1).then(function (data1) {
      //   // console.log("soap request");
      //   // console.log(data1);
      //   var input1 = data1;
      //   var reTagCatcher = /<soap:Body>[\s\S]*<\/soap:Body>/g;

      //   var output1 = input1.match(reTagCatcher);

      //   parseString(output1, function (err, xmlresults) {
      //     var xmlData =
      //       xmlresults["soap:Body"]["ns2:tsbbGetTypeListResponse"][0]
      //         .refDataList[0].refData;
      //     // console.log(xmlData);
      //     getTicketInfo.tickTypeList = xmlData;
      //   });
      // });
    },
    typeChange(type) {
      var getTicketInfo = this.ticketCreation;
      var getSubTypeFunc = "ov_gettypesubtype";
      var getSubType_data = {
        arguments: JSON.stringify({
          get_arg: "Get_SubType",
          get_type: getTicketInfo.tickType,
        }),
      };
      ZOHO.CRM.FUNCTIONS.execute(getSubTypeFunc, getSubType_data).then(
        function (getSubTypeApidata) {
          if (getSubTypeApidata.code == "success") {
            let getSubTypeListResp = getSubTypeApidata.details.output;
            getTicketInfo.tickSubTypeList = getSubTypeListResp.split(",");
          }
        }
      );
      // var paramsMap1 =
      //   '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://telecom.tcs.com/tsbb/service"><soapenv:Header/><soapenv:Body><ser:tsbbGetSubTypeListRequest><lang>ENG</lang><type>' +
      //   getTicketInfo.tickType +
      //   "</type><channel>SELFCARE</channel></ser:tsbbGetSubTypeListRequest></soapenv:Body></soapenv:Envelope>";

      // var headerMap1 = { "Content-type": "application/soap+xml" };

      // var request1 = {
      //   url: "http://103.195.200.17/tsbb-mobile-services/services/TsbbMobileService",
      //   body: paramsMap1,
      //   headers: headerMap1,
      // };

      // ZOHO.CRM.HTTP.post(request1).then(function (data1) {
      //   // console.log("soap request");
      //   // console.log(data1);
      //   var input1 = data1;
      //   var reTagCatcher = /<soap:Body>[\s\S]*<\/soap:Body>/g;

      //   var output1 = input1.match(reTagCatcher);

      //   parseString(output1, function (err, xmlresults) {
      //     var xmlData =
      //       xmlresults["soap:Body"]["ns2:tsbbGetSubTypeListResponse"][0]
      //         .refDataList[0].refData;

      //     getTicketInfo.tickSubTypeList = xmlData;
      //   });
      // });
    },
    subtypeChange(subtype) {
      this.getDescription();
      var getTicketInfo = this.ticketCreation;
      var getSubTypeFunc = "ov_gettypesubtype";
      var getSubType_data = {
        arguments: JSON.stringify({
          get_arg: "Get_ResolutionCode",
          get_type: getTicketInfo.tickType,
          get_subtype: getTicketInfo.tickSubType,
        }),
      };
      ZOHO.CRM.FUNCTIONS.execute(getSubTypeFunc, getSubType_data).then(
        function (getSubTypeApidata) {
          if (getSubTypeApidata.code == "success") {
            let getSubTypeListResp = getSubTypeApidata.details.output;
            getTicketInfo.tickResolutionList = getSubTypeListResp.split(",");
          }
        }
      );
    },
    resolutionChange() {
      var getTicketInfo = this.ticketCreation;
      var getSubTypeFunc = "ov_gettypesubtype";
      var getSubType_data = {
        arguments: JSON.stringify({
          get_arg: "Get_Outcome",
          get_type: getTicketInfo.tickType,
          get_subtype: getTicketInfo.tickSubType,
          get_resolcode: getTicketInfo.tickResolution,
        }),
      };
      ZOHO.CRM.FUNCTIONS.execute(getSubTypeFunc, getSubType_data).then(
        function (getSubTypeApidata) {
          // console.log(getSubTypeApidata);
          if (getSubTypeApidata.code == "success") {
            let getOutcome = getSubTypeApidata.details.output;
            getTicketInfo.tickOutcome = getOutcome;
            // console.log(getTicketInfo.tickOutcome);
          }
        }
      );
    },
    showAllOrders() {
      this.ordersViewerVisible = true;
      var getAllOrdersFunc = "ov_getallorders";
      var allorders_data = {
        arguments: JSON.stringify({
          custID: this.customerIDprop,
        }),
      };
      var updateOrder = this;
      ZOHO.CRM.FUNCTIONS.execute(getAllOrdersFunc, allorders_data).then(
        function (allOrdersApidata) {
          if (allOrdersApidata.code == "success") {
            var ordersXmlResp = allOrdersApidata.details.output;
            // parsing xml data to json
            parseString(ordersXmlResp, function (err, orderResults) {
              var orderRes = orderResults;
              console.log("orderResponse", orderRes);
              let envelopeData = orderResults["soap:Envelope"]["soap:Body"][0]["ns4:ViewOrderDetailsResponseMessage"][0]["ns4:order"];
              let allOrderTempList = [];
               envelopeData.forEach((orderLine, indx) => {
                  // var allOrderMap = {};
                 let orderHeader = orderLine["ns18:OrderHeader"][0];
                 
               var   allOrderMap = {orderID:orderHeader["ns18:orderID"][0],
               requestDate : orderHeader["ns18:customerRequestedDate"][0],
               orderStatus : orderHeader["ns18:orderStatus"][0],
               orderType: orderHeader["ns18:orderType"][0],
               orderChannel:orderHeader["ns18:orderChannel"][0]};
               console.log("allorderMap " , allOrderMap);
                 allOrderTempList.push(allOrderMap);
               });

              // var allOrdersList = [];
              updateOrder.lastOrder.allOrders = allOrderTempList;
              console.log("orderResponse Final", updateOrder.lastOrder.allOrders);
            });
          }
        }
      );
    },
    onViewOrdersClose() {
      this.ordersViewerVisible = false;
      this.lastOrder.allOrders = [];
    },
    viewTicketDrawer(ticketIDs) {
      
      this.ticketviewerVisible = true;
      var updateTicket = this;
      // hobs tickets
      if(this.hobsAndDeskTicketTrigger == true)
      {
         updateTicket.ticketHistory.forEach((prods, indx) => {
        if (prods["ns4:itemID"][0] == ticketIDs) {
          updateTicket.viewTicketInfo = prods;
          console.log("viewTicketInfo -- ", updateTicket.viewTicketInfo);
        }
      });
      }
      else if(this.hobsAndDeskTicketTrigger == false)
      {
      var getTicketInfoFunc = "ov_getticketinfo";
      var ticketinfo_data = {
        arguments: JSON.stringify({
          ticketID: ticketIDs,
        }),
      };
      
      ZOHO.CRM.FUNCTIONS.execute(getTicketInfoFunc, ticketinfo_data).then(
        function (ticketInfoApidata) {
          // console.log(ticketInfoApidata);
          if (ticketInfoApidata.code == "success") {
            let ticketdataparsing = JSON.parse(
              ticketInfoApidata.details.output
            );
            updateTicket.viewTicketInfo = ticketdataparsing;
            updateTicket.viewTicketCF = ticketdataparsing.customFields;
            // console.log("CustFields" + updateTicket.viewTicketCF);
          }
        }
      );
    }
    },
    getDescription() {
      var tickCreateInfo = this.ticketCreation;
      var tickettypename = tickCreateInfo.tickType;
      var ticketsubtypename = tickCreateInfo.tickSubType;
      // tickCreateInfo.tickTypeList.forEach((prods, indx) => {
      //   if (prods.refValue == tickCreateInfo.tickType) {
      //     tickettypename = prods.displayText[0];
      //   }
      // });
      // tickCreateInfo.tickSubTypeList.forEach((sprods, indx) => {
      //   if (sprods.refValue == tickCreateInfo.tickSubType) {
      //     ticketsubtypename = sprods.displayText[0];
      //   }
      // });

      // var valObj = tickCreateInfo.tickTypeList.displayText[0].filter(function (elem) {
      //   if (elem[0] == "COMP-CMMNT_NT_FLFD") return elem[0];
      //   console.log(valObj)
      // });
      if (
        tickCreateInfo.tickCategory != "" &&
        tickCreateInfo.tickType != "" &&
        tickCreateInfo.tickSubType != ""
      ) {
        var searchQuery =
          "((Category:equals:" +
          tickCreateInfo.tickCategory +
          ")and(Type:equals:" +
          tickettypename +
          ")and(SubType:equals:" +
          ticketsubtypename +
          "))";
        ZOHO.CRM.API.searchRecord({
          Entity: "Ticketing_Probing_Templat",
          Type: "criteria",
          Query: searchQuery,
        }).then(function (ticketData) {
          // console.log(ticketData.data);
          if (ticketData.data[0].Probing_template_Steps != "Leave it blank") {
            tickCreateInfo.tickDescrip =
              ticketData.data[0].Probing_template_Steps;
          }
        });
      }
    },
    onClose() {
      this.visible = false;
    },
    onTicketClose() {
      this.ticketVisible = false;
    },
    onTicketSubmit() {
      var tickCreateInfo = this.ticketCreation;
      var tickettypename = "";
      var ticketsubtypename = "";
      // tickCreateInfo.tickTypeList.forEach((prods, indx) => {
      //   if (prods.refValue == tickCreateInfo.tickType) {
      //     tickettypename = prods.displayText[0];
      //   }
      // });
      // tickCreateInfo.tickSubTypeList.forEach((sprods, indx) => {
      //   if (sprods.refValue == tickCreateInfo.tickSubType) {
      //     ticketsubtypename = sprods.displayText[0];
      //   }
      // });
      var paramsMap1 =
        '{"CustomerID" :"' +
        this.custInfo.custID +
        '",  "AccountID" : "' +
        this.custInfo.acctID +
        '",  "SubscriberID" : "' +
        this.custInfo.subsID +
        '",  "TicketType" : "' +
        tickCreateInfo.tickType +
        '", "TicketSubType":"' +
        tickCreateInfo.tickSubType +
        '", "Description": "' +
        this.ticketCreation.tickDescrip +
        '", "CustEmail": "' +
        this.custInfo.custEmail +
        '", "TicketCategory": "' +
        this.ticketCreation.tickCategory +
        '" }';
      var headerMap1 = {
        auth_type: "apikey",
        zapikey:
          "1003.b6c97b75b50b3c8b2f99c1b6348c679b.7288c289052526cfe3b0d17061e27293",
      };
      var request1 = {
        url: "https://www.zohoapis.in/crm/v2/functions/ov_createticket/actions/execute?auth_type=apikey&zapikey=1003.b6c97b75b50b3c8b2f99c1b6348c679b.7288c289052526cfe3b0d17061e27293",
        body: paramsMap1,
        headers: headerMap1,
      };

      var updateTickHistory = this;
      ZOHO.CRM.HTTP.post(request1).then(function (tickAPIdata) {
        // console.log("function request");
        // console.log("ticket creation : ", tickAPIdata);
        const obj = JSON.parse(tickAPIdata);
        // console.log(obj);
        if (obj.code == "success") {
          let ticketXMLresp = obj.details.output;
          parseString(ticketXMLresp, function (err, ticketResults) {
            var newTicketData = ticketResults;
            // console.log(newTicketData);
            let envelopeData =
              newTicketData["soap:Envelope"]["soap:Body"][0][
                "ns4:CreateWorkItemResponse"
              ][0];
            let ticket_no = envelopeData["ns4:itemID"][0];
            var parsedDate = new Date();
            var ticketMap = {
              tickettitle:
                "#" +
                ticket_no +
                " - " +
                tickCreateInfo.tickType +
                "-" +
                tickCreateInfo.tickSubType,
              ticketdate: parsedDate,
              ticketID: ticket_no,
            };
            updateTickHistory.ticketHistory.pop();
            // console.log(updateTickHistory.ticketHistory);
            updateTickHistory.ticketHistory = [ticketMap].concat(
              updateTickHistory.ticketHistory
            );
          });

          // updateTickHistory.push(ticketMap);
          // var tempTickHist = updateTickHistory;
          // updateTickHistory = ticketMap;
          // tempTickHist.forEach((tick, indx) => {
          //     if (indx < 4 && updateTickHistory.length < 4) {
          //       ticketMap1 = { tickettitle: tick.tickettitle, ticketdate: tick.ticketdate };
          //       updateTickHistory.push(ticketMap1);
          //     }
          //   });
        }
      });

      this.ticketVisible = false;
    },
    onViewTicketClose() {
      this.ticketviewerVisible = false;
      this.viewTicketInfo = {};
      this.viewTicketCF = {};
    },
    showEditCustDrawer() {
      this.custEditVisible = true;
    },
    closeEditCustDrawer() {
      this.custEditVisible = false;
    },
  },
};
</script>

<style>
/* .ant-row {
  padding-bottom: 16px;
} */

label.zw-field-title {
  font-weight: 700;
}

/* .zw-main-container {
  height: 325px;
} */

.ant-card-head {
  background: #07385d;
  /* background: linear-gradient(
      90deg,
      rgb(223, 0, 147) 0%,
      33.6872%,
      rgb(154, 0, 192) 61.3588%,
      76.0085%,
      rgb(110, 0, 219) 100%
    )
    0 100% no-repeat !important; */
}
.ant-card-head-title {
  color: white;
}

.ant-card-extra a {
  color: white;
}

ul.ant-menu.ant-menu-horizontal.ant-menu-root.ant-menu-light {
  background: linear-gradient(
      90deg,
      rgb(223, 0, 147) 0%,
      33.6872%,
      rgb(154, 0, 192) 61.3588%,
      76.0085%,
      rgb(110, 0, 219) 100%
    )
    0 100% no-repeat !important;
  color: white;
}

/* .zw-firstrow-col {
  height: 474px;
} */

.ant-card-head {
  height: 48px;
}

.ant-card-head-wrapper {
  height: 100%;
}

.viewAll-container {
  text-align: center;
  height: 75px;
  display: flex;
  align-items: end;
  justify-content: center;
}
.viewAll {
  width: 100%;
  border-top: 1px solid #0000000f;
  border-bottom: 1px solid #0000000f;
  padding: 5px 0px;
}
/* .spin-content {
  border: 1px solid #91d5ff;
  background-color: #e6f7ff;
  padding: 30px;
} */

i.available.anticon.anticon-minus-square {
  color: #52c41a;
}
i.available.anticon.anticon-minus-square svg {
  background: #52c41a;
}
i.downloaded.anticon.anticon-minus-square {
  color: red;
}
i.downloaded.anticon.anticon-minus-square svg {
  background: red;
}
i.uploaded.anticon.anticon-minus-square {
  color: #1890ff;
}
i.uploaded.anticon.anticon-minus-square svg {
  background: #1890ff;
}
.separate-legends {
  display: flex;
  align-items: center;
  margin-right: auto;
}
.ant-progress-line {
  margin-bottom: 5px;
}

.ant-select-arrow .ant-select-arrow-icon {
  font-size: 16px;
}
.ant-form-item {
  margin-bottom: 10px;
}

/* carousel styles */
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel >>> .custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
}
.ant-carousel >>> .custom-slick-arrow:before {
  display: none;
}
.ant-carousel >>> .custom-slick-arrow:hover {
  opacity: 0.5;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}

.ticket-info-row {
  display: flex;
  margin-bottom: 10px;
}

.ticket-info-title {
  width: 30%;
}
.ticket-info-value {
  width: 65%;
  margin-left: auto;
}

.anticon-left,
.anticon-right {
  font-size: 15px !important;
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
