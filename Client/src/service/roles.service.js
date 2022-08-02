export default class {
    constructor(axios) {
        this.axios = axios
        this.basePath = 'roles'
    }
    getRoles() {
        return this.axios.get(`${this.basePath}`)
    }
    getRoleByUser() {
        return this.axios.get(`${this.basePath}/getRoleByUser`)
    }
}