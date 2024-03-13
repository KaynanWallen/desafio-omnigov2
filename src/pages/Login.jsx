import { useEffect, useState } from 'react'

//Imagens e outros icons
import logoOminigo from '/assets/logoomnigo.svg'
import logoinicial from '/assets/logo-inicial.svg'
import computer from '/assets/computer.png'
import loading from '/assets/loading.png'
import sucess from '/assets/sucess.svg'
import error from '/assets/error.svg'


//Criado componentes para SVGs dos inputs foi fora necessário a mudança de cores de forma dinamica utilizando state
import MailLogin from '../components/Maillogin'
import LockLogin from '../components/PasswordLogin'
import HomeIcon from '../components/HomeIcon'
import PhoneIcon from '../components/PhoneIcon'
import UserIcon from '../components/UserIcon'



export default function Login() {  

    //Quando utilizado a pagina de registro
    const [register, setRegister] = useState(false)


    //Inputs da aba de Login
    const [loginEmail, setloginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")

    //Inputs da aba de Registro
    const [registerName, setRegisterName] = useState("")
    const [registerEmail, setRegisterEmail] = useState("")
    const [registerPhone, setRegisterPhone] = useState("")
    const [registerCompany, setRegisterCompany] = useState("")

    //Status de Envio tanto de Login Quanto de Registro
    const [status, setStatus] = useState("idle")


    //Layouts Alterados em forma de State para otimização
    const [buttontext, setButtonText] = useState("Entrar")
    const [buttonIcon, setButtonIcon] = useState()
    const [buttonBackground, setButtonBackground] = useState("bg-[#00C]")
    const [buttontextRegister, setButtonTextRegister] = useState("Enviar")


    //Utilizado para realização a alteração sempre que uma requisição/mudança de status fosse feita
    useEffect(() => {
        switch(status){
            case 'idle':
                setButtonText("Entrar")
                setButtonIcon()
                setButtonBackground("bg-[#00C]")
                setButtonTextRegister('Enviar')
                break
            case 'loading':
                setButtonText("Entrando...")
                setButtonTextRegister('Enviando')
                setButtonIcon(loading)
                setButtonBackground("bg-[#00C]")

                break
            case 'error' :
                setButtonText("Usuario não encontrado")
                setButtonTextRegister('Erro, tente novamente mais tarde')
                setButtonIcon(error)
                setButtonBackground("bg-[#F87171]")
                break
            case 'sucess':
                setButtonText('Sucesso')
                setButtonTextRegister('Cadastro enviado com sucesso')
                setButtonIcon(sucess)
                setButtonBackground("bg-[#4ADE80]")
                break
            default:
                setButtonText('Entrar')
                setButtonTextRegister('Enviar')
                setButtonIcon()
                setButtonBackground("bg-[#00C]")
                break
        }
    }, [status])


    //Alterações no Input de Email/login
    const handleChangeLoginEmail = (ev) => {
        setloginEmail(ev.target.value)
    }

    //Alterações no Input de Senha
    const handleChangeLoginPassword = (ev) => {
        setLoginPassword(ev.target.value)
    }

    //Alterações no Input de Nome
    const handleRegisterName = (ev) => {
        setRegisterName(ev.target.value)
    }

    //Alterações no Input de Email
    const handleRegisterEmail = (ev) => {
        setRegisterEmail(ev.target.value)
    }

    //Alterações no Input de Número
    const handleRegisterPhone = (ev) => {
        const formattedPhoneNumber = FormattedPhone(ev.target.value);
        setRegisterPhone(formattedPhoneNumber)
    }


    //Alterações no Input de Empresa
    const handleRegisterCompany = (ev) => {
        setRegisterCompany(ev.target.value)
    }



    //Formatar texto/número digitado pelo usuario no formato correto
    const FormattedPhone = (v) => {
        v=v.replace(/\D/g,"");
        v=v.replace(/^(\d{2})(\d)/g,"($1) $2"); 
        v=v.replace(/(\d)(\d{4})$/,"$1-$2");
        return v;
    }


    //Uma "Requisição" falsa para fins de teste
    const RequisicaoBackEnd = () => {
        if (loginEmail == 'vittel' && loginPassword == '1234') {
            return true
        }
        return false

    }


    //Uma "Requisição" falsa para fins de teste
    const RequisicaoBackEndRegister = () => {
        if (registerName == 'vittel') {
            return true
        }
        return false
    }


    //Ação realizada ao envio do formulário de login
    const HandleSubmitlogin = (ev) => {
        ev.preventDefault();
        setStatus('loading')

        //Apenas para simular uma lentidão

        setTimeout(() => {

            //Requisição para o BackEnd no cenária real feita com "Then/Catcj"
            const response = RequisicaoBackEnd()

            if (response){
                setStatus('sucess')
            }else {
                setStatus('error')
            }
            setTimeout(() => {
                setStatus('idle')
            }, 5000)
            console.log(loginEmail)

        }, 5000)
    }


    //Ações Realizada ao envio do formulário de Registro
    const HandleSubmitRegister = (ev) => {
        ev.preventDefault();
        setStatus('loading')

        //Apenas para simular uma lentidão

        setTimeout(() => {

            //Requisição para o BackEnd no cenária real feita com "Then/Catcj"
            const response = RequisicaoBackEndRegister()

            if (response){
                setStatus('sucess')
            }else {
                setStatus('error')
            }
            setTimeout(() => {
                setStatus('idle')
            }, 5000)
            console.log(loginEmail)

        }, 5000)
    }


    return (
        <>
            <main className="w-full h-full flex justify-center items-center">
                <section className={`w-full max-w-[900px] transition-all duration-1000 ${register ? 'h-[521px]' : 'h-[443px]'} flex justify-center px-2 transition-all `}>
                    <div className="w-full max-w-[450px] h-full rounded-left bg-primary flex flex-col items-center py-5 px-2 gap-5 sm:p-10">
                        <img src={logoOminigo} />
                        <div className='w-[161px] min-h-[42px] bg-secondary flex flex-row gap-3 text-primary font-medium p-[5px]'>
                            <button className={`w-full transition-all ${register ? 'bg-transparent' : 'bg-white'} hover:text-[#0101FF]`} onClick={() => setRegister(false)}>
                                Login
                            </button>

                            <button className={`w-full transition-all duration-1000 ${register ? 'bg-white' : 'bg-transparent'} hover:text-[#0101FF]`} onClick={() => setRegister(true)}>
                                Register
                            </button>
                        </div>
            
                        <form className= {`w-full transition-all duration-1000  ${!register ? 'h-[252px]' : 'h-[330px]'} bg-secondary ${!register ? 'opacity-100 flex' : 'opacity-0 hidden'} flex-col justify-center p-5 gap-5`} onSubmit={HandleSubmitlogin}>
                            
                            
                            <section className='w-full h-[36px] bg-white flex flex-row items-center justify-center px-3'>
                                <MailLogin color = {`${loginEmail == "" ? '#94A3B8' : '#1E293B'}`} />
                                <input type='email' value={loginEmail} onChange={handleChangeLoginEmail} className='w-full h-full outline-none bg-white px-3' placeholder='Login' required/>
                            </section>

                            <section className='w-full h-[36px] bg-white flex flex-row items-center justify-center px-3'>
                                <LockLogin color = {`${loginPassword == "" ? '#94A3B8' : '#1E293B'}`} />
                                <input type='password' value={loginPassword} onChange={handleChangeLoginPassword} className='w-full h-full outline-none bg-white px-3' placeholder='Senha' required/>
                            </section>


                            <ul className='w-full text-primary flex flex-row justify-between'>
                                <li className='flex flex-row items-center gap-2 custom-checkbox'>
                                    <input type='checkbox' className='' />
                                    <label>Lembrar-me</label>
                                </li>

                                <li>
                                    <p className='cursor-pointer hover:text-[#0101FF]'>Esqueceu a Senha?</p>
                                </li>
                            </ul>

                            <button type='submit' className= {`w-full h-[35px] ${buttonBackground} transition-colors duration-500 ${status == 'idle' ? ' hover:bg-[#0101FF]' : ''} text-white  flex flex-row justify-center items-center gap-2`}>
                                <img src={buttonIcon}  className={`transition-all ${status == 'idle' ? 'hidden' : 'flex'} ${status == 'loading' && 'animate-spin'}`} alt='Button-Icons'/>
                                <span>
                                    {buttontext}
                                </span>
                            </button>

                            <section className='w-full flex flex-row items-center justify-center gap-2'>
                                <p className=' text-[10px] text-primary'>Um produto</p>
                                <img src={logoinicial} />
                            </section>
                        </form>

                        <form className= {`w-full transition-all duration-1000  ${!register ? 'h-[252px]' : 'h-[330px]'} bg-secondary ${register ? 'opacity-100 flex' : 'opacity-0 hidden'} flex-col justify-center p-5 gap-5`} onSubmit={HandleSubmitRegister}>
                            <section className='w-full h-[36px] bg-white flex flex-row items-center justify-center px-3'>
                                <UserIcon color = {`${registerName == "" ? '#94A3B8' : '#1E293B'}`} />
                                <input type='text' value={registerName} onChange={handleRegisterName} className='w-full h-full outline-none bg-white px-3' placeholder='Nome Completo' required/>
                            </section>

                            <section className='w-full h-[36px] bg-white flex flex-row items-center justify-center px-3'>
                                <MailLogin color = {`${registerEmail == "" ? '#94A3B8' : '#1E293B'}`} />
                                <input type='email' value={registerEmail} onChange={handleRegisterEmail} className='w-full h-full outline-none bg-white px-3' placeholder='E-mail' required/>
                            </section>

                            <section className='w-full h-[36px] bg-white flex flex-row items-center justify-center px-3'>
                                <PhoneIcon color = {`${registerPhone == "" ? '#94A3B8' : '#1E293B'}`} />
                                <input type='text' maxLength={15} value={registerPhone} onChange={handleRegisterPhone} className='w-full h-full outline-none bg-white px-3' placeholder='Telefone' required/>
                            </section>

                            <section className='w-full h-[36px] bg-white flex flex-row items-center justify-center px-3'>
                                <HomeIcon color = {`${registerCompany == "" ? '#94A3B8' : '#1E293B'}`} />
                                <input type='text' value={registerCompany} onChange={handleRegisterCompany} className='w-full h-full outline-none bg-white px-3' placeholder='Nome da Empresa' required/>
                            </section>



                            <button type='submit' className= {`w-full h-[35px] ${buttonBackground} transition-colors duration-500 ${status == 'idle' ? ' hover:bg-[#0101FF]' : ''} text-white  flex flex-row justify-center items-center gap-2`}>
                                <img src={buttonIcon}  className={`transition-all ${status == 'idle' ? 'hidden' : 'flex'} ${status == 'loading' && 'animate-spin'}`} alt='Button-Icons'/>
                                <span>
                                    {buttontextRegister}
                                </span>
                            </button>

                            <section className='w-full flex flex-row items-center justify-center gap-2'>
                                <p className=' text-[10px] text-primary'>Um produto</p>
                                <img src={logoinicial} />
                            </section>
                        </form>
                    </div>

                    <div className='hidden w-full h-full bg-white rounded-right p-10 flex-col gap-[10px] md:flex'>
                        <h2 className=' text-primary'>Bem-vindo de volta!</h2>
                        <p className=' font-normal text-primary'>Entre e potencialize sua empresa através do poder das conversas.</p>
                        <img src={computer} />
                    </div>
                </section>
            </main>
        </>
    )
}