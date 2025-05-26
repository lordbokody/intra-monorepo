import moment from "moment";
export const validateName = (name) => {
    if (typeof name === "undefined")
        return false;
    const nameRegex = /^.{3,50}$/;
    return nameRegex.test(name);
};
export const validatePassword = (password) => {
    if (typeof password === "undefined")
        return false;
    const passwordRegex = /^(?=.*?[A-ZÁÉÍÓÖŐÚÜŰ])(?=.*?[a-záéíóöőúüű])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    return passwordRegex.test(password);
};
export const validateEmail = (email) => {
    if (typeof email === "undefined")
        return false;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};
export const validateBirthday = (birthday) => {
    if (typeof birthday === "undefined")
        return false;
    const userBirthday = moment(birthday, 'YYYY-MM-DD', true);
    if (!userBirthday.isValid()) {
        return false;
    }
    const today = moment();
    const age = today.diff(userBirthday, 'years');
    return age >= 18;
};
export const validateMinimumYear = (birthday) => {
    if (typeof birthday === "undefined")
        return false;
    const userBirthday = moment(birthday, 'YYYY-MM-DD', true);
    if (!userBirthday.isValid()) {
        return false;
    }
    const year = userBirthday.year();
    return year >= 1900;
};
//# sourceMappingURL=validators.util.js.map