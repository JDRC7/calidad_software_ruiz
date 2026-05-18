function evaluarNota(nota) {
    if (typeof nota !== 'number' || nota < 0 || nota > 10) {
        throw new TypeError('La nota debe ser un número válido entre 0 y 10');
    }

    if (nota >= 7) {
        return 'APROBADO';
    } else if (nota >= 4) { 
        return 'SUPLETORIO';
    } else { 
        return 'REPROBADO';
    }
}

module.exports = { evaluarNota };