export default function requireAuth(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  } else {
    const err = new Error('Unauthorized');
    err.status = 401;
    return next(err);
  }
}
