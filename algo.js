var operations = ['+', '*', '^'];

function removeArrayItem(i, arr) {
  const index = arr.indexOf(i);
  if (index > -1) {
    arr.splice(index, 1);
  }
}

function traverse_alg(start, end, o1, o2, op1, op2, len, avail) {
  var count = 0;
  if (len > avail || start > end) {
    return 0;
  } else {
    if (start == end) {
      return 1;
    } else {
      if (o1 == '+') {
        count += traverse_alg(
          start + op1,
          end,
          o1,
          o2,
          op1,
          op2,
          len + 1,
          avail
        );
      } else {
        if (o1 == '*') {
          count += traverse_alg(
            start * op1,
            end,
            o1,
            o2,
            op1,
            op2,
            len + 1,
            avail
          );
        } else {
          if (start != 1) {
            count += traverse_alg(
              Math.pow(start, 2),
              end,
              o1,
              o2,
              op1,
              op2,
              len + 1,
              avail
            );
          }
        }
      }
      if (o2 == '+') {
        count += traverse_alg(
          start + op2,
          end,
          o1,
          o2,
          op1,
          op2,
          len + 1,
          avail
        );
      } else {
        if (o2 == '*') {
          count += traverse_alg(
            start * op2,
            end,
            o1,
            o2,
            op1,
            op2,
            len + 1,
            avail
          );
        } else {
          if (start != 1) {
            count += traverse_alg(
              Math.pow(start, 2),
              end,
              o1,
              o2,
              op1,
              op2,
              len + 1,
              avail
            );
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
  var print = 'У Исполнителя есть две команды:<br>';
  if (operation_1 === 1 || operation_1 === 2) {
    operation_2 = 0;
    operand_2 = numbers[generator.random_int() % 3];
    op_text_2 = 'Прибавь ' + operand_2;
    if (operation_1 === 1) {
      operand_1 = numbers[(generator.random_int() % 2) + 1];
      op_text_1 = 'Умножь на ' + operand_1;
    } else {
      operand_1 = 2;
      op_text_1 = 'Возведи в квадрат';
    }
  } else {
    operation_2 = (generator.random_int() % 2) + 1;
    operand_1 = numbers[generator.random_int() % 3];
    op_text_1 = 'Прибавь ' + operand_1;
    removeArrayItem(operand_1, numbers);
    if (operation_2 === 1) {
      operand_2 = (generator.random_int() % 2) + 2;
      op_text_2 = 'Умножь на ' + operand_2;
    } else {
      operand_2 = 2;
      op_text_2 = 'Возведи в квадрат';
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
    limit + 1
  );
  while ((ans < 2) || ans > 10) {
    (start = randRange(1, 6)), (end = randRange(20, 40), (limit = randRange(4, 10)));
    ans = traverse_alg(
      start,
      end,
      operation_1,
      operation_2,
      operand_1,
      operand_2,
      0,
      limit + 1
    );
  }
  print += `<span style="display: inline-block; width: 2ch;">&#9;</span>1. ${op_text_1}. <br>
            <span style="display: inline-block; width: 2ch;">&#9;</span>2. ${op_text_2}. <br>`;
  print += `Сколько есть программ, преобразующих число ${start} в число ${end}, содержащих в себе не более ${limit} команд?`;
  content_raw.push({
    unbreakable: true,
    stack: [htmlToPdfmake(print), htmlToPdfmake('<hr>')],
  });
  printInTable('rightwindow', print, i, ans);
}


function generate_algo_1(i) {
  var numbers = [1, 2, 3];
  var start = randRange(1, 6),
    end = randRange(20, 40);
  var op_text_1, op_text_2;
  var operation_2, operand_1, operand_2;
  var operation_1 = generator.random_int() % 3;
  var print = 'У Исполнителя есть две команды:<br>';
  if (operation_1 === 1 || operation_1 === 2) {
    operation_2 = 0;
    operand_2 = numbers[generator.random_int() % 3];
    op_text_2 = 'Прибавь ' + operand_2;
    if (operation_1 === 1) {
      operand_1 = numbers[(generator.random_int() % 2) + 1];
      op_text_1 = 'Умножь на ' + operand_1;
    } else {
      operand_1 = 2;
      op_text_1 = 'Возведи в квадрат';
    }
  } else {
    operation_2 = (generator.random_int() % 2) + 1;
    operand_1 = numbers[generator.random_int() % 3];
    op_text_1 = 'Прибавь ' + operand_1;
    removeArrayItem(operand_1, numbers);
    if (operation_2 === 1) {
      operand_2 = (generator.random_int() % 2) + 2;
      op_text_2 = 'Умножь на ' + operand_2;
    } else {
      operand_2 = 2;
      op_text_2 = 'Возведи в квадрат';
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
  while ((ans == 0) || ans > 10) {
    (start = randRange(1, 6)), (end = randRange(20, 40));
    ans = traverse_alg(
      start,
      end,
      operation_1,
      operation_2,
      operand_1,
      operand_2,
      0,
      99999
    );
  }
  print += `<span style="display: inline-block; width: 2ch;">&#9;</span>1. ${op_text_1}. <br>
            <span style="display: inline-block; width: 2ch;">&#9;</span>2. ${op_text_2}. <br>`;
  print += `Сколько есть программ, преобразующих число ${start} в число ${end}?`;
  content_raw.push({
    unbreakable: true,
    stack: [htmlToPdfmake(print), htmlToPdfmake('<hr>')],
  });
  printInTable('rightwindow', print, i, ans);
}

function generate_algo_3(i) {
  var numbers = [1, 2, 3];
  var start = randRange(1, 6),
    end = randRange(20, 40),
    include = randRange(start, end),
    exclude = randRange(start, end);
  var task = generator.random_int() % 3;
  var op_text_1, op_text_2;
  var operation_2, operand_1, operand_2;
  var operation_1 = generator.random_int() % 3;
  var print = 'У Исполнителя есть две команды:<br>';
  if (operation_1 === 1 || operation_1 === 2) {
    operation_2 = 0;
    operand_2 = numbers[generator.random_int() % 3];
    op_text_2 = 'Прибавь ' + operand_2;
    if (operation_1 === 1) {
      operand_1 = numbers[(generator.random_int() % 2) + 1];
      op_text_1 = 'Умножь на ' + operand_1;
    } else {
      operand_1 = 2;
      op_text_1 = 'Возведи в квадрат';
    }
  } else {
    operation_2 = (generator.random_int() % 2) + 1;
    operand_1 = numbers[generator.random_int() % 3];
    op_text_1 = 'Прибавь ' + operand_1;
    removeArrayItem(operand_1, numbers);
    if (operation_2 === 1) {
      operand_2 = (generator.random_int() % 2) + 2;
      op_text_2 = 'Умножь на ' + operand_2;
    } else {
      operand_2 = 2;
      op_text_2 = 'Возведи в квадрат';
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
  while ((ans == 0) || ans > 10) {
    (start = randRange(1, 6)), (end = randRange(20, 40));
    ans = traverse_alg(
      start,
      end,
      operation_1,
      operation_2,
      operand_1,
      operand_2,
      0,
      99999
    );
  }
  print += `<span style="display: inline-block; width: 2ch;">&#9;</span>1. ${op_text_1}. <br>
            <span style="display: inline-block; width: 2ch;">&#9;</span>2. ${op_text_2}. <br>`;
  print += `Сколько есть программ, преобразующих число ${start} в число ${end}?`;
  content_raw.push({
    unbreakable: true,
    stack: [htmlToPdfmake(print), htmlToPdfmake('<hr>')],
  });
  printInTable('rightwindow', print, i, ans);
}