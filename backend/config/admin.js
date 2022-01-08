module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '58e84f628f491014e944547905c2204e'),
  },
});
