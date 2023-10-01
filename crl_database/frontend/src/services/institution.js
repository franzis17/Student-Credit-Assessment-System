/**
 * Contains functions that does API calls to retrieve information from the backend server
 */
import http from "../http-common";

class InstitutionDataService {
  
  static defaultRoute = `/institutions`;
  
  // GET
  
  getAll() {
    return http.get(InstitutionDataService.defaultRoute);
  }
  
  getCount() {
    return http.get(InstitutionDataService.defaultRoute + "/count");
  }
  
  
  // POST
  
  addInstitution(institution) {
    return http.post((InstitutionDataService.defaultRoute + "/add"), institution);
  }
  
}

const institutionDataService = new InstitutionDataService();
export default institutionDataService;
