function puedeConducir(edad) {
    if (!Number.isInteger(edad) || edad < 0) {
        throw new TypeError('edad debe ser un número entero positivo');
    }
    return edad >= 18 ? 'SI' : 'NO';
}
module.exports={puedeConducir};

/*
mayor a 7 aprovado
entre 4 y 7 supletorio
menor a 7 reprobado
*/