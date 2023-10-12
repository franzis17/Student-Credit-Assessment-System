/**
 * Contains functions that does API calls to retrieve information from the backend server.
 * As seen from each methods, each API request requires a user token. 
 */
import http from "../http-common";

class InstitutionDataService {
  
  /* Fields - to be changed as needed */
  static defaultRoute = `/institutions`;
  static curtinId = "6527f81d3548aaf69fb67adf";
  
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
  
  // GET
  
  getAll(userToken) {
    const headers = InstitutionDataService.getHeader(userToken);
    return http.get(InstitutionDataService.defaultRoute, headers);
  }
  
  getCount(userToken) {
    const headers = InstitutionDataService.getHeader(userToken);
    return http.get((InstitutionDataService.defaultRoute + "/count"), headers);
  }
  
  
  // POST
  
  addInstitution(newInstitution, userToken) {
    const headers = InstitutionDataService.getHeader(userToken);
    return http.post((InstitutionDataService.defaultRoute + "/add"),
      newInstitution,
      headers
    );
  }
  
  
  //DELETE
  
  removeInstitution(institutionId, userToken) {
    const headers = InstitutionDataService.getHeader(userToken)
    return http.delete(`${InstitutionDataService.defaultRoute}/delete/${institutionId}`, headers);
  }
  
}

const institutionDataService = new InstitutionDataService();
export default institutionDataService;
