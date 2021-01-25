const express = require("express") ; ;
const router = express.Router() ; 

//@route api/posts
//@desc  test routes 
//@access Public    
router.get("/" , (req, res)=>{
    return res.send("posts routes")  ; 
})


module.exports = router ; 