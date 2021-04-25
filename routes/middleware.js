const jwt = require('jsonwebtoken');
const withAuth = function(req, res, next) {
  // console.log('----req.body22---')
  // console.log(req.body)
 //  console.log(req.headers.authorization)
   const authHeader = req.headers.authorization;
   if(authHeader)
   {
      //console.log('---bearer-ani--'+authHeader)
      const token = authHeader.split(' ')[1];
      //console.log('---bearer-token--'+token)
      if (!token) {
         console.log(2222)
         //res.status(401).send('Unauthorized: No token provided');
         response = {          
            msg:'Unauthorized: No token provided',        
            status:401
        };
        res.send(response);
      } else {
         jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
           // console.log(333)
            if (err) {
             //  console.log(4444)
            //res.status(401).send('Unauthorized: Invalid token');
                  response = {          
                     msg:'Unauthorized: No token provided',        
                     status:401
               };
               res.send(response);
            } else {
              // console.log(555)
               //console.log('----decoded.id-----'+decoded.id)
            req.ids = decoded.id;
            next();
            }
         });
      }
   }
   else{

      response = {          
         msg:'Unauthorized: No token provided',        
         status:401
     };
     res.send(response);
      
   }
}
module.exports = withAuth;