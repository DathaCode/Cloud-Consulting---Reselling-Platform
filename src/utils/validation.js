export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

export const validatePhone = (phone) => {
    // Allow various phone formats
    const re = /^[\d\s\-\(\)\+]+$/;
    return phone.length >= 10 && re.test(phone);
};

export const validateRequired = (value) => {
    return value && value.trim().length > 0;
};
