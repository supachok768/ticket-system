export default class TicketService {
    constructor(axios) {
        this.axios = axios
        this.basePath = 'tickets'
    }
    getTicket() {
        return this.axios.get(`${this.basePath}`)
    }
    getTicketById(Id) {
        return this.axios.get(`${this.basePath}/${parseInt(Id)}`)
    }
    buyTicket(ticketId, ticketName, buyAmount) {
        return this.axios.post(`${this.basePath}/buy`, {
            ticketId: ticketId,
            name: ticketName,
            amount: buyAmount
        })
    }
    updateTicket(Id, name, price, limit, maximumBuy, isActive) {
        return this.axios.put(`${this.basePath}/${parseInt(Id)}`, {
            name: name,
            price: parseFloat(price).toFixed(2),
            amountLimitPerDay: parseInt(limit),
            minimumBuy: parseInt(maximumBuy),
            isActive: isActive
        })
    }
    createTicket(name, price, limit, maximumBuy, isActive) {
        return this.axios.post(`${this.basePath}`, {
            name: name,
            price: parseFloat(price).toFixed(2),
            amountLimitPerDay: parseInt(limit),
            minimumBuy: parseInt(maximumBuy),
            isActive: isActive
        })
    }
}