import http from "../http-common";

class unitDataService {
  
  getAll() {
    return http.get(`/units`);
  }
  
}

const unitDataService = new unitDataService();
export default unitDataService;