/**
 * Contains functions that does API calls to retrieve information from the backend server
 */
import http from "../http-common";

class InstitutionDataService {
  
  /* Fields - to be changed as needed */
  static defaultRoute = `/institutions`;
  static curtinId = "64e08d6f12f5f27fc10f3dcf";

  static getHeader(userToken) {
    return {
      headers: {
        Authorization : ("Bearer " + userToken)
      }
    }
  }
  
  // GET
  
  getAll(userToken) {
    const headers = InstitutionDataService.getHeader(userToken)
    return http.get((InstitutionDataService.defaultRoute), headers);
  }
  
  getCount(userToken) {
    const headers = InstitutionDataService.getHeader(userToken)
    return http.get((InstitutionDataService.defaultRoute + "/count"), headers);
  }
  
  getUnitsOfCurtin(institutionId, userToken) {
    const headers = InstitutionDataService.getHeader(userToken)
    const params = { institution: institutionId };
    return http.get((InstitutionDataService.defaultRoute + "/units"), { params }, headers);
  }
  
  getUnitsOfAnInstitution(userToken) {
    const headers = InstitutionDataService.getHeader(userToken)
    return this.getUnitsOfInstitution((InstitutionDataService.curtinId), headers);
  }
  
  
  // POST
  
  addInstitution(institution, userToken) {
    const headers = InstitutionDataService.getHeader(userToken)
    console.log("Institution to go to backend: " + institution.name)
    return http.post((InstitutionDataService.defaultRoute + "/add"), institution, headers);
  }


  //DELETE 
  removeInstitution(institutionId, userToken) {
    const headers = InstitutionDataService.getHeader(userToken)
    return http.delete(`${InstitutionDataService.defaultRoute}/delete/${institutionId}`, headers);
  }
  
}

const institutionDataService = new InstitutionDataService();
export default institutionDataService;
