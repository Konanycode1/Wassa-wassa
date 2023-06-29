$(document).ready(()=>{
    let user = localStorage.getItem("userMarch")
    user = JSON.parse(user)
    let allcom = `https://wassa.onrender.com/api/allcommande/`
    let allpub = `https://wassa.onrender.com/api/readAllPub/`
    let allCommercant = `https://wassa.onrender.com/api/`
    let count = 0
    $(".fermer").css("display","none")
    if(user == null){
        window.location.href = "../loginMarch.html";
    }
    else{
       
        fetch(allpub,{
            method: "GET",  
        })
        .then((res)=> {
            if(res.redirected){
                window.location.href = "../loginComp.html"
                localStorage.removeItem("userMarch")
            }
            return res.json()
        })
        .then((pub)=>{
            pub.data.map((publi)=>{
                fetch(allcom,{
                    method:"GET"
                })
                .then((res)=> {
                    
                    return res.json()
                })
                .then((data)=>{
                   
                    data.commande.map(comm =>{
                        
                                if(user.userId == comm.idClient && publi.statut == 1 && publi._id == comm.idPub){
                                    $('.fermer').css("display",'block');
                                    let text =`
                                        <tr>
                                            <th scope="row" >${publi.numeroCNI}</th>
                                            <td>${publi.nomPrenomchauff}</td>
                                            <td>${publi.ligneDepart}</td>
                                            <td>${publi.ligneArrive}</td>
                                            <td>${parseInt(publi.espace.split(' ')[0]) - publi.espaceRestant }</td>
                                            <td>${publi.numeroChauff}</td>
                                            <td>
                                            <span class="badge bg-warning ">Arrivée</span>
                                            </td>
                                        </tr>`
                                        $(".arrivageP").append(text)
                                }         
                    })
                })
                .catch((err)=>console.log(err)) 
            })
          
           
        })
        .catch((err)=>console.log(err))
 
    }
})
