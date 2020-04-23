// @ts-check
import { AxiosInstance, AxiosResponse } from "axios";
import { RecordDto, RecordModel } from "./api-model";

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

  /** @param { AxiosInstance } axios_ins */
  constructor(axios_ins) {
    this.raw = axios_ins;
  }

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
    return this.raw.put(ApiPath.records.withId(id), dto);
  }

  /**
   * @param { string } id;
   * @returns { Promise<AxiosResponse<string>> }
   */
  deleteRecord(id) {
    return this.raw.delete(ApiPath.records.withId(id));
  }
}