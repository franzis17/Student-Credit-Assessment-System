/**
 * Contains functions that does API calls to retrieve information from the backend server.
 * As seen from each methods, each API request requires a user token. 
 */
import http from "../http-common";

class InstitutionDataService {
  
  /* Fields - to be changed as needed */
  static defaultRoute = `/institutions`;
  static curtinId = "6524130024edd59e6e5c3ffa";
  
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
  
  getUnitsOfInstitution(institutionId, userToken) {
    const params = { institution: institutionId };
    return http.get((InstitutionDataService.defaultRoute + "/units"),
      {
        params,
        headers: {
          Authorization: ( "Bearer " + userToken )
        }
      }
    );
  }
  
  getUnitsOfCurtin(userToken) {
    return this.getUnitsOfInstitution(InstitutionDataService.curtinId, userToken);
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
