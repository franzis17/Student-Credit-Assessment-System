import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers;
  console.log(">>> Authorizing...");
  console.log("In require auth, authorization = " + authorization);

  if (!authorization) {
    console.log("ERROR: Authorization token required");
    return res.status(401).json({error: 'Authorization token required'})
  }

  const token = authorization.split(' ')[1]

  try {
    const { _id } = jwt.verify(token, process.env.JWT_KEY)

    req.user = await User.findOne({ _id }).select('_id')
    next()

  } catch (error) {
    console.log(error)
    res.status(401).json({error: 'Request is not authorized'})
  }
}

export default requireAuth
