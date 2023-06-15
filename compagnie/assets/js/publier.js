$(document).ready(()=>{
   let user = localStorage.getItem("user")
   userVerif = JSON.parse(user)
   const closeButton = document.getElementById("closeDialog");
   const dialog = document.getElementById("basicDialog");
   if(userVerif == null){
    window.location.href = "../loginComp.html"
   }

   let publi = `http://localhost:3000/api/publication/`
   let api = `https://wassa.onrender.com/api/publication/`
   $("#publica").on("submit",(e)=>{
    e.preventDefault();
    let data = {
        matricule: $("#matricule").val(),
        nomPrenomchauff:$("#nomPrenomChauff").val(),
        numeroChauff:$("#numeroChauff").val(),
        numeroCNI:$("#numeroCNI").val(),
        ligneDepart:$("#ligneDepart").val(),
        ligneArrive:$("#ligneArrive").val(),
        heureDepart:$("#heureDepart").val(),
        espace:$("#espace").val()
    }

    if(data.matricule =="" ||data.nomPrenomChauff =="" || data.numeroChauff =="" || data.numeroCNI =="" || data.ligneDepart =="" || data.ligneArrive =="" || data.heureDepart =="" || data.espace ==""){
        $(".msg").text("Veuillez remplir tout les champs").css("color", "red")
    }
    else{
        fetch(publi,{
            method: "POST",
            headers: {
                "authorization": `token ${userVerif.token}`,
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
       })
       .then((res)=>{
            localStorage.setItem('publier',res.status)
            return res.json()
        })
       .then((data)=>{
        dialog.showModal();
        let pub = localStorage.getItem("publier")
        $(".msg").text(data.msg).css('color', 'green');
        closeButton.addEventListener("click", () => {
            dialog.close(); 
            if(pub == 200){
                window.location.reload()
            } 
        });
       })
       .catch((error)=>{
        dialog.showModal();
        $(".msg").text(error.msg).css('color', 'green');
        closeButton.addEventListener("click", () => {
            dialog.close(); 
        });
       })
    }
 })


 

})