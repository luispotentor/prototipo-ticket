import { getServerSession } from "next-auth";
import { getSession, signOut } from "next-auth/react";
import { authOptions } from "@/utils/authOptions";


export const LoginAccess = async (email:string | undefined,password:string |undefined) =>{

    if (!email || !password) {
        return;
    }
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/";
    const nameApp = process.env.NAME_APP || "app";
    const url = `${apiUrl}login`;
    
    const sendCredentials = {
        email: email,
        password:password,
        device_name: nameApp
    }
    
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(sendCredentials),
        });
    
        const status = response.status;
        const data = await response.json();

        return {
            status,
            data
        }
    } catch (error:Error | any) {
        return {
            status:500,
            error:  ClassifyFetchError(error)
        }
    }
}

export const ClassifyFetchError = ( error:Error) => {

    if (error instanceof TypeError && error.message === 'Failed to fetch') {
        return 'Error de conexión: No se pudo establecer la conexión con el servidor.';
    } else if (error instanceof SyntaxError) {
        return 'Error de sintaxis: Problema al analizar la respuesta del servidor.';
    } else if (error instanceof RangeError) {
        return 'Error de rango: Valor numérico fuera de rango.';
    } else if (error instanceof URIError) {
        return 'Error de URI: Problema con la codificación o decodificación de un URI.';
    } else if (error instanceof ReferenceError) {
        return 'Error de referencia: Acceso a una variable no definida o inaccesible.';
    } else {
        // Handle network and security errors separately
        if (error instanceof Error && error.name === 'AbortError') {
            return 'Error de red: La solicitud fue abortada.';
        } else if (error instanceof Error && error.name === 'SecurityError') {
            return 'Error de seguridad: Violación de políticas de seguridad.';
        } else {
            console.log(error);
            return 'Error desconocido: Ocurrió un error inesperado.';
        }
    }
}

export const GetSession = async () => {

    if ( IsServer()) {
       const session = await getServerSession(authOptions); 
        return session;
    } else {
        const session = await getSession();
        return session;
    }
}

export const IsServer = () => {

    return typeof window === 'undefined';
}

const getRequestOptions = async (method:string) => {

    const {user} = await GetSession();
    const requestOptions: RequestInit = {
        method,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            'Authorization': `Bearer ${user.token}`,
        },
    };

    return requestOptions;
}

export const SendRequestApi = async( api:string,method = "GET",  data:Object | null = null ) => {

    const {user} = await GetSession();

    const version = process.env.NEXT_PUBLIC_API_VERSION || "v1";
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/";
    let url =  apiUrl+version+'/'+api;
    let dataString:any = {};

    if (data !== null && method == 'GET') {
        if (typeof data === 'object') { 
            dataString = {...dataString,...data};
        }
        
    }

    if ( Object.keys(dataString).length > 0 ) {
        const queryString = new URLSearchParams(dataString).toString();
        url += '?' + queryString;
    }
    
    const requestOptions = await getRequestOptions( method );

    if (data !== null && (method == 'POST' || method == 'PUT')) {
        requestOptions.body = JSON.stringify(data);
    }


    try {
        const response = await fetch(url, requestOptions);
        const status = response.status;

        if ( status === 204 ){

            return {
                status
            };
        }
        const dataResponse = await response.json();
        return {
            status,
            dataResponse
        }
    } catch (error:Error | any) {
        
        console.log("error:",error);
        return {
            status:500,
            error:ClassifyFetchError(error)
        }
    }
} 


export const RemoveSession = () => {
    signOut();
}