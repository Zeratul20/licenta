export const templateStyle = `
h1,h2,h3,h3,h5,p {
    margin: 0;
}

table tr td, table tr th {         page-break-inside: avoid;     } 

body {
    font-family: Arial, Helvetica, sans-serif;
}

section {
    page-break-inside: avoid;   
}

table {
    border-collapse: collapse;
    margin: 0px;
    width: 100%;
    font-size: small;
    text-align: end;
    border-bottom: 1px solid #000000;
    border-right: 1px solid #000000;
    overflow-x: scroll;
}

td, div {
    word-wrap: break-word;
    overflow-wrap: break-word;
    line-height: 1.2;
}

th,
td {
    display: table-cell;
    vertical-align: top;
    border: 1px solid #000000;
    padding: 5px;
    text-align: center;
}

td {
    border-bottom: none;
    border-right: none;
}

.content-table {
    font-size: small;
}

.content-table-head {
    font-size: small;
    width: 20%;
}

.header-container {
    display: flex;
    gap: 40px;
    width: 100%;
    page-break-after: auto;

}

.logo-container {
  margin-bottom: 20px;
}

.logo-container img {
    width: 294px;
}

.title-container {
    margin-bottom: 30px;
    text-align: center;
}

.title-container h2 {
    margin-bottom: 12px;
}

.subTitle-container {
    font-weight: 700;
    font-size: small;
    padding: 0px;
    margin-bottom: 10px;
}

.flex-wrapper {
    display: flex;
}

.header-section {
    font-weight: 700;
    font-size: 18px;
    margin-top: 20px;
    margin-bottom: 12px;
    line-height: 1.1;    
}

.subtitle {
    font-size: 14px;
    margin-bottom: 12px;
}

.page-wrapper {
    width: 650px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 500px;
    page-break-before: auto;
}

.no-border {
    border: none;
}

.text-center {
    text-align: center;
}

`