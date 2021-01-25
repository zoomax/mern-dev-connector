const express = require("express") ; ;
const router = express.Router() ; 

//@route api/auth
//@desc  test routes 
//@access Public    
router.get("/" , (req, res)=>{
    return res.send("auth routes")  ; 
})


module.exports = router ; 