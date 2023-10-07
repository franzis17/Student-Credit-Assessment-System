/**
 * Contains functions that does API calls to retrieve information from the backend server
 */
import http from "../http-common";

class InstitutionDataService {
  
  /* Fields - to be changed as needed */
  static defaultRoute = `/institutions`;
  static curtinId = "64e08d6f12f5f27fc10f3dcf";
  
  // GET
  
  getAll() {
    return http.get(InstitutionDataService.defaultRoute);
  }
  
  getCount() {
    return http.get(InstitutionDataService.defaultRoute + "/count");
  }
  
  getUnitsOfCurtin(institutionId) {
    const params = { institution: institutionId };
    return http.get((InstitutionDataService.defaultRoute + "/units"), { params });
  }
  
  getUnitsOfAnInstitution() {
    return this.getUnitsOfInstitution(InstitutionDataService.curtinId);
  }
  
  
  // POST
  
  addInstitution(institution) {
    console.log("Institution to go to backend: " + institution.name)
    return http.post((InstitutionDataService.defaultRoute + "/add"), institution);
  }
  
}

const institutionDataService = new InstitutionDataService();
export default institutionDataService;
