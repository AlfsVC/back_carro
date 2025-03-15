exports.validationErrors = (errors) => {
    const firstError = {}
    errors.forEach(error => {
        if (!firstError[error.path]) {
            firstError[error.path] = [error.msg]
        }
    })

    return firstError
}

exports.convertDateFormat = (dateString) => {
    // Dividir la fecha en partes [YYYY, MM, DD]
    const [year, month, day] = dateString.split('-');
  
    // Formatear la fecha como DD/MM/YYYY
    return `${day}/${month}/${year}`;
};