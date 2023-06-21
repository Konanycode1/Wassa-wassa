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
    console.log(data)
    data.commande.map(ele=> {
      if(ele.idClient == userMarch.userId){
        console.log(ele)
      }
    })
  })
  .catch((err)=>console.log(err))


})