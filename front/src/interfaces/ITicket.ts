import { IUser } from "@/interfaces/IUser";
import { ITicketType } from "@/interfaces/ITicketType";
import { ITicketStatus } from "./ITicketStatus";

export interface ITicket {

    id:string;
    title:string;
    description:string;
    type:ITicketType;
    status:ITicketStatus
    user:IUser;
    created_at:Date;
    updatd_at:Date;
}