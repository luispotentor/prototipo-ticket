import { SendRequestApi } from "@/services/conexions";

export const GetAllTypes = async () => {

    const response = await SendRequestApi('ticketTypes', 'GET'); 
    return response;
}