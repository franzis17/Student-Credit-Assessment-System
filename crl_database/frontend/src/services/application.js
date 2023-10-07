import http from "../http-common";

class ApplicationDataService {
  
  static defaultRoute = "/applications";
  
  /**
   * Header used to add the user's token and verified by API Provider
   */
  static getHeader(userToken) {
    return {
      headers: {
        Authorization: ( "Bearer " + userToken )
      }
    };
  }
  
  getAll(userToken) {
    const headers = ApplicationDataService.getHeader(userToken);
    return http.get(ApplicationDataService.defaultRoute, userToken);
  }
  
}

const applicationDataService = new ApplicationDataService();
export default applicationDataService;
