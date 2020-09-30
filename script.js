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
var content_raw = []

document.getElementById('generate').addEventListener('click', resetAndGen);

function resetAndGen() {
  document.getElementById('rightwindow').innerHTML = '';
  content_raw = []
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
    }
  }
}

function system_convert(dec, start_system, end_system) {
  return parseInt(dec, start_system).toString(end_system).toUpperCase();
}

function printInTable(divID, printText, i, answer) {
  var text = `
        <p style = "text-align: left"> Задание ${i + 1}:<p>
        
        <div id="generated${i}" style="margin-bottom: 5px;text-align: center;">${printText}</div>
        <div class="block">
        <br>
        <button class="hide" align="center" name="show">Ответ к заданию ${
          i + 1
        }: </button>
		<br>
    <div class="extremum-slide" style="display: none">
    <div class="answer" style="margin-bottom: 5px;  text-align: center;">${answer}</div>
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
        <button class="hide" align="center" name="show">Ответ к заданию ${
          i + 1
        }: </button>
		<br>
    <div class="extremum-slide" style="display: none">
    <div class="answer" style="margin-bottom: 5px;  text-align: center;">${answer}</div>
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



function savePDF() {
  var copy = JSON.parse(JSON.stringify(content_raw))
  var dd = {content:copy};
  pdfMake.createPdf(dd).download();
}

function create_test() {
  alert('Still in development!')
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
