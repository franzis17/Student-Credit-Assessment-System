import http from "../http-common";

class AssessmentDataService {
    static defaultRoute = "/unitassessmentpage";
  
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

    getAll(userToken) {
        const headers = AssessmentDataService.getHeader(userToken);
        return http.get(AssessmentDataService.defaultRoute, headers);
      }

    addAssessment(newAssessment, userToken) {
    const headers = AssessmentDataService.getHeader(userToken);
    return http.post((AssessmentDataService.defaultRoute + "/submit"),
        newAssessment,
        headers,
    );
    }
}

const assessmentDataService = new AssessmentDataService();
export default assessmentDataService;