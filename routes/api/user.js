const express = require("express") ; ;
const router = express.Router() ; 

//@route api/users
//@desc  test routes 
//@access Public    
router.get("/" , (req, res)=>{
    return res.send("users routes")  ; 
})


module.exports = router ; 