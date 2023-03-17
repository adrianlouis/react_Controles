import React from 'react'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import css from './css/novoPerfil.css'
import {GlobalContext} from './GlobalContext'
import storage from './firebase-config'
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { updateBd } from './crudFireBase'
import Cropper from 'react-easy-crop'
import 'react-image-crop/dist/ReactCrop.css'




const EditPerfil = () => {

    const context = React.useContext(GlobalContext)
    const navigate = useNavigate()
    const old = context.userLogado.perfil
    const [editado, setEditado] = React.useState({nome:old.nome, nick:old.nick, foto:old.foto, fotoCrop:old.fotoCrop, wallpaper:old.wallpaper, wallpaperCrop:old.wallpaperCrop, quote:old.quote} )
    const storage = getStorage()
    const[uurl, setUrl] = React.useState('')
    const [modal, setModal] = React.useState(0)

    const larguraTela = window.screen.width
    
    const [crop, setCrop] = React.useState({x:0,y:0})
    const [zoom, setZoom] = React.useState(1)
    const [cut, setCut] = React.useState('')
    const onCropComplete = React.useCallback((croppedArea, croppedAreaPixels)=>{
        setCut(croppedAreaPixels)
        console.log(croppedArea, croppedAreaPixels, crop)
    },[])

    // ADICIONAR IMAGEM NO FIREBASE 
    async function handleChange(e){
        const foto = e.target.files[0]
        setUrl(URL.createObjectURL(foto))
        setEditado({...editado, foto:URL.createObjectURL(foto)})

        var canvas = document.querySelector('#canv')
                var ctx = canvas.getContext('2d')
                const pic = new Image()
                pic.src=URL.createObjectURL(foto)
                pic.onload=()=>{
                    ctx.drawImage(URL.createObjectURL(foto), 0,0,80,80)
                }


        // const fotoPerfil = ref(storage, `${context.userLogado.id}fotoPerfil.jpg`)

        // await uploadBytes(fotoPerfil, foto).then((snapshot) =>{
        //     console.log('Uploaded. . .')
        // })

        //     getDownloadURL(ref(storage, '/'+context.userLogado.profPic)).then((url)=>{
        //         setUrl(url)
        //         setEditado({...editado, foto:url})

        //         var canvas = document.querySelector('#canv')
        //         var ctx = canvas.getContext('2d')
        //         ctx.drawImage(url, 0,0,80,80)
        //     })

            setModal(3)

    }

    function download(){
        // BAIXAR IMAGEM E SETAR NA FOTO DO PERFIL
        getDownloadURL(ref(storage, '/'+context.userLogado.profPic)).then((url)=>{
            document.querySelector('#foto').setAttribute('src', url)
            setUrl(url)
        })
    }

    function deletarImg(){
        const img = ref(storage, `/${context.userLogado.profPic}`)

        deleteObject(img)
    }

    // CARREGAR A FOTO DO PERFIL E OPÇÕES PARA O CROP AO TER TAIS DADOS EM USERLOGADO
    React.useEffect(()=>{
        if (context.userLogado.perfil.foto && context.userLogado.perfil.fotoCrop) {

        //     var silver=new Image()
        //     silver.src=kDash
        //     silver.onload=()=>{
        //     // imagem, xIniRecorte, yIniRecorte, larguraRecorte, alturaRecorte, posX, posY, larguraImagem, alturaImagem
        //     ctx.drawImage(silver, cut.x, cut.y, cut.width, cut.height, 0, 0, 100, 100 )

        // }

        var canvas = document.querySelector('#canv')
        var ctx = canvas.getContext('2d')
            var foto = new Image()
            foto.src=context.userLogado.perfil.foto
            foto.onload=()=>{
                ctx.drawImage(foto, ...context.userLogado.perfil.fotoCrop )

            }
        }else{
            
            console.log('carregar foto')
        }

        if (context.userLogado.perfil.wallpaper && context.userLogado.perfil.wallpaperCrop){
            var canvWpp = document.querySelector('#canvWpp')
            var ctxWpp = canvWpp.getContext('2d')
            var wpp = new Image()
            wpp.src = context.userLogado.perfil.wallpaper
            wpp.onload= () =>{
                ctxWpp.drawImage(wpp, ...context.userLogado.perfil.wallpaperCrop)
            }
        }else{
            console.log('carregar wpp')

        }

    },[])

    // console.log(context.userLogado.perfil)

    // SALVAR OPÇÕES DO CROP DA FOTO DO PERFIL NO USERLOGADO
    async function handleCrop(){

        var canvas = document.querySelector('#canv')
        var ctx = canvas.getContext('2d')
        var fotoDoPerfil=new Image()
        fotoDoPerfil.src=editado.foto
        // console.log(fotoDoPerfil)
        fotoDoPerfil.onload=()=>{
            // imagem, xIniRecorte, yIniRecorte, larguraRecorte, alturaRecorte, posX, posY, larguraImagem, alturaImagem
            ctx.drawImage(fotoDoPerfil, cut.x, cut.y, cut.width, cut.height, 0, 0, 80, 80 )
            setEditado({...editado, fotoCrop:[cut.x, cut.y, cut.width, cut.height, 0, 0, 80, 80]})
        }
    
        // const novoPerfil = {...context.userLogado.perfil, foto:`${context.userLogado.id}fotoPerfil.jpg`, fotoCrop:[cut.x, cut.y, cut.width, cut.height, 0, 0, 80, 80 ]}

        // await context.setUserLogado({...context.userLogado, perfil:{ ...context.userLogado.perfil, foto:fotoDoPerfil, fotoCrop:[cut.x, cut.y, cut.width, cut.height, 0, 0, 80, 80 ]}})
        // updateBd(context.userLogado.id, {perfil:novoPerfil})

        
        setModal(0)
    }

    function handleWppCrop(){
        var canvas = document.querySelector('#canvWpp')
        var ctx = canvas.getContext('2d')
        var wpp=new Image()
        wpp.src=editado.wallpaper
        wpp.onload=()=>{
            // imagem, xIniRecorte, yIniRecorte, larguraRecorte, alturaRecorte, posX, posY, larguraImagem, alturaImagem
            ctx.drawImage(wpp, cut.x, cut.y, cut.width, cut.height, 0, 0, larguraTela, (larguraTela / 3) )
            setEditado({...editado, wallpaperCrop:[cut.x, cut.y, cut.width, cut.height, 0, 0, larguraTela, (larguraTela / 3)]})
        }

        setModal(0)
    }

    function handleModal(e){

       if ( e.target === e.currentTarget) {
        setModal(0)
       }
    }

    function handleSave(){
        // const perfilNovo = editado
        context.setUserLogado({...context.userLogado, perfil:editado})
        // context.setUserLogado({...context.userLogado, ...edit})
        updateBd(context.userLogado.id, {perfil:editado})

        navigate('/home/lde')
    }
    
    function back(){
        setEditado('')
    }

    function inputFocus(el){
        console.log(el.previousElementSibling)
        el.previousElementSibling.style.color='rgb(166, 243, 166)'
    }
    function inputBlur(el){
        el.previousElementSibling.style.color='rgb(161, 161, 161)'
    }

    function handleWallpaper(e){
        const wpp = e.target.files[0]
        // setUrl(URL.createObjectURL(wpp))
        setEditado({...editado, wallpaper:URL.createObjectURL(wpp)})

        var canvas = document.querySelector('#canvWpp')
                var ctx = canvas.getContext('2d')
                const pic = new Image()
                pic.src=URL.createObjectURL(wpp)
                pic.onload=()=>{
                    ctx.drawImage(URL.createObjectURL(wpp), 0,0,larguraTela,(larguraTela / 3))
                }

        setModal(4)

    }

// console.log(window.screen.width / 3)
  return (
    <div>

        {modal === 1 && <div id='modal' className='perfilEditModal' onClick={(e)=>handleModal(e)} >

            <div>
                <p onClick={()=>document.querySelector('#editFoto').click()} >Mudar foto</p>
                <p onClick={()=>setModal(3)} >Recortar foto</p>
                <p onClick={()=>deletarImg()} >Excluir foto</p>
            </div>

        </div>}

        {modal === 2 && <div id='modal' className='perfilEditModal' onClick={(e)=>handleModal(e)}>

            <div>
                <p onClick={()=>document.querySelector('#inputFileWallpaper').click()} >Mudar papel de parede</p>
                <p onClick={()=>setModal(3)} >Recortar papel de parede</p>
                <p onClick={()=>deletarImg()} >Excluir papel de parede</p>
            </div>

            </div>}

            {modal === 4 && <div className='perfilEditModalCrop'>
        <div className='wrapperCrop'>
                <Cropper  cropShape='rect' showGrid={false}  image={editado.wallpaper} crop={crop} zoom={zoom} aspect={3 / 1} onCropChange={setCrop} onCropComplete={onCropComplete} onZoomChange={setZoom} ></Cropper>
            </div>
            <button onClick={()=>setModal(0)}>Cancelar</button>
            <button onClick={()=>handleWppCrop()} >Recortar</button>
            </div>}

        {modal === 3 && <div className='perfilEditModalCrop'>
        <div className='wrapperCrop'>
                <Cropper  cropShape='round' showGrid={false}  image={uurl} crop={crop} zoom={zoom} aspect={1 / 1} onCropChange={setCrop} onCropComplete={onCropComplete} onZoomChange={setZoom} ></Cropper>
            </div>
            <button onClick={()=>setModal(0)}>Cancelar</button>
            <button onClick={()=>handleCrop()} >Recortar</button>
            </div>}

        <div id='perfil' className='perfil'>

            {/* <div className='canvasWrapper'>

                <canvas width='100' height='100' id='canv'>
                    <p>Seu navegador não suporta Canvas</p>
                </canvas>

            </div>

            <div className='wrapperCrop'>
                <Cropper  cropShape='round' showGrid={false}  image={kDash} crop={crop} zoom={zoom} aspect={1 / 1} onCropChange={setCrop} onCropComplete={onCropComplete} onZoomChange={setZoom} ></Cropper>
            </div> */}

            {/* <button onClick={()=>download()}>DOWNLOAD IMAGEM</button>
            <button onClick={()=>deletarImg()}>EXCLUIR IMAGEM</button>
            <button onClick={()=>onCropComplete}>CROPPER</button> */}



            {/* <div className='preview'>
                <img className='previewImg' src={kDash}></img>
            </div> */}








            {/* <img id='wallpaper' className='editando' onClick={()=>setModal(2)} /> */}

            {/* PAPEL DE PAREDE COM CANVAS */}
            <div className='wallpaperCanvasWrapper' onClick={()=>setModal(2)} >

            <canvas id='canvWpp' width={larguraTela} height={larguraTela/3}>
            </canvas>

            </div>

            <input type='file' id='inputFileWallpaper' style={{display:'none'}} onChange={handleWallpaper}></input>
            <i id='iconWallpaperEdit' className="fa-solid fa-camera"></i>

            {/* <img id='foto' src={uurl} className='editando' onClick={handleFotoPerfil} /> */}
            {modal === 0 && <i id='iconFotoEdit' className="fa-solid fa-camera" onClick={handleChange}></i>}
            <input id='editFoto' type='file' accept='image/*' onChange={handleChange} style={{display:'none'}} />

            <div className='fotoPerfilWrapper' onClick={()=>setModal(1)}>
                {/* <img className='fotoPerfil' src={kDash}></img> */}


                <canvas width='80' height='80' id='canv' >

                    <p>Seu navegador não suporta Canvas</p>

                </canvas>

                {!context.userLogado.perfil.foto && !editado.foto && <i id='userSemFoto' className="fa-solid fa-user"></i>}


            </div>

            {/* <img src={uurl}></img> */}
            <div id='botaoEditarPerfil' onClick={()=>handleSave()}>
                
                <span >Salvar</span>
            </div>

            <div className='dadosPerfil'>
                <label htmlFor='editNome'>Nome</label>
                <input id='editNome' className='newLde inputEditProfile' value={editado.nome} onChange={({target})=>setEditado({...editado, nome:target.value})} onFocus={({target})=>inputFocus(target)} onBlur={({target})=>inputBlur(target)} />

                <label htmlFor='editNick'>Nome de usuário</label>
                <input id='editNick' className='newLde inputEditProfile' value={editado.nick} onChange={({target})=>setEditado({...editado, nick:target.value})} onFocus={({target})=>inputFocus(target)} onBlur={({target})=>inputBlur(target)} />

                <label htmlFor='editQuote'>Descrição</label>
                <textarea id='editQuote' className='textAreaEditProfile' maxLength={160} value={editado.quote} onChange={({target})=>setEditado({...editado, quote:target.value})} onFocus={({target})=>inputFocus(target)} onBlur={({target})=>inputBlur(target)} ></textarea>
            </div>
        </div>
                <NavLink className='navVoltarEditProfile' to='/home/lde' onClick={()=>back()}>cancelar modificações</NavLink>

    </div>
  )
}

export default EditPerfil
