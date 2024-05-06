
export const ValidateEmail = (email:string):boolean => {

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export const IsEmptyText = ( text:string) => {

    return text.trim().length === 0;
}