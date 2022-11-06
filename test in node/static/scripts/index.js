window.addEventListener("load", async (event) => {
    //debugger;
    const dataProducts = await getCompanies();
})

async function getCompanies() {
    try {
        const response = await fetch("/company");
        const data = await response.json();
        if (response.ok) {
            console.log("sucsess to get companies")
            const companyList = document.getElementById("companyList");
            draw(data,companyList,0)
            return data;
        }
        else {
            throw new Error("Status Code is: " + " " + response.status+" error is: "+data.message);
        }
    } catch (err) {
        alert(Error);
        return [];
    }
}

function draw(data,myFather,level){
    let colors = ['#993333','#CCFF99','#FF3333','#FF9933']
    const cardTemplate = document.getElementById("temp-card");
    data.forEach(company => {
        const newCardTemp = cardTemplate.content.cloneNode(true);
        const card = newCardTemp.querySelector(".card");
        let atribId=company.id.toString();
        if(level>colors.length)
            level=0;
        card.style.backgroundColor = colors[level];
        card.setAttribute("id",atribId);
        newCardTemp.querySelector(".compId").innerText = "Id:"+company.id;
        newCardTemp.querySelector(".name").innerText = "Site Name:"+company.name;
        newCardTemp.querySelector(".url").innerText = company.url;
        newCardTemp.querySelector(".url").setAttribute("href","https://" + company.url );

        myFather.appendChild(newCardTemp)
        if(Object.hasOwn(company,"subData")){ 
            let my = document.getElementById(atribId);   
            draw(company.subData,my,level+1);  
        }
    });
}






