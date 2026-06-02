function crearAlumno(nombre, edad, cursos) {
    if (typeof nombre !== 'string' || typeof edad !== 'number' || !Array.isArray(cursos)) {
    
    throw new TypeError('Nombre debe ser una cadena, edad un número y cursos un arreglo');
    }

    if (edad < 0) {
        throw new TypeError('La edad no puede ser negativa');
    }
    return { nombre, edad, cursos };
}
module.exports = { crearAlumno };