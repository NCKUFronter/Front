// @ts-check
import Vue from "vue";

const N_KEY = "notification";

function getUserId() {
  // @ts-ignore
  return Vue.$api.user.profile._id;
}

function makeMessage(obj) {
  switch (obj.type) {
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
    default:
      return "xxxxxx";
  }
}

// 假設有ApiService
export class NotificationService {
  sse;

  last_token;

  storage_el; // event listener

  constructor(snackbar, baseURL) {
    this.baseURL = baseURL;
    this.last_token = this.readToken();
    this.snackbar = snackbar;
    this.update = Vue.observable({
      ledger: 0,
      user: 0,
    });
    this.storage_el = (e) => {
      console.log(e);
      this.checkNewNotification();
    };
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

  handleNewNotification(obj) {
    if (obj.from._id != getUserId()) {
      this.snackbar.open(makeMessage(obj), null, {
        color: "info",
        data: {
          photo: obj.from.photo,
        },
      });
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
      console.log(e);
      localStorage.setItem(N_KEY, e.data);
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
