

// export function validarRegSenha(senha){
//     var charNumerico = /([0-9])/g
//     var charEspecial = /(?=.*[!@#$%^&*])/
        
//     if (senha.length >= 8 && senha.match(charNumerico) && senha.match(charEspecial)){
//         document.querySelector('#regSenha').classList.add('inputValido')
//         return {vSenha: true}
//     }else{
//         document.querySelector('#regSenha').classList.remove('inputValido')
//         document.querySelector('#regSenha').classList.add('animarErro')
//         setTimeout(() => {
//             document.querySelector('#regSenha').classList.remove('animarErro')
//           }, 300);
//         return {vSenha: false}
//     }

// }

// export function validarConfSenha(senha, confSenha){
//     if (senha === confSenha){
//         document.querySelector('#confSenha').classList.add('inputValido')
//         document.querySelector('#erro4').style.display='none'
//         return {vConfSenha: true}
//     }else{
//         document.querySelector('#erro4').style.display='block'
//         document.querySelector('#confSenha').classList.remove('inputValido')
//         document.querySelector('#confSenha').classList.add('animarErro')
//       setTimeout(() => {
//         document.querySelector('#confSenha').classList.remove('animarErro')
//       }, 300);
//         return {vConfSenha: false}
//     }
// }

// export function validarRegNome(nome, lista){
//     const noob = lista.filter((filtro)=>{
//         return filtro.cadNome === nome
//     })
//     if (noob.length === 0) {
//         document.querySelector('#regNome').classList.add('inputValido')
//         document.querySelector('#erro6').style.display='none'
        
//         return {vNome: true}
//     }else{
//         document.querySelector('#erro6').style.display='block'
//         document.querySelector('#regNome').classList.remove('inputValido')
//         document.querySelector('#regNome').classList.add('animarErro')
//         setTimeout(() => {
//             document.querySelector('#regNome').classList.remove('animarErro')
//           }, 300);
//         return {vNome: false}
//     }
// }

// export function validarRegEmail(email, lista) {
//     const noob = lista.filter((filtro)=>{
//         return filtro.cadEmail === email
//     })

//     if (noob.length === 0){
//         document.querySelector('#erro5').style.display='none'
//         document.querySelector('#regEmail').classList.add('inputValido')

//         return {vEmail: true}
//     } else{
//         document.querySelector('#erro5').style.display='block'
//         document.querySelector('#regEmail').classList.remove('inputValido')
//         document.querySelector('#regEmail').classList.add('animarErro')
//         setTimeout(() => {
//             document.querySelector('#regEmail').classList.remove('animarErro')
//         }, 300);
//         return {vEmail: false}
//     }
// }