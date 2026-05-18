function estadoTemperatura(temperatura) {
    if (typeof temperatura !== 'number' || temperatura < -50 || temperatura > 60) {
        throw new TypeError('La temperatura debe ser un número válido entre -50 y 60');
    }

    if (temperatura > 30) {
        return 'CALOR';
    } else if (temperatura >= 15) {
        return 'TEMPLADO';
    } else {
        return 'FRIO';
    }
}

module.exports = { estadoTemperatura };