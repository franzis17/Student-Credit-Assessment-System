import http from "../http-common";

class UnitDataService {
  
  static defaultRoute = `/units`;
  
  getAll() {
    return http.get(UnitDataService.defaultRoute);
  }
  
  /** Get all units of a specific institution */
  getUnitsOfAnInstitution() {
    
  }
  
  getCount() {
    return http.get(UnitDataService.defaultRoute + "/count");
  }
  
}

const unitDataService = new UnitDataService();
export default unitDataService;
