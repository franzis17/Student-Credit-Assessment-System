/**
 * Contains functions that does API calls to retrieve information from the backend server
 */
import http from "../http-common";

class InstitutionDataService {
  
  static defaultRoute = `/institutions`;
  
  getAll() {
    return http.get(InstitutionDataService.defaultRoute);
  }
  
  getCount() {
    return http.get(InstitutionDataService.defaultRoute + "/count");
  }
  
}

const institutionDataService = new InstitutionDataService();
export default institutionDataService;
