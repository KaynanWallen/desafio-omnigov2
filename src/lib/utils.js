import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}


//UTILS
export function FormattedPhone(v) {
  v = v.replace(/\D/g, "");
  v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
  v = v.replace(/(\d)(\d{4})$/, "$1-$2");
  return v;
}

//Uma "Requisição" falsa para fins de teste
export function RequisicaoBackEnd() {
  if (loginEmail == 'vittel@gmail.com.br' && loginPassword == '1234') {
    return true
  }
  return false

}


//Uma "Requisição" falsa para fins de teste
export function RequisicaoBackEndRegister(){
  if (registerName == 'vittel') {
    return true
  }
  return false
}


//Ação realizada ao envio do formulário de login
export function HandleSubmitlogin(ev) {
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
export function HandleSubmitRegister(ev) {
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