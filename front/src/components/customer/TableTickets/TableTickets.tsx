import { useState,useEffect } from "react";
import {  toast } from 'react-toastify';

import { ITicket } from "@/interfaces/ITicket";

import { GetAll } from "@/services/customerTicketsServices";
import { GetAllTypes } from "@/services/ticketTypeService";

import { Table } from "@/components/common/Skeletons/Table";
import { RowTableTicket } from "@/components/customer/RowTableTicket";
import { ITicketType } from "@/interfaces/ITicketType";

interface CustomerTicketProps {
    newTicket?: ITicket
}

export const TableTickets:React.FC<CustomerTicketProps> = (props) => {

    const { newTicket } = props
    const [tickets, setTickets] = useState<ITicket[]>([]);
    const [ticketTypes,setTicketTypes] = useState<ITicketType[]>([]);
    const [loading, setLoading] = useState(true);

    const getTickets = async () => {
        setLoading(true);
        try {
            const response = await GetAll();

            if (response.status === 200) {
                if ( response.dataResponse.tickets)  {
                    setTickets(response.dataResponse.tickets); 
                }
            } else {
                
                toast.error('Ocurrió al cargar los tickets', {
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
        } catch (error) {
            toast.error("Error al obtener los tickets");
            setLoading(false);
        }
    }

    const getTicketTypes = async() => {
        setLoading(true);
        try {
            
            const response = await GetAllTypes();

            if ( response.status === 200 ) {

                if ( response.dataResponse.ticket_types)  {
                    setTicketTypes(response.dataResponse.ticket_types); 
                }
            } else{
                toast.error('Ocurrió al cargar los tipos tickets', {
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
        } catch (error) {
            toast.error("Error al obtener los tipos tickets");
            setLoading(false);
        }
    }

    const removeTicket = (ticketId:string) => {

        const updatedList = tickets?.filter( item => item?.id !== ticketId);
        if ( updatedList ) {
          setTickets(updatedList);
        }
        
    }

    const editTicket = (ticketEdited:ITicket) => {

        setTickets( (prevList) => {
    
          const index = prevList?.findIndex( item => item.id === ticketEdited.id);
          if ( index !== -1 && index != undefined ) {
    
            const updateList = [...prevList || []];
            updateList[index] = ticketEdited;
            return updateList;
          }
    
          return prevList || [];
        });
      }

    useEffect( () => {
        getTickets();
        getTicketTypes();
    },[]);

    useEffect( () => {

    },[newTicket]);

    return (
        <>
            {
                loading == false && tickets?
                <div className="w-100 rounded-xl  bg-slate-50 shadow-md overflow-auto">
                    <table className="  leading-normal w-full">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">#</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Título</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tipo</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Estatus</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tickets?.length == 0 ?
                                <tr>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm" colSpan={5}>
                                        <div className="text-gray-900 whitespace-no-wrap text-center    ">No se encontraron elementos</div>
                                    </td>
                                </tr>
                                :
                                tickets?.map((ticket, index) => (
                                    <RowTableTicket key={index} index={index} ticket={ticket} removeTicketFunc={removeTicket} ticketTypes={ticketTypes} editTicketFunc={editTicket} />
                                ))
                            }
                        </tbody> 
                    </table>
                </div>
                :
                <Table />
            }
        </>
    )
}