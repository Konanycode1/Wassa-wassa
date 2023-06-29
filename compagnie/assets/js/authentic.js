$(document).ready(()=>{
    let user = localStorage.getItem("user")
    user = JSON.parse(user)
    if(user == null){
        window.location.href = "../loginComp.html"
    }
   
    let compagnie = `http://localhost:3000/api/compagnieReadId/${user.userId}`
    let api = `https://wassa.onrender.com/api/compagnieReadId/${user.userId}`

    fetch(api,{
        method: "GET",
        headers: {
           "authorization": `token ${user.token}`,
           "Content-Type":"application/json"
        }
    })
    .then((res)=>{
        if(res.redirected){
            window.location.href = "../loginComp.html"
            localStorage.removeItem("user")
        }
        return res.json()
    })
    .then((data)=> {

        Commande(user)
        Convoi(user)
        ColisArriver(user)
        $('.logoimg').attr("src",`${data.data.logo}`)
        $(".nameUser").text(`${data.data.compagnie}`)
        
    })
    .catch((err)=> console.log(err))


    $(".deco").on("click",()=>{
        localStorage.removeItem("user")
        window.location.href = "../loginComp.html"
    })
})

function Commande(user){
   let count = 0
   let countValide = 0
  
    let api = `https://wassa.onrender.com/api/allCommande/`
    fetch(api,{method: "GET"})
    .then((res)=> res.json())
    .then((data)=>{
        ActionRecent(data,user)
       data.commande.map(commande => {
        if(commande.idCompa == user.userId){
            count++
        }
        if(commande.idCompa == user.userId && commande.status == 1){
            countValide++
        }
       })
       $(".nombreCom").text(count)
       $('.valideCom').text(countValide)
      
       let estim = count*100/20
       let estimVali = countValide*100/count
      
       $('.estimCom').text(`${estim} %`)
       $('.estimVali').text(`${estimVali} %`)
      
       
    })
    .catch((err)=>console.log(err))
}

function Convoi(user){
    let countPub = 0
    let countValidePub = 0
    let total = 0
     let api = `https://wassa.onrender.com/api/readAllPub/`
     fetch(api,{method: "GET"})
     .then((res)=> res.json())
     .then((data)=>{
        data.data.map(pub => {
        if(pub.compagnie == user.userId){
            total++
        }
        if(pub.compagnie == user.userId && pub.statut == 0){
            countPub++
        }
        if(pub.compagnie == user.userId && pub.statut == 1){
            countValidePub++
        }
        
        })
        $(".convoiEncours").text(countPub)
        $('.convoiArrive').text(countValidePub)
        let estim = countPub*100/total
        let estimVali = countValidePub*100/total
        $('.conEnc').text(`${estim} %`)
        $('.conArr').text(`${estimVali} %`)
        
     })
     .catch((err)=>console.log(err))
 }


function ActionRecent(data, user){
   let commande = data;
   let api = `https://wassa.onrender.com/api/`;
    fetch(api, {method:'GET'})
    .then((res)=> res.json())
    .then((march)=>{
       commande.commande.map((cmd)=>{
        march.com.map((mch)=>{
            if(cmd.idCompa == user.userId && cmd.idClient == mch._id )
            {
                let ajt = `
                <tr>
                <td>${mch.nom} ${mch.prenom}</td>
                <td><a href="#" class="text-primary">${cmd._id}</a></td>
                <td>${cmd.nombreProduit}</td>
                <td>${cmd.status == 0? '<span class="badge bg-warning">En cour</span>':cmd.status == -1?'<span class="badge bg-danger">Annuler</span>':'<span class="badge bg-success">Validée</span>' }</td>
              </tr>
                `
                $('#recenty').append(ajt)
            }

        })
       })
    })
    .catch((err)=> console.log(err))
}

function ColisArriver(user){
    let api = "https://wassa.onrender.com/api/readidPubCom/"
    console.log(user)
    fetch(api, {method: "GET", 
    headers:{
        "authorization":`token ${user.token}`,
    }})
    .then((res)=>{
       
        return res.json()
    })
    .then((data)=> {
       data.map((pub) =>{
        if(pub.statut == 1){
            let text = `
            <tr>
                            <th scope="row">${pub.matricule}</th>
                            <td>${pub.nomPrenomchauff}</td>
                            <td>${pub.espace}</td>
                            <td>${pub.ligneDepart}</td>
                            <td>${pub.ligneArrive}</td>
                            <td>${pub.numeroChauff}</td>
                            <td>${pub.statut == 0? '<span class="badge bg-warning">En cour</span>':'<span class="badge bg-info">Arrivés</span>' }</td>
                          </tr>
            `
            $('#colisArrive').append(text)
        }
       
       } )
    })
    .catch((err)=> console.log(err))

}