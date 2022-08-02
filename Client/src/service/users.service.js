export default class UsersService {
    constructor(axios) {
        this.axios = axios
        this.basePath = 'users'
    }
    getUsers() {
        return this.axios.get(`${this.basePath}`)
    }
    getUserById(id) {
        return this.axios.get(`${this.basePath}/${parseInt(id)}`)
    }
    createUser(email, password, firstName, lastName, rolesActiveListId) {
        return this.axios.post(`${this.basePath}`, {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            rolesActive: rolesActiveListId
        })
    }
    updateUser(id, email, password, firstName, lastName, rolesActiveListId) {
        return this.axios.put(`${this.basePath}/${parseInt(id)}`, {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            rolesActive: rolesActiveListId
        })
    }
}