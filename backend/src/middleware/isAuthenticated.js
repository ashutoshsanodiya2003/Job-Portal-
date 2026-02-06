import jwt from 'jsonwebtoken'

export const isAuthenticated = async(req,res,next)=>{

    
    

try {
    // const token = req.cookies.token

    const token =
      req.cookies.token ||
      req.headers.authorization?.split(" ")[1];


    if(!token){
        return res.status(401).json({
            message:"User not Authenticated",
            success:false
        })
    }

    const decoded =  jwt.verify(token,process.env.JWT_SECRET)

    if(!decoded){
        return res.status(401).json({
            message:"Invalid Token",
            success:false
        })
    }

    req.id = decoded.userId
    next()

} catch (error) {
    console.log(error)
}

}

