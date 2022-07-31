export default class UsersService {
    constructor(axios) {
        this.axios = axios
        this.basePath = 'users'
    }
    getUsers() {
        return this.axios.get(`${this.basePath}`)
    }
    getUserById(id) {
        return this.axios.get(`${this.basePath}/${id}`)
    }
    getCreateUser(email, password, firstName, lastName, rolesActiveListId) {
        return this.axios.post(`${this.basePath}`, {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            rolesActive: rolesActiveListId
        })
    }
}