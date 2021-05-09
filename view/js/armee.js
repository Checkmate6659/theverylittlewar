act_creat_mol=null;
var atomes=[
"carbone",
"oxygene",
"azote",
"iode",
"brome",
"hydrogene",
"soufre",
"chlore"
];
var initiales=["C","O","N","I","Br","H","S","Cl"];
function act_all(){
	at_send.append("mode","detailed");
	at_send.append("token",localStorage.getItem("token"));
	at_send.append("username",localStorage.getItem("username"));
	users_xhr.open("GET","/api/v1/users?"+at_send.toString());
	users_xhr.responseType="json";
	users_xhr.addEventListener("readystatechange",function(ev){
		if(users_xhr.readyState==users_xhr.DONE){
			if(users_xhr.status==200){
				for(let a=0;a<5;a++){
					let mol=users_xhr.response.molecules[a];
					if(mol){
						let formule="";
						for(b in atomes){
							if(users_xhr.response.molecules[a][atomes[b]]){
								formule+="<e"+initiales[b].toLowerCase()+">";
								formule+=initiales[b];
								if(users_xhr.response.molecules[a][atomes[b]]!=1){
									formule+="<sub>"+users_xhr.response.molecules[a][atomes[b]]+"</sub>";
								}
								formule+="</e"+initiales[b].toLowerCase()+">";
							}
						}
						document.getElementById("formule"+a).innerHTML="Vide";
						document.getElementById("number_mol"+a).innerHTML="0";
						document.getElementById("creat_mol"+a).style.display="inline-block";
						document.getElementById("delete_mol"+a).style.display="none";
						document.getElementById("new_mol"+a).style.display="none";
					}else{
						document.getElementById("formule"+a).innerHTML="Vide";
						document.getElementById("number_mol"+a).innerHTML="0";
						document.getElementById("creat_mol"+a).style.display="inline-block";
						document.getElementById("delete_mol"+a).style.display="none";
						document.getElementById("new_mol"+a).style.display="none";
					}
				}
			}else{
				alert("ERROR in getting user : code "+api_xhr.status)
			}
		}
	});
}
window.onload=function(event){
	let users_xhr=new XMLHttpRequest();
	let at_send=new URLSearchParams();
	
	act_all();
}