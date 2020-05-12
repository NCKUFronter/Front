export default function (Vue) {
  const ins = new LoadingMixin();
  Vue.$loading = ins;
  Vue.prototype.$loading = ins;
}

class LoadingMixin {
  /** @type {number} */
  loadingCount;

  created() {
    this.loadingCount = 0;
  }

  working() {
    if (this.loadingCount == 0) this.$q.loading.show();
    this.loadingCount++;
  }

  done() {
    this.loadingCount--;
    if (this.loadingCount == 0) this.$q.loading.hide();
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
