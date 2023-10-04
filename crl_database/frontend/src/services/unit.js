import http from "../http-common";

class UnitDataService {
  
  static defaultRoute = `/units`;
  
  getAll() {
    return http.get(UnitDataService.defaultRoute);
  }
  
  /** Get all units of a specific institution */
  getUnitsOfAnInstitution() {
    return http.get(UnitDataService.defaultRoute + "/sortedunits");
  }
  
  getCount() {
    return http.get(UnitDataService.defaultRoute + "/count");
  }

  addUnit() {
    return http.post(UnitDataService.defaultRoute + "/add")
  }
  
}

const unitDataService = new UnitDataService();
export default unitDataService;
