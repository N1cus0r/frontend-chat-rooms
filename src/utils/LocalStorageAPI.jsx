export class LocalStorageAPI {
  static getLocalStorageRoom(room) {
    return JSON.parse(localStorage.getItem("room"));
  }

  static setLocalStorageRoom(room) {
    localStorage.setItem("room", JSON.stringify(room));
    window.dispatchEvent(new Event("roomUpdate"));
  }

  static delLocalStorageRoom() {
    localStorage.removeItem("room");
  }

  static getLocalStorageToken() {
    return JSON.parse(localStorage.getItem("access_token"));
  }

  static setLocalStorageToken(tokens) {
    localStorage.setItem("access_token", JSON.stringify(tokens));
  }

  static delLocalStorageToken() {
    localStorage.removeItem("access_token");
  }

  static getLocalStorageUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  static setLocalStorageUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  static delLocalStorageUser() {
    localStorage.removeItem("user");
  }

  static getLocalStorageTheme() {
    return JSON.parse(localStorage.getItem("theme"));
  }

  static setLocalStorageTheme(mode) {
    localStorage.setItem("theme", JSON.stringify(mode));
  }
}
