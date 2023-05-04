const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const app = express();
const mysql = require("mysql");
const fs = require("fs");
const path = require("path");

// MySQL 연결을 설정합니다
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "MySQL DB의 패스워드",
  database: "debug"
});

// 초기 HTML 폼을 생성합니다
// 주소는 http://localhost:3000
app.get("/", (req, res) => {
  res.send(`
  <head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/samsunginternet/OneUI-Web/oui-css/oui.css">
    <style>
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
    </style>
  </head>
  <body>
  <h1 style="MARGIN-left: 10px;">Node.js</h1>
    <form action="/upload" enctype="multipart/form-data" method="post">
      <input class="oui-button font_patching" type="file" name="file" style="MARGIN-left: 10px;">
      <div class="space"></div>
      <button class="oui-button font_patching" type="submit">업로드</button>
    </form>
  </body>
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
    const tasks = lines[0].split("\t").map(task => task.trim());
    const values = lines.slice(1).filter(line => line.trim() !== "").map(line => line.split("\t"));

    values.forEach(row => {
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
    
        const sql = "INSERT INTO your_table (core, task, value) VALUES (?, ?, ?)";
        connection.query(sql, [core, task, value], (err, result) => {
          if (err) throw err;
          console.log("삽입된 데이터: ", core, task, value);
        });
      }
    });     

    // 파일 업로드가 완료되면 그래프가 보이는 페이지로 리다이렉트 합니다
    res.redirect('http://localhost:3000/index.html');
    
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