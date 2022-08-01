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
        return this.axios.get(`${this.basePath}/request/me`,)
    }
    getIssueAssignToday() {
        return this.axios.get(`${this.basePath}/assign/me/today`,)
    }
    openIssue(subject, description, assignToId, ticketId, issueStatusId) {
        return this.axios.post(`${this.basePath}`, {
            subject: subject,
            description: description,
            assignToId: parseInt(assignToId),
            ticketId: parseInt(ticketId),
            issueStatusId: parseInt(issueStatusId)
        })
    }

    updateStatusIssue(Id, issueStatusId) {
        return this.axios.put(`${this.basePath}/${Id}`, {
            issueStatusId: parseInt(issueStatusId)
        })
    }
}