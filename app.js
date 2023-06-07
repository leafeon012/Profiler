const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const app = express();
const mysql = require("mysql");
const fs = require("fs");
const path = require("path");

// MySQL 연결을 설정합니다
//const connection = mysql.createConnection({
//  host: "localhost",
//  user: "root",
//  password: "Mia1020@",
//  database: "debug"
//});
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mia1020@",
  database: "debug",
});

// 초기 HTML 폼을 생성합니다
// 주소는 http://localhost:3000
app.get("/", (req, res) => {
  res.send(`
  <head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/samsunginternet/OneUI-Web/oui-css/oui.css">
>

    <style>
    body,
    ol,
    ul,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    th,
    td,
    dl,
    dd,
    form,
    fieldset,
    legend,
    input,
    textarea,
    i,
    select {
        margin: 0;
        padding: 0;
    }
    h1 {
      height: 100px;
    }
    
    h1 span {
      position: relative;
      top: 20px;
      display: inline-block;
      animation: bounce .3s ease infinite alternate;
  
      font-size: 80px;
      color: #FFF;
      text-shadow: 0 1px 0 #CCC,
                   0 2px 0 #CCC,
                   0 3px 0 #CCC,
                   0 4px 0 #CCC,
                   0 5px 0 #CCC,
                   0 6px 0 transparent,
                   0 7px 0 transparent,
                   0 8px 0 transparent,
                   0 9px 0 transparent,
                   0 10px 10px rgba(0, 0, 0, .4);
    }
    
    
    h1 span:nth-child(2) { animation-delay: .1s; }
    h1 span:nth-child(3) { animation-delay: .2s; }
    h1 span:nth-child(4) { animation-delay: .3s; }
    h1 span:nth-child(5) { animation-delay: .4s; }
    h1 span:nth-child(6) { animation-delay: .5s; }
    h1 span:nth-child(7) { animation-delay: .6s; }
    h1 span:nth-child(8) { animation-delay: .7s; }
    
    @keyframes bounce {
      100% {
        top: -20px;
        text-shadow: 0 1px 0 #CCC,
                     0 2px 0 #CCC,
                     0 3px 0 #CCC,
                     0 4px 0 #CCC,
                     0 5px 0 #CCC,
                     0 6px 0 #CCC,
                     0 7px 0 #CCC,
                     0 8px 0 #CCC,
                     0 9px 0 #CCC,
                     0 50px 25px rgba(0, 0, 0, .2);
      }
    }
    
    body {
      margin: 0;
      padding: 0;
      overflow: hidden;
        display: -webkit-box;
        display: -ms-flex-box;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.03);
    }
  html{
    width: 100%;  
    height: 100%;

    -webkit-font-smoothing: antialiased;
    display: flex;
    justify-content: center;
    align-items: center;
  }

    .snow {
      position: absolute;
      top: 0;
      left: 0;
      background: linear-gradient(transparent,rgba(#000, 0.5)),
        linear-gradient(to right,#224,#336,#224);
    }
    .container {
        -webkit-transition: all 600ms cubic-bezier(0.81,-0.12, 0.64, 0.99);
        transition: all 600ms cubic-bezier(0.81,-0.12, 0.64, 0.99);
    }
    
    .main-box {
        cursor: pointer;
        display: -webkit-box;
        display: -ms-flex-box;
        display: flex;
        -webkit-box-pack: start;
        -ms-flex-pack: start;
        justify-content: flex-start;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        width: 400px;
        height: 60px;
        background: #FFFFFF;
        -webkit-box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.25);
        box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.25);
        border-radius: 24px;
        padding: 40px;
        -webkit-transition: all 800ms cubic-bezier(0.82, -0.02, 0.4, 1.18);
        transition: all 800ms cubic-bezier(0.82, -0.02, 0.4, 1.18);
    }
    
    .box-content {
        width: 100%;
        display: -webkit-box;
        display: -ms-flex-box;
        display: flex;
        position: relative;
        /* flex-direction: row; */
        /* flex-wrap: nowrap; */
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }
    

    .text .title {
        font-family: sans-serif;
        font-style: normal;
        font-weight: bold;
        line-height: normal;
        font-size: 24px;
        color: #4F4F4F;
    }
    
    .text span {
        font-family: sans-serif;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        font-size: 20px;
        color: #4F4F4F;
    }
    
    .dots div {
        width: 6px;
        height: 6px;
        background: #4F8AFE;
        margin: 3px;
        border-radius: 100%;
        -webkit-border-radius: 100%;
        -moz-border-radius: 100%;
        -ms-border-radius: 100%;
        -o-border-radius: 100%;
    }
    
    .blue-bg {
        display: none;
        position: absolute;
        right: 400px;
        z-index: 1;
        width: 162.35px;
        height: 140px;
        background: #4F8AFE;
        -webkit-box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
        box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
        border-radius: 0 24px 24px 0;
        -webkit-border-radius: 0 24px 24px 0;
        -moz-border-radius: 0 24px 24px 0;
        -ms-border-radius: 0 24px 24px 0;
        -o-border-radius: 0 24px 24px 0;
    }
    
    .box-content::after {
        content: '';
        /*display: none;
        */
        opacity: 0;
        position: absolute;
        right: -60px;
        z-index: -1;
        width: 300px;
        height: 140px;
        background: #4F8AFE;
        border-radius: 0 24px 24px 0;
        -webkit-border-radius: 0 24px 24px 0;
        -moz-border-radius: 0 24px 24px 0;
        -ms-border-radius: 0 24px 24px 0;
        -o-border-radius: 0 24px 24px 0;
        -webkit-transition: all 700ms cubic-bezier(0.82, -0.02, 0.4, 1.18);
        transition: all 700ms cubic-bezier(0.82, -0.02, 0.4, 1.18);
    }
    
    .main-box:hover .box-content::after {
        opacity: 1;
        position: absolute;
        z-index: -1;
        -webkit-transform: translateX(120px);
        transform: translateX(120px);
    }
    
    .box-content::before {
        content: '';
        opacity: 0;
        position: absolute;
        right: -60px;
        /* z-index:1; */
        width: 162px;
        height: 140px;
        background: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTIiIGhlaWdodD0iNTciIHZpZXdCb3g9IjAgMCA5MiA1NyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE3Ljc2ODkgNTZINzMuNzcyM0M4My41ODYyIDU2IDkxLjU0NDggNDguMDQxMyA5MS41NDQ4IDM4LjIyNzZDOTEuNTQ0OCAyOS40NzM4IDg1LjIxNjQgMjIuMjE4MSA3Ni44ODQgMjAuNzQ0Qzc0LjYzMTMgMTQuMTQyNSA2OC4zOTEzIDkuMzg4MDcgNjEuMDI2NiA5LjM4ODA3QzU4LjQwMDUgOS4zODgwNyA1NS45MjcgMTAuMDEwNSA1My43MTQ0IDExLjA4NjZDNTAuMzEzMyA0LjUwNTI1IDQzLjQ1ODggMCAzNS41NDQyIDBDMjQuMjQ4OSAwIDE1LjA4OTggOS4xNTkzNSAxNS4wODk4IDIwLjQ1NDRDMTUuMDg5OCAyMC41MzA3IDE1LjEwMTggMjAuNjAzIDE1LjEwMTggMjAuNjc5M0M2LjU1Njg3IDIxLjk3MjIgNi4wNzE3OGUtMDYgMjkuMzI0NiA2LjA3MTc4ZS0wNiAzOC4yMzA3Qy0wLjAwODAyNDM3IDQ4LjA0NDUgNy45NTA2OCA1NS45OTkgMTcuNzY4MyA1NS45OTlMMTcuNzY4OSA1NloiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMjk0MjUgMC4yNDAzODcpIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K');
        background-repeat: no-repeat;
        background-position: 45px center;
        -webkit-transition: all 700ms cubic-bezier(0.82, -0.02, 0.4, 1.18);
        transition: all 700ms cubic-bezier(0.82, -0.02, 0.4, 1.18);
    }
    
    .main-box:hover .box-content::before {
        opacity: 1;
        position: absolute;
        /* z-index: 1; */
        -webkit-transform: translateX(120px) scale(.7);
        transform: translateX(120px) scale(.7);
    }
    
    .dots div {
        -webkit-transition: all 500ms cubic-bezier(0.65, 0.51, 0.37, 1.02);
        transition: all 500ms cubic-bezier(0.65, 0.51, 0.37, 1.02);
    }
    
    .main-box:hover .dots div:nth-child(1) {
        -webkit-transform: translateY(9px);
        transform: translateY(9px);
        /* transition: all 500ms cubic-bezier(0.65, 0.51, 0.37, 1.02); */
    }
    
    .main-box:hover .dots div:nth-child(2) {
        -webkit-transform: scale(3);
        transform: scale(3);
        /* transition: all 500ms cubic-bezier(0.65, 0.51, 0.37, 1.02); */
    }
    
    .main-box:hover .dots div:nth-child(3) {
        -webkit-transform: translateY(-9px);
        transform: translateY(-9px);
        /* transition: all 500ms cubic-bezier(0.65, 0.51, 0.37, 1.02); */
    }
    
    .container:hover {
        /* z-index: 2; */
        -webkit-transform: translateX(-75px);
                transform: translateX(-75px);
    }
    
    
    .dr {
    position: absolute;
      bottom: 16px; 
      right: 16px;
      width:100px;
    }
     
      form input::file-selector-button {
        display: none;
      }
      .space {
        width: 6px;
        height: auto;
        display: inline-block;
      }
      @font-face {
        font-family: 'ONE-Mobile-POP';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2105_2@1.0/ONE-Mobile-POP.woff') format('woff');
        font-weight: normal;
        font-style: normal;
      }
      body { font-family: 'ONE-Mobile-POP'; font-style:normal; font-weight:normal; }
      .font_patching { font-family: 'ONE-Mobile-POP'; font-style:normal; font-weight:normal; }
      :root {
        /*color palette*/
        --p-white: #FFFFFF;
        --white-col: 252,252,252;
        --white: rgb(var(--white-col));
        --black-col: 37, 37, 37;
        --black: rgb(var(--black-col));
        --d-grey: #737373;
        --dark-m-grey: #b6b6b6;
        --m-grey: #c4c4c4;
        --l-grey: #E6E6E6;
        --xl-grey-col: 242,242,242; /*#F2F2F2*/
        --xl-grey: rgb(var(--xl-grey-col));
        --orange: #C65306;
        --blue: #0865C3;
        --l-blue: #4297FF;
        --xl-blue: #AAD0F5;
        --red: #F01346;
        --green: #15B76C;
        --purple: #6446E6;
        --yellow: #FF9E01;
    
        /*main theme variables*/
        --text: var(--black);
        --text-secondary: var(--d-grey);
        --primary: var(--blue);
        --secondary: var();
        --active: var(--l-blue);
        --inactive: var(--xl-blue);
        --app-accent: var(--primary);
    
        /*backgrounds*/
        --background: var(--xl-grey);
        --control-background: var(--l-grey);
        --textual-background: var(--white);
        --surface-background: var(--white);
        --alt-surface-background: var(--d-grey);
        --frosted-opacity: 0.8;
        --frosted-blur-size: 0.5rem;
        --frosted-background-color: rgba(var(--xl-grey-col), var(--frosted-opacity));
    
        /*accents*/
        --error: var(--red);
        --confirmation: var(--green);
        --accent-badge: var(--orange);
    
        /*on top colors*/
        --on-primary: var(--p-white);
        --on-secondary: var();
        --on-active: var(--p-white);
        --on-background: var(--black);
        --on-alt-background: var(--p-white);
        --on-surface: var(--black);
        --on-error: var(--white);
        --on-confirmation: var(--white);
        --on-accent-badge: var(--p-white);
    
        /*borders*/
        --border-surface: var(--l-grey);
        --border-alt-surface: var(--l-grey);
        --border-control: var(--d-grey);
    
        /*misc*/
        --shadow-color: rgba(var(--black-col), 0.3);
     }
     h1 {
      position: fixed;
      margin-top: 101px;
      margin-left: 90px;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;

   }

    </style>
  </head>
  <body>
    <h1>
      <span>n</span>
      <span>o</span>
      <span>d</span>
      <span>e</span>
      <span>.</span>
      <span>j</span>
      <span>s</span>
      <span>!</span>
    </h1>


  <canvas id="canvas" class="snow"></canvas>
  <div class="container">
  <div class="main-box" style="width:520px">
    <div class="box-content">
      <div class="svg">
        <svg width="66" height="57" viewBox="0 0 66 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.70977 0H19.4194C20.2733 0 21.0742 0.402215 21.5857 1.08315L25.3821 6.14266C25.8937 6.82361 26.6946 7.22581 27.5484 7.22581H62.3226C63.8185 7.22581 65.0323 8.43956 65.0323 9.93548V53.2903C65.0323 54.7862 63.8185 56 62.3226 56H2.70968C1.21376 56 0 54.7862 0 53.2903V2.70968C0 1.21375 1.21385 0 2.70977 0Z"
                            transform="translate(0.0177612 0.740387)" fill="#4F8AFE" />
                    </svg>
      </div>
      <div class="text">
        <form action="/upload" enctype="multipart/form-data" method="post">
        <input class="oui-button font_patching" type="file" name="file" style="MARGIN-left: 10px; width: 250px">
        <div class="space"></div>
        <button class="oui-button font_patching" type="submit">업로드</button>
      </form>
      </div>
      <div class="dots">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>

  </div>

</div>
  </body>
  <script>
(function () {
   'use strict';
   
   var canvas,ctx;
   var points = [];
   var maxDist = 100;

   function init () {
      //Add on load scripts
      canvas = document.getElementById("canvas");
      ctx = canvas.getContext("2d");
      resizeCanvas();
      generatePoints(700);
      pointFun();
      setInterval(pointFun,25);
      window.addEventListener('resize', resizeCanvas, false);
   }
   //Particle constructor
   function point () {
      this.x = Math.random()*(canvas.width+maxDist)-(maxDist/2);
      this.y = Math.random()*(canvas.height+maxDist)-(maxDist/2);
      this.z = (Math.random()*0.5)+0.5;
      this.vx = ((Math.random()*2)-0.5)*this.z;
      this.vy = ((Math.random()*1.5)+1.5)*this.z;
      this.fill = "rgba(255,255,255,"+((0.5*Math.random())+0.5)+")";
      this.dia = ((Math.random()*2.5)+1.5)*this.z;
      points.push(this);
   }
   //Point generator
   function generatePoints (amount) {
      var temp;
      for (var i = 0; i < amount; i++) {
         temp = new point();
      };
      console.log(points);
   }
   //Point drawer
   function draw (obj) {
      ctx.beginPath();
      ctx.strokeStyle = "transparent";
      ctx.fillStyle = obj.fill;
      ctx.arc(obj.x,obj.y,obj.dia,0,2*Math.PI);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
   }
   //Updates point position values
   function update (obj) {
      obj.x += obj.vx;
      obj.y += obj.vy;
      if (obj.x > canvas.width+(maxDist/2)) {
         obj.x = -(maxDist/2);
      }
      else if (obj.xpos < -(maxDist/2)) {
         obj.x = canvas.width+(maxDist/2);
      }
      if (obj.y > canvas.height+(maxDist/2)) {
         obj.y = -(maxDist/2);
      }
      else if (obj.y < -(maxDist/2)) {
         obj.y = canvas.height+(maxDist/2);
      }
   }
   //
   function pointFun () {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < points.length; i++) {
         draw(points[i]);
         update(points[i]);
      };
   }

   function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      pointFun();
   }

   //Execute when DOM has loaded
   document.addEventListener('DOMContentLoaded',init,false);
})();
  </script>
  
  `);
});

// 파일 업로드 및 MySQL 테이블 삽입 처리
// your_table 테이블명은 원하는 대로 변경하면 됩니다
app.post("/upload", upload.single("file"), (req, res) => {
  fs.readFile(req.file.path, "utf8", (err, data) => {
    if (err) {
      res.status(500).send("파일을 읽어오는 도중 오류가 발생했습니다.");
      return;
    }

    const lines = data.split("\n");
    const tasks = lines[0].split("\t").map((task) => task.trim());
    const values = lines
      .slice(1)
      .filter((line) => line.trim() !== "")
      .map((line) => line.split("\t"));

    values.forEach((row) => {
      const core = row[0].trim();
      if (core === "") {
        return;
      }
      for (let i = 1; i < row.length; i++) {
        const task = tasks[i];
        if (row[i].trim() === "") {
          continue;
        }
        const value = parseInt(row[i]);

        const sql =
          "INSERT INTO your_table (core, task, value) VALUES (?, ?, ?)";
        connection.query(sql, [core, task, value], (err, result) => {
          if (err) throw err;
          console.log("삽입된 데이터: ", core, task, value);
        });
      }
    });

    // 파일 업로드가 완료되면 그래프가 보이는 페이지로 리다이렉트 합니다
    res.redirect("http://localhost:3000/index.html");
  });
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/data/:group/:id", (req, res) => {
  const { group, id } = req.params;
  let sql;

  if (group === "task") {
    sql = `
      SELECT core as label,
             MIN(value) as min,
             MAX(value) as max,
             AVG(value) as avg
      FROM your_table
      WHERE task = 'task${id}'
      GROUP BY core
    `;
  } else if (group === "core") {
    sql = `
      SELECT task as label,
             MIN(value) as min,
             MAX(value) as max,
             AVG(value) as avg
      FROM your_table
      WHERE core = 'core${id}'
      GROUP BY task
    `;
  } else {
    res.status(400).send("올바르지 못한 그룹 데이터입니다.");
    return;
  }

  connection.query(sql, (err, result) => {
    if (err) {
      res.status(500).send("데이터 쿼리 명령문 실행 도중 오류가 발생했습니다.");
      return;
    }

    res.json(result);
  });
});

// 서버 구동을 시작합니다 (여기서는 3000번 포트에서 열었습니다)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`서버가 ${PORT}번 포트에서 열렸습니다.`);
});
