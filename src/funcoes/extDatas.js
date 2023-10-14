export function dataLong(obj){
    const objData = new Date()
    objData.setMonth(obj-1)
    return objData.toLocaleString('pt-Br', {month:'short'})
}

export function dataShort(obj){
    const objData = new Date()
    objData.setMonth(obj)
    return objData.toLocaleString('pt-Br', {month:'2-digit'})
}
