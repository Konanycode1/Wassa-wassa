$(document).ready(()=>{
    let userMarch = localStorage.getItem("userMarch")
    userMarch = JSON.parse(userMarch)
    let Comm 
    if(userMarch == null){
        window.location.href = "../loginMarch.html"
    }
    let url = `https://wassa.onrender.com/api/commande/`
    let api = `http://localhost:3000/api/commande/`
    let allpubloca = `http://localhost:3000/api/readAllPub/`
    let allpub = `https://wassa.onrender.com/api/readAllPub/`
    let allpubidloca = `http://localhost:3000/api/readidPub/`
    let allpubid = `https://wassa.onrender.com/api/readidPub/`
    let ligne1 = ["san pedro","meagui","soubre", "gagnoa","yamoussokro"]
    let compagnieloca = `http://localhost:3000/api/compagnieReadId/`
    let compagnie = `https://wassa.onrender.com/api/compagnieReadId/`

   

    $("#commander").on("submit",(e)=>{
        e.preventDefault()
    })
    $('.btnCom').on("click",()=>{
        let nombre = $("#nombreProduit").val()
        let destination = $("#destination").val()
        let nomPrenomExp = $("#nomPrenomExp").val()
        let numeroExp = $("#numeroExp").val()
        let depart = $("#depart").val()
       let Comm = {
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
                "Content-Type":"application/json",
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
                            <button type="button" class="btn btn-success"><i class="bi bi-check-circle valided"></i></button>
                           </td>
                       </tr>
                     `
                     $(".pub").append(text)
                    }

                   $(".valided").on("click",(e)=>{
                        let parent = $(this).attr("class")
                        console.log(parent)
                   })

                }))

               
                
              })
              .catch((error)=> console.log(error))
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    })
   
    




})