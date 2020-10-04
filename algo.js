var operations = ["+", "*", "^"];

function removeArrayItem(i, arr) {
  const index = arr.indexOf(i);
  if (index > -1) {
    arr.splice(index, 1);
  }
}

function traverse_alg(
  start,
  end,
  o1,
  o2,
  op1,
  op2,
  len,
  avail,
  include,
  avoid,
  include_flag
) {
  var count = 0;
  if (len > avail || start > end || (start == end && include_flag === 0)) {
    return 0;
  } else {
    if (start == end && include_flag == 1) {
      return 1;
    } else {
      if (start == include) {
        include_flag = 1;
      }
      if (o1 == "+") {
        if (start + op1 != avoid) {
          count += traverse_alg(
            start + op1,
            end,
            o1,
            o2,
            op1,
            op2,
            len + 1,
            avail,
            include,
            avoid,
            include_flag
          );
        }
      } else {
        if (start * op1 != avoid) {
          if (o1 == "*") {
            count += traverse_alg(
              start * op1,
              end,
              o1,
              o2,
              op1,
              op2,
              len + 1,
              avail,
              include,
              avoid,
              include_flag
            );
          }
        } else {
          if (start != 1) {
            if (Math.pow(start, 2) != avoid) {
              count += traverse_alg(
                Math.pow(start, 2),
                end,
                o1,
                o2,
                op1,
                op2,
                len + 1,
                avail,
                include,
                avoid,
                include_flag
              );
            }
          }
        }
      }
      if (o2 == "+") {
        if (start + op2 != avoid) {
          count += traverse_alg(
            start + op2,
            end,
            o1,
            o2,
            op1,
            op2,
            len + 1,
            avail,
            include,
            avoid,
            include_flag
          );
        }
      } else {
        if (start * op2 != avoid) {
          if (o2 == "*") {
            count += traverse_alg(
              start * op2,
              end,
              o1,
              o2,
              op1,
              op2,
              len + 1,
              avail,
              include,
              avoid,
              include_flag
            );
          }
        } else {
          if (start != 1) {
            if (Math.pow(start, 2) != avoid) {
              count += traverse_alg(
                Math.pow(start, 2),
                end,
                o1,
                o2,
                op1,
                op2,
                len + 1,
                avail,
                include,
                avoid,
                include_flag
              );
            }
          }
        }
      }
    }
  }
  return count;
}

function generate_algo_2(i) {
  var numbers = [1, 2, 3];
  var start = randRange(1, 6),
    end = randRange(20, 40),
    limit = randRange(4, 10);
  var op_text_1, op_text_2;
  var operation_2, operand_1, operand_2;
  var operation_1 = generator.random_int() % 3;
  var print = "У Исполнителя есть две команды:<br>";
  var temp_print = "У Исполнителя есть две команды:";
  if (operation_1 === 1 || operation_1 === 2) {
    operation_2 = 0;
    operand_2 = numbers[generator.random_int() % 3];
    op_text_2 = "Прибавь " + operand_2;
    if (operation_1 === 1) {
      operand_1 = numbers[generator.random_int() % 2 + 1];
      op_text_1 = "Умножь на " + operand_1;
    } else {
      operand_1 = 2;
      op_text_1 = "Возведи в квадрат";
    }
  } else {
    operation_2 = generator.random_int() % 2 + 1;
    operand_1 = numbers[generator.random_int() % 3];
    op_text_1 = "Прибавь " + operand_1;
    removeArrayItem(operand_1, numbers);
    if (operation_2 === 1) {
      operand_2 = generator.random_int() % 2 + 2;
      op_text_2 = "Умножь на " + operand_2;
    } else {
      operand_2 = 2;
      op_text_2 = "Возведи в квадрат";
    }
  }
  operation_1 = operations[operation_1];
  operation_2 = operations[operation_2];
  var ans = traverse_alg(
    start,
    end,
    operation_1,
    operation_2,
    operand_1,
    operand_2,
    0,
    limit + 1,
    start,
    -1,
    1
  );
  while (ans > 30 || ans == 0) {
    numbers = [1, 2, 3];
    var operation_1 = generator.random_int() % 3;
    print = "У Исполнителя есть две команды:<br>";
    temp_print = "У Исполнителя есть две команды:";
    if (operation_1 === 1 || operation_1 === 2) {
      operation_2 = 0;
      operand_2 = numbers[generator.random_int() % 3];
      op_text_2 = "Прибавь " + operand_2;
      if (operation_1 === 1) {
        operand_1 = numbers[generator.random_int() % 2 + 1];
        op_text_1 = "Умножь на " + operand_1;
      } else {
        operand_1 = 2;
        op_text_1 = "Возведи в квадрат";
      }
    } else {
      operation_2 = generator.random_int() % 2 + 1;
      operand_1 = numbers[generator.random_int() % 3];
      op_text_1 = "Прибавь " + operand_1;
      removeArrayItem(operand_1, numbers);
      if (operation_2 === 1) {
        operand_2 = generator.random_int() % 2 + 2;
        op_text_2 = "Умножь на " + operand_2;
      } else {
        operand_2 = 2;
        op_text_2 = "Возведи в квадрат";
      }
    }
    operation_1 = operations[operation_1];
    operation_2 = operations[operation_2];
    start = randRange(1, 6);
    end = randRange(20, 40);
    limit = randRange(4, 10);
    ans = traverse_alg(
      start,
      end,
      operation_1,
      operation_2,
      operand_1,
      operand_2,
      0,
      limit + 1,
      start,
      -1,
      1
    );
  }
  temp_print += `<div style="margin-left: 20px">1. ${op_text_1}.</div>`;
  temp_print += `<div style="margin-left: 20px">2. ${op_text_2}.</div>`;
  print += `<span style="display: inline-block; width: 2ch;">&#9;</span>1. ${op_text_1}. <br>
            <span style="display: inline-block; width: 2ch;">&#9;</span>2. ${op_text_2}. <br>`;
  print += `Сколько есть программ, преобразующих число ${start} в число ${end}, содержащих в себе не более ${limit} команд?`;
  temp_print += `<div>Сколько есть программ, преобразующих число ${start} в число ${end}, содержащих в себе не более ${limit} команд?`;
  content_raw.push({
    unbreakable: true,
    stack: [htmlToPdfmake(temp_print), htmlToPdfmake("<hr>")]
  });
  printInTable("rightwindow", print, i, ans);
}

function generate_algo_1(i) {
  var numbers = [1, 2, 3];
  var start = randRange(1, 6),
    end = randRange(20, 40);
  var op_text_1, op_text_2;
  var operation_2, operand_1, operand_2;
  var operation_1 = generator.random_int() % 3;
  var print = "У Исполнителя есть две команды:<br>";
  var temp_print = "У Исполнителя есть две команды:";
  if (operation_1 === 1 || operation_1 === 2) {
    operation_2 = 0;
    operand_2 = numbers[generator.random_int() % 3];
    op_text_2 = "Прибавь " + operand_2;
    if (operation_1 === 1) {
      operand_1 = numbers[generator.random_int() % 2 + 1];
      op_text_1 = "Умножь на " + operand_1;
    } else {
      operand_1 = 2;
      op_text_1 = "Возведи в квадрат";
    }
  } else {
    operation_2 = generator.random_int() % 2 + 1;
    operand_1 = numbers[generator.random_int() % 3];
    op_text_1 = "Прибавь " + operand_1;
    removeArrayItem(operand_1, numbers);
    if (operation_2 === 1) {
      operand_2 = generator.random_int() % 2 + 2;
      op_text_2 = "Умножь на " + operand_2;
    } else {
      operand_2 = 2;
      op_text_2 = "Возведи в квадрат";
    }
  }
  operation_1 = operations[operation_1];
  operation_2 = operations[operation_2];
  var ans = traverse_alg(
    start,
    end,
    operation_1,
    operation_2,
    operand_1,
    operand_2,
    0,
    99999
  );
  while (ans > 30 || ans == 0) {
    start = randRange(1, 6);
    end = randRange(20, 40);
    ans = traverse_alg(
      start,
      end,
      operation_1,
      operation_2,
      operand_1,
      operand_2,
      0,
      99999,
      start,
      -1,
      1
    );
  }
  temp_print += `<div style="margin-left: 20px">1. ${op_text_1}.</div>`;
  temp_print += `<div style="margin-left: 20px">2. ${op_text_2}.</div>`;
  
  print += `<span style="display: inline-block; width: 2ch;">&#9;</span>1. ${op_text_1}. <br>
            <span style="display: inline-block; width: 2ch;">&#9;</span>2. ${op_text_2}. <br>`;
  print += `Сколько есть программ, преобразующих число ${start} в число ${end}?`;
  temp_print += `<div>Сколько есть программ, преобразующих число ${start} в число ${end}?`;
  content_raw.push({
    unbreakable: true,
    stack: [htmlToPdfmake(temp_print), htmlToPdfmake("<hr>")]
  });
  printInTable("rightwindow", print, i, ans);
}

function generate_algo_3(i) {
  var numbers = [1, 2, 3];
  var start = randRange(1, 6),
    end = randRange(20, 40),
    include = randRange(start + 1, end - 1),
    exclude = randRange(start + 1, end - 1);
  var task = generator.random_int() % 3;
  var op_text_1, op_text_2;
  var operation_2, operand_1, operand_2;
  var operation_1 = generator.random_int() % 3;
  var print = "У Исполнителя есть две команды:<br>";
  var temp_print = "У Исполнителя есть две команды:";
  if (operation_1 === 1 || operation_1 === 2) {
    operation_2 = 0;
    operand_2 = numbers[generator.random_int() % 3];
    op_text_2 = "Прибавь " + operand_2;
    if (operation_1 === 1) {
      operand_1 = numbers[generator.random_int() % 2 + 1];
      op_text_1 = "Умножь на " + operand_1;
    } else {
      operand_1 = 2;
      op_text_1 = "Возведи в квадрат";
    }
  } else {
    operation_2 = generator.random_int() % 2 + 1;
    operand_1 = numbers[generator.random_int() % 3];
    op_text_1 = "Прибавь " + operand_1;
    removeArrayItem(operand_1, numbers);
    if (operation_2 === 1) {
      operand_2 = generator.random_int() % 2 + 2;
      op_text_2 = "Умножь на " + operand_2;
    } else {
      operand_2 = 2;
      op_text_2 = "Возведи в квадрат";
    }
  }
  operation_1 = operations[operation_1];
  operation_2 = operations[operation_2];
  var ans = traverse_alg(
    start,
    end,
    operation_1,
    operation_2,
    operand_1,
    operand_2,
    0,
    99999
  );
  while (ans === 0 || ans > 30) {
    start = randRange(1, 6);
    end = randRange(20, 40);
    include = randRange(start + 1, end - 1);
    exclude = randRange(start + 1, end - 1);
    ans = traverse_alg(
      start,
      end,
      operation_1,
      operation_2,
      operand_1,
      operand_2,
      0,
      99999,
      include,
      exclude,
      0
    );
  }
  temp_print += `<div style="margin-left: 20px">1. ${op_text_1}.</div>`;
  temp_print += `<div style="margin-left: 20px">2. ${op_text_2}.</div>`;
  
  print += `<span style="display: inline-block; width: 2ch;">&#9;</span>1. ${op_text_1}. <br>
            <span style="display: inline-block; width: 2ch;">&#9;</span>2. ${op_text_2}. <br>`;
  print += `Сколько есть программ, преобразующих число ${start} в число ${end}, содеращих в своей траектории число ${include} и не содержащих числа ${exclude}?`;
  temp_print += `<div>Сколько есть программ, преобразующих число ${start} в число ${end}, содеращих в своей траектории число ${include} и не содержащих числа ${exclude}?</div>`;
  content_raw.push({
    unbreakable: true,
    stack: [htmlToPdfmake(temp_print), htmlToPdfmake("<hr>")]
  });
  printInTable("rightwindow", print, i, ans);
}
