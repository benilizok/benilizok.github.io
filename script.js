const url = document.location.search;
let rowsNumber = Number(url.substring(url.indexOf('=')+1, url.indexOf('&')))+1;
let colsNumber = Number(url.substring(url.indexOf('&')+6))+1;
let table;
const arr_EN = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const functionOne = document.getElementById('card_1');
const functionTwo = document.getElementById('card_2');
const functionThree = document.getElementById('card_3');
const functionFour = document.getElementById('card_4');
const functionFive = document.getElementById('card_5');
const functionSix = document.getElementById('card_6');

const rgb = (num) => { //функция возвращает код ргб
  return Math.floor(Math.random() * num);
};

const getRandomInt = (min, max) => {//функция поиска рандомного числа между заданными
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

const createTable = (parent, cols, rows) => { //ф-я создания таблицы
  table = document.createElement('table');

  let tr = document.createElement('tr');
  for (let j = 0; j < colsNumber; j++) {
    let td = document.createElement('th');
    td.style.backgroundColor = "rgb(205, 205, 204)";
    if (j==0){
      td.innerHTML = '#';
    }else{
      td.innerHTML = arr_EN[j-1];
    }
    tr.appendChild(td);
  }
  table.appendChild(tr);


  for (let i=1; i< rowsNumber; i++){
    let tr = document.createElement('tr');
    for (let j=0; j<colsNumber; j++){
      let td = document.createElement('td');
      if (j==0) {
        td.innerHTML = i;
        td.style.backgroundColor = "rgba(205, 205, 204, 50%)";
      }else{
        let textArea = document.createElement('textarea');
        let btnSaveText = document.createElement('button');

        btnSaveText.classList.add("btn_save");

        btnSaveText.onclick = function (){
          let newText = btnSaveText.parentNode.firstChild.value;
          btnSaveText.parentNode.innerHTML = newText;
          btnSaveText.parentNode.removeChild('textarea');
          btnSaveText.parentNode.removeChild('button');
        }

        textArea.value = '';
        td.appendChild(textArea);
        td.appendChild(btnSaveText);
      }
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  parent.appendChild(table);
};

const logApplyOne = (event) => { //ф-я вызывает изменение границ таблицы
  event.preventDefault();
  changeBorders(functionOne.borderWidth.value, functionOne.borderStyle.value);
}

const logApplyTwo = (event) => { //ф-я вызывает изменение заголовка
  event.preventDefault();
  addTitle(functionTwo.tableName.value);
}

const logApplyThree = (event) => {// ф-я вызывает удаление ряда
  event.preventDefault();
  deleteOneRow(functionThree.row.value);
}

const logApplyFour = (event) => {// ф-я вызывает удаление колонки
  event.preventDefault();
  deleteOneCol(functionFour.col.value);
}

const logApplyFive = (event) => {// ф-я вызывает случайное изменение таблицы
  event.preventDefault();
  addSomeMagic();
}

const logApplySix = (event) => {//ф-я вызывает очистку таблицы
  event.preventDefault();
  cleanMyTable();
}

const changeBorders = (width, style) => { //ф-я изменяет границы таблицы, п.5
  table.style.border =`${width}px ${style} black`;
  td_arr = document.getElementsByTagName('td');
  for (let i = 0; i < td_arr.length; i++) {
    td_arr[i].style.border = `${width}px ${style} black`;
  }
  th_arr = document.getElementsByTagName('th');
  for (let i = 0; i < th_arr.length; i++) {
    th_arr[i].style.border = `${width}px ${style} black`;
  }
}

const addTitle = (title) => {//ф-я добавляет заголовок таблицы, п.6
  document.getElementById('tableTitle').innerHTML = title;
}

const deleteOneRow = (number) => {//ф-я удаляет строку, п.7
  if (number<rowsNumber) {
    table.deleteRow(number);
    rowsNumber=rowsNumber-1;
  }else{
    alert("Некорректное значение :(")
  }
}

const deleteOneCol = (letter) => {//ф-я удаляет столбец
  let number=0;

  $('table th').each( function(){
    if($(this).text()==letter){
      number = $(this).index();
    }else{

    }
  });

  if (number!=0) {
    $('table tr').find(`td:eq(${number}),th:eq(${number})`).remove();
    colsNumber=colsNumber-1;
  }else{
    alert("Некорректное значение :(")
  }
}

const addSomeMagic = () => {//ф-я "случайный выбор", п.8
  let luckyNumber = Math.floor(Math.random() * 1000);
  let randomRow =  getRandomInt(1, rowsNumber);
  let randomCol = getRandomInt(1, colsNumber);
  if ((luckyNumber%6)===3){
    table.rows[randomRow].cells[randomCol].innerHTML='';
    let textArea = document.createElement('textarea');
    let btnSaveText = document.createElement('button');
    btnSaveText.classList.add("btn_save");

      btnSaveText.onclick = function (){
        let newText = btnSaveText.parentNode.firstChild.value;
        btnSaveText.parentNode.innerHTML = newText;
        btnSaveText.parentNode.removeChild('textarea');
        btnSaveText.parentNode.removeChild('button');
      }

      textArea.value = '';
      table.rows[randomRow].cells[randomCol].appendChild(textArea);
      table.rows[randomRow].cells[randomCol].appendChild(btnSaveText);
  }else{
    let randomColorBg = 'rgb(' + rgb(255) + ',' + rgb(255) + ',' + rgb(255) + ')';
    let randomColorText = 'rgb(' + rgb(255) + ',' + rgb(255) + ',' + rgb(255) + ')';
    let randomTextSize = Math.floor(Math.random() * 10)+15;
    table.rows[randomRow].cells[randomCol].style.backgroundColor = randomColorBg;
    table.rows[randomRow].cells[randomCol].style.fontSize = `${randomTextSize}px`;
  }

}

const cleanMyTable = () =>{// ф-я очистки таблицы (замена всех ячеек на пустые формы)
  $('table td').each( function(){
    if ($(this).index()!=0){
    $(this).text('');
    let textArea = document.createElement('textarea');
    textArea.value = '';
    let btnSaveText = document.createElement('button');
    btnSaveText.classList.add("btn_save");

    btnSaveText.onclick = function (){
        let newText = btnSaveText.parentNode.firstChild.value;
        btnSaveText.parentNode.innerHTML = newText;
        btnSaveText.parentNode.removeChild('textarea');
        btnSaveText.parentNode.removeChild('button');
      }

    $(this).append(textArea);
    $(this).append(btnSaveText);
  }
  });
}



createTable(document.getElementById("myTable"), colsNumber, rowsNumber);
functionOne.addEventListener('submit', logApplyOne);
functionTwo.addEventListener('submit', logApplyTwo);
functionThree.addEventListener('submit', logApplyThree);
functionFour.addEventListener('submit', logApplyFour);
functionFive.addEventListener('submit', logApplyFive);
functionSix.addEventListener('submit', logApplySix);

