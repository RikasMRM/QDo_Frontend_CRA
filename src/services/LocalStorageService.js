class LocalStorageService {
  ls = window.localStorage;

  setItem(key, value) {
    this.ls.setItem(key, value);
    return true;
  }

  getItem(key) {
    let value = this.ls.getItem(key);
    try {
      return value;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  removeItem(key) {
    let item = this.ls.getItem(key);
    try {
      if (item) {
        this.ls.removeItem(key);
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export default new LocalStorageService();
