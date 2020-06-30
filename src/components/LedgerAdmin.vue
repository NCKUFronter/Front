<template>
  <v-container fluid class="scroll" style="width:100vw;height:100vh;">
    <v-row>
      <v-flex xs12 sm4 md3>
        <v-btn
          outlined
          style="border-radius:2em;width:100px;"
          class="mx-4 mb-2"
          @click="createModal=true"
        >新增帳本</v-btn>
      </v-flex>
    </v-row>
    <v-row style="padding-bottom:50vh">
      <v-flex
        xs12
        sm4
        md3
        v-for="(ledger,index) of adminLedgers"
        :key="'admin_'+ledger._id+index"
        class="ma-3"
      >
        <v-card flat style="border-radius:2em">
          <v-card flat style="background-color:#08112c;position: relative;">
            <v-img
              v-if="!ledger.photo"
              src="../assets/fronter/account/planet3.png"
              sizes="50%"
              height="180px"
            ></v-img>
            <v-img
              v-else-if="ledger.photo.substring(0,5)=='https'"
              :src="ledger.photo"
              sizes="50%"
              height="180px"
            ></v-img>
            <v-img v-else :src="baseURL+ledger.photo" sizes="50%" height="180px"></v-img>
            <v-card-title
              style="position:absolute;left:0;bottom:0;font-size:18px"
              class="pa-0 ma-0 ml-3"
            >{{ledger.ledgerName}}</v-card-title>
          </v-card>
          <div style="background-color:#0c193f;position:relative">
            <v-card-text
              class="pa-0 ma-0 ml-3 pt-1"
              style="font-size:12px"
            >帳本人數: {{ledger.users.length}}</v-card-text>
            <v-flex class="px-4 pb-2">
              <!-- if ledger.users.length<=6 -->
              <v-avatar
                v-for="user in ledgerUser(ledger.users)"
                :key="ledger._id + user._id"
                size="22"
                class="ma-1"
                style="background-color:#3d404e"
              >
                <img :src="user.photo" />
              </v-avatar>
              <!-- v-if="ledger.users.length>6"  -->
              <div v-if="ledger.users.length>6" style="position:relative;top:6px;display:inline">
                <v-avatar
                  size="22"
                  class="ma-1"
                  style="background-color:#26282d;position: absolute;left:10px"
                ></v-avatar>
                <v-avatar
                  size="22"
                  class="ma-1"
                  style="background-color:#32343e;position: absolute;left:5px"
                ></v-avatar>
                <v-avatar
                  size="22"
                  class="ma-1"
                  style="background-color:#3d404e;;position: absolute;font-size:0.5em"
                >+{{ledger.users.length-4}}</v-avatar>
              </div>
            </v-flex>
            <!-- <v-card-actions
              v-if="$vuetify.breakpoint.xsOnly"
              class="pa-0 ma-0"
              style="position:absolute;right:1vw;bottom:8vh;"
            >
              <v-spacer />
              <v-btn
                class="pa-1 mb-1 ma-0 elevation-0"
                style="background-color:transparent;height:fit-content;width:fit-content;border-radius:0;position:absolute;right:1vw;bottom:-6vh;"
                @click.stop="editDrawer(index)"
              >
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
              <v-navigation-drawer
                v-model="drawer[index]"
                v-if="drawer[index]"
                floating
                hide-overlay
                temporary
                right
                width="fit-content"
                color="transparent"
                class="elevation-0"
                :key="index"
              >
                <v-list>
                  <v-list-item class="pa-0" style="min-height:40px">
                    <v-btn
                      color="transparent"
                      class="ma-0 px-1 pa-0 elevation-0"
                      style="font-size:15px;height:fit-content;width:fit-content;border-radius:0;border:none;"
                      v-on:click="invite(ledger)"
                    >邀請</v-btn>
                  </v-list-item>
                  <v-list-item class="pa-0" style="min-height:40px">
                    <v-btn
                      color="transparent"
                      class="ma-0 px-1 pa-0 elevation-0"
                      style="font-size:15px;height:fit-content;width:fit-content;border-left:1px solid white;border-radius:0;border:none;"
                      v-on:click="out(ledger)"
                    >剔除</v-btn>
                  </v-list-item>
                  <v-list-item class="pa-0" style="min-height:40px">
                    <v-btn
                      color="transparent"
                      class="ma-0 px-1 pa-0 elevation-0"
                      style="font-size:15px;height:fit-content;width:fit-content;border-left:1px solid white;border-radius:0;border:none;"
                      v-on:click="editLedger(ledger)"
                    >編輯</v-btn>
                  </v-list-item>
                  <v-list-item class="pa-0" style="min-height:40px">
                    <v-btn
                      color="transparent"
                      class="ma-0 px-1 pa-0 elevation-0"
                      style="font-size:15px;height:fit-content;width:fit-content;border-left:1px solid white;border-radius:0;border:none;"
                      v-on:click="deleteLedger(ledger)"
                    >刪除</v-btn>
                  </v-list-item>
                </v-list>
              </v-navigation-drawer>

            </v-card-actions>-->
            <!-- if ledger.users.length>6 -->
          </div>
        </v-card>
        <v-card-actions class="ma-0 mt-1 pa-0 px-7">
          <v-spacer />
          <v-btn
            class="ma-0 px-1 pa-0 elevation-0"
            style="font-size:12px;height:fit-content;width:fit-content;border-radius:0;"
            v-on:click="invite(ledger)"
          >邀請</v-btn>
          <v-btn
            class="ma-0 px-1 pa-0 elevation-0"
            style="font-size:12px;height:fit-content;width:fit-content;border-left:1px solid white;border-radius:0;"
            v-on:click="out(ledger)"
          >剔除</v-btn>
          <v-btn
            class="ma-0 px-1 pa-0 elevation-0"
            style="font-size:12px;height:fit-content;width:fit-content;border-left:1px solid white;border-radius:0;"
            v-on:click="editLedger(ledger)"
          >編輯</v-btn>
          <v-btn
            class="ma-0 px-1 pa-0 elevation-0"
            style="font-size:12px;height:fit-content;width:fit-content;border-left:1px solid white;border-radius:0;"
            v-on:click="deleteLedger(ledger)"
          >刪除</v-btn>
        </v-card-actions>
      </v-flex>

      <!-- 建立ledge model -->
      <v-dialog v-model="createModal" width="unset">
        <v-card class="modal" color="#3D404E" v-if="createModal">
          <v-card-title class="px-4" v-if="!editModal">新建帳本</v-card-title>
          <v-card-title class="px-4" v-else>編輯帳本 {{newLedgerName}}</v-card-title>
          <v-text-field
            prepend-icon="mdi-book"
            v-model="newLedgerName"
            label="請輸入帳本名稱"
            class="px-4"
          ></v-text-field>
          <v-file-input
            class="px-4"
            multiple
            accept="image/*"
            label="image upload"
            @change="onAddFiles"
          ></v-file-input>
          <v-card-actions>
            <v-spacer />
            <v-btn v-if="!editModal" class="button" outlined @click="createLedger">新增</v-btn>
            <v-btn v-else class="button" outlined @click="patchLedger">修改</v-btn>
            <v-btn class="button" outlined @click="cancelCreate">取消</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- 邀請modal -->
      <v-dialog v-model="inviteModal" width="unset">
        <v-card class="modal" color="#3D404E" v-if="inviteModal">
          <v-card-title>{{inviteLedger.ledgerName}}</v-card-title>
          <v-text-field v-model="inputEmail" label="請輸入邀請者email" type="email" class="px-4"></v-text-field>
          <v-card-text class="px-4 pb-1">正在邀請</v-card-text>
          <v-card flat class="px-4" color="#3D404E" max-height="12vh">
            <v-avatar
              v-for="(user,index) in inviteLedger.invitees"
              :key="index"
              size="22"
              class="ma-1"
              style="background-color:#3d404e;border-radius:50%"
            >
              <img :src="user.photo" />
            </v-avatar>
          </v-card>
          <v-card-actions>
            <v-spacer />
            <v-btn class="button" outlined v-on:click="confirmInvite()">邀請</v-btn>
            <v-btn class="button" outlined v-on:click="inviteModal=!inviteModal">取消</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- 踢人out -->
      <v-dialog persistent v-model="outModal" width="unset">
        <v-card class="modal" color="#3D404E" v-if="outModal">
          <v-card-title>剔除使用者</v-card-title>
          <v-card-text>帳本名: {{outLedger.ledgerName}}</v-card-text>
          <v-select
            :items="notAdminUsers(outLedger)"
            v-model="outUser"
            label="選擇要離開的人"
            outlined
            item-text="name"
            item-value="_id"
            class="px-4"
          ></v-select>
          <v-card-actions>
            <v-spacer />
            <v-btn class="button" outlined v-on:click="confirmOut()">刪除</v-btn>
            <v-btn class="button" outlined v-on:click="outModal=!outModal">取消</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import { confirmed } from "vee-validate/dist/rules";
import { ignoreNotLoginError } from "../utils";
export default {
  name: "ledgerAdmin",
  inject: ["$alert", "$confirm", "$notification"],
  data: () => ({
    drawer: [false, false, false, false, false, false],

    inviteModal: false,
    inviteLedger: null,
    inputEmail: "",

    outModal: false,
    outUser: "",
    outLedger: null,

    createModal: false,
    newLedgerName: "",
    ledgerPhotoChange: false,
    newLedger: new FormData(),

    editModal: false,
    editLedgerId: -1
  }),
  created() {
    // console.log(this.adminLedgers)
  },
  props: ["adminLedgers"],
  methods: {
    onAddFiles(files) {
      // console.log(files[files.length-1]);
      this.newLedger.set("upPhoto", files[files.length - 1]);
      this.ledgerPhotoChange = true;
      // console.log(this.newLedgerPhoto)
    },
    editDrawer(index) {
      this.drawer[index] = !this.drawer[index];
    },
    createLedger() {
      if (this.newLedgerName == "")
        return this.$alert.error("新帳本名不得為空");
      else this.newLedger.set("ledgerName", this.newLedgerName);

      if (!this.ledgerPhotoChange) {
        // console.log("no photo")
        this.newLedger.set(
          "photo",
          "https://drive.google.com/uc?export=view&id=173suCuP2GwAmvwZQgPtDwGrSPg1wvM8m"
        );
      }
      // console.log(this.newLedger.keys())

      this.$confirm.open(`確認新增 "${this.newLedgerName}"?`, () => {
        this.$http
          .post("/ledger", this.newLedger, {
            headers: { "Content-Type": "multipart/form-data" }
          })
          .then(res => {
            this.createModal = false;
            // this.update();
            this.$emit("update");
            this.newLedgerName = "";
            this.$alert.success("新增成功");
          })
          .catch(ignoreNotLoginError)
          .catch(err => {
            console.log(err);
            this.$alert.error("新增失敗");
          });
      });
    },
    patchLedger() {
      if (this.newLedgerName == "") return this.$alert.error("帳本名不得為空");
      else this.newLedger.set("ledgerName", this.newLedgerName);

      if (!this.ledgerPhotoChange) {
        console.log("no photo");
        this.newLedger.set(
          "photo",
          "https://drive.google.com/uc?export=view&id=173suCuP2GwAmvwZQgPtDwGrSPg1wvM8m"
        );
      }
      // console.log(this.newLedger.keys())

      this.$confirm.open(`確認修改 "${this.newLedgerName}"?`, () => {
        this.$http
          .patch("/ledger/" + this.editLedgerId, this.newLedger, {
            headers: { "Content-Type": "multipart/form-data" }
          })
          .then(res => {
            this.createModal = false;
            this.editModal = false;
            // this.update();
            this.$emit("update");
            this.newLedgerName = "";
            this.$alert.success("修改成功");
          })
          .catch(ignoreNotLoginError)
          .catch(err => {
            console.log(err);
            this.$alert.error("修改失敗");
          });
      });
    },
    cancelCreate() {
      this.createModal = false;
      this.editModal = false;
      this.newLedger = new FormData();
      this.newLedgerName = "";
      this.ledgerPhotoChange = false;
    },
    editLedger(ledger) {
      this.editLedgerId = ledger._id;
      this.newLedgerName = ledger.ledgerName;
      this.ledgerPhotoChange = true;
      this.createModal = true;
      this.editModal = true;
    },
    deleteLedger(ledger) {
      console.log(ledger);
      this.$confirm.open("確認刪除類別: " + ledger.ledgerName, () => {
        this.$http
          .delete("/ledger/" + ledger._id)
          .then(res => {
            // this.update();
            this.$emit("update");
            this.$alert.success("帳本刪除成功");
          })
          .catch(ignoreNotLoginError)
          .catch(err => {
            console.log(err);
            this.$alert.error("'帳本刪除失敗");
          });
      });
    },
    ledgerUser(user) {
      // console.log(user.length)
      if (user.length <= 6) {
        return user;
      } else {
        var shortlist = [];
        for (var i = 0; i < 4; i++) {
          shortlist.push(user[i]);
        }
        return shortlist;
        // return user.splice(0,3)
      }
    },
    notAdminUsers(ledger) {
      return ledger.users.filter(user => user._id !== ledger.adminId);
    },
    invite(ledger) {
      this.inviteLedger = ledger;
      this.inviteModal = true;
    },
    confirmInvite() {
      // console.log(this.inputEmail);
      this.$confirm.open("確認邀請?", () => {
        this.$http
          .post("/invitation/invite", {
            ledgerId: this.inviteLedger._id,
            email: this.inputEmail
          })
          .then(res => {
            this.$alert.success("成功發出邀請");
            this.inviteModal = false;
            // console.log(res.data);
          })
          .catch(ignoreNotLoginError)
          .catch(err => {
            console.log(err);
            if (err.response.status === 400) {
              this.$alert.error("無此使用者，無法發出邀請");
            } else this.$alert.error("邀請失敗");
          });
      });
    },
    out(ledger) {
      this.outModal = true;
      this.outLedger = ledger;
    },
    confirmOut() {
      this.$confirm.open("確認剔除?", () => {
        this.$http
          .post(`/ledger/${this.outLedger._id}/leave/${this.outUser}`)
          .then(res => {
            // this.update();
            this.$emit("update");
            this.$alert.success("成功剔除使用者");
            this.outModal = false;
            // console.log(res.data);
          })
          .catch(ignoreNotLoginError)
          .catch(err => {
            console.log(err);
            this.$alert.error("剔除失敗");
          });
      });
    }
  }
};
</script>
<style scoped>
.v-btn:not(.v-btn--round).v-size--default {
  min-width: 5px;
}
.ledgerAdmin .v-menu__content.theme--dark {
  position: absolute;
  min-width: 100%;
}
</style>