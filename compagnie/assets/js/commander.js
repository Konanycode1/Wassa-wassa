    let userMarch = localStorage.getItem("userMarch")
    userMarch = JSON.parse(userMarch)
    let Comm = {}
    let data = {}
    if(userMarch == null){
        window.location.href = "../loginMarch.html"
    }
    let url = `https://wassa.onrender.com/api/commande/`
    let allcom = `https://wassa.onrender.com/api/allcommande/`
    let allpubloca = `http://localhost:3000/api/readAllPub/`
    let allpub = `https://wassa.onrender.com/api/readAllPub/`
    let allpubidloca = `http://localhost:3000/api/readidPub/`
    let allpubid = `https://wassa.onrender.com/api/readidPub/`
    let compagnieloca = `http://localhost:3000/api/compagnieReadId/`
    let isFound = false;
    
    function allComm() {
        
        fetch(allcom,{
            method:"GET"
        })
        .then((res)=> res.json())
        .then((data)=>{
            let count = 0
            for(let i = 0; i <data.commande.length;i++ ){
                if(i.idClient == userMarch.userId){
                    count++
                }
                return count
            } 
            $("span #badgeCom").text("ok")
        })
        .catch((err)=>console.log(err))  
    }
    allComm()
    $("#commander").on("submit",(e)=>{
        e.preventDefault()
    })
    $('.btnCom').on("click",()=>{
        let nombre = $("#nombreProduit").val()
        let destination = $("#destination").val()
        let nomPrenomExp = $("#nomPrenomExp").val()
        let numeroExp = $("#numeroExp").val()
        let depart = $("#depart").val()
        Comm = {
            nombreProduit : nombre,
            destination : destination,
            nomPrenomExp: nomPrenomExp,
            numeroExp: numeroExp,
            depart: depart
        }

        fetch(allpub,{
            method: "GET",
            headers: {
                "Content-Type":"application/json"
            }
        })
        .then((res)=> {
            if(res.redirected){
                window.location.href = "../loginMarch.html"
            }
            return res.json()
        })
        .then((data)=>{
            data = data.data.filter(ele =>ele.ligneArrive.toLowerCase() ==  Comm.destination.toLowerCase())
            data.map(item => {
                
              fetch(`https://wassa.onrender.com/api/compagnieReadAll/`,{
                headers:{
                    "Content-Type":"application/json"
                }
                
              })
              .then((res)=>{
                if(res.redirected){
                    window.location.href = "../loginMarch.html"
                }
                return res.json()
              })
              .then((val)=>{
                let comp = val.data.filter(ele => ele._id == item.compagnie )

                comp.map((le=> {
                    if(le._id == item.compagnie){
                        let text = `
                        <tr>
                           <th scope="row">${item._id}</th>
                           <td>${le.compagnie}</td>
                           <td>${item.nomPrenomchauff}</td>
                           <td>${item.numeroChauff}</td>
                           <td>${item.ligneDepart}</td>
                           <td>${item.ligneArrive}</td>
                           <td>${item.espaceRestant} ${item.espace.split(" ")[1]}</td>
                           <td>${item.heureDepart.split("T")[0]} ${item.heureDepart.split("T")[1]}</td>
                           <td>
                            <button type="button" class="btn btn-success valided" onclick="btnCommande(event)"><i class="bi bi-check-circle"></i></button>
                           </td>
                       </tr>
                     `
                     $(".pub").append(text)
                    }
                

                })) 
              })
              .catch((error)=> console.log(error))
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    })

    function btnCommande(event) {
        let parent = []
        let idpub = []
        parent.push(event.target.closest("tr"))
        idpub.push(parent[0].children[0].innerHTML)
        let api = `https://wassa.onrender.com/api/commande/${idpub[0]}`
        fetch(api, {
            body:JSON.stringify(Comm),
            method: "POST",
            headers:{
                "Content-Type":"application/json",
                "authorization":`token ${userMarch.token}`
            }
        })
        .then((res)=> {
            return res.json()
        })
        .then((data)=>{
            console.log(data.msg)
        })
        .catch((err)=>{
            console.log(err)
        })   
    }
    

   
  