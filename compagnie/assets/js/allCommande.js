$(document).ready(()=>{
    let userMarch = localStorage.getItem("userMarch")
    userMarch = JSON.parse(userMarch)
    let allcom = `https://wassa.onrender.com/api/allcommande/`
    let allpub = `https://wassa.onrender.com/api/readAllPub/`
    let compagnie = `https://wassa.onrender.com/api/compagnieReadAll/`
    let count = 0
    if(userMarch == null){
        window.location.href = "../loginMarch.html";
    }
        CommandeStatus()
        fetch(allcom,{
            method:"GET"
        })
        .then((res)=> {
            if(res.redirected){
                window.location.href = "../loginMarch.html"
                localStorage.removeItem("userMarch")
            }
            return res.json()
        })
        .then((data)=>{
            for(let i = 0; i <data.commande.length;i++ ){
                if(data.commande[i].idClient == userMarch.userId && data.commande[i].status == 0){
                   count+=1    
                }  
            }
            $('#badgeCom').text(count)
            
            data.commande.map(item =>{
                
                fetch(compagnie, {
                    method: "GET"
                })
                .then((res)=>{
                    return res.json()
                })
                .then((compa)=>{
                   compa.data.map(ele=> {
                        if(ele._id == item.idCompa){
                            fetch(allpub, {
                                method: "GET",
                            })
                            .then((res)=> res.json())
                            .then((pub)=>{
                                pub.data.map((pu)=>{
                                    if( pu._id == item.idPub && pu.compagnie == ele._id && item.status == 0){
                                        let text =`
                                        <tr>
                                            <th scope="row">${item._id}</th>
                                            <td>${pu.nomPrenomchauff}</td>
                                            <td>${item.depart}</td>
                                            <td>${item.destination}</td>
                                            <td>${item.nombreProduit}</td>
                                            <td>${pu.numeroChauff}</td>
                                            <td>${pu.heureDepart}</td>
                                            <td> 
                                            <button type="button" class="btn btn-primary"><i class="bi bi-pencil-square"></i></button>
                                            <button type="button" class="btn btn-danger"><i class="bi bi-trash"></i></button>
                                            </td>
                                        </tr>
                                        `
                                        $(".table-CommandeEnc").append(text)
                                    }
                                })
                            })
                            .catch((err)=> console.log(err))
                        }
                   })
                })
                .catch((err)=> console.log(err))
            })
        })
        .catch((err)=>console.log(err)) 
})

function CommandeStatus() {
    let userMarch = localStorage.getItem("userMarch")
    userMarch = JSON.parse(userMarch)
    let allcom = `https://wassa.onrender.com/api/allcommande/`
    let allpub = `https://wassa.onrender.com/api/readAllPub/`
    let compagnie = `https://wassa.onrender.com/api/compagnieReadAll/`
    let count = 0
    if(userMarch == null){
        window.location.href = "../loginMarch.html";
    }
        fetch(allcom,{
            method:"GET"
        })
        .then((res)=> {
            if(res.redirected){
                window.location.href = "../loginMarch.html"
                localStorage.removeItem("userMarch")
            }
            return res.json()
        })
        .then((data)=>{
            for(let i = 0; i <data.commande.length;i++ ){
                if(data.commande[i].idClient == userMarch.userId && data.commande[i].status == 0){
                   count+=1    
                }  
            }
            $('#badgeCom').text(count)
            
            data.commande.map(item =>{
                
                fetch(compagnie, {
                    method: "GET"
                })
                .then((res)=>{
                    return res.json()
                })
                .then((compa)=>{
                   compa.data.map(ele=> {
                        if(ele._id == item.idCompa){
                            fetch(allpub, {
                                method: "GET",
                            })
                            .then((res)=> res.json())
                            .then((pub)=>{
                                pub.data.map((pu)=>{
                                    if( pu._id == item.idPub && pu.compagnie == ele._id && item.status == 1 || item.status == -1){
                                        let text =`
                                        <tr>
                                            <th scope="row">${item._id}</th>
                                            <td>${pu.nomPrenomchauff}</td>
                                            <td>${item.depart}</td>
                                            <td>${item.destination}</td>
                                            <td>${item.nombreProduit}</td>
                                            <td>${pu.numeroChauff}</td>
                                            <td>${pu.heureDepart}</td>
                                            <td> 
                                            <button type="button" class="btn btn-primary"><i class="bi bi-pencil-square"></i></button>
                                            <button type="button" class="btn btn-danger"><i class="bi bi-trash"></i></button>
                                            </td>
                                        </tr>
                                        `
                                        $(".statuComm").append(text)
                                    }
                                })
                            })
                            .catch((err)=> console.log(err))
                        }
                   })
                })
                .catch((err)=> console.log(err))
            })
        })
        .catch((err)=>console.log(err)) 
    
   }