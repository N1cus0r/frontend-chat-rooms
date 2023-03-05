import Cookies from "js-cookie";

export class CookieAPI {
  static getToken = () => {
    const cookie = Cookies.get("mayaLoh");
    return cookie;
  };
}
