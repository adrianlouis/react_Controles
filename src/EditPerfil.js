import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import css from './css/novoPerfil.css'
import {GlobalContext} from './GlobalContext'
import storage from './firebase-config'
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { checkBd, updateBd } from './crudFireBase'
import Cropper from 'react-easy-crop'
import 'react-image-crop/dist/ReactCrop.css'




const EditPerfil = () => {

    const context = React.useContext(GlobalContext)
    const navigate = useNavigate()
    const [rootCor, setRootCor] = React.useState('');
    const storage = getStorage()
    const old = context.userLogado.perfil
    const {tempFoto, tempFotoCrop, tempWpp, tempWppCrop} = context.userLogado
    const [editado, setEditado] = React.useState({nome:old.nome, nick:old.nick, foto:old.foto, fotoCrop:old.fotoCrop, wallpaper:old.wallpaper, wallpaperCrop:old.wallpaperCrop, fotoTemp:tempFoto, fotoTempCrop:tempFotoCrop, wppTemp:tempWpp, wppTempCrop:tempWppCrop, quote:old.quote, cor:old.cor} )
    const[uurl, setUrl] = React.useState('')
    const [modal, setModal] = React.useState(0)
    const [loading, setLoading] = React.useState(false)
    const [loadingWpp, setLoadingWpp] = React.useState(false)
    const [imgBd, setImgBd] = React.useState({foto:'', wpp:''})
    
    const larguraTela = window.screen.width
    
    const [crop, setCrop] = React.useState({x:0,y:0})
    const [zoom, setZoom] = React.useState(1)
    const [cut, setCut] = React.useState('')
    const onCropComplete = React.useCallback((croppedArea, croppedAreaPixels)=>{
        setCut(croppedAreaPixels)
    },[])



    // ADICIONAR IMAGEM NO FIREBASE 
    async function handleChange(e){
        const foto = e.target.files[0]
        setImgBd({...imgBd, foto:foto})
        setUrl(URL.createObjectURL(foto))
        setEditado({...editado, foto:URL.createObjectURL(foto)})

        var canvas = document.querySelector('#canv')
        var ctx = canvas.getContext('2d')
        const pic = new Image()
        pic.src=URL.createObjectURL(foto)
        pic.onload=()=>{
            ctx.drawImage(URL.createObjectURL(foto), 0,0,80,80)
        }

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
        var canvas = document.querySelector('#canv')
        var ctx = canvas.getContext('2d')
        ctx.drawImage(tempFoto, ...context.userLogado.tempFotoCrop)
        
        var canvWpp = document.querySelector('#canvWpp')
        var ctxWpp = canvWpp.getContext('2d')
        ctxWpp.drawImage(tempWpp, ...context.userLogado.tempWppCrop)
        editado.cor ? setRootCor(editado.cor) : setRootCor('rgb(221, 221, 221)')


    },[])

    // SALVAR OPÇÕES DO CROP DA FOTO DO PERFIL NO USERLOGADO
    async function handleCrop(){

        var canvas = document.querySelector('#canv')
        var ctx = canvas.getContext('2d')
        var fotoDoPerfil=new Image()
        fotoDoPerfil.src=editado.foto
        fotoDoPerfil.onload=()=>{
            // imagem, xIniRecorte, yIniRecorte, larguraRecorte, alturaRecorte, posX, posY, larguraImagem, alturaImagem
            ctx.drawImage(fotoDoPerfil, cut.x, cut.y, cut.width, cut.height, 0, 0, 80, 80 )
            setEditado({...editado, fotoTemp:fotoDoPerfil, fotoTempCrop:[cut.x, cut.y, cut.width, cut.height, 0, 0, 80, 80]})
        }
        setModal(0)
    }

    async function handleWppCrop(){
        var canvas = document.querySelector('#canvWpp')
        var ctx = canvas.getContext('2d')
        var wpp=new Image()
        wpp.src=editado.wallpaper
        wpp.onload=()=>{
            // imagem, xIniRecorte, yIniRecorte, larguraRecorte, alturaRecorte, posX, posY, larguraImagem, alturaImagem
            ctx.drawImage(wpp, cut.x, cut.y, cut.width, cut.height, 0, 0, larguraTela, (larguraTela / 3) )
            setEditado({...editado, wppTemp:wpp, wppTempCrop:[cut.x, cut.y, cut.width, cut.height, 0, 0, larguraTela, (larguraTela / 3)]})
        }

        setModal(0)
    }

    function handleModal(e){
       if ( e.target === e.currentTarget) {
        setModal(0)
       }
    }

    async function handleSave(){
        document.querySelector(':root').style.setProperty('--corEscolhida', rootCor)
        context.setUserLogado({...context.userLogado, tempWpp:editado.wppTemp, tempWppCrop:editado.wppTempCrop, tempFoto:editado.fotoTemp, tempFotoCrop:editado.fotoTempCrop, perfil:{...context.userLogado.perfil, cor:rootCor}})

        const perfilNovo = {
            cor:rootCor,
            foto:editado.fotoTemp.src,
            fotoCrop:editado.fotoTempCrop,
            nick:editado.nick,
            nome:editado.nome,
            quote:editado.quote,
            wallpaper:editado.wppTemp.src,
            wallpaperCrop:editado.wppTempCrop
        }

        // salvar infos no perfil do bd
        updateBd(context.userLogado.id, {perfil:{...perfilNovo}})

        // salvar foto e papel de parede no bd do firebase, de forma que os dois processos de await seja realizado
        // ao mesmo tempo.
        const [fotoPerfil, fotoWallpaper] = await Promise.all([
            saveProfilePhoto(),
            saveWallpaperPhoto(),
        ])

        navigate('/home/lde')
        return {fotoPerfil, fotoWallpaper}
    }

    async function saveProfilePhoto(){
        if (imgBd.foto){
            setLoading(true)
            const fotoPerfil = ref(storage, `${context.userLogado.id}fotoPerfil.jpg`)
            uploadBytes(fotoPerfil, imgBd.foto).then((snapshot) =>{
                console.log('Foto do perfil carregada. . .')
                setLoading(false)
            })
        }
    }

    async function saveWallpaperPhoto(){
        if (imgBd.wpp){
            setLoadingWpp(true)
            const wppBd = ref(storage, `${context.userLogado.id}wpp.jpg`)
            uploadBytes(wppBd, imgBd.wpp).then((snap)=>{
                console.log('Wallpaper carregado. . .')
                setLoadingWpp(false)
            })
        }
    }

    //CANCELAR MUDANCAS
    async function back(){
        setEditado('')
        navigate('/home/lde')
    }

    function inputFocus(el){
        el.previousElementSibling.style.color='rgb(166, 243, 166)'
    }
    function inputBlur(el){
        el.previousElementSibling.style.color='rgb(161, 161, 161)'
    }

    async function handleWallpaper(e){

        const wpp = e.target.files[0]
        setImgBd({...imgBd, wpp:wpp})
        setEditado({...editado, wallpaper:URL.createObjectURL(wpp)})

        var canvas = document.querySelector('#canvWpp')
        var ctx = canvas.getContext('2d')
        const pic = new Image()
        pic.src=URL.createObjectURL(wpp)
        pic.onload=()=>{
            ctx.drawImage(URL.createObjectURL(wpp), 0,0,larguraTela,(larguraTela/3))
        }

        setModal(4)
    }

    async function checkarNome(dadoProcurado, id) {
        setEditado({...editado, nome:dadoProcurado})

        const b = await checkBd(dadoProcurado, id)
        const input = document.querySelector('#editNome')
        const erroNome = document.querySelector('.editNomeUsado')

        if (dadoProcurado === context.userLogado.nome){
            input.classList.remove('validacaoOk')
            input.classList.remove('validacaoNok')
            erroNome.style.display='none'
        }else if(b.length > 0){   
            input.classList.remove('validacaoOk')
            erroNome.style.display='block'
            if(!input.classList.contains('validacaoNok')){
                input.classList.add('validacaoNok')
            }
        }else{ 
            input.classList.remove('validacaoNok')
                erroNome.style.display='none'
                if(!input.classList.contains('validacaoOk')){
                    input.classList.add('validacaoOk')
                }
        }

    }

    React.useEffect(()=>{
        document.querySelector(':root').style.setProperty('--corEscolhida', rootCor)
        setEditado({...editado, cor:rootCor})
    },[rootCor])

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

            {/* <img id='testeBlob'></img> */}

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
            {loadingWpp && <div className='loadingWpp'></div>}
            <canvas id='canvWpp' width={larguraTela} height={larguraTela/3}>
            </canvas>

            </div>

                <input type='file' id='inputFileWallpaper' style={{display:'none'}} onChange={handleWallpaper}></input>
                <i id='iconWallpaperEdit' className="fa-solid fa-camera" onClick={()=>setModal(2)} ></i>

            {/* <img id='foto' src={uurl} className='editando' onClick={handleFotoPerfil} /> */}
            {modal === 0 && <i id='iconFotoEdit' className="fa-solid fa-camera" onClick={()=>setModal(1)}></i>}
            <input id='editFoto' type='file' accept='image/*' onChange={handleChange} style={{display:'none'}} />

            <div className='fotoPerfilWrapper' onClick={()=>setModal(1)}>

                <canvas width='80' height='80' id='canv' >
                    <p>Seu navegador não suporta Canvas</p>
                </canvas>

                {loading && <div className='loadingFoto'></div>}
                {!context.userLogado.perfil.foto && !editado.foto && <i id='userSemFoto' className="fa-solid fa-user"></i>}


            </div>

            {/* <img src={uurl}></img> */}
            <div id='botaoEditarPerfil' onClick={()=>handleSave()}>
                <span >Salvar</span>
            </div>

            <div className='dadosPerfil'>
                <div className='editInputWrapper'>
                    <label htmlFor='editNome'>Nome</label>
                    <input id='editNome' className='inputEditProfile editNome' value={editado.nome} onChange={({target})=>checkarNome(target.value, context.userLogado.id)} onFocus={({target})=>inputFocus(target)} onBlur={({target})=>inputBlur(target)} />
                    <p className='editNomeUsado'>Este nome já está em uso.</p>
                </div>

                <div className='editInputWrapper'>
                    <label htmlFor='editNick'>Nome de usuário</label>
                    <input id='editNick' className='inputEditProfile editNick' value={editado.nick} onChange={({target})=>setEditado({...editado, nick:target.value})} onFocus={({target})=>inputFocus(target)} onBlur={({target})=>inputBlur(target)} />
                    <p className='editNickUsado'>Este nome de usuário já está em uso.</p>
                </div>

                <div className='editInputWrapper' >
                    <label htmlFor='editQuote'>Descrição</label>
                    <textarea id='editQuote' className='textAreaEditProfile editQuote' maxLength={160} value={editado.quote} onChange={({target})=>setEditado({...editado, quote:target.value})} onFocus={({target})=>inputFocus(target)} onBlur={({target})=>inputBlur(target)} ></textarea>
                </div>

                <div className='editInputWrapper' >
                    <label htmlFor='cor' >Cor dos destaques</label>
                    <input type='color' onChange={({target})=>setRootCor(target.value)} value={rootCor}  ></input>
                </div>

            </div>
        </div>
                {/* <NavLink className='navVoltarEditProfile' to='/home/lde' onClick={()=>back()}>cancelar modificações</NavLink> */}
                <p onClick={()=>back()}>Cancelar mudanças...</p>

    </div>
  )
}

export default EditPerfil
