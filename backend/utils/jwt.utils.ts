import jwt from "jsonwebtoken";
import config from "config";


export function sign(id: string, userName:string) {
  const secret = config.get('JWT_SECRET') as string
  const userid = id.toString()
  console.log(secret,id.toString(),userName)
  return jwt.sign({userid, userName}, secret ,{expiresIn : '30d'});
}

export function decode(token: string) {
  try {
    const secret = config.get('JWT_SECRET') as string
    const decoded = jwt.verify(token, secret); 
    return { valid: true, expired: false, decoded };
  } catch (error: any) {
    return {  
        
      valid: false,
      expired: error.message === "jwt expired",
      decoded: null,
    };
  }
}