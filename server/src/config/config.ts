const config = {
  mongoOptions: {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    keepAlive: true
  },
  db: 'mongodb+srv://root:root@crud-application.ohfaxvn.mongodb.net/',
  port: '5000',
  requiresAuth: false,
}

export default config
