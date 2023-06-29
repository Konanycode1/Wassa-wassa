$(document).ready(()=>{
   let userMarch = localStorage.getItem("userMarch")
   userMarch = JSON.parse(userMarch)
   if(userMarch == null){
     window.location.href = "../loginMarch.html"
   }
   let url = `https://wassa.onrender.com/api/commercantReadById/${userMarch.userId}`
   let api = `http://localhost:3000/api/commercantReadById/${userMarch.userId}`
   let commande = `https://wassa.onrender.com/api/allCommande/`


   fetch(url,{
    method:"GET",
    headers:{
        "Content-Type":"application/json",
        "authorization": `token ${userMarch.token}`
    }
   })
   .then((res)=>{
        if(res.redirected){
            window.location.href = "../loginMarch.html"
            localStorage.removeItem("userMarch")
        }
        return res.json()
   })
   .then((data)=>{
   
    $(".Marchlogo").attr("src",`${data.data.logo}`)
    $(".MarchName").text(`${data.data.nom} ${data.data.prenom}`)
   })
   .catch((err)=> console.log(err))


  fetch(commande,{
    method: "GET",
    headers:{
      "Content-Type": "application/json"
    }
  })
  .then((res)=>{return res.json()})
  .then((data)=>{
    Commande(userMarch)
    data.commande.map(ele=> {
      if(ele.idClient == userMarch.userId){
        // console.log(ele)
      }
    })
  })
  .catch((err)=>console.log(err))


})

function Commande(user){
  let count = 0
  let countValide = 0
  let countAnnule = 0
   let api = `https://wassa.onrender.com/api/allCommande/`
   fetch(api,{method: "GET"})
   .then((res)=> res.json())
   .then((data)=>{
      ActionRecent(data,user)
      Convoi(data,user)
      ColisArriver(user, data)
      data.commande.map(commande => {
       
       if(commande.idClient== user.userId){

           count++
       }
       if(commande.idClient== user.userId && commande.status == 1){
       
           countValide++
       }
       if(commande.idClient== user.userId && commande.status == -1){
        countAnnule++
    }
      })
      $(".nombreCom").text(count)
      $('.valideCom').text(countValide)
      $('.AnnulCom').text(countAnnule)
      let estim = count*100/20
      let estimVali = countValide*100/count
      let estimAnnule =  countAnnule*100/count
      $('.estimCom').text(`${estim} %`)
      $('.estimVali').text(`${estimVali} %`)
      $('.estimAnnule').text(`${estimAnnule} %`)
      
   })
   .catch((err)=>console.log(err))
}

function Convoi(data,user){
  let commande = data
  let countPub = 0
  let countValidePub = 0
  let total = 0
   let api = `https://wassa.onrender.com/api/readAllPub/`
   fetch(api,{method: "GET"})
   .then((res)=> res.json())
   .then((data)=>{
      data.data.map(pub => {
      commande.commande.map((cmd)=>{
      if(cmd.idClient == user.userId){
          total++
      }
      })
      })
      $(".convoiEncours").text(total)
      
   })
   .catch((err)=>console.log(err))
}


function ActionRecent(data, user){
  let commande = data;
  let api = `https://wassa.onrender.com/api/compagnieReadAll/`;
   fetch(api, {method:'GET'})
   .then((res)=> res.json())
   .then((compa)=>{                                                                                                                                                                                                                              
      commande.commande.map((cmd)=>{
        compa.data.map((comp)=>{
           if( cmd.idClient ==user.userId && cmd.idCompa == comp._id )
           {
               let ajt = `
               <tr>
               <td>${comp.compagnie}</td>
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

function ColisArriver(user, commande){
   let api = "https://wassa.onrender.com/api/readAllPub/"
   fetch(api, {method: "GET"})
   .then((res)=>{
      
       return res.json()
   })
   .then((data)=> {
      data.data.map((pub) =>{
        commande.commande.map((cmd)=>{
          if(pub._id == cmd.idPub && cmd.idClient == user.userId){
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
        })
      } )
   })
   .catch((err)=> console.log(err))

}
