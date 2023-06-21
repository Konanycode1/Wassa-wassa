$(document).ready(()=>{
    let user = localStorage.getItem("user")
    user = JSON.parse(user)
    let allcom = `https://wassa.onrender.com/api/allcommande/`
    let allpub = `https://wassa.onrender.com/api/readAllPub/`
    let allCommercant = `https://wassa.onrender.com/api/`
        
    let count = 0
    if(user == null){
        window.location.href = "../loginComp.html";
    }
    else{
        fetch(allcom,{
            method:"GET"
        })
        .then((res)=> {
            if(res.redirected){
                window.location.href = "../loginComp.html"
                localStorage.removeItem("user")
            }
            return res.json()
        })
        .then((data)=>{
            data.commande.map(item =>{
                fetch(allCommercant, {
                    method: "GET",
                    headers:{
                        "Content-Type":"application/json"
                    }
                })
                .then((res)=> res.json())
                .then((commercant)=>{
                    commercant.com.map(ele => {
                        if(ele._id == item.idClient && item.status == 0 && item.idCompa ==user.userId ){
                            let text =`
                                <tr>
                                    <th scope="row">${item._id}</th>
                                    <td>${ele.nom} ${ele.prenom}</td>
                                    <td>${item.nomPrenomExp}</td>
                                    <td>${item.depart}</td>
                                    <td>${item.destination}</td>
                                    <td>${item.numeroExp}</td>
                                    <td>${item.nombreProduit}</td>
                                    <td>${ele.numero}</td>
                                    <td> 
                                    <button type="button" class="btn btn-success" onclick="valide(event)"><i class="bi bi-check-circle"></i></button>
                                    <button type="button" class="btn btn-danger" onclick="annuler(event)"><i class="bi bi-exclamation-octagon"></i></button>
                                    </td>
                                </tr>`
                                $(".listeCom").append(text)
                        }
                    })
                })
                .catch((err)=> console.log(err))          
            })
        })
        .catch((err)=>console.log(err))  
    }
})

function valide(event){
    let user = localStorage.getItem("user")
    user = JSON.parse(user)
    if(user == null){
        window.location.href = "../loginComp.html";
    }
    else{
        let parent = []
        let idCom = []
        parent.push(event.target.closest("tr"))

        
        idCom.push(parent[0].children[0].innerHTML)
        console.log("btnvali",idCom)
        fetch(`https://wassa.onrender.com/api/valider/${idCom[0]}`, {
            method: "GET",
            headers:{
                "authorization":`token ${user.token}`
            }
        })
        .then((res)=>{
            if(res.redirected){
                window.location.href = "../loginComp.html";
                localStorage.removeItem("user")
            }
            return res.json()
        })
        .then((data)=>{
            $(".msge").text(data.msg)

            setTimeout(()=>{
                window.location.reload();
            }, 5000)
        })
        .catch((err)=> console.log(err))
    }
    
}

function annuler(event){
    let user = localStorage.getItem("user")
    user = JSON.parse(user)
    if(user == null){
        window.location.href = "../loginComp.html";
    }
    else{
        let parent = []
        let idCom = []
        parent.push(event.target.closest("tr"))

        
        idCom.push(parent[0].children[0].innerHTML)
        fetch(`https://wassa.onrender.com/api/annuler/${idCom[0]}`, {
            method: "GET",
            headers:{
                "authorization":`token ${user.token}`
            }
        })
        .then((res)=>{
            if(res.redirected){
                window.location.href = "../loginComp.html";
                localStorage.removeItem("user")
            }
            return res.json()
        })
        .then((data)=>{
            $(".msge").text(data.msg)
            setTimeout(()=>{
                window.location.reload();
            }, 5000)
        })
        .catch((err)=> console.log(err))
    }
    
}