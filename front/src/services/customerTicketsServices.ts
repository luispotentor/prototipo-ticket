

import { ITicketRequest } from "@/interfaces/request/ITicketRequest";
import { SendRequestApi } from "@/services/conexions";

export const GetAll = async () => {

    const response = await SendRequestApi('customerTickets', 'GET'); 
    return response;
}

export const GetOne = async ( id:string ) => {

    const response = await SendRequestApi(`customerTickets/${id}`, 'GET');
    return response;
}

export const Update = async ( ticket:ITicketRequest ) => {

    const response = await SendRequestApi(`customerTickets/${ticket?.id}`, 'PUT', ticket);
    return response;
}

export const Create = async ( ticket:ITicketRequest ) => {

    const response = await SendRequestApi('customerTickets', 'POST', ticket);
    return response;
}

export const Remove = async ( id:string ) => {

    const response = await SendRequestApi(`customerTickets/${id}`, 'DELETE');
    return response;
}