import { ForwardRefExoticComponent, SVGProps } from "react";
import { TicketIcon } from "@heroicons/react/24/outline";

export interface Menu {
    title: string;
    link: string;
    icon?:ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref"> >
}

export const MenuListCustomer:Menu[] = [
    {
        title: "Tickets",
        link: "/customer/tickets",
        icon: TicketIcon
    },
];

export const MenuListAdmin:Menu[] = [
    {
        title: "Tickets",
        link: "/admin/tickets",
        icon: TicketIcon
    },
];