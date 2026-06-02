function identidad(valor,{clone=false}={}){
    const esObjeto= valor !== null && typeof valor === 'object';
    if(clone){
        if(!esObjeto) throw new TypeError('Solo se pueden clonar objetos');

        if (Array.isArray(valor)){
            return [...valor];
        } else {
            return {...valor};
        }
        return valor;
    }
    }

    function suma(a,b){
        if (typeof a !== 'number' || typeof b !== 'number') {
            throw new TypeError('Ambos argumentos deben ser números');
        }
        return a + b;
    }
    module.exports = {identidad, suma};