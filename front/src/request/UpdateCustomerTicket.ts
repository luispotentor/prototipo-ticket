import { ITicketRequest } from "@/interfaces/request/ITicketRequest";

import { IsEmptyText } from "@/helpers/Validation";


interface ValidationResult {
    status: boolean;
    data:  ITicketRequest;
}

export const ValidateForm = ( form:ITicketRequest):ValidationResult  => {

    let errorMessages:ITicketRequest = {
        title:'',
        description:'',
        ticket_type_id:''
    };

    let valid = true;

    if( IsEmptyText(form.title) ) {
        errorMessages.title = 'El titulo es requerido';
        valid = false;
    }

    if( IsEmptyText(form.description) ) {
        errorMessages.description = 'La descripcion es requerida';
        valid = false;
    }

    if ( IsEmptyText( form.ticket_type_id) ) {
        errorMessages.ticket_type_id = 'El tipo de ticket es requerido';
        valid = false;
    }

    if ( !form?.id || IsEmptyText(form?.id ) ) {
        errorMessages.id = 'El id es requerido';
        valid = false;
    }
    
    return{
        status:valid,
        data:errorMessages
    }
}