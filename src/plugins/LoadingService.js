import Vue from "vue";

export default function (Vue) {
  const ins = new LoadingService();
  Vue.$loading = ins;
  Vue.prototype.$loading = ins;
}

class LoadingService {
  /** @type {number} */
  loadingCount;

  constructor() {
    this.loadingCount = 0;
    this.status = Vue.observable({ isRunning: false });
  }

  reset() {
    this.loadingCount = 0;
    this.status.isRunning = false;
  }

  working() {
    // if (this.loadingCount == 0) this.status.isRunning = true;
    this.loadingCount++;
  }

  done() {
    this.loadingCount--;
    // if (this.loadingCount == 0) this.status.isRunning = false;
  }

  /**
   * @param {Promise<any>} promise
   * @return  {Promise<any>}
   */
  insideLoading(promise) {
    this.working();

    return promise
      .then((res) => {
        this.done();
        return res;
      })
      .catch((err) => {
        this.done();
        throw err;
      });
  }
}
