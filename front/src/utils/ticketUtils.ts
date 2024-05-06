import { ITicket } from "@/interfaces/ITicket";
import { ITicketRequest } from "@/interfaces/request/ITicketRequest";

export const convertToTicketRequest = (ticket:ITicket):ITicketRequest => {
    
    const ticketRequest:ITicketRequest = {

        title: ticket?.title,
        description: ticket?.description,
        ticket_type_id: ticket?.type.id
    }

    if(ticket?.status) {
        ticketRequest.ticket_status_id = ticket?.status.id;
    }

    if ( ticket?.id ) {
        ticketRequest.id = ticket?.id;
    }

    if ( ticket?.user){
        ticketRequest.user_id = ticket?.user.id;
    }
    return ticketRequest;
}