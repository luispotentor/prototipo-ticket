// import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { RequestInternal } from "next-auth";

import { Roles } from "@/enums/Roles";
import { LoginAccess } from "@/services/conexions";

export const authOptions = {
    providers:[
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Correo" },
                password: { label: "Contraseña", placeholder: "****", type: "password" }
            },
            authorize: async function (credentials: Record<"email" | "password", string> | undefined, req: Pick<RequestInternal, "body" | "query" | "headers" | "method">) {
               
               
                const responseAccess = await LoginAccess(credentials?.email,credentials?.password);
                
                if ( responseAccess?.status === 401) {
                    throw new Error("Credenciales incorrectas");
                }

                if ( responseAccess?.status === 500 ) {
                    throw new Error("Ocurrió un error inesperado");
                }

                if ( responseAccess?.status === 422 ) {
                    throw new Error(responseAccess?.data.message);
                }
                
                const role = responseAccess?.data?.role;
                let url = '/';

                if ( role == Roles.ADMIN ){
                    url = `/admin/tickets`;
                }

                if ( role == Roles.CUSTOMER ){
                    url = `/customer/tickets`;
                } 

               return {
                    id:responseAccess?.data?.id,
                    name:responseAccess?.data?.name,
                    email:credentials?.email,
                    token:responseAccess?.data?.token,
                    last_name:responseAccess?.data.last_name,
                    role:responseAccess?.data?.role,
                    start_url:url
                    
               };
            }
        })
    ],
    pages:{
        signIn: "/"
    },
    callbacks: {
        async jwt({ token,user, trigger, session }:any) {

            
            // Persist the OAuth access_token and or the user id to the token right after signin
            if (user) {
              token.id          = user.id;
              token.name        = user.name;
              token.last_name   = user.last_name;
              token.email       = user.email;
              token.accessToken = user.token;
              token.role        = user.role;
              token.start_url   = user.start_url;

            }
            
            if( trigger === "update") {
                return { ...token,...session.user}
            }
            return {...token}
        },
        async session({ session, token, user }:any) {
            // Send properties to the client, like an access_token and user id from a provider.
            if ( token ) {
                session.user.id        = token.id;
                session.user.name      = token.name;
                session.user.last_name = token.last_name;
                session.user.email     = token.email;
                session.user.token     = token.accessToken;
                session.user.role      = token.role;
                session.user.start_url = token.start_url;
            }
            
            return session
        },
      },
    
}