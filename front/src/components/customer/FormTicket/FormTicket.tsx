import { ChangeEvent, useState,useEffect } from "react";

import { ITicket } from "@/interfaces/ITicket";
import { ITicketRequest } from "@/interfaces/request/ITicketRequest";

import { Update,Create } from "@/services/customerTicketsServices";
import { ValidateForm } from "@/request/UpdateCustomerTicket"

import { AddButton } from "@/components/common/Form/AddButton";
import { EditButton } from "@/components/common/Form/EditButton";
import { InputText } from "@/components/common/Form/InputText";
import { Select } from "@/components/common/Form/Select";
import { TextArea } from "@/components/common/Form/TextArea";
import { ITicketType } from "@/interfaces/ITicketType";
import { ValueSelect } from "@/interfaces/ValueSelect";
import { convertToTicketRequest } from "@/utils/ticketUtils";
import { toast } from "react-toastify";

interface PropsFormTicket {
    ticket: ITicket;
    ticketTypes: ITicketType[];
    editFunc?: (ticketEdited: ITicket) => void;
    createdFunc?: (ticketEdited: ITicket) => void;
}

export const FormTicket:React.FC<PropsFormTicket> = ( props ) => {

    const { ticket, editFunc, createdFunc,ticketTypes } = props;
    const [loading,setLoading] = useState(false);
    const [ticketEdit,setTicketEdit] = useState<ITicket >(ticket);
    const [listTicketTypes,setListTicketTypes] = useState<ITicketType[]>(ticketTypes);
    const [selectTicketTypes,setSelectTicketTypes] = useState<ValueSelect[]>();
    const [errorMessage,setErrorMessages] = useState<ITicketRequest>();

    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {

        const value = event?.target?.value;
        const name  = event?.target?.name;
        if ( ticketEdit ) {
            setTicketEdit({...ticketEdit,[name]:value});
        }
        
    }

    const handleChangeTextArea = (event: ChangeEvent<HTMLTextAreaElement>) => {

        const value = event?.target?.value;
        const name  = event?.target?.name;
    
        if( ticketEdit){
            setTicketEdit({...ticketEdit,[name]:value});
        }
    }

    const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {

        const value = event?.target?.value;

        const selectedType =selectTicketTypes?.find( (item) => item.value == value );
        if( ticketEdit && selectedType) {
            setTicketEdit({...ticketEdit,type:{id:selectedType?.value,name:selectedType?.name}});
        }
    }

    const updateTicket = async () => {

        const ticketToSend = convertToTicketRequest(ticketEdit);
        const validate = ValidateForm(ticketToSend);
        if ( !validate?.status ) {
            setErrorMessages(validate.data)
            return
        }

        setLoading(true);
        const response = await Update(ticketToSend);

        if ( response.status === 200 ) {

            toast.success('Ticket actualizado con éxito', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            if ( editFunc ) {
                editFunc(ticketEdit);
            }
        } else {

            toast.error('Error al actualizar el ticket', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
        setLoading(false);

    }

    const crateTicket = async () => {

    }

    useEffect(() => {

        if ( listTicketTypes && listTicketTypes.length > 0 ){
            let fillTypes:ValueSelect[] = [];

            listTicketTypes.forEach( (item) => {
                fillTypes.push({value:item.id,name:item.name});
            })

            if ( fillTypes.length > 0 ) {
                setSelectTicketTypes(fillTypes);
            }
        }


    },[listTicketTypes]);

    useEffect(() => {
        setTicketEdit(ticket);
    },[ticket])

    return (
        <div className="p-4 md:p-5">
            <div className="grid gap-4 mb-4 grid-cols-1 lg:grid-cols-2 ">
                <InputText 
                    label="Título" 
                    name="title" 
                    placeHolder="Ingresa el título del ticket" 
                    errorMessage={errorMessage?.title} 
                    focusEvent={() => { if (errorMessage) setErrorMessages({...errorMessage,title:''}) }} 
                    value={ticketEdit?.title} 
                    handleChange={handleChangeInput} 
                />
                <Select 
                    label="Tipo" 
                    values={selectTicketTypes} 
                    errorMessage={errorMessage?.ticket_type_id} 
                    name="ticket_type_id" 
                    value={ticketEdit?.type?.id} 
                    handleChange={handleChangeSelect} 
                    classCss=" "
                />
                <TextArea 
                    label="Descripción" 
                    name="description" 
                    placeHolder="En que podemos ayudarte?" 
                    errorMessage={errorMessage?.description} 
                    value={ticketEdit?.description} 
                    handleChange={handleChangeTextArea} 
                    focusEvent={() => { if (errorMessage) setErrorMessages({...errorMessage,description:''}) }} 
                    classCss=" lg: col-span-2"
                />
            </div>
            <div className=" w-full flex justify-end">
                {
                    ticketEdit?.id == "" ?
                    < AddButton actionFunc={crateTicket} loading={loading} label="Agregar" loadingText="Guardando..." />
                    :
                    < EditButton actionFunc={updateTicket} loading={loading} label="Editar" loadingText="Guardando..." />
                }
            </div>
        </div>
    )
}