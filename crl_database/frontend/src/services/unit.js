import http from "../http-common";

class UnitDataService {
  
  static defaultRoute = `/units`;
  
  // GET
  
  getAll() {
    return http.get(UnitDataService.defaultRoute);
  }
  
  /** Get all units of a specific institution */
  getUnitsOfAnInstitution(institutionId) {
    return http.get(`${UnitDataService.defaultRoute}/sortedunits?institutionId=${institutionId}`);
  }
  
  getCount() {
    return http.get(UnitDataService.defaultRoute + "/count");
  }
  
  
  // POST
  
  addUnit(unit) {
    return http.post((UnitDataService.defaultRoute + "/add"), unit);
  }
  
}

const unitDataService = new UnitDataService();
export default unitDataService;
