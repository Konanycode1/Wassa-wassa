$(document).ready(()=>{
    let url = "https://wassa.onrender.com/api/commercantLogin/"
    let api = "http://localhost:3000/api/commercantLogin/"
    const closeButton = document.getElementById("closeDialog");
    const dialog = document.getElementById("basicDialog");

    let user = localStorage.getItem('userMarch')
    user = JSON.parse(user)
    if(user == null){
        $('.loginMarch').on("submit",(e)=>{
            e.preventDefault();
    
            let numero = $("#numero").val();
            let password = $("#password").val();
    
            let data = {
                numero: numero,
                password: password
            }
            fetch(url,{
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type":"application/json"
                }
            })
            .then((response)=>{
                localStorage.setItem("logStatus",response.status)
                return response.json()
            })
            .then((data)=>{
                // dialog.showModal();
                let statused = localStorage.getItem('logStatus')
                console.log(data)
                $(".msg").text(data.msg).css('color', 'green')
     
                if( statused == 201){
                    $(".msg").text("Connexion encours, Veuillez patienter").css('color', 'green');
                    localStorage.setItem("userMarch", JSON.stringify(data))
                    setTimeout(()=>{
                        window.location.href = "./page/accueilMarch.html" 
                    },3000)
                }
               
                // closeButton.addEventListener("click", () => {
                //     dialog.close(); 
                //     if(statused == 201){
                //         window.location.href = "./page/accueilMarch.html" 
                //     }
                // });
            })
            .catch((err)=> console.log(err.msg)) 
        })
    }
    else{
        window.location.href = "./page/accueilMarch.html";
    }
})