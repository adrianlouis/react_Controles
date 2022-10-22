import React from 'react'

export const GlobalContext = React.createContext()

export const GlobalStorage = ({children}) =>{
    const [userLogado, setUserLogado] = React.useState([])
    const [dados, setDados] = React.useState(
    
    [
        {
            perfil:{nome:'Adrian', email:'adrian@email.com', senha:'qwe123!@#'},
            lde:[
                    {id:1, num:1, local:'4pav B', duracao:'3h', avaria:''},
                    {id:2, num:2, local:'4pav B', duracao:'2h', avaria:'Muito suja. Tomada saindo da parede sozinha.'}
                ],
            ext:{num:16958, tipo:'A'}
        },
        {
            perfil:{nome:'Louis', senha:'qwe123!@#'},
            lde:[
                {id:1, num:1, local:'4pav B', duracao:'3h', avaria:''},
                {id:2, num:2, local:'4pav B', duracao:'2h', avaria:'Pouco suja. Tomada desencaixando sozinha.'}
            ],
            ext:{num:26554, tipo:'C'}
        }
    ]

    )

    return <GlobalContext.Provider value={{userLogado, setUserLogado, dados, setDados}}>{children}</GlobalContext.Provider>
}
