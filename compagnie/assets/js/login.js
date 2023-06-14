$(document).ready(()=>{
    let url = "https://wassa.onrender.com/api/compagnieLogin/"
    let api = "http://localhost:3000/api/compagnieLogin/"
    const closeButton = document.getElementById("closeDialog");
    const dialog = document.getElementById("basicDialog");

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
            body: JSON.stringify(data)
        })
        .then((response)=>response.json())
        .then((data)=>{
            dialog.showModal();
            $(".msg").text(data.msg).css('color', 'green')
            closeButton.addEventListener("click", () => {
                dialog.close(); 
                // if(status == 200){
                //     window.location.href = "../loginComp.html"
                // }
            });

        })
        .catch((err)=> console.log(err))



    })
})