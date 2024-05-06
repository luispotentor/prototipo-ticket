
import { useState } from "react";
import { toast } from "react-toastify";

import { ITicket } from "@/interfaces/ITicket"
import { ITicketType } from "@/interfaces/ITicketType";

import { Remove } from "@/services/customerTicketsServices";

import { EditOption } from "@/components/common/Buttons/EditOption";
import { DeleteOption } from "@/components/common/Buttons/DeleteOption";
import { ConfirmAlert } from "@/components/common/Modals/ConfirmAlert";
import { Loader } from "@/components/common/Modals/Loader";
import { Modal } from "@/components/common/Modals/Modal";
import { FormTicket } from "@/components/customer/FormTicket";


interface PropsRowTableTicket {
    ticket: ITicket;
    index: number;
    ticketTypes:ITicketType[]
    editTicketFunc?: (ticket: ITicket) => void;
    removeTicketFunc?: (id: string) => void;
}
export const RowTableTicket:React.FC<PropsRowTableTicket> = (props) => {
    const { ticket, index, editTicketFunc, removeTicketFunc,ticketTypes } = props;
    const [showDeleteModal,setShowDeleteModal] = useState( false );
    const [loading,setLoading] = useState(false);
    const [showTicketModal,setShowTicketModal] = useState( false );

    const colorStatus:Record<string,string> = {
        red: "bg-red-50 px-2 text-red-700 ring-red-600/10",
        yellow: "bg-yellow-50 px-2 text-yellow-700 ring-yellow-600/10",
        green: "bg-green-50 px-2 text-green-700 ring-green-600/10",
        blue: "bg-blue-50 px-2 text-blue-700 ring-blue-600/10",
    }

    const removeTicket = async () =>{
        setLoading(true);

        const response = await Remove(ticket?.id);

        if(response.status === 204){

            if ( removeTicketFunc ) {
                removeTicketFunc(ticket?.id);
            }

            toast.success('Se eliminó el ticket con éxito', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else {
            toast.error('Ocurrió al eliminar el ticket', {
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

        setShowDeleteModal(false);
        setLoading(false);
    }

    return (
        <>
            <tr key={index}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{index + 1}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{ticket.title}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{ticket?.type.name}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <span className={`inline-flex items-center rounded-md py-1 text-xs font-medium  ring-1 ring-inset ${colorStatus[ticket?.status?.color]}`}>{ticket?.status.name}</span>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex justify-between">
                        <EditOption clickFunc={ () => setShowTicketModal(true)} />
                        <DeleteOption clickFunc={ () => setShowDeleteModal(true)} />
                    </div>
                </td>
            </tr>
            <ConfirmAlert showModal={showDeleteModal} toggleModal={ () => setShowDeleteModal(false) } functionAction={removeTicket} cancelLabel="No, Cancelar" actionLabel="Si, eliminarlo" loading={false} >
                Estas seguro de eliminar el ticket   <span className=" font-bold">{ticket?.title}</span> 
            </ConfirmAlert>
            <Loader show={loading} />
            <Modal showModal={showTicketModal} title="Editar Ticket" toogleFunc={ setShowTicketModal} >
                <FormTicket ticket={ticket} editFunc={editTicketFunc} ticketTypes={ticketTypes} />
            </Modal>
        </>
    )
}