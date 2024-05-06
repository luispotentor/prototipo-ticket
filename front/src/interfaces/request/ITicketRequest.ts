export interface ITicketRequest {
    id?:string;
    ticket_type_id:string;
    user_id?:string;
    title:string;
    description:string;
    ticket_status_id?:string;
}