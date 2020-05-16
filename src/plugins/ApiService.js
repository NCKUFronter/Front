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

  init = true;

  onNotLoginListener = null;

  /** @param { AxiosInstance } axios_ins */
  constructor(axios_ins) {
    this.raw = axios_ins;
    this.user = Vue.observable({ login: false, profile: null });

    axios_ins.interceptors.response.use(
      (res) => res,
      (error) => {
        if (error.response.status == 401) {
          this.setProfile(null);
        }

        // const whitelist = ['/user/login']
        if (!this.init && error.config.url !== "/user/login") {
          if (this.onNotLoginListener != null) this.onNotLoginListener();
        }
        throw error;
      }
    );

    this.fetchProfile()
      .catch(() => {})
      .finally(() => {
        this.init = false;
      });
  }

  setProfile(profile) {
    this.user.profile = profile;
    this.user.login = profile != null;
  }

  updateProfile() {
    return this.fetchProfile();
  }

  fetchProfile() {
    return this.raw.get("/user/profile").then((res) => {
      this.setProfile(res.data);
      // return this.login;
      return res.data;
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
      });
  }

  logout() {
    return this.raw.post("/user/logout").then((res) => {
      this.setProfile(null);
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
