import { Ticket } from "@prisma/client";

export interface Inventory{
    ticket:Ticket,
    qty: number
}