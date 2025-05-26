import moment from "moment";

export const validateName = (name: string | undefined) => {
    if(typeof name === "undefined") return false
    const nameRegex = /^.{3,50}$/;
    return nameRegex.test(name)
}

export const validatePassword = (password: string | undefined) => {
    if(typeof password === "undefined") return false
    const passwordRegex = /^(?=.*?[A-ZÁÉÍÓÖŐÚÜŰ])(?=.*?[a-záéíóöőúüű])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    return passwordRegex.test(password)
}

export const validateEmail = (email: string | undefined) => {
    if(typeof email === "undefined") return false
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email)
}

export const validateBirthday = (birthday: string | undefined) => {
    if(typeof birthday === "undefined") return false
    const userBirthday = moment(birthday, 'YYYY-MM-DD', true);

    if (!userBirthday.isValid()) {
        return false;
    }

    const today = moment();
    const age = today.diff(userBirthday, 'years');
    return age >= 18;
}

export const validateMinimumYear = (birthday: string | undefined) => {
    if (typeof birthday === "undefined") return false;

    const userBirthday = moment(birthday, 'YYYY-MM-DD', true);

    if (!userBirthday.isValid()) {
        return false;
    }

    const year = userBirthday.year();
    return year >= 1900;

}