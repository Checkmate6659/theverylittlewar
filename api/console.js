const fs=require("fs");
var atomes=[
"carbone",
"oxygene",
"azote",
"iode",
"brome",
"hydrogene",
"soufre",
"chlore"
]
module.exports={
	name:'console',
	PATCH:(req,res,body)=>{
		body_data=JSON.parse(body);
		response=[]
		for(a of body_data){
			try{
				var geval=eval;
				geval(a.toString())
			}catch(err){
				response.push({erreur:err})
			}
		}
		res.writeHead(200,{'Content-Type':'application/json'});
		res.write(JSON.stringify(response));
		res.end();
	}
}