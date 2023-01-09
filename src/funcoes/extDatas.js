export function mesParaString(v){
    switch (v) {
        case 0:
            return 'Janeiro'
            break;
        case 1:
            return 'Fevereiro'
            break;
        case 2:
            return 'Março'
            break;
        case 3:
            return 'Abril'
            break;
        case 4:
            return 'Maio'
            break;
        case 5:
            return 'Junho'
            break;
        case 6:
            return 'Julho'
            break;
        case 7:
            return 'Agosto'
            break;
        case 8:
            return 'Setembro'
            break;
        case 9:
            return 'Outubro'
            break;
        case 10:
            return 'Novembro'
            break;
        case 11:
            return 'Dezembro'
            break;
    
        default:
            break;
    }
}

export function mesParaNumero(v){
    if (v === 'Jan'){
        return 0
    }else if (v === 'Fev'){
        return 1
    }else if (v === 'Mar'){
        return 2
    }else if (v === 'Abr'){
        return 3
    }else if (v === 'Mai'){
        return 4
    }else if (v === 'Jun'){
        return 5
    }else if (v === 'Jul'){
        return 6
    }else if (v === 'Ago'){
        return 7
    }else if (v === 'Set'){
        return 8
    }else if (v === 'Out'){
        return 9
    }else if (v === 'Nov'){
        return 10
    }else if (v === 'Dez'){
        return 11
    }else{
        return ''
    }
}