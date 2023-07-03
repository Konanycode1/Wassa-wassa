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
    console.log(data.espace)
    if(data.matricule =="" || data.nomPrenomchauff =="" || data.numeroChauff =="" || data.numeroCNI =="" || data.ligneDepart =="" || data.ligneArrive =="" || data.heureDepart =="" || data.espace ==""){
        $(".msg").text("Veuillez remplir tout les champs").css("color", "red")
    }
    else{
        fetch(api,{
            method: "POST",
            headers: {
                "authorization": `token ${userVerif.token}`,
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
       })
       .then((res)=>{
            if(res.redirected){
                window.location.href = "../loginComp.html"
                localStorage.removeItem("user")
            }
            localStorage.setItem('publier',res.status)
            return res.json()
        })
       .then((data)=>{
       
        let pub = localStorage.getItem("publier")
        $(".msg").text(data.msg).css('color', 'green');

        if(pub == 200){
            setTimeout(()=>{
                window.location.reload()
            },2000)
           
        } 
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

 listePublication();
 function listePublication() {
    let liste = `http://localhost:3000/api/readidPubCom/`
    let apiList = `https://wassa.onrender.com/api/readidPubCom/`

    fetch(apiList, {
        method:"GET",
        headers: {
            "authorization": `token ${userVerif.token}`,
            "Content-Type":"application/json"
        }
    })
    .then((res)=> {
        if(res.redirected){
            window.location.href = "../loginComp.html"
            localStorage.removeItem("user")
        }
        return res.json()
    })
    .then((data)=> {
        data.map(ele => {
            let text = `
            <tr>
                <td style="display:none;">${ele._id}</td>
                <th scope="row">${ele.numeroCNI}</th>
                <td>${ele.nomPrenomchauff}</td>
                <td>${ele.numeroChauff}</td>
                <th>${ele.ligneDepart}</th>
                <td>${ele.ligneArrive}</td>
                <td>${ele.espace}</td>
                <td>${ele.espaceRestant}</td>
                <td>${ele.heureDepart.split("T")[0]} ${ele.heureDepart.split("T")[1]}</td>
                <td>
                ${ele.status == 0? '<button type="button" class="btn btn-success" onclick="arrivagePub(event)"><i class="bi bi-check-circle"></i></button><button type="button" class="btn btn-primary"><i class="bi bi-pencil-square"></i></button><button type="button" class="btn btn-danger"><i class="bi bi-trash"></i></button>': '<button type="button" class="btn btn-danger"><i class="bi bi-trash"></i></button>'}
                
                </td>
            </tr>
            `
            $('#listPu').append(text)
        })
    })
    .catch((error)=> console.log(error))  
 }
})

function  arrivagePub(event) {
 console.log(event.target)
    let parent = []
        let idCom = []
        parent.push(event.target.closest("tr"))
        idCom.push(parent[0].children[0].innerHTML)
        console.log("btnvali",userVerif.token)  
        console.log(idCom)
        fetch(`https://wassa.onrender.com/api/terminer/${idCom[0]}`,
        {
            method:"GET",
            headers: {
                "authorization": `token ${userVerif.token}` 
            }
        })
        .then((res)=>res.json())
        .then((data)=> {
            console.log(data.msg)
        })
        .catch((err)=> console.log(err))
}