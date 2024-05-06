"use client"

import { useState } from "react";
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { IFormLogin } from "@/interfaces/IFormLogin";
import { validLoginForm } from "@/request/loginRequest";

import { InputPassword } from "@/components/common/Form/InputPassword";
import { InputText } from "@/components/common/Form/InputText";
import { Button } from "@/components/common/Form/Button";

const LoginForm = () => {
    const router = useRouter();
    const [sendingForm,setSendingForm] = useState(false);
    const [formData,setFormData] = useState<IFormLogin>(
        { email:{
            content:"",
            errorMessage:""
        },password:{
            content:"",
            errorMessage:""
        }}
    );

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        
        setFormData({
          ...formData,
          [event.target.name]: {
            content: event.target.value,
            errorMessage: ""
          }
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        setSendingForm(true);
        const dataValidation = formData
        const validation = validLoginForm(dataValidation);
        if( !validation.status ) {

            setFormData( (data) => {
                return {
                    email: {
                        ...data.email,
                        errorMessage: validation.data.email.errorMessage
                    },
                    password: {
                        ...data.password,
                        errorMessage: validation.data.password.errorMessage
                    }
                }
            });
            setSendingForm(false);
            return
        }

        const response = await signIn("credentials", {
            redirect: false,
            email: formData.email.content,
            password: formData.password.content,
        });
        
        if( !response?.ok ) {

            const errorMessage = response?.error || "Error  Inesperado";
            toast.error(errorMessage, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
            setSendingForm(false);
            return;
        }
        setSendingForm(false);
        router.push("/");
    }


    return (
        <div className="flex min-h-screen flex-col items-center  justify-center container mx-auto px-3">
            <div className=" my-4">
                <h3 className=" text-2xl font-semibold">Prototipo de tickets</h3>
            </div>
            <form onSubmit={ (e) => handleSubmit(e)} className=" px-4 py-4 border rounded-md w-full lg:w-2/3 max-w-2xl shadow-xl ">
                <InputText  label="Correo" name="email" value={formData.email.content}  errorMessage={formData.email.errorMessage}  placeHolder="tu@correo.com" handleChange={handleInputChange} />
                <InputPassword label="Contraseña" name="password" value={formData.password.content} errorMessage={formData.password.errorMessage}  placeHolder="Ingresa tu contraseña" handleChange={handleInputChange} />
                <Button label="Ingresar" style=" float-right mt-3" loading={sendingForm} loadingText="Enviando"/>
            </form>
            <ToastContainer />
        </div>
    )
}

export default LoginForm