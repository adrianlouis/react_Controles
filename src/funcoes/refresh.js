export function refreshPages(){

    const obj = JSON.parse(localStorage.getItem('reload-url'))
    const url = obj.path+obj.search
    
    return url
}