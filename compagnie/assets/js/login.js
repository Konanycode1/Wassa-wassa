$(document).ready(()=>{
    let url = "https://wassa.onrender.com/api/compagnieLogin/"
    let api = "http://localhost:3000/api/compagnieLogin/"
    const closeButton = document.getElementById("closeDialog");
    const dialog = document.getElementById("basicDialog");

    let user = localStorage.getItem('user')
    user = JSON.parse(user)
    if(user == null){
        $('#loginform').on("submit",(e)=>{
            e.preventDefault();
    
            let email = $("#email").val();
            let password = $("#password").val();
    
            let data = {
                email: email,
                password: password
            }
            fetch(api,{
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type":"application/json"
                }
            })
            .then((response)=>{
                localStorage.setItem("logStatus",response.status)
                return response.json()
            }
            )
            .then((data)=>{
                dialog.showModal();
                let statused = localStorage.getItem('logStatus')
                console.log(data)
                $(".msg").text(data.msg).css('color', 'green')
    
                if( statused == 201){
                    $(".msg").text("Connexion encours, Veuillez patienter").css('color', 'green');
                    localStorage.setItem("user", JSON.stringify(data))
                }
               
                closeButton.addEventListener("click", () => {
                    dialog.close(); 
                    if(statused == 201){
                        window.location.href = "./page/accueilComp.html"
                    }
                });
    
            })
            .catch((err)=> console.log(err.msg))
    
    
    
        })
    }
    else{
        window.location.href = "./page/accueilComp.html"
    }
    console.log(user)

   
})