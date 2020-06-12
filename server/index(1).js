// 项目管理包
// $npm init -y 
// 后端内容node.js
// $cnpm i express -S

// 安装依赖包
// cnpm i

// 启动服务器
// $node index.js

var express = require("express");
var app = express();

// 创建静态目录./dist,默认访问index.html文件
app.use(express.static("./dist"));


//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

// req 客户端向服务器数据响应
// res 服务器向客户端数据响应
// get() 数据请求get请求post请求
// post()
// "/" 路由操作
// http://127.0.0.1:3000/
app.get("/",function(req,res){
    // 返回字符串 send()方法
    res.send("你好");
})

// 请求数据接口APi，获取数据
// http://127.0.0.1:3000/goodsApi
app.get("/goodsApi",function(req,res){
    // 返回对象 json()方法
    res.json({name:"商品名称",price:"22",num:1})
})
// 在服务器中定义变量，重启服务器会被初始化
var userList = [];//全局数据变量
// 先注册用户，在登陆用户

// 登陆接口
// http://127.0.0.1:3000/login
app.get("/login",function(req,res){
    console.log(req.query);
    let {username,password} = req.query;
    if(username == "" && password == ""){
        return; //终止路由操作
    }

    // 1.通过前端传递登陆信息
    // 2.使用前台登陆用户名，在后台中userList匹配到相同用户名密码，找到为登陆成功，找不到登陆失败
    
    // 使用前台用户名找userlist对象数据，对比密码
    let data = userList.find(item=>item.username == username);//返回对象
    console.log("返回对象",data);
    // 判断密码是否相同
    if( data && data.password == password){
        res.send("200");
    }else{
        res.send("201");
    }

})

// 注册接口
// http://127.0.0.1:3000/register
// http://127.0.0.1:3000/register?username=zhangsan&password=123123&password2=123123
app.get("/register",function(req,res){
    // req.query获取get请求传递数据
    console.log(req.query);
    // 判断数据
    let {username,password,password2} = req.query;
    if(username != "" && password == password2 && password != ""){
        console.log("注册成功");
        userList.push({username,password});
        res.send("200");
    }else{
        res.send("201");
    }
})


let hot = [
   {
   		id:1,
        hotImg: "../../images/hot_1.jpg",
        src:"https://webfs.yun.kugou.com/202003270117/53e7789484ff005ea1e9ad802b4192f2/G170/M07/16/11/SocBAF3H3aqAUYOEADmpdloW3bU827.mp3",
        song:"少年",
        singer:"梦然",
        word:"00:00,少年 - 梦然,00:01,词：梦然,00:02,曲：梦然,00:03,编曲：张亮,00:04,制作人：张亮 / 徐阁,00:05,和声编写：海青 / 梦然,00:07,和声演唱：海青 / 梦然,00:08,混音工程师：赵靖,00:09,母带工程师：赵靖,00:11,监制：梦然,00:22,换种生活,00:23,让自己变得快乐,00:24,放弃执着,00:25,天气就会变得不错,00:27,每次走过,00:28,都是一次收获,00:30,还等什么 做对的选择,00:32,过去的,00:33,就让它过去吧,00:35,别管那是一个玩笑还是谎话,00:38,路在脚下,00:39,其实并不复杂,00:40,只要记得你是你呀,00:43,Wu oh oh,00:53,Wu oh oh,01:03,我还是从前那个少年,01:06,没有一丝丝改变,01:09,时间只不过是考验,01:12,种在心中信念丝毫未减,01:15,眼前这个少年,01:17,还是最初那张脸,01:20,面前再多艰险不退却,01:23,Say never never give up,01:25,Like a fighter,01:26,Wu oh oh,01:37,换种生活,01:38,让自己变得快乐,01:39,放弃执着,01:40,天气就会变得不错,01:42,每次走过,01:43,都是一次收获,01:44,还等什么 做对的选择,01:47,过去的,01:48,就让它过去吧,01:50,别管那是一个玩笑还是谎话,01:52,路在脚下,01:54,其实并不复杂,01:55,只要记得你是你呀,02:08,Miya miya miya miya miya,02:13,Call me,02:14,Miya miya miya miya miya,02:18,我还是从前那个少年,02:21,没有一丝丝改变,02:23,时间只不过是考验,02:26,种在心中信念丝毫未减,02:30,眼前这个少年,02:31,还是最初那张脸,02:34,面前再多艰险不退却,02:37,Say never never give up,02:39,Like a fighter,02:41,追逐生命里光临身边的每道光,02:43,让世界因为你的存在变的闪亮,02:46,其实你我他并没有什么不同,02:48,只要你愿为希望画出一道想象,02:51,成长的路上必然经历很多风雨,02:54,相信自己终有属于你的盛举,02:56,别因为磨难 停住你的脚步,02:59,坚持住 就会拥有属于你的蓝图,03:02,Wu oh oh,03:11,我还是从前那个少年,03:14,没有一丝丝改变,03:17,时间只不过是考验,03:20,种在心中信念丝毫未减,03:23,眼前这个少年,03:25,还是最初那张脸,03:28,面前再多艰险不退却,03:31,Say never never give up,03:33,Like a fighter,03:34,我还是从前那个少年miya,03:38,我还是从前那个少年miya,03:43,我还是眼前这个少年miya,03:49,我还是从前那个少年miya,"
      },
    {
        id:2,
        hotImg: "../../images/hot_2.jpg",
        src:"https://webfs.yun.kugou.com/202003261433/9f32bdf0a0d2688df57a0fb574ee5b76/G195/M05/11/0D/Aw4DAF5x7wmAFJBDADH1idQOjrE276.mp3",
        song:"惊雷",
        singer:"倪浩毅",
        word:"00:00,倪浩毅 - 惊雷,00:01,编曲：王中易,00:02,惊雷这通天修为,00:05,天塌地陷紫金锤,00:08,紫电说这玄真火焰,00:10,九天悬剑惊天变,00:13,乌云我驰骋沙场,00:15,呼啸烟雨顿,00:17,多情自古空余恨,00:19,手持那弯月刃,00:22,看天地万物,00:25,豪情万种,00:27,恩怨情仇尽在风沙中,00:32,剑苍茫,00:35,天长啸,00:37,刀剑无情尽在纷扰中,00:42,山河八卦图,00:45,醉卧心中,00:47,功成名就在一掌中,00:52,惊雷震天一吼,00:55,天地颤抖,00:58,一将功成凭君话封侯,01:02,惊雷这通天修为,01:05,天塌地陷紫金锤,01:08,紫电说这玄真火焰,01:11,九天悬剑惊天变,01:13,乌云我驰骋沙场,01:15,呼啸烟雨顿,01:17,多情自古空余恨,01:19,手持那弯月刃,01:43,看天地万物豪情万种,01:47,恩怨情仇尽在风沙中,01:52,剑苍茫,01:55,天长啸,01:57,刀剑无情尽在纷扰中,02:02,山河八卦图,02:05,醉卧心中,02:07,功成名就在一掌中,02:12,惊雷震天一吼,02:15,天地颤抖,02:17,一将功成凭君话封侯,02:22,惊雷这通天修为,02:25,天塌地陷紫金锤,02:28,紫电说这玄真火焰,02:30,九天悬剑惊天变,02:33,乌云我驰骋沙场,02:35,呼啸烟雨顿,02:37,多情自古空余恨,02:39,手持那弯月刃,02:42,惊雷这通天修为,02:45,天塌地陷紫金锤,02:48,紫电说这玄真火焰,02:50,九天悬剑惊天变,02:53,乌云我驰骋沙场,02:55,呼啸烟雨顿,02:57,多情自古空余恨,02:59,手持那弯月刃,"
    },
    {
        id:3,
        hotImg: "../../images/hot_3.jpg",
        src:"https://webfs.yun.kugou.com/202003262108/8cd633561fff0d47a2968d73affbedc3/G207/M05/17/1F/b4cBAF5rOTaAF48VADPG3BGqgPA673.mp3",
        song:"口是心非",
        singer:"半吨兄弟",
        word:"00:00,半吨兄弟 - 口是心非(烟嗓版),00:01,作曲：张雨生,00:02,发行：四川讯飞超脑信息科技有限公司,00:17,口是心非,00:18,你深情的承诺,00:21,都随着西风飘渺远走,00:26,痴人梦话,00:27,我钟情的倚托,00:29,就像枯萎凋零的花朵,00:34,星火燎原,00:36,我热情的眼眸,00:38,曾点亮最灿烂的天空,00:43,晴天霹雳,00:44,你绝情的放手,00:46,在我最需要你的时候,00:51,于是爱恨交错人消瘦,00:55,怕是怕这些苦没来由,00:59,于是悲欢起落人静默,01:03,等一等这些伤会自由,01:08,于是爱恨交错人消瘦,01:12,怕是怕这些苦没来由,01:16,于是悲欢起落人静默,01:20,等一等这些伤会自由,01:43,口是心非,01:44,你矫情的面容,01:46,都烙印在心灵的角落,01:51,无话可说,01:53,我纵情的结果,01:55,就像残破光秃的山头,02:00,浑然天成,02:01,我纯情的悸动,02:03,曾奔放最滚烫的节奏,02:08,不可收拾,02:10,你滥情的拋空,02:12,所有晶莹剔透的感受,02:16,于是爱恨交错人消瘦,02:20,怕是怕这些苦没来由,02:25,于是悲欢起落人静默,02:29,等一等这些伤会自由,02:33,于是爱恨交错人消瘦,02:38,怕是怕这些苦没来由,02:42,于是悲欢起落人静默,02:46,等一等这些伤会自由,02:53,于是爱恨交错人消瘦,02:57,怕是怕这些苦没来由,03:01,于是悲欢起落人静默,03:05,等一等这些伤会自由,03:10,于是爱恨交错人消瘦,03:14,怕是怕这些苦没来由,03:18,于是悲欢起落人静默,03:23,等一等这些伤会自由",
    },
    {
        id:4,
       	hotImg: "../../images/hot_4.jpg",
       	src:"https://webfs.yun.kugou.com/202003261317/5bec3a54c8e653aab17ab9524ad0a0f3/G201/M04/0E/11/CQ4DAF5cokiAPrBoADGXruiwHys166.mp3",
        song:"口是心非",
        singer:"鹏鹏、杨小壮",
        word:"00:00,杨小壮、鹏鹏 - 口是心非,00:20,口是心非你深情的承诺,00:23,都随着西风飘渺远走,00:28,痴人梦话我钟情的依托,00:31,就像枯萎凋零的花朵,00:35,小壮：,00:37,星火燎原我热情的眼眸,00:40,曾点亮最灿烂的天空,00:45,晴天霹雳你绝情的放手,00:49,在我最需要你的时候,00:52,鹏鹏：,00:53,于是爱恨交错,00:55,人消瘦,00:57,怕只怕这些苦没来由,01:01,小壮：,01:02,于是悲欢起落,01:04,人静默,01:06,等一等这些伤会自由,01:10,鹏鹏：,01:11,于是爱恨交错,01:13,人消瘦,01:14,怕只怕这些苦没来由,01:18,小壮：,01:19,于是悲欢起落,01:21,人静默,01:23,等一等这些伤会自由,01:44,鹏鹏：,01:45,口是心非你矫情的面容,01:49,都烙印在心灵的角落,01:54,无话可说我钟情的结果,01:57,就想斩破光秃的山头,02:01,小壮：,02:02,浑然天成我纯情的激动,02:06,曾奔放最滚烫的节奏,02:11,不可收拾你滥情的抛空,02:14,所有晶莹剔透的感受,02:18,鹏鹏：,02:19,于是爱恨交错,02:21,人消瘦,02:23,怕只怕这些苦没来由,02:27,小壮：,02:28,于是悲欢起落,02:30,人静默,02:31,等一等这些伤会自由,02:35,鹏鹏：,02:36,于是爱恨交错,02:38,人消瘦,02:40,怕只怕这些苦没来由,02:44,小壮：,02:45,于是悲欢起落,02:47,人静默,02:48,等一等这些伤会自由,"
    },
    {
        id:5,
        hotImg: "../../images/hot_5.jpg",
        src:"https://webfs.yun.kugou.com/202003261316/a299f36a70334fb9411b00fa41601bd8/G192/M06/0C/1F/YIcBAF5CpduAP7AiACucQG42EYM045.mp3",
        song:"最美的伤口",
        singer:"半吨兄弟",
        word:"00:00,半吨兄弟 - 最美的伤口,00:07,你要走的时候 ,00:10,我明明想挽留,00:12,却像个提线木偶,00:15,怎么也说不出口,00:17,等到我转过头 ,00:20,发现你已远走,00:22,眼泪终于忍不住滴落湿衣袖,00:27,我曾经牵着你的手,00:30,走在繁华街头,00:32,就像在那童话世界遨游,00:37,不能牵着你的手,00:40,走到世界尽头,00:42,是我一生最美的伤口,01:10,一个一个一个,01:13,一个人在游走 午夜的街头,01:18,我就像是一只,01:20,无家可归的流浪狗,01:23,那时候若挽留 ,01:25,你会不会回头,01:28,若时光能倒流,01:30,你是否愿意跟我走,01:33,我曾经牵着你的手,01:35,走在繁华街头,01:38,就像在那童话世界遨游,01:43,不能牵着你的手,01:45,走到世界尽头,01:48,是我一生最美的伤口,01:53,我曾经牵着你的手,01:56,走在繁华街头,01:58,就像在那童话世界遨游,02:03,不能牵着你的手,02:06,走到世界尽头,02:08,是我一生最美的伤口,02:36,如今我游荡在世界的尽头,02:42,遗憾的我牵的不是你的手,"
    },
    {
        id:6,
        src:"https://webfs.yun.kugou.com/202003261448/480f63a22bb1bad8c4b1446fe407e3da/G201/M0B/10/13/CQ4DAF5LjCqALMB4AEJSIYJEpng810.mp3",
        hotImg: "../../images/hot_6.jpg",
        song:"我爱你",
        singer:"程jiajia",
        word:"00:00,程jiajia - 我爱你,00:01,作词：卢广仲、群可、邢书郡,00:02,吉他：陈柏彤,00:22,曾经在我眼前,00:24,却又消失不见,00:26,这是今天的第六遍,00:32,电影里的配乐,00:34,好像你的双眼,00:37,我爱你 快回到 我身边,00:42,曾经在我眼前,00:44,却又消失不见,00:47,这是今天的第六遍,00:52,电影里的配乐,00:54,好像你的双眼,00:57,我爱你 快回到 我身边,01:03,One two three,01:06,有没有 这样的一封信,01:11,上面 记载着你的心情,01:16,有没有 这样的一首歌,01:21,唱出人们的悲欢离合,01:26,有没有这样的一场电影,01:31,能让你我 触景伤情,01:35,Oh my baby,01:37,原来你早已经,01:39,带走了我的心,01:46,听到爱听的音乐,01:47,想起熟悉的你,01:48,快要陌生的轴距,01:49,可能触景生情,01:51,哈 我想我 都不属于自己,01:53,或许 自己的心情,01:54,不再删除那记忆,01:56,看不见你的时候,01:57,勉强的我好累,01:58,从第一眼见到你的时候,02:00,就感觉很对,02:01,那么也请你 给我一次机会,02:03,不要让我每天,02:04,带着安慰入睡,02:06,在我眼前 却又消失不见,02:10,这是今天的第六遍,02:15,电影里的情节,02:18,好像你的双眼,02:20,我爱你 快回到 我身边,02:26,在我眼前 却又消失不见,02:30,这是今天的第六遍,02:35,电影里的配乐,02:38,好像你的双眼,02:40,我爱你 快回到 我身边,03:06,听到爱听的音乐,03:07,想起熟悉的你,03:09,快要陌生的轴距,03:10,可能触景生情,03:11,哈 我想我 都不属于自己,03:14,或许 自己的心情,03:15,不再删除那记忆,03:17,看不见你的时候,03:18,勉强的我好累,03:19,从第一眼见到你的时候,03:21,就感觉很对,03:22,那么也请你 给我一次机会,03:24,不要让我每天,03:25,带着安慰入睡,03:26,在我眼前 却又消失不见,03:31,这是今天的第六遍,03:36,电影里的情节,03:39,好像你的双眼,03:41,我爱你 快回到 我身边,03:47,在我眼前 却又消失不见,03:51,这是今天的第六遍,03:56,电影里的配乐,03:59,好像你的双眼,04:01,我爱你 快回到 我身边,"
    },
];
let news=[
	{
   		id:1,
        hotImg: "../../images/new_1.jpg",
        src:"https://webfs.yun.kugou.com/202003251426/8b55e1eea1416f30e0fcec1976794c94/G200/M06/02/0B/aIcBAF518JeAFpX-ABrVjZgbWBw083.mp3",
        song:"流星",
        singer:"王俊凯",
        word:"00:00,王俊凯 - 流星,00:14,Listen 现在大家坐下来安静,00:16,Karry wang啊 拨动你们的神经,00:18,步步紧逼 全力出击,00:20,跟上我的节奏不要掉以轻心,00:22,暗中的 窥视着一举一动,00:24,这游戏 太无聊 我没空,00:26,跳梁小丑 四面楚歌,00:28,Coward and fraud,00:29,怎么会认输 不会随便就哭,00:31,经各种陷阱 历成就如今,00:32,太自信,00:33,借冰冷的枪 揭别人的伤,00:35,嗅钱财的脏 别太狂,00:37,不管路途多少荆棘,00:39,我会勇敢继续前行,00:40,就像黑夜的那颗流星,00:42,划破了整个天际,00:46,用热泪 去面对,00:48,是与非 不完美,00:50,Wu wu wu 别惧怕,00:53,用后背 去守卫,00:55,虚与伪 不后退,00:58,Wu wu wu,01:01,Oh oh oh 心中无畏,01:04,Oh oh oh 星辰生花,01:08,Oh oh oh 以梦为马,01:12,我知道 风过留痕,01:22,别惧怕,01:23,用后背 去守卫,01:25,虚与伪 不后退,01:28,Wu wu wu,01:31,Oh oh oh 心中无畏,01:34,Oh oh oh 星辰生花,01:38,Oh oh oh 以梦为马,01:41,我知道风过留痕不枉出发,"
      },
      {
   		id:2,
        hotImg: "../../images/new_2.jpg",
        src:"https://webfs.yun.kugou.com/202003261500/9f553898d9c9eb5de63fe4055d43c12a/G211/M02/1A/04/c4cBAF5x7HmALLNNADrXg_FQQXk896.mp3",
        song:"不再联系",
        singer:"小洲",
        word:"00:00,小洲 - 不再联系,00:01,监唱：梁雨,00:02,制作公司：上海妙一刻文化传媒,00:31,听说你已经离开这里,00:35,听说你的工作不如意,00:38,听说关于我的还会问起,00:42,可是我们 已经断了联系,00:46,你的一切我怎会忘记,00:50,你的事迹我忆在心里,00:53,就怪悔过的倔强装心底,00:57,洒脱了自己却失去了你,01:03,已经和你不再联系,01:07,我又何必独自消极,01:11,全都怪自己 那么没勇气,01:14,选择放弃,01:15,独自一个人回忆,01:18,已经和你不再联系,01:22,不代表会彻底忘记,01:26,明知没意义 也没有余地,01:29,却依然记起,01:32,夜深一个人想你,01:50,你的一切我怎会忘记,01:53,你的事迹我已在心里,01:57,就怪悔过的倔强装心底,02:00,洒脱了自己却失去了你,02:07,已经和你不再联系,02:11,我又何必独自消极,02:14,全都怪自己 那么没勇气,02:18,选择放弃,02:19,独自一个人回忆,02:22,已经和你不再联系,02:26,不代表会彻底忘记,02:29,明知没意义 也没有余地,02:33,却依然记起,02:36,夜深一个人想你,03:07,已经和你不再联系,03:11,我又何必独自消极,03:14,全都怪自己 那么没勇气,03:18,选择放弃,03:19,独自一个人回忆,03:22,已经和你不再联系,03:26,不代表会彻底忘记,03:29,明知没意义 也没有余地,03:33,却依然记起,03:36,夜深一个人想你,"
      },
      {
   		id:3,
        hotImg: "../../images/new_3.jpg",
        src:"https://webfs.yun.kugou.com/202003262113/232ec909de5a1c2e0a59e9671eec3d77/G209/M04/15/1B/sZQEAF5yIAGABKyMADz-g6dtNsQ387.mp3",
        song:"后来遇见他",
        singer:"胡66",
        word:"00:00,胡66 - 后来遇见他,00:01,作词：李艺皓,00:02,作曲：李艺皓,00:03,制作人：伍华,00:06,制作公司：Hikoon Music,00:16,Hey,00:18,你是否还会想到我,00:23,就像我,00:25,偶尔夜晚还是会哭的,00:30,那时满心欢喜,00:36,以为你就是结局,00:39,才把所有都给你,00:45,时间总是不听话,00:47,思念也开始装傻,00:49,反反复复,00:52,你说那就算了吧,00:54,我们就别再挣扎,00:57,于事无补,01:00,从此我不能听见你的消息,01:07,我怕我控制不住自己,01:13,想你,01:14,后来遇见他,01:17,陪我春秋冬夏,01:21,愈合我的伤疤,01:24,大概我会一直幸福吧,01:29,你身边的她,01:32,是否像我一样,01:36,能让你快乐吗,01:39,有太多想对你说的话,02:00,时间总是不听话,02:02,思念也开始装傻,02:04,反反复复,02:07,你说那就算了吧,02:09,我们就别再挣扎,02:12,于事无补,02:15,从此我不能听见你的消息,02:23,我怕我控制不住自己,02:28,想你,02:30,后来遇见他,02:32,陪我春秋冬夏,02:36,愈合我的伤疤,02:39,大概我会一直幸福吧,02:44,你身边的她,02:47,是否像我一样,02:51,能让你快乐吗,02:54,有太多想对你说的话,03:11,后来遇见他,03:13,陪我春秋冬夏,03:17,愈合我的伤疤,03:21,大概我会一直幸福吧,03:26,你身边的她,03:28,是否像我一样,03:32,能让你快乐吗,03:35,有太多想对你说的话,03:45,有太多想对你说的话,"
      },
       {
   		id:4,
        hotImg: "../../images/new_4.jpg",
        src:"https://webfs.yun.kugou.com/202003251433/f3b4059a4c75b75392f1a65090e846a2/G203/M01/0B/13/a4cBAF5wo8qAQg-OACQzkKRdF8c920.mp3",
        song:"火苗",
        singer:"小阿七",
        word:"00:00,小阿七 - 火苗,00:01,作词：何沐阳,00:02,作曲：何沐阳,00:20,暖风吹那春来到,00:23,羊群悠然吃草,00:25,怎么突然想起,00:28,你的微笑,00:30,天上飞着百灵鸟,00:33,马儿撒野地跑,00:35,我要你的拥抱,00:37,你知不知道,00:40,你的爱就像火苗,00:42,把我的心燃烧,00:44,烧得我的骄傲,00:47,无处可逃,00:49,你的爱就像火苗,00:52,我用相思煎熬,00:54,整个草原飘着,00:56,爱的味道,01:11,暖风吹那春来到,01:13,羊群悠然吃草,01:16,怎么突然想起,01:18,你的微笑,01:20,天上飞着百灵鸟,01:23,马儿撒野地跑,01:25,我要你的拥抱,01:28,你知不知道,01:30,你的爱就像火苗,01:32,把我的心燃烧,01:35,烧得我的骄傲,01:37,无处可逃,01:40,你的爱就像火苗,01:42,我用相思煎熬,01:44,整个草原飘着,01:47,爱的味道,01:49,你的爱就像火苗,01:52,把我的心燃烧,01:54,烧得我的骄傲,01:56,无处可逃,01:59,你的爱就像火苗,02:01,我用相思煎熬,02:04,整个草原飘着,02:06,爱的味道,02:08,整个草原飘着,02:11,爱的味道,"
      },
      {
   		id:5,
        hotImg: "../../images/new_5.jpg",
        src:"https://webfs.yun.kugou.com/202003262115/8fae5004cfe61f6778c5b55216a0b8d0/G206/M08/15/03/rpQEAF50eBCAQjQFAD606W0FYbM569.mp3",
        song:"漫长的告别",
        singer:"王晰",
        word:"00:00,漫长的告别 - 王晰 (Elvis Wang),00:02,词：程越,00:03,曲：程越,00:04,制作人：袁大巍,00:05,出品单位：腾讯音乐人 能量悦动,00:08,联合出品：乐华娱乐,00:10,视觉设计：禾一映画,00:11,特别鸣谢：海邦影视 新华媒体创意工场,00:27,云深之处隐约牧笛,00:31,骤雨唤醒春绿,00:36,陌上的梨花妆点着悲喜,00:41,我来送你,00:46,我最亲爱的朋友啊,00:50,离别近在眼前,00:55,你不要迷途也不能哭泣,01:00,这笑容请你铭记,01:07,朋友啊,01:10,这是一次漫长告别,01:17,当世界还需要英雄的传奇,01:22,和游侠的不羁,01:26,朋友啊,01:29,离愁总会消散 你知道,01:37,海图画不出未知的水域,01:42,和破浪的勇气,02:11,拍打着顽石的潮汐,02:16,路途丛生荆棘,02:20,不要忘记我年轻的样子,02:25,我的名字,02:30,那烁玉流金的朝霞,02:35,你披上光的盔甲,02:40,这不是你该留恋的田园,02:44,是另一个起点,02:51,朋友啊,02:55,也许有一天会再见,03:01,那时的我们再肩并着肩,03:06,漫步某个春天,03:10,朋友啊,03:14,暮色总会消散 你知道,03:19,必须冲破这寒寂的黎明,03:24,纵然有一天,03:27,有一天,03:31,世界凋零,03:43,夕阳剪出你远去的孤影,03:48,我将翘首伫立,"
      },
       {
   		id:6,
        hotImg: "../../images/new_6.jpg",
        src:"https://webfs.yun.kugou.com/202003262114/efb5617630e51c5355e4ad8493f7b5ce/G204/M04/14/15/rJQEAF54mXyARH7pADhZBi3y7ww709.mp3",
        song:"烟雨笑",
        singer:"SING女团",
        word:"00:00,SING女团 - 烟雨笑,00:01,作词：徐良,00:02,作曲：徐良,00:20,林慧：,00:21,十里烟雨灯花笑,00:23,江上渡客人窈窕,00:25,嘴边一直碎碎把你念叨,00:29,蒋申：,00:30,白衣素裹杨柳腰,00:32,风吹细雨沾红袍,00:34,惹得谁家姑娘莞尔一笑,00:37,林慧+秦瑜+许诗茵：,00:39,石板桥把你遇到,00:41,油纸伞撑开一角,00:43,掩面如回眸一笑,00:46,蒋申+吴瑶+边丽+陈丽：,00:48,渔灯如点点红袍,00:50,杨柳岸风华正茂,00:52,伊人她芳龄正好,00:55,合：,00:57,纵白马风流年少,00:59,水调声长歌未了,01:01,尘寰如风月静悄,01:05,夕阳花间留晚照,01:07,一厢情愿自难逃,01:09,又怎知世事难料,01:13,陈丽：,01:14,一抹闲愁江上待你来,01:16,秦瑜：,01:17,一树寒梅枝头待你开,01:18,蒋申+边丽：,01:19,千帆驶过了杨柳岸,01:20,许诗茵+吴瑶：,01:21,唯有伊人正中我下怀,01:22,秦瑜：,01:23,初见还顾得了自在,01:25,林慧+许诗茵：,01:26,再见已心潮了澎湃,01:27,秦瑜：,01:28,墨染尘世黑 愿为你留白,01:39,许诗茵：,01:40,十里烟雨灯花笑,01:41,江上渡客人窈窕,01:44,嘴边一直碎碎把你念叨,01:47,吴瑶：,01:48,白衣素裹杨柳腰,01:50,风吹细雨沾红袍,01:52,惹得谁家姑娘莞尔一笑,01:56,许诗茵+秦瑜+林慧：,01:58,石板桥把你遇到,02:00,油纸伞撑开一角,02:02,掩面如回眸一笑,02:04,吴瑶+蒋申+边丽+陈丽：,02:06,渔灯如点点红袍,02:08,杨柳岸风华正茂,02:11,伊人她芳龄正好,02:14,合：,02:15,纵白马风流年少,02:17,水调声长歌未了,02:19,尘寰如风月静悄,02:24,夕阳花间留晚照,02:26,一厢情愿自难逃,02:28,又怎知世事难料,02:51,合：,02:52,石板桥把你遇到,02:54,油纸伞撑开一角,02:56,掩面如回眸一笑,03:01,渔灯如点点红袍,03:03,杨柳岸风华正茂,03:05,伊人她芳龄正好,03:10,纵白马风流年少,03:12,水调声长歌未了,03:14,尘寰如风月静悄,03:18,夕阳花间留晚照,03:20,一厢情愿自难逃,03:23,又怎知世事难料,"
      },
];
let recom=[
	{
   		id:1,
        hotImg: "../../images/recom_1.jpg",
        src:"https://webfs.yun.kugou.com/202003251519/8e1c832995fd0d807fd7c3218cdb4aee/G160/M05/04/1B/4A0DAFzS1SiAYrJxAByeJiM6QNU565.mp3",
        song:"爱过你这件事",
        singer:"叶洛洛",
        word:"00:00,叶洛洛 - 爱过你这件事,00:01,纵使星光遥远难私有,00:07,远不过你目光尽头,00:13,我一直走却不敢回头,00:18,我知道你没在背后,00:23,余音：,00:24,空气寂寞呼吸都开不了口,00:30,无法整理的情绪散落四周,00:36,变成彼此旧朋友,00:39,陌生身份在你的从此以后,00:45,叶洛洛：,00:47,爱过你这件事,00:50,是我最幸运的事,00:53,你心里的位置,00:56,遥不可及的奢侈,00:59,背对着背与黑夜对峙,01:03,我们固执的相似,01:06,守护着各自的城池,01:11,余音：,01:12,爱过你这件事,01:14,是我最幸运的事,01:17,我心里的位置,01:20,空一寸为你坚持,01:23,如果回忆会慢慢消失,01:27,变成悲伤的故事,01:30,我们都在结尾走失,01:36,多理智,01:39,合：,01:43,我们都在结尾走失,01:48,多理智,"
      },
      {
   		id:2,
        hotImg: "../../images/recom_2.jpg",
        src:"https://webfs.yun.kugou.com/202003251518/8ec260a1986cb2161012481c4809694f/G050/M03/18/05/EpQEAFZySwWATxLNADTao4KGBwE145.mp3",
        song:"灵儿想叮当",
        singer:"SING女团",
        word:"00:00,SING女团 - 灵儿想叮当,00:01,作词：王燕冰,00:05,作曲：刘佳,00:24,怎么南瓜马车载着叮当绕过几里外,00:29,玻璃鞋还忘了带 灵儿笑了起来,00:34,忽然下起流星雨 还以为是故意安排,00:39,原来是电视转台,00:42,这画面太奇怪,00:44,他在身旁想耍赖,00:47,我却又气又无奈,00:50,手机刚好响起来,00:54,Merry Christmas to you,00:57,灵儿想叮当,00:59,Merry Christmas to you,01:02,梦还没做完,01:04,Merry Christmas to you,01:07,阳光爬进窗,01:09,Merry Christmas to you,01:13,暖暖的意外,01:16,Woo...Woo...Woo...,01:23,暖暖的意外,01:27,美梦没做完就醒来还是出门谈恋爱,01:32,虽然叮当在未来 梦总不按理出牌,01:37,一个两个三个四个无聊全都在自拍,01:42,路过几家店门口 闪过一个念头,01:47,就连叮当都想爱,01:49,每个灵儿在等待,01:52,我突然傻笑起来,01:56,Merry Christmas to you,01:59,灵儿想叮当,02:01,Merry Christmas to you,02:04,梦还没做完,02:06,Merry Christmas to you,02:09,阳光爬进窗,02:11,Merry Christmas to you,02:15,暖暖的意外 ,02:18,Woo...Woo...Woo...,02:26,暖暖的意外,02:27,Merry Christmas to you,02:30,灵儿想叮当,02:32,Merry Christmas to you,02:35,梦还没做完,02:37,Merry Christmas to you,02:40,阳光爬进窗,02:42,Merry Christmas to you,02:45,暖暖的意外 ,02:46,Merry Christmas to you,02:49,灵儿想叮当,02:51,Merry Christmas to you,02:54,梦总是相反,02:56,Merry Christmas to you,02:59,阳光爬进窗,03:01,Merry Christmas to you,03:05,暖暖的意外 ,03:08,Woo...Woo...Woo...,03:16,暖暖的意外,03:18,Woo...Woo...Woo...,03:26,暖暖的意外,"
      },
      {
   		id:3,
        hotImg: "../../images/recom_3.jpg",
        src:"https://webfs.yun.kugou.com/202003270126/0e1e849c452c0e94ad0e56753918da03/G089/M04/1E/15/-YYBAFihOZqARivEADSDb8OYb0E206.mp3",
        song:"99次我爱他",
        singer:"翘课迟到",
        word:"00:15,保加利亚玫瑰的精油,00:18,全滴在他刚才牵过我的手,00:22,横冲直撞我的心像一颗躲避球,00:26,谁懂爱停在手里多久,00:30,学问道理教课书都有,00:33,恋爱上上签到底哪里求,00:37,如果有教授我一定要努力修,00:41,丘比特呀快为我加油,00:45,多想拿起雷达到他心里,00:47,仔细调查,00:48,爱的正卡还有没有副卡,00:52,也想拿起扫把在他心里,00:55,洗洗刷刷,00:56,不专心的念头 yeah~ yeah~,00:59,都清除啦,01:00,九十九次我爱他,01:03,少了眼皮会乱眨,01:08,让他能心电感应我的想法,01:11,每天念着他的名字 yeah~ yeah~,01:14,一句不差,01:15,九十九次我爱他,01:18,少了头发会分岔,01:23,要他的想念每天准时打卡,01:26,爱像冰淇淋在嘴里溶化,01:43,学问道理教课书都有,01:46,恋爱上上签到底哪里求,01:50,如果有教授我一定要努力修,01:54,丘比特呀快为我加油,01:58,多想带着雷达到他梦里,02:00,仔细调查,02:01,爱的正卡还有没有副卡,02:05,也想拿起扫把在他心里,02:08,洗洗刷刷,02:09,不专心的念头 yeah~ yeah~,02:12,都清除啦,02:13,九十九次我爱他,02:16,少了眼皮会乱眨,02:21,让他能心电感应我的想法,02:24,每天念着他的名字 yeah~ yeah~,02:27,一句不差,02:28,九十九次我爱他,02:31,少了头发会分岔,02:36,让他的想念每天准时打卡,02:39,爱像冰淇淋在嘴里溶化,02:57,九十九次我爱他,03:00,少了眼皮会乱眨,03:04,让他能心电感应我的想法,03:07,每天念着他的名字 yeah~ yeah~,03:10,一句不差,03:11,九十九次我爱他,03:14,少了头发会分岔,03:19,让他的想念每天准时打卡,03:22,爱像冰淇淋在嘴里溶化,"
      },
       {
   		id:4,
        hotImg: "../../images/recom_4.jpg",
        src:"https://webfs.yun.kugou.com/202003262119/1ed4b9f665f6a89a05299619c75999dc/G003/M03/1C/19/Qw0DAFS1OOyAcZFSAD3gClgifR8543.mp3",
        song:"好久不见",
        singer:"陈奕迅",
        word:"00:00,陈奕迅 - 好久不见,00:02,作词：施立,00:03,作曲：陈小霞,00:04,编曲：C.Y.Kong、孙伟明、陈珀,00:15,我来到你的城市,00:22,走过你来时的路,00:28,想象着没我的日子,00:34,你是怎样的孤独,00:42,拿着你给的照片,00:48,熟悉的那一条街,00:54,只是没了你的画面,01:00,我们回不到那天,01:08,你会不会忽然地出现,01:15,在街角的咖啡店,01:21,我会带着笑脸挥手寒暄,01:27,和你坐着聊聊天,01:33,我多么想和你见一面,01:40,看看你最近改变,01:46,不再去说从前只是寒暄,01:53,对你说一句只是说一句,02:02,好久不见,02:20,拿着你给的照片,02:27,熟悉的那一条街,02:33,只是没了你的画面,02:39,我们回不到那天,02:46,你会不会忽然地出现,02:53,在街角的咖啡店,02:59,我会带着笑脸挥手寒暄,03:05,和你坐着聊聊天,03:11,我多么想和你见一面,03:18,看看你最近改变,03:24,不再去说从前只是寒暄,03:31,对你说一句只是说一句,03:40,好久不见,"
      },
      {
   		id:5,
        hotImg: "../../images/recom_5.jpg",
        src:"https://webfs.yun.kugou.com/202003262120/bbbd09566168b6487e8b54af22539854/G101/M06/19/11/RZQEAFjb2dSAKSs4AEDPyTMeLpM492.mp3",
        song:"第一次",
        singer:"光良",
        word:"00:00,光良 - 第一次,00:01,作词：张天成,00:02,作曲：光良,00:08,当你看着我,00:10,我没有开口已被你猜透,00:17,还是没把握,00:19,还是没有符合你的要求,00:26,是我自己想得太多,00:30,还是你也在闪躲,00:35,如果真的选择是我,00:39,我鼓起勇气去接受,00:43,不知不觉让视线开始闪烁,00:51,哦第一次我说爱你的时候,00:56,呼吸难过心不停地颤抖,01:00哦第一次我牵起你的双手,01:05失去方向不知该往哪儿走,01:10,那是一起相爱的理由,01:15,那是一起厮守,01:19,哦第一次吻你深深的酒窝,01:24,想要清醒却冲昏了头,01:28,哦第一次你躺在我的胸口,01:33,二十四小时没有分开过,01:38,那是第一次知道天长地久,01:58,是我自己想得太多,02:01,还是你也在闪躲,02:07,如果真的选择是我,02:10,我鼓起勇气去接受,02:14,不知不觉让视线开始闪烁,02:23,哦第一次我说爱你的时候,02:28,呼吸难过心不停地颤抖,02:32,哦第一次我牵起你的双手,02:37,失去方向不知该往哪儿走,02:42,那是一起相爱的理由,02:46,对我,02:52,感觉你属于我,02:56,感觉你的眼眸,03:02,第一次就决定绝不会错,03:09,哦第一次我说爱你的时候,03:14,呼吸难过心不停地颤抖,03:18,哦第一次我牵起你的双手,03:23,失去方向不知该往哪儿走,03:28,那是一起相爱的理由,03:33,那是一起厮守,03:36,哦第一次吻你深深的酒窝,03:41,想要清醒却冲昏了头,03:45,哦第一次你躺在我的胸口,03:50,二十四小时没有分开过,03:58,那是第一次知道天长地久,"
      },
       {
   		id:6,
        hotImg: "../../images/recom_6.jpg",
        src:"https://webfs.yun.kugou.com/202003251625/50537a5930b44e0a4b54a56c0d0d5b1e/G202/M04/16/01/aocBAF4lSmCAdzc8AD2vMSAzmk0779.mp3",
        song:"无羁",
        singer:"云天、光小仔",
        word:"00:38,闻笛声 独惆怅 云深夜未央,00:49,是与非 都过往 醒来了 怎能当梦一场,00:59,红尘中 毁誉得失如何去量,01:05,萧萧血热刀锋凉,01:09,山高水远,01:12,又闻琴响,01:15,陈情未绝 卧荻花月如霜,01:20,煮一壶生死悲欢 祭少年郎,01:26,明月依旧何来怅惘,01:31,不如潇潇洒洒 历遍风和浪,01:37,天涯一曲共悠扬,02:22,穿万水 过千山 路尽人茫茫,02:33,是与非 都过往 醒来了,02:39,就当它梦一场,02:43,红尘中 毁誉得失如何去量,02:49,萧萧血热刀锋凉,02:53,山高水远,02:56,又闻琴响,02:59,陈情未绝 笑世事多无常,03:04,煮一壶生死悲欢 祭少年郎,03:10,明月依旧何来怅惘,03:15,不如坦坦荡荡 历遍风和浪,03:21,天涯一曲共悠扬,03:26,煮一壶生死悲欢 祭少年郎,03:32,明月依旧何来怅惘,03:36,不如坦坦荡荡 历遍风和浪,03:42,天涯一曲共悠扬,03:49,天涯一曲共悠扬,"
      },
]
// 热门歌曲数据接口
// http://127.0.0.1:3000/goodsList
app.get("/songHot",(req,res)=>{
    res.json({code:200,hot});
})
// 新歌歌曲数据接口
app.get("/songNew",(req,res)=>{
    res.json({code:200,news});
})
app.get("/songRecom",(req,res)=>{
    res.json({code:200,recom});
})

// 通过id获取商品
// http://127.0.0.1:3000/goodsList/1
app.get("/goodsList/:id",(req,res)=>{
    let data = result.find(item=>item.id == req.params.id);
    res.json({code:200,result:data});
})


// 分类接口
app.get("/category",(req,res)=>{
    var result = [
        {
            id:0,
            iconUrl: "../../image/icon-fujin.png",
            iconText:"签到"
        },
        {
            id:1,
            iconUrl: "../../image/icon-fujin.png",
            iconText:"附近"
        },
        {
            id:2,
            iconUrl: "../../image/icon-fujin.png",
            iconText:"游展"
        },
        {
            id:3,
            iconUrl: "../../image/icon-fujin.png",
            iconText:"福利"
        },
        {
            id:4,
            iconUrl: "../../image/icon-fujin.png",
            iconText:"玩乐"
        },
        {
            id:5,
            iconUrl: "../../image/icon-fujin.png",
            iconText:"周边"
        },
        {
            id:6,
            iconUrl: "../../image/icon-fujin.png",
            iconText:"体育"
        },
        {
            id:7,
            iconUrl: "../../image/icon-fujin.png",
            iconText:"亲子"
        }
    ]
    res.json({code:200,result})
})






app.listen(3000,()=>{
    console.log("请访问:http://127.0.0.1:3000");
})