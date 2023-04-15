import React from 'react'

const NewUserProfile = () => {

    const novoUser = {
        perfil:{
            user:'',
            nick:'',
            email:'',
            senha:'',
            cor:'',
            imagens:{
                foto:'',
                fotoCrop:'',
                fundo:'',
                fundoCrop:''
            },
            
        },
        planilhas:{
            extintores:[],
            luzes:[],
            
        }
        

    }


  return (
    <div>
      <h1>Criar Perfil de Novo Usuário</h1>
    </div>
  )
}

export default NewUserProfile
