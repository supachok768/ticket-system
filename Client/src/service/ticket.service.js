export default class TicketService {
    constructor(axios) {
        this.axios = axios
        this.basePath = 'tickets'
    }
    getTicket() {
        return this.axios.get(`${this.basePath}`)
    }
    buyTicket(ticketId, ticketName, buyAmount) {
        return this.axios.post(`${this.basePath}/buy`, {
            ticketId: ticketId,
            name: ticketName,
            amount: buyAmount
        })
    }
}