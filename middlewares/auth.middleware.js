const config = require("config")  ; 
const jwt  = require("jsonwebtoken") ;

module.exports = function (req , res , next)  { 
    const token  = req.header("x-auth-token") ; 
   try{
    if(!token) { 
        res.status(401).json( { 
            success: false, 
            message  : "no provided token  , authorization denied"
        })
    }else { 
        const payload = jwt.verify(token , config.get("jwtSecret")) ; 
        if(!payload) { 
            res.status(401).json( { 
                success : false , 
                message :  "invalid token" , 
            })
        }  else { 
            console.log(payload)
            req.user = payload.user ; 
            next() ; 
         }
    }
   }catch(error) { 
    return res.status(401).json( { 
        success : false , 
        message :  error.message , 
    })
   }
}



