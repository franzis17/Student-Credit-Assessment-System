import http from "../http-common";

class UnitDataService {
  
  getAll() {
    return http.get("/units");
  }
  
  /** Get all units of a specific institution */
  getUnitsOfAnInstitution() {
    
  }
  
  getCount() {
    return http.get("/units/count");
  }
  
}

const unitDataService = new UnitDataService();
export default unitDataService;
