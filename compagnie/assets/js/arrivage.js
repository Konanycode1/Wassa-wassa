$(document).ready(()=>{
    let user = localStorage.getItem("userMarch")
    user = JSON.parse(user)
    let allcom = `https://wassa.onrender.com/api/allcommande/`
    let allpub = `https://wassa.onrender.com/api/readAllPub/`
    let allCommercant = `https://wassa.onrender.com/api/`
    let count = 0
    if(user == null){
        window.location.href = "../loginMarch.html";
    }
    else{
        fetch(allpub,{
            method: "GET",  
        })
        .then((res)=> {
            if(res.redirected){
                window.location.href = "../loginMarch.html"
                localStorage.removeItem("user")
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
                                  
                                if(user.userId == comm.idClient){
                                    console.log("pub",publi)
                                    console.log("comm",comm)
                                    // let text =`
                                    //     <tr>
                                    //         <th scope="row">${item._id}</th>
                                    //         <td>${ele.nom} ${ele.prenom}</td>
                                    //         <td>${item.nomPrenomExp}</td>
                                    //         <td>${item.depart}</td>
                                    //         <td>${item.destination}</td>
                                    //         <td>${item.numeroExp}</td>
                                    //         <td>${item.nombreProduit}</td>
                                    //         <td>${ele.numero}</td>
                                    //         <td> 
                                    //         <button type="button" class="btn btn-success" onclick="valide(event)"><i class="bi bi-check-circle"></i></button>
                                    //         <button type="button" class="btn btn-danger" onclick="annuler(event)"><i class="bi bi-exclamation-octagon"></i></button>
                                    //         </td>
                                    //     </tr>`
                                        // $(".listeCom").append(text)
                                }         
                    })
                })
                .catch((err)=>console.log(err)) 
            })
          
           
        })
        .catch((err)=>console.log(err))
 
    }
})


  // if(ele._id == item.idClient && item.status <0 || item.status >0 && item.idCompa == user.userId ){
                        //     let text =`
                        //         <tr>
                        //             <th scope="row">${item._id}</th>
                        //             <td>${ele.nom} ${ele.prenom}</td>
                        //             <td>${item.nomPrenomExp}</td>
                        //             <td>${item.depart}</td>
                        //             <td>${item.destination}</td>
                        //             <td>${item.numeroExp}</td>
                        //             <td>${item.nombreProduit}</td>
                        //             <td>${ele.numero}</td>
                        //             <td> 
                        //             ${item.status == -1 ? '<span class="badge bg-danger ">Annuler</span>':'<span class="badge bg-success">Valider</span>'}
                        //             </td>
                        //         </tr>`
                        //         $(".Comterm").append(text)
                        // }