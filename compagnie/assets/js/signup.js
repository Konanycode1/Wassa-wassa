$(document).ready(()=>{
   
    let url = "https://wassa.onrender.com/api/compagnieCreate/"
    let api = "http://localhost:3000/api/compagnieCreate/"
    let form = document.getElementById("signup")
    let btn = document.getElementById("btnSign")

const button = document.getElementById("buttonDialog");
const closeButton = document.getElementById("closeDialog");

const dialog = document.getElementById("basicDialog");

    $("#signup").on("submit",(e)=>{
        e.preventDefault();
        let data = new FormData()
        let compagnie = $("#compagnie").val();
        let numero = $("#numero").val();
        let email = $("#email").val();
        let commune = $("#commune").val();
        let degret = $("#degret").val();
        let logo = $("#logo").get(0).files[0];
        let password = $("#password").val();
        let Cpassword = $("#Cpassword").val();

        data.append("compagnie", compagnie)
        data.append("numero",numero)
        data.append("email",email)
        data.append("commune",commune)
        data.append("degret",degret)
        data.append("logo",logo)
        data.append("password",password)
        if(password == Cpassword){
            fetch(api, {
                method: "POST",
                body: data, 
            })
            .then((response)=> {
                localStorage.setItem("status",response.status)
                return response.json()   
            })
            .then((data)=> {
                const status = localStorage.getItem("status")
                dialog.showModal();
                $(".msg").text(data.msg).css('color', 'green')
                closeButton.addEventListener("click", () => {
                    dialog.close(); 
                    if(status == 200){
                        window.location.href = "../loginComp.html"
                    }
                }); 
            })
            .catch((err)=> console.log(err))
        }
        else{
            alert("mot de passe incorrecte")
        }

    })
})