import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import css from './css/novoPerfil.css'
import {GlobalContext} from './GlobalContext'
import storage from './firebase-config'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { adicionarRegistro, refreshBd, updateBd } from './crudFireBase'




const EditPerfil = () => {

    const context = React.useContext(GlobalContext)
    const navigate = useNavigate()
    const [perfil, setPerfil] = React.useState('')
    const old = context.userLogado
    const [editado, setEditado] = React.useState({nome:old.nome, nick:old.nick, quote:old.quote} )

    console.log(editado)
    
    
    async function handleChange(e){
        const storage = getStorage()
        const foto = e.target.files[0]

        setPerfil(foto)
        document.querySelector('#foto').src = URL.createObjectURL(foto)

        const fotoPerfil = ref(storage, `${context.userLogado.id}${foto.name}`)
        // const fotoPerfilImgs = ref(storage, `/images/${foto.name}`)

        await uploadBytes(fotoPerfil, foto).then((snapshot) =>{
            console.log('Uploaded. . .')
        })

        // ADICIONAR NOME COMPLETO DA IMAGEM NO BD DO FIREBASE
        await adicionarRegistro(context.userLogado.id, `${context.userLogado.id}${foto.name}`, 'profPic')
        await context.setUserLogado({...context.userLogado, profPic:`${context.userLogado.id}${foto.name}`})
        const update = await refreshBd(context.userLogado.nome)
        await context.setUserLogado(...update)



    }

    function handleFotoPerfil(){
        document.querySelector('#editFoto').click()
    }

    function handleSave(){
        const edit = {...editado, nick:'@'+editado.nick}
        context.setUserLogado({...context.userLogado, ...edit})
        updateBd(context.userLogado.id, edit)

        navigate('/home/lde')
    }

    React.useEffect(()=>{


        // const storage = getStorage();
        // getDownloadURL(ref(storage, context.userLogado.profPic)).then((url) =>{
        //     document.querySelector('#foto').setAttribute('src', url)
        // })


        // Create a reference with an initial file path and name
        // const storage = getStorage();
        // const pathReference = ref(storage, 'lr0GX5CB3i55W7CDgNREgalaxia2.png');

        // Create a reference from a Google Cloud Storage URI
        // const gsReference = ref(storage, 'gs://projectfiatlux-5a6ee.appspot.com/lr0GX5CB3i55W7CDgNREgalaxia2.png');

        // Create a reference from an HTTPS URL
        // Note that in the URL, characters are URL escaped!
        // const httpsReference = ref(storage, 'https://firebasestorage.googleapis.com/v0/b/projectfiatlux-5a6ee.appspot.com/o/lr0GX5CB3i55W7CDgNREgalaxia2.png?alt=media&token=948c2693-6a80-448f-a7b2-5e02e4901dd6');

        // console.log(pathReference)
        // console.log(gsReference)
        // console.log(httpsReference)

        
    },[])

    

  return (
    <div>
        <div id='perfil' className='perfil'>

            <img id='wallpaper' className='editando' />
            <i id='iconWallpaperEdit' className="fa-solid fa-camera"></i>
            {/* <input type='file'  /> */}


            <img id='foto' className='editando' onClick={handleFotoPerfil} />
            <i id='iconFotoEdit' className="fa-solid fa-camera" onClick={handleFotoPerfil}></i>
            <input id='editFoto' type='file' accept='image/*' onChange={handleChange} style={{display:'none'}} />

            <div id='botaoEditarPerfil'>
                
                <span onClick={()=>handleSave()}>Salvar</span>
            </div>

            <div className='dadosPerfil'>
                {/* <p className='nome'>Adriano Soares</p> */}
                <input className='newLde inputEditProfile' value={editado.nome} onChange={({target})=>setEditado({...editado, nome:target.value})} />
                <input className='newLde inputEditProfile' value={editado.nick} onChange={({target})=>setEditado({...editado, nick:target.value})} />
                {/* <p className='tag'>@AdrianLouis</p> */}
                {/* <p className='bio'>Se eu tivesse o Sol, o afundario no oceano para poder vender velas aos mortais.</p> */}
                <textarea className='textAreaEditProfile' value={editado.quote} onChange={({target})=>setEditado({...editado, quote:target.value})} ></textarea>
            </div>
        </div>

        <NavLink className='navVoltarEditProfile' to='/home/lde'>voltar</NavLink>
    </div>
  )
}

export default EditPerfil
