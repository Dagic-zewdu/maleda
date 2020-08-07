const express= require('express')
const bodyParser= require('body-parser')
const app= express()
const cors = require('cors')
const {port} = require('./config/config')
const path =require('path')
var compression = require('compression')
app.use('/static',express.static(path.join(__dirname,'public')));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true}));
app.use(cors())

// compress all responses
 
const video= require('./router/videos')
const News= require('./router/News')
const user= require('./router/User')
const comment=require('./router/Comments')
/*video Route*/


app.get('/api/video',video)
app.post('/api/video',video)
app.put('/api/video',video)
app.post('/api/delvideo',video)
app.post('/api/checkvideo',video)
/*News Routes*/

app.get('/api/news',News)
app.post('/api/news',News)
app.put('/api/news',News)
app.post('/api/delnews',News)

/** user Routes */
app.post('/api/login',user)
app.post('/api/signup',user)
app.put('/api/user',user)
app.post('/api/deluser',user)
app.get('/api/user',user)
app.post('/api/getusers',user)
app.post('/api/addadmin',user)
/** Like routes */
app.get('/api/getlikes',require('./router/Likes'))
app.post('/api/ifliked',require('./router/Likes'))
app.post('/api/vliked',require('./router/Likes'))
app.post('/api/nliked',require('./router/Likes'))
app.post('/api/unlikev',require('./router/Likes'))
app.post('/api/unliken',require('./router/Likes'))
/** comment routes */
app.get('/api/comments',comment)
app.post('/api/getcomments',comment)
app.post('/api/postcomments',comment)
app.put('/api/comments',comment)
app.post('/api/delcomments',comment)
/**auth route */
app.post('/api/checkuser',require('./auth/authroute'))
app.post('/api/checkadmin',require('./auth/authroute'))
/**files route */
app.post('/api/uploadfile',require('./router/file'))
app.post('/api/deletefile',require('./router/file'))
/**company info routes */
app.get('/api/companyinfo',require('./router/company_info.js'))
app.post('/api/setcompany',require('./router/company_info.js'))
app.put('/api/editcompany',require('./router/company_info.js'))
/**if another routes are aquired than above routes goto client side */
app.use(express.static(path.join(__dirname,'build')));
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'build','index.html'))
})
app.listen(port,()=>{
    console.log('port started in:'+port)
})