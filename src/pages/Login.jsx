import { useEffect, useState } from 'react'

//Imagens e outros icons
import logoOminigo from '/assets/logoomnigo.svg'
import logoinicial from '/assets/logo-inicial.svg'
import computer from '/assets/computer.png'
import computer2 from '/assets/computer2.png'
import loading from '/assets/loading.png'
import sucess from '/assets/sucess.svg'
import error from '/assets/error.svg'


//Criado componentes para SVGs dos inputs foi fora necessário a mudança de cores de forma dinamica utilizando state
import MailLogin from '../components/Maillogin'
import LockLogin from '../components/PasswordLogin'
import HomeIcon from '../components/HomeIcon'
import PhoneIcon from '../components/PhoneIcon'
import UserIcon from '../components/UserIcon'


//UI
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card"


import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function Login() {
    const [status, setStatus] = useState("idle")


    const [loginEmail, setloginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")

    const [registerName, setRegisterName] = useState("")
    const [registerEmail, setRegisterEmail] = useState("")
    const [registerPhone, setRegisterPhone] = useState("")
    const [registerCompany, setRegisterCompany] = useState("")


    const [buttontext, setButtonText] = useState("Entrar")
    const [buttonIcon, setButtonIcon] = useState()
    const [buttonVariant, setButtonVariant] = useState("default")
    const [buttontextRegister, setButtonTextRegister] = useState("Enviar")

    useEffect(() => {
        switch (status) {
            case 'idle':
                setButtonText("Entrar")
                setButtonIcon()
                setButtonVariant("default")
                setButtonTextRegister('Enviar')
                break
            case 'loading':
                setButtonText("Entrando...")
                setButtonTextRegister('Enviando')
                setButtonIcon(loading)
                setButtonVariant("default")

                break
            case 'error':
                setButtonText("Usuario não encontrado")
                setButtonTextRegister('Erro, tente novamente mais tarde')
                setButtonIcon(error)
                setButtonVariant("destructive")
                break
            case 'sucess':
                setButtonText('Sucesso')
                setButtonTextRegister('Cadastro enviado com sucesso')
                setButtonIcon(sucess)
                setButtonVariant("sucess")
                break
            default:
                setButtonText('Entrar')
                setButtonTextRegister('Enviar')
                setButtonIcon()
                setButtonVariant("default")
                break
        }
    }, [status])


    //Alterações no Input de Login Email
    const handleChangeLoginEmail = (ev) => {
        setloginEmail(ev.target.value)
    }
    //Alterações no Input de Password
    const handleChangeLoginPassword = (ev) => {
        setLoginPassword(ev.target.value)
    }

    //Alterações no Input de Name
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



    //UTILS
    const FormattedPhone = (v) => {
        v = v.replace(/\D/g, "");
        v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
        v = v.replace(/(\d)(\d{4})$/, "$1-$2");
        return v;
    }

    //Uma "Requisição" falsa para fins de teste
    const RequisicaoBackEnd = () => {
        if (loginEmail == 'vittel@gmail.com.br' && loginPassword == '1234') {
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

            if (response) {
                setStatus('sucess')
            } else {
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

            if (response) {
                setStatus('sucess')
            } else {
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
            <main className="w-full min-h-screen bg-background flex justify-center items-center p-1 md:p-5">
                <Tabs defaultValue="login" className='w-full h-auto flex flex-row justify-center'>
                
                    <Card className="w-full max-w-[450px] min-h-full bg-primary rounded-[20px] flex flex-col gap-[20px] justify-center md:rounded-left p-5 py-[20px] sm:p-[40px]">
                        <CardHeader>
                            <img src={logoOminigo} className="w-[150px]" />
                        </CardHeader>

                        <CardContent className="w-full max-w-[450px] flex flex-col items-center gap-[20px] p-0">
                                <TabsList className="flex flex-row items-center justify-center w-[160px] bg-secondary text-primary ">
                                        <TabsTrigger value="login">
                                            Login
                                        </TabsTrigger>
                                        <TabsTrigger value="register">
                                            Registrar
                                        </TabsTrigger>
                                </TabsList>


                                <TabsContent id="Form-login" value="login" className="w-full h-auto">
                                    <Card className="w-full">
                                        <CardContent className="w-full h-full">
                                            <form className='w-full flex flex-col justify-center gap-[20px]' onSubmit={HandleSubmitlogin}>
                                                <section className='w-full h-[36px] bg-white flex flex-row items-center justify-center px-3 rounded-[6px]'>
                                                    <MailLogin color={`${loginEmail == "" ? '#94A3B8' : '#1E293B'}`} />
                                                    <Input type='email' value={loginEmail} onChange={handleChangeLoginEmail} className='w-full h-full outline-none bg-white px-3' placeholder='Login' required />
                                                </section>

                                                <section className='w-full h-[36px] bg-white flex flex-row items-center justify-center px-3 rounded-[6px]'>
                                                    <LockLogin color={`${loginPassword == "" ? '#94A3B8' : '#1E293B'}`} />
                                                    <Input type='password' value={loginPassword} onChange={handleChangeLoginPassword} className='w-full h-full outline-none bg-white px-3' placeholder='Senha' required />
                                                </section>

                                                <ul className='w-full text-vitblue-800 flex flex-row justify-between'>
                                                    <li className='flex flex-row items-center gap-2 custom-checkbox'>
                                                        <Checkbox name="lembrar" className="rounded-[2px]" />
                                                        <Label htmlFor="lembrar">Lembrar-me</Label>
                                                    </li>

                                                    <li>
                                                        <Label className="cursor-pointer hover:text-vitblue-700">Esqueceu a Senha?</Label>
                                                    </li>
                                                </ul>


                                                <Button className=" flex flex-row gap-2 " type="submit" variant={`${buttonVariant}`}>
                                                    <img src={buttonIcon} className={`${status == 'idle' | 'default' ? 'hidden' : 'flex'} ${status == 'loading' && 'animate-spin'}      `} />
                                                    {buttontext}
                                                </Button>


                                                <section className='w-full flex flex-row items-center justify-center gap-2'>
                                                    <p className=' text-[10px] text-primary'>Um produto</p>
                                                    <img src={logoinicial} />
                                                </section>


                                            </form>
                                        </CardContent>
                                    </Card>
                                </TabsContent>


                                <TabsContent value="register" className="w-full h-auto" >
                                    <Card className="w-full">
                                        <CardContent className="w-full h-full">
                                            <form className='w-full flex flex-col justify-center gap-[20px]' onSubmit={HandleSubmitRegister}>
                                                <section className='w-full h-[36px] bg-white flex flex-row items-center justify-center px-3 rounded-[6px]'>
                                                    <UserIcon color={`${registerName == "" ? '#94A3B8' : '#1E293B'}`} />
                                                    <Input type='text' value={registerName} onChange={handleRegisterName} className='w-full h-full outline-none bg-white px-3' placeholder='Nome Completo' required />
                                                </section>

                                                <section className='w-full h-[36px] bg-white flex flex-row items-center justify-center px-3 rounded-[6px]'>
                                                    <MailLogin color={`${registerEmail == "" ? '#94A3B8' : '#1E293B'}`} />
                                                    <Input type='email' value={registerEmail} onChange={handleRegisterEmail} className='w-full h-full outline-none bg-white px-3' placeholder='E-mail' required />
                                                </section>

                                                <section className='w-full h-[36px] bg-white flex flex-row items-center justify-center px-3 rounded-[6px]'>
                                                    <PhoneIcon color={`${registerPhone == "" ? '#94A3B8' : '#1E293B'}`} />
                                                    <Input type='text' maxLength={15} value={registerPhone} onChange={handleRegisterPhone} className='w-full h-full outline-none bg-white px-3' placeholder='Telefone' required />
                                                </section>

                                                <section className='w-full h-[36px] bg-white flex flex-row items-center justify-center px-3 rounded-[6px]'>
                                                    <HomeIcon color={`${registerCompany == "" ? '#94A3B8' : '#1E293B'}`} />
                                                    <Input type='text' value={registerCompany} onChange={handleRegisterCompany} className='w-full h-full outline-none bg-white px-3' placeholder='Nome da Empresa' required />
                                                </section>

                                                <Button className=" flex flex-row gap-2 " type="submit" variant={`${buttonVariant}`}>
                                                    <img src={buttonIcon} className={`${status == 'idle' | 'default' ? 'hidden' : 'flex'} ${status == 'loading' && 'animate-spin'}      `} />
                                                    {buttontextRegister}
                                                </Button>
                                                <section className='w-full flex flex-row items-center justify-center gap-2'>
                                                    <p className=' text-[10px] text-primary'>Um produto</p>
                                                    <img src={logoinicial} />
                                                </section>
                                            </form>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

    
                            
                        </CardContent>

                    </Card>

                    <Card className="w-full max-w-[450px] min-h-full bg-white rounded-[20px] hidden md:flex md:rounded-right p-[40px]">
                        <CardContent className="flex flex-col h-full justify-center gap-[10px] p-0">
                            <h2 className=' text-[30px] text-primary font-semibold'>
                                <TabsContent value="login" className="w-full h-auto bg-transparent" >
                                    Bem-vindo de volta!
                                </TabsContent>
                                <TabsContent value="register" className="w-full h-auto bg-transparent" >
                                    Bem-vindo!
                                </TabsContent>
                            </h2>
                            <p className='text-[14px] text-primary'>Entre e potencialize sua empresa através do poder das conversas.</p>
                            <TabsContent value="login" className="w-full h-auto flex items-center  justify-center bg-transparent" >
                                <img src={computer} className="h-[260px]"/>
                            </TabsContent>

                            <TabsContent value="register" className="w-auto h-auto bg-transparent" >
                                <img src={computer2} />
                            </TabsContent>
                        </CardContent>
                    </Card>
                </Tabs>
                
            </main>
        </>
    )
}