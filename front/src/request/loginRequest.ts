import { IsEmptyText, ValidateEmail } from "@/helpers/Validation";
import { IFormLogin } from "@/interfaces/IFormLogin";

export const validLoginForm = ( formData:IFormLogin)  =>{

    let valid = true;
    

    if( IsEmptyText(formData.email.content) ){

        formData.email.errorMessage = "Ingresa tu correo";
        
        valid = false;
    } else if ( !ValidateEmail(formData.email.content)){

        formData.email.errorMessage = "Ingresa un correo válido";
        valid = false;
    }

    if ( IsEmptyText(formData.password.content) ){

        formData.password.errorMessage = "Ingresa tu contraseña";
        valid = false
    }

    return {
        status:valid,
        data:formData
    };
}