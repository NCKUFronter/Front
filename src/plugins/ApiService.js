// @ts-check
import Vue from "vue";
import { AxiosInstance, AxiosResponse } from "axios";
import { RecordDto, RecordModel } from "../utils/api-model";

/** @param { AxiosInstance } axios_ins */
export default function (Vue, axios_ins) {
  const api_ins = new ApiService(axios_ins);
  Vue.$api = api_ins;
  Vue.prototype.$api = api_ins;
}

export const ApiPath = {
  records: {
    base: "/record",
    withId: (/** @type {string} */ id) => "/record/" + id,
  },
};

export class ApiService {
  /** @type { AxiosInstance } */
  raw;

  // ---- user part -----
  profile;

  _login = false;
  loginListener = null;

  get loginStatus() {
    return this._login;
  }
  set loginStatus(val) {
    if (this._login != val) {
      this._login = val;
      if (this.loginListener != null) this.loginListener(this._login);
    }
  }

  /** @param { AxiosInstance } axios_ins */
  constructor(axios_ins) {
    this.raw = axios_ins;
    this.user = Vue.observable({ login: false, profile: null });

    this.fetchProfile().catch(() => {});
  }

  updateProfile() {
    return this.fetchProfile();
  }

  fetchProfile() {
    return this.raw
      .get("/user/profile")
      .then((res) => {
        this.profile = res.data;
        this.loginStatus = true;
        this.user.profile = res.data;
        this.user.login = true;
        // return this.login;
        return res.data;
      })
      .catch((err) => {
        // console.log(err);
        this.loginStatus = false;
        this.user.login = false;
        // return this.login;
        throw err;
      });
  }

  login(email, password) {
    return this.raw
      .post("/user/login", {
        email,
        password,
      })
      .then((res) => {
        return this.fetchProfile();
      })
      .catch((err) => {
        this.user.login = false;
        this.loginStatus = false;
        throw err;
      });
  }

  logout() {
    return this.raw.post("/user/logout").then((res) => {
      this.user.login = false;
      this.loginStatus = false;
      return res;
    });
  }

  // ----- record part -----
  /**
   * @param { RecordDto } dto;
   * @returns { Promise<AxiosResponse<RecordModel>> }
   */
  createRecord(dto) {
    return this.raw.post(ApiPath.records.base, dto);
  }

  /**
   * @param { string } id;
   * @returns { Promise<AxiosResponse<RecordModel>> }
   */
  getRecord(id) {
    return this.raw.get(ApiPath.records.withId(id));
  }

  /** @returns { Promise<AxiosResponse<RecordModel[]>> } */
  getAllRecords() {
    return this.raw.get(ApiPath.records.base);
  }

  /**
   * @param { string } id;
   * @param { Partial<RecordDto> } dto;
   * @returns { Promise<AxiosResponse<RecordModel>> }
   */
  updateRecord(id, dto) {
    return this.raw.patch(ApiPath.records.withId(id), dto);
  }

  /**
   * @param { string } id;
   * @returns { Promise<AxiosResponse<string>> }
   */
  deleteRecord(id) {
    return this.raw.delete(ApiPath.records.withId(id));
  }
}
