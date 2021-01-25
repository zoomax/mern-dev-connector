const express = require("express") ; ;
const router = express.Router() ; 

//@route api/profiles
//@desc  test routes 
//@access Public    
router.get("/" , (req, res)=>{
    return res.send("profile routes")  ; 
})


module.exports = router ; 