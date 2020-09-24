function generate_numeric_1(i) {
  var numsystem = generator.random_int() % 2;
  var numsystem_2 = generator.random_int() % 3;
  switch (numsystem) {
    default: {
      break;
    }
    case 0: {
      start_system = 10;
      end_system = systems[numsystem_2];
      break;
    }
    case 1: {
      start_system = systems[numsystem_2];
      end_system = 10;
      break;
    }
  }
  task = randRange(0, 2000).toString(start_system);
  answer = system_convert(task, start_system, end_system);
  var print =
    'Переведите число ' + task.toUpperCase() + (start_system + '').sub();
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
  printInTable('rightwindow', print, i, answer);
}

function generate_numeric_2(i) {
  var task_t = generator.random_int() % 3;
  switch (task_t) {
    case 0: {
      var x = randRange(0, 2000),
        y = randRange(0, 2000);
      var start_system_x = systems_full[generator.random_int() % 4];
      var systems_temp = [...systems_full];
      systems_temp.splice(systems_temp.indexOf(start_system_x), 1);
      var start_system_y = systems_temp[generator.random_int() % 3];
      var print =
        'Какое число больше, ' +
        system_convert(x, 10, start_system_x) +
        (start_system_x + '').sub() +
        ' или ' +
        system_convert(y, 10, start_system_y) +
        (start_system_y + '').sub() +
        '?';
      if (x > y) {
        answer =
          'Ответ: ' +
          system_convert(x, 10, start_system_x) +
          (start_system_x + '').sub() +
          '.';
      } else {
        if (x < y) {
          answer =
            'Ответ: ' +
            system_convert(y, 10, start_system_y) +
            (start_system_y + '').sub() +
            '.';
        } else {
          answer = 'Ответ: они равны.';
        }
      }
      break;
    }
    case 1: {
      var x = randRange(0, 2000),
        y = randRange(0, 2000);
      var prob = randSign();
      var print = 'Вычислите ';
      switch (prob) {
        case 1: {
          print +=
            system_convert(x, 10, 16) +
            (16 + '').sub() +
            ' + ' +
            system_convert(y, 10, 16) +
            (16 + '').sub();
          if (generator.random_int() % 2 == 0) {
            print +=
              '. Ответ представьте в шестнадцатеричной системе счисления.';
            answer = 'Ответ: ' + system_convert(x + y, 10, 16) + '16'.sub();
          } else {
            print += '. Ответ представьте в десятичной системе счисления.';
            answer = 'Ответ: ' + (x + y) + '10'.sub();
          }
          break;
        }
        case -1: {
          if (x < y) {
            [x, y] = [y, x];
          }
          print +=
            system_convert(x, 10, 16) +
            (16 + '').sub() +
            ' - ' +
            system_convert(y, 10, 16) +
            (16 + '').sub();
          if (generator.random_int() % 2 == 0) {
            print +=
              '. Ответ представьте в шестнадцатеричной системе счисления.';
            answer = 'Ответ: ' + system_convert(x - y, 10, 16) + '16'.sub();
          } else {
            print += '. Ответ представьте в десятичной системе счисления.';
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
      var print =
        'Переведите число ' +
        system_convert(task, 10, start_system) +
        (start_system + '').sub();
      switch (end_system) {
        case 2: {
          print += ' в двоичную систему счисления.';
          break;
        }
        case 8: {
          print += ' в восьмеричную систему счисления.';
          break;
        }
        case 16: {
          print += ' в шестнадцатеричную систему счисления.';
          break;
        }
      }
      answer =
        'Ответ: ' +
        system_convert(task, 10, end_system) +
        (end_system + '').sub();
      break;
    }
  }
  printInTable('rightwindow', print, i, answer);
}

function generate_numeric_3(i) {
  var prob = randSign();
  var x = randRange(0, 2000),
    y = randRange(0, 2000);
  var start_system_x = generator.random_int() % 3;
  start_system_x = systems[start_system_x];
  var systems_temp = [...systems];
  systems_temp.splice(systems_temp.indexOf(start_system_x), 1);
  var start_system_y = systems_temp[generator.random_int() % 2];
  systems_temp = [...systems_full];
  systems_temp.splice(systems_temp.indexOf(start_system_x), 1);
  systems_temp.splice(systems_temp.indexOf(start_system_y), 1);
  end_system = systems_temp[generator.random_int() % 2];
  var print = 'Вычислите ';
  switch (prob) {
    case 1: {
      answer = system_convert(x + y, 10, end_system);
      print +=
        system_convert(x, 10, start_system_x) +
        (start_system_x + '').sub() +
        ' + ' +
        system_convert(y, 10, start_system_y) +
        (start_system_y + '').sub();
      break;
    }
    case -1: {
      if (x < y) {
        [x, y] = [y, x];
      }
      answer = system_convert(x - y, 10, end_system);
      print +=
        system_convert(x, 10, start_system_x) +
        (start_system_x + '').sub() +
        ' - ' +
        system_convert(y, 10, start_system_y) +
        (start_system_y + '').sub();
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
  printInTable('rightwindow', print, i, answer);
}
