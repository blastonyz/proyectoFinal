export const generatorUserError = (data) =>{
    return `Todos los Campos son requeridos
    -first_name: ${data.first_name}
    -last_name: ${data.last_name}
    -email: ${data.email}
    -password: ${data.password}`
}

export const generatorUserIdError = (id) =>{
    return `Debe usarse un id valido:
    ${id}`;
}

export const generatorLoginError = (data) =>{
    return `Email or Pass invalid
    -email: ${data.email}
    -password: ${data.password}`
}

export const generatorRegisterError = (data) =>{
    return `User already exist
    -first_name: ${data.first_name}
    -last_name: ${data.last_name}
    -email: ${data.email}
    -age: ${data.age}`
}