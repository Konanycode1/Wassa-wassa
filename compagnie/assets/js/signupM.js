$(document).ready(()=>{
   
    let url = "https://wassa.onrender.com/api/commercantcreate/"
    let api = "http://localhost:3000/api/commercantcreate/"
    let form = document.getElementById("signup")
    let btn = document.getElementById("btnSign")

const button = document.getElementById("buttonDialog");
const closeButton = document.getElementById("closeDialog");

const dialog = document.getElementById("basicDialog");

    $("#signup").on("submit",(e)=>{
        e.preventDefault();
        let data = new FormData()
        let nom = $("#nom").val();
        let prenom = $("#prenom").val();
        let numero = $("#numero").val();
        let email = $("#email").val();
        let numeroCNI = $("#numeroCNI").val();
        let profession = $("#profession").val();
        let logo = $("#logo").get(0).files[0];
        let password = $("#password").val();
        let Cpassword = $("#Cpassword").val();
        
            if(password == Cpassword){
                data.append("nom", nom)
                data.append("prenom", prenom)
                data.append("numero",numero)
                data.append("email",email)
                data.append("numeroCNI",numeroCNI)
                data.append("profession",profession)
                data.append("logo",logo)
                data.append("password",password)
                console.log(data.get("logo"))
                fetch(url, {
                    method: "POST",
                    body: data, 
                })
                .then((response)=> {
                    localStorage.setItem("status",response.status)
                    return response.json()   
                })
                .then((data)=> {
                    const status = localStorage.getItem("status")
                    $(".msg").text(data.msg).css('color', 'green')
                    dialog.showModal();
                    closeButton.addEventListener("click", () => {
                        dialog.close(); 
                        if(status == 200){
                            window.location.href = "../loginMarch.html"
                        }
                    }); 
                })
                .catch((err)=> console.log(err))
            }
            else{
                $(".messag").text("mot de passe incorrecte").css('color', 'red')
            }
    })
})