## CLIENT 셋팅

React 애플리케이션 생성 및 필수 패키지 설치:
```
npx create-react-app .
npm install react-bootstrap bootstrap
npm install react-router-dom
npm install axios
npm install http-proxy-middleware
npm install @emotion/css
npm install @emotion/react
npm install @emotion/styled
npm install sass
npm install firebase
npm install react-redux
npm install @reduxjs/toolkit

npm run build
```

README.md 파일 생성:
`echo "" > README.md`


## SERVER 셋팅

```
npm init -y
npm install express
npm install nodemon --save
npm install path --save
npm install mongoose --save
npm install multer --save
npm install --s aws-sdk@2.348.0
npm install multer-s3 --save
```

## 제적과정

- 기본 셋팅 components -> 
- redux : 리덕스(Redux)는 JavaScript 애플리케이션을 위한 상태 관리 라이브러리입니다. 주로 React와 함께 사용되며, 애플리케이션의 상태를 효율적으로 관리하고 예측 가능한 방식으로 상태 변경을 다룰 수 있도록 도와줍니다.
    - Context : 컨텍스트 (Context): React의 Context API를 사용하여 전역 상태를 관리할 수 있습니다. Context를 생성하고 해당 컨텍스트를 사용하는 컴포넌트들에서 데이터를 공유할 수 있습니다.
    - 외부 상태 관리 라이브러리: Context나 Redux Toolkit 외에도 MobX, Recoil, Zustand 등과 같은 외부 상태 관리 라이브러리를 사용할 수 있습니다. 이러한 라이브러리들은 강력한 상태 관리 기능을 제공하며, 복잡한 상태 로직을 효율적으로 다룰 수 있습니다.
  - firebase 사용(firebase.js 설치 index 동등경로)
  - 기본설정

- 로그인 및 이미지 저장과 관련된 AWS S3, Firebase, Naver Cloud Platform 서비스
- 로그인 보안관련(aws s3이미지 저장/ 용량절감 이미지 따로저장) firebase / 
- naver cloud(object storage /용량절감 이미지 따로저장)


## server 제작과정

- index.js [설정](https://expressjs.com/en/guide/routing.html)

- express : Node.js를 위한 웹 프레임워크로서, 서버 측 JavaScript 애플리케이션을 쉽게 만들고 구성할 수 있게 해주는 도구

- req요청, res받아옴

- port 5050으로 설정(잘받아 오는지 확인 )

- MONGODB 설정
  - NoSQL 데이터베이스, 유연한 스키마 (Schema), 비정형 데이터 처리, 빠른 속도와 성능, 풍부한 쿼리 언어
  - 읽기쓰기권한 active상태 확인(새로운 환경 셋팅)
  - 0,0,0,0 설정

- [Mongoose](https://mongoosejs.com/) : MongoDB와 Node.js JavaScript 런타임 환경 간의 연결을 생성하는 JavaScript 객체 지향 프로그래밍 라이브러리

  - `const mongoose = require('mongoose');`

- [CORS란? CORS를 해결해보자](https://bohyeon-n.github.io/deploy/web/cors.html)

  - [Proxying API Requests in Development](https://create-react-app.dev/docs/proxying-api-requests-in-development/)
  - `npm install http-proxy-middleware` 설치
  - setupProxy.js 파일 생성 및 설정(middleware)

- body-parser : Express.js 애플리케이션에서 클라이언트로부터 전송된 HTTP 요청의 본문(body)을 추출하는 데 사용되는 미들웨어

  - Express 4.16.0 버전 이후에는 express에 express.json()와 express.urlencoded() 메서드가 추가되어 별도의 body-parser 모듈을 설치하지 않고도 JSON 및 폼 데이터를 쉽게 처리할 수 있게 되었습니다.
  - `app.use(express.json())`; : Express 애플리케이션에서 JSON 형식의 요청 데이터를 파싱합니다. 즉, 클라이언트가 JSON 형식으로 데이터를 보낼 때, 이 미들웨어가 그 데이터를 파싱하여 JavaScript 객체로 변환합니다.
  - `app.use(express.urlencoded({ extended: true }));` :  URL-encoded 형식은 주로 HTML 폼에서 데이터를 전송할 때 사용됩니다. extended: true를 설정하면, 내장된 querystring 라이브러리 대신에 qs 라이브러리를 사용하여 파싱됩니다. extended: false로 설정하면 내장된 querystring 라이브러리를 사용합니다.

- mongoDB 객체파일(구조생성) : Model > Post.js 파일 생성 mongoose.Schema

- multer, multer s3


- 받아온 데이터를 mongoDB에 저장
  - ```javascript 
      const mongoose = require("mongoose");

      const postSchema = new mongoose.Schema({
          title: String,
          content: String,
      });

      const Post = mongoose.model("Post", postSchema);

      module.exports = { Post };
      ```

- 업로드 하기(db에 실제 form의 데이터)
- 업로드 글 넘버추가 작업
```javascript
app.post("/api/post/submit", (req, res) => {
    let temp = req.body;
    // 넘버 추가 작업
    Counter.findOne({ name: "counter" })
        .exec()
        .then((counter) => {
            temp.postNum = counter.postNum;

            const BlogPost = new Post(temp);

            BlogPost.save()
                .then(() => {
                    //번호를 1씩 증가
                    Counter.updateOne({ name: "counter" }, { $inc: { postNum: 1 } })
                        .then(() => {
                            res.status(200).json({ success: true });
                        })
                })
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ success: false });
        })
})
```
- detail page: 게시물 내용 불러오기
```javascript
app.post("/api/post/detail", (req, res) => {
    Post.findOne({ postNum: req.body.postNum })
        .exec()
        .then((doc) => {
            console.log(doc);
            res.status(200).json({ success: true, post: doc });
        })
        .catch((err) => {
            res.status(400).json({ success: false });
        })
})
```
- multor 설치 및 storage 설정
## client 제작과정

- StrictMode : React에서 제공하는 개발 모드에서의 보조 도구 `<React.StrictMode>` 배포 환경에서는 활성화되지 않기 때문에, 개발 중에만 도움이 됩니다.
- BrowserRouter : 라이브러리에서 제공하는 컴포넌트 중 하나로, HTML5의 History API를 사용하여 페이지를 새로고침하지 않고도 주소와 뷰를 업데이트할 수 있도록 도와줍니다.
  - Routes : 라우트 구성을 정의하는 컴포넌트 
  - Route : 특정 경로에 대한 라우팅을 처리하는데 사용되는 컴포넌트 
- client 파일을 server에 불러오려면 build를 해야함 + path설치 후 설정 
  - `const path = require("path");`
- axios : 설치 post방식으로 요청확인(.then.catch)
- emotion 라이브러리 설치, 셋팅(style)
  - `import { UploadDiv, UploadTitle } from '../style/Upload.js'` 임포트
 - react-redux 설치 redux toolkit 설치
    - Provider, store 셋팅 (index.js)

## 트래블 슈팅

- 클라이언트에서 text를 보내려는데 undefind 메세지 출력
  - body-parser : Express.js 애플리케이션에서 클라이언트로부터 전송된 HTTP 요청의 본문(body)을 추출하는 데 사용되는 미들웨어
  - Express 4.16.0 버전 이후에는 express에 express.json()와 express.urlencoded() 메서드가 추가되어 별도의 body-parser 모듈을 설치하지 않고도 JSON 및 폼 데이터를 쉽게 처리할 수 있게 되었습니다.
  - server index.js에 body-parser 미들웨어 사용설정
  - `app.use(express.json())`; : Express 애플리케이션에서 JSON 형식의 요청 데이터를 파싱합니다. 즉, 클라이언트가 JSON 형식으로 데이터를 보낼 때, 이 미들웨어가 그 데이터를 파싱하여 JavaScript 객체로 변환합니다.
  - `app.use(express.urlencoded({ extended: true }));` :  URL-encoded 형식은 주로 HTML 폼에서 데이터를 전송할 때 사용됩니다. extended: true를 설정하면, 내장된 querystring 라이브러리 대신에 qs 라이브러리를 사용하여 파싱됩니다. extended: false로 설정하면 내장된 querystring 라이브러리를 사용합니다.

```javascript
    let body = {
        text: "다시보낸다. 잘 받아라!"
    }
    axios
        .post('/api/test', body)
```





### pagkage.json

```json
{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "nodemon index.js" // 변경 `npm start`
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.2",
    "nodemon": "^3.0.1",
    "path": "^0.12.7"
  }
}
```

- express 설치

```javascript
const express = require("express");     //Express 모듈 가져오기
const app = express();                  //Express 애플리케이션 생성
const port = 5050;                      //서버 포트 지정

app.listen(port, () => {                //서버 리스닝 및 포트 출력
    console.log("running --> " + port)
})

app.get("/", (req, res) => {            //루트 경로에 대한 GET 요청 핸들링
    res.send("Hellow World")
})

app.get("/express", (req, res) => {     //express 경로에 get요청
    res.send("express")
});
```

- path 설정

```javascript
const path = require("path");
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"))
})
```

- Mongoose 설정

```javascript
// .connect('mongodb+srv://audgns722:audgns722@cluster0.8opalwl.mongodb.net/{dbname}?retryWrites=true&w=majority')
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test'); // db접속주소 계정 비밀번호
```

- server 상태 확인후 텍스트를 client에 전송

```javascript
app.post("/api/test", (req, res) => {
    console.log(req);
    res.status(200).json({ success: true, text: "안녕하세요!" })
});
```

- setupProxy.js 생성 및 설정(port번호 확인)

```javascript
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:5050',
            changeOrigin: true,
        })
    );
};

```

- server model.post.js -> index.js `const {Post} = require("./Model/post.js");`

- schema 생성(mongoose 테이블?)

  ```javascript
  const mongoose = require("mongoose");
  
  const postSchema = new mongoose.Schema({
      title: String,
      content: String,
  },{ collection: "posts"}); // collection : 이름
  
  const Post = mongoose.model("Post", postSchema);
  
  module.exports = { Post };
  
  app.post("/api/test", (req, res) => {
      const CommunityPost = new Post({title: "test", content : "테스트 글이다"});
      CommunityPost.save().then(()=> {
          res.status(200).json({ success: true });
      })
      console.log(req.body);
      
  })
  ```