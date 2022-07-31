export default class InventoryService {
    constructor(axios) {
        this.axios = axios
        this.basePath = 'inventory'
    }
    getInventory() {
        return this.axios.get(`${this.basePath}`)
    }
}