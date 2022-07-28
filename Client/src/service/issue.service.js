export default class IssueService {
    constructor(axios) {
        this.axios = axios
        this.basePath = 'issues'
    }
    getIssue() {
        return this.axios.get(`${this.basePath}`)
    }
    getIssueAssignMe() {
        return this.axios.get(`${this.basePath}/assign/me`)
    }
    getIssueRequestFromMe() {
        return this.axios.get(`${this.basePath}/request/me`)
    }
}