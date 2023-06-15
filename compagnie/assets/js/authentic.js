$(document).ready(()=>{
    let user = localStorage.getItem("user")
    user = JSON.parse(user)
    if(user == null){
        window.location.href = "../loginComp.html"
    }
    let compagnie = `http://localhost:3000/api/compagnieReadId/${user.userId}`
    let api = `https://wassa.onrender.com/api/compagnieReadId/${user.userId}`

    fetch(compagnie,{
        method: "GET",
        headers: {
           "authorization": `token ${user.token}`,
           "Content-Type":"application/json"
        }
    })
    .then((res)=>{
        if(res.redirected){
            window.location.href = "../loginComp.html"
        }
        return res.json()
    })
    .then((data)=> {
        $('.logoimg').attr("src",`${data.data.logo}`)
        $(".nameUser").text(`${data.data.compagnie}`)
    })
    .catch((err)=> console.log(err))

})