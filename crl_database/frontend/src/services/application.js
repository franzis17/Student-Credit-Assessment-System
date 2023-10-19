import http from "../http-common";

class ApplicationDataService {
  
  static defaultRoute = "/applications";
  
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
  
  // ---- [ GET ] ----
  
  getAll(userToken) {
    const headers = ApplicationDataService.getHeader(userToken);
    return http.get(ApplicationDataService.defaultRoute, headers);
  }
  
  getApplicationsOfStudent(student, userToken) {
    const params = {
      student: student,
    };
    return http.get((ApplicationDataService.defaultRoute + "/studentsearch"),
      {
        headers: {
          Authorization: `Bearer ${userToken}`
        },
        params: params,
      }
    );
  }
  
  
  // ---- [ POST ] ----
  
  addApplication(newApplication, userToken) {
    const headers = ApplicationDataService.getHeader(userToken);
    return http.post((ApplicationDataService.defaultRoute + "/add"),
      newApplication,
      headers,
    );
  }

  
  // ---- [ DELETE ] ----
  
  removeApplication(applicationID, userToken) {
    const headers = ApplicationDataService.getHeader(userToken);
    // console.log("ENPOINT: " + applicationID)
    return http.delete(`/applications/delete/${applicationID}`, headers);
  }

  getApplicationsByAssessedUnits(assessedUnits, userToken) {
    const headers = ApplicationDataService.getHeader(userToken);
    const requestData = { assessedUnits };
    
    return http.post(`${ApplicationDataService.defaultRoute}/applicationsByAssessedUnits`, requestData, headers);
  }
  
  
}



const applicationDataService = new ApplicationDataService();
export default applicationDataService;
