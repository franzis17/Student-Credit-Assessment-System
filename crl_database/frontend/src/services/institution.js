/**
 * Contains functions that does API calls to retrieve information from the backend server
 */
import http from "../http-common";

class InstitutionDataService {
  
  getAll() {
    return http.get(`/institutions`);
  }
  
  // TO DO:
  // getCount() {
  //   return 
  // }
  
}

const institutionDataService = new InstitutionDataService();
export default institutionDataService;
