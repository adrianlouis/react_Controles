export function logarCookie(ref, getDocs){

    const getUsers = async () => {
        const data = await getDocs(ref);
        const bd = data.docs.map((docs)=>({...docs.data(), id:docs.id}))

        const biskoito = document.cookie.slice(5).split('&')

        const logar = bd.filter((f)=>{
        return f.nome === biskoito[0]
        })

        return bd.filter((f)=>{
            return f.nome === biskoito[0]
        })
    }
    
    // console.log(getUsers())

    
    return getUsers()

}