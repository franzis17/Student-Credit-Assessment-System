import http from "../http-common";

class UnitDataService {
  
  static defaultRoute = `/units`;
  
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
    const headers = UnitDataService.getHeader(userToken);
    return http.get(UnitDataService.defaultRoute, headers);
  }
  
  /** Get all units of a specific institution */
  getUnitsOfAnInstitution(userToken) {
    const headers = UnitDataService.getHeader(userToken);
    return http.get((UnitDataService.defaultRoute + "/sortedunits"), headers);
  }
  
  getCount(userToken) {
    const headers = UnitDataService.getHeader(userToken);
    return http.get((UnitDataService.defaultRoute + "/count"), headers);
  }
  
  
  // POST
  
  addUnit(unit, userToken) {
    const headers = UnitDataService.getHeader(userToken);
    return http.post((UnitDataService.defaultRoute + "/add"),
      unit,
      headers
    );
  }
  
  
  // DELETE
  
  deleteUnit(unitID, userToken) {
    const headers = UnitDataService.getHeader(userToken);
    return http.delete((UnitDataService.defaultRoute + "/delete"),
      unitID,
      headers
    );
  }
  
}

const unitDataService = new UnitDataService();
export default unitDataService;
