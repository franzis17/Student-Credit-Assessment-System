import http from "../http-common";

class UnitDataService {
  
  static defaultRoute = `/units`;
  
  // GET
  
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
  
  
  // POST
  
  addUnit(unit) {
    return http.post((UnitDataService.defaultRoute + "/add"), unit);
  }
  
}

const unitDataService = new UnitDataService();
export default unitDataService;
