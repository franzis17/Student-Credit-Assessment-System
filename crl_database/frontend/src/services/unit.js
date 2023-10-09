import http from "../http-common";


class UnitDataService {
  
  static defaultRoute = `/units`;

  static getHeader(userToken) {
    return {
      headers: {
        Authorization : ("Bearer " + userToken)
      }
    }
  }
  // GET
  
  getAll(userToken) {
    const headers = UnitDataService.getHeader(userToken)
    return http.get(UnitDataService.defaultRoute, headers);
  }
  
  /** Get all units of a specific institution */
  getUnitsOfAnInstitution(institutionId, userToken) {
    const headers = UnitDataService.getHeader(userToken)
    return http.get(`${UnitDataService.defaultRoute}/sortedunits?institutionId=${institutionId}`, headers);
  }
  
  getCount(userToken) {
    const headers = UnitDataService.getHeader(userToken)
    return http.get((UnitDataService.defaultRoute + "/count"), headers);
  }
  
  
  // POST
  
  addUnit(unit, userToken) {
    const headers = UnitDataService.getHeader(userToken)
    return http.post((UnitDataService.defaultRoute + "/add"), unit, headers);
  }

  //DELETE
  removeUnit(unitId, userToken) {
    const headers = UnitDataService.getHeader(userToken);
    return http.delete(`${UnitDataService.defaultRoute}/delete/${unitId}`, headers);
  }
  
  removeMultiple(unitIds, userToken) {
    const headers = UnitDataService.getHeader(userToken)
    return http.delete(`${UnitDataService.defaultRoute}/remove-multiple`, {data: { unitIds },}, headers);
  }

}

const unitDataService = new UnitDataService();
export default unitDataService;
