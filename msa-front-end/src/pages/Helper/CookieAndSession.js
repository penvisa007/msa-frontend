import MyHelper from "./MyHelper";

class CookieAndSession {
  Cookie_Set(key, value, date) {
    var myHelper = new MyHelper();
    var keys = this.removeLastEqualIndex(myHelper.encrypt(key));
    myHelper.cookie_Set(keys, myHelper.encrypt(value), date);
  }
  Cookie_Get(key) {
    var myHelper = new MyHelper();
    var keys = this.removeLastEqualIndex(myHelper.encrypt(key));
    return myHelper.decrypt(myHelper.cookie_Get(keys));
  }

  Cookie_Set_As_Object(key, value, date) {
    // Make sure all data as string
    this.Cookie_Set(key, JSON.stringify(value), date);
  }
  Cookie_Get_As_Object(key) {
    var obj = this.Cookie_Get(key);
    var resut = null;
    if (obj) {
      resut = JSON.parse(obj);
    }

    return resut;
  }

  Cookie_Remove(key) {
    var myHelper = new MyHelper();
    var keys = this.removeLastEqualIndex(myHelper.encrypt(key));
    myHelper.cookie_remove(keys);
  }

  Session_Set(key, value) {
    var myHelper = new MyHelper();
    var keys = this.removeLastEqualIndex(myHelper.encrypt(key));
    myHelper.session_Set(keys, myHelper.encrypt(value));
  }
  Session_Get(key) {
    var myHelper = new MyHelper();
    var keys = this.removeLastEqualIndex(myHelper.encrypt(key));
    return myHelper.decrypt(myHelper.session_Get(keys));
  }

  // Private
  removeLastEqualIndex(value) {
    var s = value;

    var index = 0;

    var result = "";
    for (let i of s) {
      if (index == s.length || index == s.length - 1) {
        if (i == "=") {
          //
        } else {
          result += i;
        }
      } else {
        result += i;
      }

      index++;
    }
    return result;
  }
}

export default CookieAndSession;