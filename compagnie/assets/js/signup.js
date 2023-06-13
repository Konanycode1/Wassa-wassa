$(document).ready(()=>{
   
    let url = "https://wassa.onrender.com/api/compagnieCreate/"
    let api = "http://localhost:3000/api/compagnieCreate/"

    $(".signup").on('submit',(e)=>{
        e.preventDefault();
    })

    $(".btnSign").on("click",()=>{

        let compagnie = $("#compagnie").val();
        let numero = $("#numero").val();
        let email = $("#email").val();
        let commune = $("#commune").val();
        let degret = $("#degret").val();
        let logo = $("#logo").val();
        let password = $("#password").val();
        let Cpassword = $("#Cpassword").val();
        

        if(password == Cpassword){
            let data = {
                compagnie:compagnie,
                numero: numero,
                email: email,
                commune: commune,
                degret: degret,
                logo: logo,
                password: password
            }
            fetch(api, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }  
            })
            .then((response)=> response.json())
            .then((data)=> {
                $(".msg").text(data.msg).css('color', 'green')
            })
            .catch((err)=> console.log(err))
        }
        else{
            alert("mot de passe incorrecte")
        }

        

    })
})