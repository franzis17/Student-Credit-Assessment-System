import http from "../http-common";


class UnitDataService {
  
  static defaultRoute = `/units`;

  // GET
  
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
  getUnitsOfAnInstitution(institutionId, userToken) {
    const headers = UnitDataService.getHeader(userToken)
    return http.get(`${UnitDataService.defaultRoute}/sortedunits?institutionId=${institutionId}`, headers);
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
  
  removeUnit(unitId, userToken) {
    console.log("usertoken = ", userToken);
    const headers = UnitDataService.getHeader(userToken);
    return http.delete(`${UnitDataService.defaultRoute}/delete/${unitId}`, headers);
  }
  
  removeMultiple(unitIds, userToken) {
    const config = {
      headers: { authorization: ( "Bearer " + userToken ) },
      data: { unitIds }, // Wrap unitIds in an object as data
    };
    return http.delete((UnitDataService.defaultRoute + "/remove-multiple"), config);
  }

}

const unitDataService = new UnitDataService();
export default unitDataService;
