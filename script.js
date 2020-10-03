var seed_iter = 0;
var key = 0;
var difficulty = 0;
const systems = [2, 8, 16];
const systems_full = [2, 8, 10, 16];
var task = 0;
var answer = '';
var start_system = 0;
var end_system = 0;
var generator = '';
var task_type = 0;
var content_raw = [];
var flag = 0;

document.getElementById('generate').addEventListener('click', resetAndGen);

function resetAndGen() {
  document.getElementById('rightwindow').innerHTML = '';
  flag = 1;
  content_raw = [];
  generate_problem();
}

function gen_key() {
  document.getElementById('input_key').value = Math.floor(
    Math.random() * Math.floor(2147483647)
  ).toString();
}

function randSign() {
  var res = Math.sign((generator.random_int() % 100) - 50);
  if (res !== 0) {
    return res;
  } else {
    return 1;
  }
}

function randRange(a, b) {
  return (generator.random_int() % (b - a + 1)) + a;
}

function generate_problem() {
  answer = '';
  print = '';
  difficulty = Number(document.getElementById('difficulty').value);
  key = Number(document.getElementById('input_key').value);
  generator = new MersenneTwister(key);
  task_type = Number(document.getElementById('task').value);
  amount = Number(document.getElementById('amount').value);
  for (var i = 0; i < amount; i++) {
    switch (task_type) {
      case 1: {
        switch (difficulty) {
          case 1: {
            generate_numeric_1(i);
            break;
          }
          case 2: {
            generate_numeric_2(i);
            break;
          }
          case 3: {
            generate_numeric_3(i);
            break;
          }
        }
        break;
      }
      case 2: {
        switch (difficulty) {
          case 1: {
            generate_table_1(i, difficulty);
            break;
          }
          case 2: {
            generate_table_1(i, difficulty);
            break;
          }
          case 3: {
            generate_table_1(i, difficulty);
            break;
          }
        }
        break;
      }
      case 3: {
        switch (difficulty) {
          case 1: {
            generate_algo_1(i);
            break;
          }
          case 2: {
            generate_algo_2(i);
            break;
          }
          case 3: {
            generate_algo_3(i);
            break;
          }
        }
        break;
      }
    }
  }
}

function system_convert(dec, start_system, end_system) {
  return parseInt(dec, start_system).toString(end_system).toUpperCase();
}

function printInTable(divID, printText, i, answer) {
  var text = `
        <p style = "text-align: left"> Задание ${i + 1}:<p>
        
        <div id="generated${i}" style="margin-bottom: 5px;text-align: left;">${printText}</div>
        <div class="block">
        <br>
        <button class="hide" style="float: left;" name="show">Ответ к заданию ${
          i + 1
        }: </button>
		<br><br>
    <div class="extremum-slide" style="display: none">
    <div class="answer" style="margin-bottom: 5px;  text-align: left;">Ответ: ${answer}.</div>
		</div>
    <hr>
    </div>`;
  document.getElementById(divID).innerHTML += text;
  $('button').click(function () {
    $(this).siblings('div').slideToggle('fast');
  });
}

function printTables(divID, printText, i, answer) {
  document.getElementById(divID).appendChild(printText);
  document.getElementById(divID).innerHTML += `
        <div class="block">
        <br>
        <button class="hide" style="float: left;" name="show">Ответ к заданию ${
          i + 1
        }: </button>
		<br><br>
    <div class="extremum-slide" style="display: none">
    <div class="answer" style="margin-bottom: 5px;  text-align: left;">Ответ: ${answer}.</div>
		</div>
    <hr>
    </div>`;
  $('button').click(function () {
    $(this).siblings('div').slideToggle('fast');
  });
}

document.getElementById('showall').addEventListener('click', showall);
document.getElementById('hideall').addEventListener('click', hideall);
document.getElementById('random').addEventListener('click', generate_random);
document.getElementById('test').addEventListener('click', create_test);
document.getElementById('pdf').addEventListener('click', savePDF);
document.getElementById('copy').addEventListener('click', copyThis);

function copyThis() {
  var dummy = document.createElement('textarea');
  document.body.appendChild(dummy);
  dummy.setAttribute("id", "dummy_id");
  dummy.value = document.getElementById('input_key').value;
  dummy.select();
  document.execCommand('copy');
  document.body.removeChild(dummy);
}

function savePDF() {
  if (flag == 1) {
    var copy = JSON.parse(JSON.stringify(content_raw));
    var dd = { content: copy };
    pdfMake.createPdf(dd).download();
  } else {
    alert('Сгенерируйте задание или создайте контрольную!');
  }
}

function create_test() {
  document.getElementById('rightwindow').innerHTML = `
  <header><h1>Выбор задач для контрольной</h1> </header>
    <div class="types">Количество вариантов: <input type="text" value="1" id="variants" class="task_amount" autocomplete="off" style="text-align:center;"></div><br>
    <div class="block1">
    Задачи про системы счисления:
    <input type="checkbox" id="check1"><br><br>
    <div class="test-slide-1" style="display: none">
    <div>
    Количество легких заданий: <input type="text" id="task-1-easy" class="task_amount" autocomplete="off" style="text-align:center;"><br><br>
    Количество средних заданий: <input type="text" id="task-1-medium" class="task_amount" autocomplete="off" style="text-align:center;"><br><br>
    Количество тяжелых заданий: <input type="text" id="task-1-hard" class="task_amount" autocomplete="off" style="text-align:center;"><br><br>
    </div>
    </div>
    </div>
    <div class="block2">
    Задачи про расстояние до пункта:
    <input type="checkbox" id="check2"><br><br>
    <div class="test-slide-2" style="display: none">
    <div>
    Количество легких заданий: <input type="text" id="task-2-easy" class="task_amount" autocomplete="off" style="text-align:center;"><br><br>
    Количество средних заданий: <input type="text" id="task-2-medium" class="task_amount" autocomplete="off" style="text-align:center;"><br><br>
    Количество тяжелых заданий: <input type="text" id="task-2-hard" class="task_amount" autocomplete="off" style="text-align:center;"><br><br>
    </div>
    </div>
    </div>
    <div class="block3">
    Задачи про TBD:
    <input type="checkbox" id="check3"><br><br>
    <div class="test-slide-3" style="display: none">
    <div>
    Количество легких заданий: <input type="text" id="task-3-easy" class="task_amount" autocomplete="off" style="text-align:center;"><br><br>
    Количество средних заданий: <input type="text" id="task-3-medium" class="task_amount" autocomplete="off" style="text-align:center;"><br><br>
    Количество тяжелых заданий: <input type="text" id="task-3-hard" class="task_amount" autocomplete="off" style="text-align:center;"><br><br>
    </div>
    </div>
    </div>
    <button class="test-ready" align="left" onclick="test_ready()">Далее</button>`;
  $('#check1').click(function () {
    $(this).siblings('div').slideToggle('fast');
  });
  $('#check2').click(function () {
    $(this).siblings('div').slideToggle('fast');
  });
  $('#check3').click(function () {
    $(this).siblings('div').slideToggle('fast');
  });
}

function test_ready() {
  var variants = document.getElementById('variants').value;
  var task_1_easy = document.getElementById('task-1-easy').value;
  var task_1_medium = document.getElementById('task-1-medium').value;
  var task_1_hard = document.getElementById('task-1-hard').value;
  var task_2_easy = document.getElementById('task-2-easy').value;
  var task_2_medium = document.getElementById('task-2-medium').value;
  var task_2_hard = document.getElementById('task-2-hard').value;
  var task_3_easy = document.getElementById('task-3-easy').value;
  var task_3_medium = document.getElementById('task-3-medium').value;
  var task_3_hard = document.getElementById('task-3-hard').value;
  key = Number(document.getElementById('input_key').value);
  generator = new MersenneTwister(key);
  flag = 1;
  content_raw = [];
  document.getElementById('rightwindow').innerHTML = '';
  for (var j = 0; j < variants; j++) {
    if (j == 0) {
      content_raw.push({
        text: 'Вариант ' + (j + 1),
        fontSize: 20,
        bold: true,
        margin: [0, 0, 0, 20],
      });
    } else {
      content_raw.push({
        text: 'Вариант ' + (j + 1),
        fontSize: 20,
        bold: true,
        pageBreak: 'before',
        margin: [0, 0, 0, 20],
      });
    }
    var count = 0;
    document.getElementById('rightwindow').innerHTML += `<h1>Вариант ${
      j + 1
    }</h1><hr>`;
    for (var i = 0; i < task_1_easy; i++) {
      generate_numeric_1(count);
      count++;
    }
    for (var i = 0; i < task_1_medium; i++) {
      generate_numeric_2(count);
      count++;
    }
    for (var i = 0; i < task_1_hard; i++) {
      generate_numeric_3(count);
      count++;
    }
    for (var i = 0; i < task_2_easy; i++) {
      generate_table_1(count, 1);
      count++;
    }
    for (var i = 0; i < task_2_medium; i++) {
      generate_table_1(count, 2);
      count++;
    }
    for (var i = 0; i < task_2_hard; i++) {
      generate_table_1(count, 3);
      count++;
    }
    document.getElementById('rightwindow').innerHTML += '<br>';
    //  for (var i = 0; i < task_1_easy; i++) {
    //    generate_numeric_1(count);
    //    count++;
    //  }
    //  for (var i = 0; i < task_1_easy; i++) {
    //    generate_numeric_1(count);
    //    count++;
    //  }
    // for (var i = 0; i < task_1_easy; i++) {
    //    generate_numeric_1(count);
    //    count++;
    //  }
  }
}

function generate_random() {
  document.getElementById('input_key').value = Math.floor(
    Math.random() * 2147483647
  );
}

function showall() {
  var buttons = document.getElementsByName('show');
  var divs = document.getElementsByClassName('answer');
  for (var i = 0; i < buttons.length; i++) {
    if ($(divs[i]).is(':hidden')) buttons[i].click();
  }
}

function hideall() {
  var buttons = document.getElementsByName('show');
  var divs = document.getElementsByClassName('answer');
  for (var i = 0; i < buttons.length; i++) {
    if ($(divs[i]).is(':visible')) buttons[i].click();
  }
}

function printInDiv(divID, print_text) {
  var div = document.getElementById(divID);
  div.innerHTML += print_text + '<br />';
}
