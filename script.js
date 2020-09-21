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

window.onload = function () {
  var modal = document.getElementById("modalansw");

  var btn = document.getElementById("gen_task");

  var span = document.getElementsByClassName("close")[0];

  btn.onclick = function () {
    print_in_div("modalans", '');
    modal.style.display = "block";
    generate_problem();
  }

  span.onclick = function () {
    modal.style.display = "none";
  }

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

};



function gen_key() {
  document.getElementById("input_key").value = (Math.floor(Math.random() * Math.floor(2147483647))).toString();
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
  switch (difficulty) {
    case 1: {
      generate_numeric_1();
      break;
    }
    case 2: {
      generate_numeric_2();
      break;
    }
    case 3: {
      generate_numeric_3();
      break;
    }
  }
}

function system_convert(dec, start_system, end_system) {
  return parseInt(dec, start_system).toString(end_system).toUpperCase();
}

function generate_numeric_1() {
  var numsystem = generator.random_int() % 2;
  var numsystem_2 = generator.random_int() % 3;
  switch (numsystem) {
    case 0: {
      start_system = 10;
      end_system = systems[numsystem_2];
    }
    case 1: {
      start_system = systems[numsystem_2];
      end_system = 10;
    }
  }
  task = randRange(0, 2000).toString(start_system);
  answer = system_convert(task, start_system, end_system);
  var print = 'Переведите число ' + task.toUpperCase() + (start_system + '').sub();
  switch (end_system) {
    case 2: {
      print += ' в двоичную систему.';
      break;
    }
    case 8: {
      print += ' в восьмеричную систему.';
      break;
    }
    case 10: {
      print += ' в десятичную систему.';
      break;
    }
    case 16: {
      print += ' в шестнадцатеричную систему.';
      break;
    }
  }
  answer = 'Ответ: ' + answer + (end_system + '').sub() + '.';
  print_in_div('modalcnt', print);
}

function generate_numeric_2() {
  task_type = generator.random_int() % 3;
  switch (task_type) {
    case 0: {
      var x = randRange(0, 2000), y = randRange(0, 2000);
      var start_system_x = systems_full[generator.random_int() % 4];
      var systems_temp = [...systems_full];
      systems_temp.splice(systems_temp.indexOf(start_system_x), 1);
      var start_system_y = systems_temp[generator.random_int() % 3];
      var print = 'Какое число больше, ' + system_convert(x, 10, start_system_x) + (start_system_x + '').sub() +
        ' или ' + system_convert(y, 10, start_system_y) + (start_system_y + '').sub() + '?'
      if (x > y) {
        answer = 'Ответ: ' + system_convert(x, 10, start_system_x) + (start_system_x + '').sub() + '.';
      }
      else {
        if (x < y) {
          answer = 'Ответ: ' + system_convert(y, 10, start_system_y) + (start_system_y + '').sub() + '.';
        }
        else {
          answer = 'Ответ: они равны.'
        }
      }
      break;
    }
    case 1: {
      var x = randRange(0, 2000), y = randRange(0, 2000);
      var prob = randSign();
      var print = 'Вычислите '
      switch (prob) {
        case 1: {
          print += system_convert(x, 10, 16) + (16 + '').sub() + ' + ' + system_convert(y, 10, 16) + (16 + '').sub();
          if (generator.random_int() % 2 == 0) {
            print += '. Ответ представьте в шестнадцатеричной системе счисления.'
            answer = 'Ответ: ' + system_convert(x + y, 10, 16) + '16'.sub();
          }
          else {
            print += '. Ответ представьте в десятичной системе счисления.'
            answer = 'Ответ: ' + (x + y) + '10'.sub();
          }
          break;
        }
        case -1: {
          if (x < y) {
            [x, y] = [y, x];
          }
          print += system_convert(x, 10, 16) + (16 + '').sub() + ' - ' + system_convert(y, 10, 16) + (16 + '').sub();
          if (generator.random_int() % 2 == 0) {
            print += '. Ответ представьте в шестнадцатеричной системе счисления.'
            answer = 'Ответ: ' + system_convert(x - y, 10, 16) + '16'.sub();
          }
          else {
            print += '. Ответ представьте в десятичной системе счисления.'
            answer = 'Ответ: ' + (x - y) + '10'.sub();
          }
          break;
        }
      }
      break;
    }
    case 2: {
      var start_system = systems[generator.random_int() % 3];
      var systems_temp = [...systems];
      systems_temp.splice(systems_temp.indexOf(start_system), 1);
      var end_system = systems_temp[generator.random_int() % 2];
      task = randRange(0, 2000);
      var print = 'Переведите число ' + system_convert(task, 10, start_system) + (start_system + '').sub();
      switch (end_system) {
        case (2): {
          print += ' в двоичную систему счисления.';
          break;
        }
        case (8): {
          print += ' в восьмеричную систему счисления.';
          break;
        }
        case (16): {
          print += ' в шестнадцатеричную систему счисления.';
          break;
        }
      }
      answer = 'Ответ: ' + system_convert(task, 10, end_system) + (end_system + '').sub();
      break;
    }
  }
  print_in_div('modalcnt', print);
}

function generate_numeric_3() {
  var prob = randSign();
  var x = randRange(0, 2000), y = randRange(0, 2000);
  var start_system_x = generator.random_int() % 3;
  start_system_x = systems[start_system_x];
  var systems_temp = [...systems];
  systems_temp.splice(systems_temp.indexOf(start_system_x), 1);
  var start_system_y = systems_temp[generator.random_int() % 2];
  end_system = systems_full[generator.random_int() % 4];
  var print = 'Вычислите ';
  switch (prob) {
    case 1: {
      answer = system_convert(x + y, 10, end_system);
      print += system_convert(x, 10, start_system_x) + (start_system_x + '').sub() + ' + ' + system_convert(y, 10, start_system_y) + (start_system_y + '').sub();
      break;
    }
    case -1: {
      if (x < y) {
        [x, y] = [y, x];
      }
      answer = system_convert(x - y, 10, end_system);
      print += system_convert(x, 10, start_system_x) + (start_system_x + '').sub() + ' - ' + system_convert(y, 10, start_system_y) + (start_system_y + '').sub();
      break;
    }
  }
  print += '. Ответ представьте';
  switch (end_system) {
    case 2: {
      print += ' в двоичной системе.';
      break;
    }
    case 8: {
      print += ' в восьмеричной системе.';
      break;
    }
    case 10: {
      print += ' в десятичной системе.';
      break;
    }
    case 16: {
      print += ' в шестнадцатеричной системе.';
      break;
    }
  }
  answer = 'Ответ: ' + answer + (end_system + '').sub() + '.';
  print_in_div('modalcnt', print);
}

function show_answer() {
  print_in_div('modalans', answer);
}

function print_in_div(divID, print_text) {
  var div = document.getElementById(divID);
  div.innerHTML = print_text;
  MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'result']);
}

