// @ts-check
import Vue from "vue";

const N_KEY = "notification";

function getUserId() {
  // @ts-ignore
  return Vue.$api.user.profile._id;
}

function makeMessage(obj) {
  switch (
    obj.type //事件種類
  ) {
    case "point":
      if (obj.action == "transfer") {
        return `"${obj.from.name}" 給予 "你" 點數${obj.body.amount}點`;
      }
      throw "No available point Message";
    case "invitation":
      if (obj.action === "invite") {
        const target = obj.to._id === getUserId() ? "你" : obj.to.name;
        return `"${obj.from.name}" 邀請 "${target}" 加入帳本 "${obj.ledger.ledgerName}"`;
      } else if (obj.action === "answer") {
        const rejectStr = obj.body.answer ? "接受" : "回絕";
        return `"${obj.from.name}" ${rejectStr}加入帳本 "${obj.ledger.ledgerName}"`;
      }
      throw "No available invitation Message";
    case "ledger":
      if (obj.action == "update") {
        return `"${obj.from.name}" 更改了帳本 "${obj.ledger.ledgerName}" 名稱`;
      } else if (obj.action == "delete") {
        return `"${obj.from.name}" 刪除帳本 "${obj.ledger.ledgerName}"`;
      } else if (obj.action == "leave") {
        return `"${obj.from.name}" 離開了帳本 "${obj.ledger.ledgerName}"`;
      } else if (obj.action === "kickout") {
        return `"${obj.from.name}" 將 "${obj.to.name}" 踢出了帳本 "${obj.ledger.ledgerName}"`;
      }
      throw "No available ledger Message";
    case "record":
      if (obj.action == "create") {
        return `${obj.from.name} 在帳本 "${obj.ledger.ledgerName}" 新增一筆帳目`;
      } else if (obj.action == "update") {
        return `${obj.from.name} 在帳本 "${obj.ledger.ledgerName}" 修改一筆帳目`;
      } else if (obj.action == "delete") {
        return `${obj.from.name} 在帳本 "${obj.ledger.ledgerName}" 刪除一筆帳目`;
      }
      throw "No available record Message";
    case "user":
      if (obj.action == "online") {
        return `${obj.from.name} 上線`;
      } else if (obj.action == "offline") {
        return `${obj.from.name} 下線`;
      }
      break;
    // default:
    //return "xxxxxx";
  }
}

// 假設有ApiService
export class NotificationService {
  sse;

  last_token;

  storage_el; // event listener

  messages;

  constructor(snackbar, baseURL) {
    this.baseURL = baseURL;
    this.last_token = this.readToken();
    this.snackbar = snackbar;
    this.data = Vue.observable({
      read: true,
      messages: [],
    });
    this.storage_el = (e) => {
      console.log(e);
      this.checkNewNotification();
    };
    this.onlineUser = Vue.observable({});
  }

  readToken() {
    const obj = JSON.parse(localStorage.getItem(N_KEY));
    return obj != null ? obj.time : null;
  }

  checkNewNotification() {
    const obj = JSON.parse(localStorage.getItem(N_KEY));
    if (obj == "stop") return this.connect();

    const token = obj != null ? obj.time : null;
    if (token === this.last_token) return;

    this.handleNewNotification(obj);
  }

  handleOnlineUserInfo(obj) {
    if (obj.type == "init" && obj.action == "onlineUser") {
      for (const _id in obj.onlineUser) {
        Vue.set(this.onlineUser, _id, obj.onlineUser[_id]);
      }
      return;
    }

    if (obj.type == "user" && obj.action == "online") {
      Vue.set(this.onlineUser, obj.from._id, 1);
      this.onlineUser[obj.from._id] = 1;
      return;
    } else if (obj.type == "user" && obj.action == "offline") {
      Vue.set(this.onlineUser, obj.from._id, 0);
      return;
    }

    // 可能是新加入的關係人，加到上線的使用者裡
    if (
      obj.from._id != getUserId() &&
      obj.type === "invitation" &&
      obj.action === "answer" &&
      obj.body.answer === true
    ) {
      this.onlineUser[obj.from._id] = 1;
    }
  }

  handleNewNotification(obj) {
    console.log(obj);
    this.handleOnlineUserInfo(obj);
    if (obj.from._id != getUserId()) {
      const msg = makeMessage(obj);
      if (msg) {
        this.data.messages.unshift({
          message: msg,
          photo: obj.from.photo,
          time: obj.time,
        });
        this.snackbar.open(msg, null, {
          color: "info",
          timeout: 2000,
          data: {
            photo: obj.from.photo,
          },
        });
      }
    }
    // if (obj.type === "invitation") this.update.ledger++;
  }

  connect() {
    window.addEventListener("storage", this.storage_el, false);

    if (this.sse != null) return;
    this.sse = new EventSource(this.baseURL + "/sse/notification", {
      withCredentials: true,
    });
    this.sse.onmessage = (e) => {
      localStorage.setItem(N_KEY, e.data);
      //單人多視窗時，只會有一個視窗與sse連線，其他視窗去連localstorage
      //setItem即為連線視窗將東西塞到localstorage
      this.handleNewNotification(JSON.parse(e.data));
    };
    this.sse.onerror = (e) => {
      console.log(e);
      this.closeSSE();
    };
  }

  closeSSE() {
    if (this.sse) this.sse.close();
    this.sse = null;
  }

  closeAll() {
    this.closeSSE();
    window.removeEventListener("storage", this.storage_el);
  }
}
