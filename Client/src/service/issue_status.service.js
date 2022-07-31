export default class IssueStatusService {
    constructor(axios) {
        this.axios = axios
        this.basePath = 'issue_status'
    }
    getIssueStatus() {
        return this.axios.get(`${this.basePath}`)
    }
}