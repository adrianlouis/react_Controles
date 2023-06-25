import React from 'react'
import { useNavigate } from 'react-router-dom'
import css from './css/novoPerfil.css'
import {GlobalContext} from './GlobalContext'
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { checkBd, updateBd } from './crudFireBase'
import Cropper from 'react-easy-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { getAuth } from 'firebase/auth'
import styles from './EditPerfil.module.css'

const EditPerfil = () => {

    const context = React.useContext(GlobalContext)
    const navigate = useNavigate()
    const storage = getStorage()
    const old = context.userLogado.perfil
    const {tempFoto, tempFotoCrop, tempWpp, tempWppCrop} = context.userLogado
    const [editado, setEditado] = React.useState(
        {
            nome:old.nome,
            nick:old.nick, 
            quote:old.quote, 
            foto:tempFoto, 
            fotoCrop:tempFotoCrop, 
            wallpaper:tempWpp, 
            wallpaperCrop:tempWppCrop, 
            cor:old.cor,
            fotoTemp:tempFoto,
            fotoTempCrop:tempFotoCrop,
            fotoWppTemp:tempWpp,
            fotoWppCropTemp:tempWppCrop
        } 
         )
    const [temps, setTemps] = React.useState({
        foto: false,
        fCrop: false,
        wpp: false,
        wCrop: false
    })

    const [excluirFotos, setExcluirFotos] = React.useState({foto:false, wpp:false})

    const [rootCor, setRootCor] = React.useState(old.cor ? old.cor : '#102030');
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
    const [backupFoto, setBackupFoto] = React.useState({foto:context.imgTemp.foto, fCrop: context.imgTemp.fCrop, wpp:context.imgTemp.wpp, wCrop: context.imgTemp.wCrop})

    // ADICIONAR IMAGEM NO FIREBASE 
    async function handleChange(e){
        const foto = e.target.files[0]
        setTemps({...temps, foto:foto})
        setImgBd({...imgBd, foto:foto})
        setEditado({...editado, foto:URL.createObjectURL(foto)})
        context.setImgTemp({...context.imgTemp, fileFoto:foto, foto:URL.createObjectURL(foto)})

        setLoading(false)

        setModal(3)

    }

     // SALVAR OPÇÕES DO CROP DA FOTO DO PERFIL NO USERLOGADO
     async function handleCrop(){

        var canvas = document.querySelector('#canv')
        var ctx = canvas.getContext('2d')
        var fotoDoPerfil=new Image()
        fotoDoPerfil.src=context.imgTemp.foto

        fotoDoPerfil.onload=()=>{
            // imagem, xIniRecorte, yIniRecorte, larguraRecorte, alturaRecorte, posX, posY, larguraImagem, alturaImagem
            ctx.drawImage(fotoDoPerfil, cut.x, cut.y, cut.width, cut.height, 0, 0, 80, 80 )
            setTemps({...temps, fCrop:[cut.x, cut.y, cut.width, cut.height, 0, 0, 80, 80] })
            context.setImgTemp({...context.imgTemp, fCrop:[cut.x, cut.y, cut.width, cut.height, 0, 0, 80, 80]})
            setExcluirFotos({...excluirFotos, foto:false})
        }

        setModal(0)
    }

    function cancelCropFoto(){
        setImgBd({...imgBd, foto:false})
        setModal(0)
        setTemps({...temps, fileFoto:false, foto:false, fCrop:false})

        context.setImgTemp({...context.imgTemp, foto:false, fCrop:false})
    }

    async function handleWallpaper(e){

        const wpp = e.target.files[0]
        setTemps({...temps, wpp:wpp})
        setImgBd({...imgBd, wpp:wpp})
        context.setImgTemp({...context.imgTemp, fileWpp:wpp, wpp:URL.createObjectURL(wpp)})

        setModal(4)
    }

    function cancelWppCrop(){
        setImgBd({...imgBd, wpp:false})
        setTemps({...temps, wpp:false})
        context.setImgTemp({...context.imgTemp, fileWpp:false, wpp:false, wCrop:false})
        setModal(0)
    }

    async function handleWppCrop(){
        var canvas = document.querySelector('#canvWpp')
        var ctx = canvas.getContext('2d')
        var wpp=new Image()
        wpp.src=context.imgTemp.wpp
        wpp.onload=()=>{
            // imagem, xIniRecorte, yIniRecorte, larguraRecorte, alturaRecorte, posX, posY, larguraImagem, alturaImagem
            ctx.drawImage(wpp, cut.x, cut.y, cut.width, cut.height, 0, 0, larguraTela, (larguraTela / 3) )
            setTemps({...temps, wCrop:[cut.x, cut.y, cut.width, cut.height, 0, 0, larguraTela, (larguraTela / 3)]})
            context.setImgTemp({...context.imgTemp, wCrop:[cut.x, cut.y, cut.width, cut.height, 0, 0, larguraTela, (larguraTela / 3)]})
            setExcluirFotos({...excluirFotos, wpp:false})
        }
        
        setModal(0)
    }

    function download(){
        // BAIXAR IMAGEM E SETAR NA FOTO DO PERFIL
        getDownloadURL(ref(storage, '/'+context.userLogado.profPic)).then((url)=>{
            document.querySelector('#foto').setAttribute('src', url)
        })
    }


    function deletarImg(type){
        // const img = ref(storage, `/${context.userLogado.profPic}`)

        // if (type === 'f'){
        //     const img = ref(storage, `/${context.userLogado.id}fotoPerfil.jpg`)
        //     deleteObject(img)
        //     context.setUserLogado({...context.userLogado, perfil:{...context.userLogado.perfil, foto:'', fotoCrop:''}})
        // }
        // if(type === 'w'){
        //     const img = ref(storage, `${context.userLogado.id}wpp.jpg`)
        //     deleteObject(img)
        // }

        if (type === 'f'){
            context.setImgTemp({...context.imgTemp, foto:false, fCrop:false})
            setExcluirFotos({...excluirFotos, foto:true})



        }
        if (type === 'w'){
            context.setImgTemp({...context.imgTemp, wpp:false, wCrop:false })
            setExcluirFotos({...excluirFotos, wpp:true})
        }

        setModal(0)
        

    }

    // CARREGAR A FOTO DO PERFIL E OPÇÕES PARA O CROP AO TER TAIS DADOS EM USERLOGADO
    React.useEffect(()=>{

    if (context.imgTemp.foto && context.imgTemp.fCrop){
        const canvas = document.querySelector('#canv')
        const ctx = canvas.getContext('2d')
        const img = new Image()
        img.src = context.imgTemp.foto
        img.onload=()=>{
            ctx.drawImage(img, ...context.imgTemp.fCrop)
        }
    }
    
    if (context.imgTemp.wpp && context.imgTemp.wCrop){
        const canvas = document.querySelector('#canvWpp')
        const ctx = canvas.getContext('2d')
        const img = new Image()
        img.src = context.imgTemp.wpp
        img.onload=()=>{
            ctx.drawImage(img, ...context.imgTemp.wCrop)
        }
    }

    },[])

    function handleModal(e){
       if ( e.target === e.currentTarget) {
        setModal(0)
       }
    }

    async function handleSave(){
         // const img = ref(storage, `/${context.userLogado.profPic}`)

        // if (type === 'f'){
        //     const img = ref(storage, `/${context.userLogado.id}fotoPerfil.jpg`)
        //     deleteObject(img)
        //     context.setUserLogado({...context.userLogado, perfil:{...context.userLogado.perfil, foto:'', fotoCrop:''}})
        // }
        // if(type === 'w'){
        //     const img = ref(storage, `${context.userLogado.id}wpp.jpg`)
        //     deleteObject(img)
        // }

        // SALVAR FOTO DO PERFIL NO FIREBASE STORAGE
        if (context.imgTemp.fileFoto && excluirFotos.foto === false){
            setLoading(true)
            const fotoPerfil = ref(storage, `${context.userLogado.id}fotoPerfil.jpg`)
            uploadBytes(fotoPerfil, context.imgTemp.fileFoto).then((snapshot) =>{
                setLoading(false)
            })
        }else if(excluirFotos.foto === true) {
            const img = ref(storage, `/${context.userLogado.id}fotoPerfil.jpg`)
            deleteObject(img)

            context.setUserLogado({...context.userLogado, perfil:{...context.userLogado.perfil, foto:'', fotoCrop:''}})
            context.setImgTemp({...context.imgTemp, foto:false, fCrop:false})

        }

        // SALVAR FOTO DO WALLPAPER NO FIREBASE STORAGE
        // USANDO IMGTEMP FILEWPP
        if (context.imgTemp.fileWpp && excluirFotos.wpp === false){
            const fotoWpp = ref(storage, `${context.userLogado.id}wpp.jpg`)
            uploadBytes(fotoWpp, context.imgTemp.fileWpp).then((snap)=>{
            })
        }else if(excluirFotos.wpp === true){
            const wpp = ref(storage, `/${context.userLogado.id}wpp.jpg`)
            deleteObject(wpp)

            context.setUserLogado({...context.userLogado, perfil:{...context.userLogado.perfil, wallpaper:'', wallpaperCrop:'' }})
            context.setImgTemp({...context.imgTemp, wpp:false, wCrop:false})
        }

        const saveProf = {
            nome:editado.nome,
            nick:editado.nick,
            quote:editado.quote,
            cor:rootCor
        }

        updateBd(context.userLogado.id, {perfil:{...context.userLogado.perfil, ...saveProf, fotoCrop:context.imgTemp.fCrop, foto:context.imgTemp.foto, wallpaper:context.imgTemp.wpp, wallpaperCrop:context.imgTemp.wCrop}})
        context.setUserLogado(prev => {return {...prev, perfil:{...prev.perfil, ...saveProf}}})

        navigate('/home/ext')

    }

    async function saveWallpaperPhoto(){
        if (imgBd.wpp){
            setLoadingWpp(true)
            const wppBd = ref(storage, `${context.userLogado.id}wpp.jpg`)
            uploadBytes(wppBd, imgBd.wpp).then((snap)=>{
                setLoadingWpp(false)
            })
        }
    }

    //CANCELAR MUDANCAS
    async function back(){
        context.setImgTemp({foto:backupFoto.foto, fCrop:backupFoto.fCrop, wpp:backupFoto.wpp, wCrop:backupFoto.wCrop})
        setEditado('')
        // context.setImgTemp({foto:false, fCrop:false, wpp:false, wCrop:false })
        navigate('/home/ext')
    }

    function inputFocus(el){
        el.previousElementSibling.style.color='rgb(166, 243, 166)'
        console.log(el)
        el.style.color= '#d1d1d1'
    }
    function inputBlur(el){
        el.previousElementSibling.style.color='rgb(161, 161, 161)'
        el.style.color= '#a1a1a1'
    }

    async function checkarNome(el, dadoProcurado, id) {
        console.log(el)
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
                {context.imgTemp.foto && <p onClick={()=>setModal(3)} >Recortar foto</p>}
                {context.imgTemp.foto && <p onClick={()=>deletarImg('f')} >Excluir foto</p>}
            </div>

        </div>}

        {modal === 2 && <div id='modal' className='perfilEditModal' onClick={(e)=>handleModal(e)}>

            <div>
                <p onClick={()=>document.querySelector('#inputFileWallpaper').click()} >Mudar papel de parede</p>
                {context.userLogado.perfil.wallpaper && <p onClick={()=>setModal(3)} >Recortar papel de parede</p>}
                <p onClick={()=>deletarImg('w')} >Excluir papel de parede</p>
            </div>

            </div>}

            {modal === 4 && <div className='perfilEditModalCrop'>
            <div className='wrapperCrop'>
                <Cropper  cropShape='rect' showGrid={false}  image={context.imgTemp.wpp} crop={crop} zoom={zoom} aspect={3 / 1} onCropChange={setCrop} onCropComplete={onCropComplete} onZoomChange={setZoom} ></Cropper>
                {/* <Cropper  cropShape='rect' showGrid={false}  image={context.userLogado.perfil.wallpaper} crop={crop} zoom={zoom} aspect={3 / 1} onCropChange={setCrop} onCropComplete={onCropComplete} onZoomChange={setZoom} ></Cropper> */}
            </div>
            <button onClick={()=>cancelWppCrop()}>Cancelar</button>
            <button onClick={()=>handleWppCrop()} >Recortar</button>
            </div>}

        {modal === 3 && <div className='perfilEditModalCrop'>
            <div className='wrapperCrop'>
                <Cropper cropShape='round' showGrid={false} image={context.imgTemp.foto} crop={crop} zoom={zoom} aspect={1 / 1} onCropChange={setCrop} onCropComplete={onCropComplete} onZoomChange={setZoom} ></Cropper>
            </div>
            <button onClick={()=>cancelCropFoto()}>Cancelar</button>
            <button onClick={()=>handleCrop()} >Recortar</button>
            </div>}

        <div id='perfil' className='perfil'>
           
            {/* PAPEL DE PAREDE COM CANVAS */}
            <div className='wallpaperCanvasWrapper' onClick={()=>setModal(2)} >
            {loadingWpp && <div className='loadingWpp'></div>}
            {context.imgTemp.wpp && <canvas id='canvWpp' width={larguraTela} height={larguraTela/3}>
            </canvas>}

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
                {/* {!context.userLogado.perfil.foto && !context.imgTemp.foto && <i id='userSemFoto' className="fa-solid fa-user"></i>} */}
                {!context.imgTemp.foto && <i id='userSemFoto' className="fa-solid fa-user"></i>}


            </div>

            <div id='botaoEditarPerfil' onClick={()=>handleSave()}>
                <span >Salvar</span>
            </div>

            <div className='dadosPerfil'>
                <div className='editInputWrapper'>
                    <label htmlFor='editNome'>Nome</label>
                    <input id='editNome' className='inputEditProfile editNome' placeholder={context.fbAuth.displayName} value={editado.nome} onChange={({target, currentTarget})=>checkarNome(currentTarget, target.value, context.userLogado.id)} onFocus={({target})=>inputFocus(target)} onBlur={({target})=>inputBlur(target)} />
                    {/* <input id='editNome' className='inputEditProfile editNome' value={editado.nome} onChange={({target})=>checkarNome(target.value, context.userLogado.id)} onFocus={({target})=>inputFocus(target)} onBlur={({target})=>inputBlur(target)} /> */}
                    <p className='editNomeUsado'>Este nome já está em uso.</p>
                </div>

                <div className='editInputWrapper'>
                    <label htmlFor='editNick'>Nome de usuário</label>
                    <input id='editNick' className='inputEditProfile editNick' value={editado.nick} onChange={({target})=>setEditado({...editado, nick:target.value})} onFocus={({target})=>inputFocus(target)} onBlur={({target})=>inputBlur(target)} />
                    <p className='editNickUsado'>Este nome de usuário já está em uso.</p>
                </div>

                <div className='editInputWrapper' >
                    <label htmlFor='editQuote'>Descrição</label>
                    <textarea spellCheck={false} id='editQuote' className={styles.quote} maxLength={160} value={editado.quote} onChange={({target})=>setEditado({...editado, quote:target.value})} onFocus={({target})=>inputFocus(target)} onBlur={({target})=>inputBlur(target)} ></textarea>
                    {/* <textarea id='editQuote' className='editQuote' maxLength={160} value={editado.quote} onChange={({target})=>setEditado({...editado, quote:target.value})} onFocus={({target})=>inputFocus(target)} onBlur={({target})=>inputBlur(target)} ></textarea> */}
                </div>

                <div className={styles.wrapCores} >
                    <label htmlFor='cor' >Cor dos destaques</label>
                    <input className={styles.corInput} type='color' onChange={({target})=>setRootCor(target.value)} value={rootCor}  ></input>
                </div>

            </div>
        </div>
        <p id='botaoEditarCancel' onClick={()=>back()}>Cancelar mudanças...</p>

    </div>
  )
}

export default EditPerfil
