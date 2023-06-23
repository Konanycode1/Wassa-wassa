$(document).ready(()=>{
    let userMarch = localStorage.getItem('userMarch')
    userMarch =JSON.parse(userMarch)
    
    let allpub =`https://wassa.onrender.com/api/readAllPub/`
    let allcom = `https://wassa.onrender.com/api/compagnieReadAll`
    fetch(allpub, {
        method:"GET"
    })
    .then((res)=> res.json())
    .then((data)=>{
        data.data.map(el =>{

            fetch(allcom, {
                method: "GET"
            })
            .then((res)=> res.json())
            .then((compagnie)=>{
                compagnie.data.map(item =>{
                    console.log(el.compagnie,item._id)
                    if(el.compagnie == item._id){
                        console.log("el",el)
                        console.log("item",item)
                        let text = `
                        <tr>
                            <th scope="row">${item.compagnie}</th>
                            <td>${el.nomPrenomchauff}</td>
                            <td>${el.numeroChauff}</td>
                            <td>${el.ligneDepart}</td>
                            <td>${el.ligneArrive}</td>
                            <td>${el.espace}</td>
                            <td>${el.espaceRestant}</td>
                            <td>${el.heureDepart.split("T")[0]} à ${el.heureDepart.split("T")[1]}</td>
                        </tr>
                        `
                        $('#listPu').append(text);
                    }
                })

            })
            .catch((err)=>console.log(err))
        })
    })
    .catch((err)=> console.log(err))
})