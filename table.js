var table_names = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];
var path_final = {};

function makeRandoms(amount, difficulty) {
  var randoms = [];
  for (var i = 0; i < 20; i++) {
    randoms.push(i + 1);
  }

  function removeArrayItem(i) {
    const index = randoms.indexOf(i);
    if (index > -1) {
      randoms.splice(index, 1);
    }
  }

  function makeRandom() {
    var rand = randoms[Math.floor(generator.random() * randoms.length)];
    removeArrayItem(rand);
    return rand;
  }

  var ans = [];
  for (var i = 0; i < amount; i++) {
    ans.push(makeRandom());
  }
  return ans;
}


function traverse(matrix, been, path, start, finish, size, path_names) {
  if (start == finish){
   path_names += table_names[start];
   path_final[path] = path_names;
   return path;
  }
  been[start] = 1;
  path_names += table_names[start];
  console.log(path_names)
  var minpath = 999;
  for (var i = 0; i < size; i++) {
    if (been[i] == 0 && matrix[start][i] != -1 && matrix[start][i] != 0) {
      var temp = traverse(
        matrix,
        JSON.parse(JSON.stringify(been)),
        path + matrix[start][i],
        i,
        finish,
        size,
        JSON.parse(JSON.stringify(path_names))
      );
      if (temp < minpath) {
        minpath = temp;
      }
    }
  }
  return minpath;
}


function removeClose(numbers, point, margin) {
  var index = 0;
  for (var i = 0; i <= margin; i++) {
    index = numbers.indexOf(point + i);
    if (index > -1) {
      numbers.splice(index, 1);
    }
    index = numbers.indexOf(point - i);
    if (index > -1) {
      numbers.splice(index, 1);
    }
  }
  return numbers;
}

function generate_table_1(amount, difficulty) {
  path_final = {};
  var size = 3 + difficulty;
  var arr = [];
  var randoms = makeRandoms(size * (size - 1) / 2);
  var count = 0;
  var numbers = [];
  for (var i = 0; i < size; i++) {
    numbers.push(i);
  }
  var start = numbers[generator.random_int() % numbers.length];
  numbers = removeClose(numbers, start, 0);
  var end = numbers[generator.random_int() % numbers.length];
  if (start > end) {
    [start, end] = [end, start];
  }
  var taskToPrint = `
    <p style = "text-align: left"> Задание ${amount + 1}:<p>
    Вычислите кратчайшее расстояние между пунктами ${table_names[start]} и ${
    table_names[end]
  }.
    `;
  printInDiv("rightwindow", taskToPrint);
  var goal = Math.max.apply(Math, randoms);
  removeClose(randoms, goal, 0);
  for (var i = 0; i < size; i++) {
    arr[i] = new Array(size);
  }
  for (var i = 0; i < size; i++) {
    for (var j = 0; j < size; j++) {
      if ((i == start && j == end) || (j == start && i == end)) {
        arr[i][j] = goal;
      } else {
        if (j > i) {
          arr[i][j] = randoms[count];
          count++;
        } else {
          if (j < i) {
            arr[i][j] = arr[j][i];
          } else {
            arr[i][j] = -1;
          }
        }
      }
    }
  }
  tbl = document.createElement("table");
  if (difficulty == 1) {
    tbl.style.width = "300px";
  } else {
    if (difficulty == 2) {
      tbl.style.width = "350px";
    } else {
      tbl.style.width = "400px";
    }
  }
  tbl.style.textAlign = "center";
  tbl.style.border = "1px solid black";
  tbl.style.borderCollapse = "collapse";
  for (var i = 0; i < size + 1; i++) {
    var tr = tbl.insertRow();
    for (var j = 0; j < size + 1; j++) {
      if (i == 0) {
        if (j == 0) {
          var td = tr.insertCell();
          td.appendChild(document.createTextNode(""));
          td.style.border = "1px solid black";
          td.width = "100px";
        } else {
          var td = tr.insertCell();
          td.appendChild(document.createTextNode(table_names[j - 1]));
          td.style.border = "1px solid black";
          td.width = "100px";
        }
      } else {
        if (j == 0) {
          var td = tr.insertCell();
          td.appendChild(document.createTextNode(table_names[i - 1]));
          td.style.border = "1px solid black";
          td.width = "100px";
        } else {
          var td = tr.insertCell();
          if (arr[i - 1][j - 1] == -1) {
            td.appendChild(document.createTextNode(""));
            td.style.border = "1px solid black";
            td.style.backgroundColor = "gray";
            td.width = "100px";
          } else {
            td.appendChild(document.createTextNode(arr[i - 1][j - 1]));
            td.style.border = "1px solid black";
            td.width = "100px";
          }
        }
      }
    }
  }

  var task = htmlToPdfmake(
    `
    <p style = "text-align: left"> Задание ${amount + 1}:</p>
    Вычислите кратчайшее расстояние между пунктами ${table_names[start]} и ${
      table_names[end]
    }.<br>
    ` +
      tbl.outerHTML +
      "<hr>"
  );

  var temp = [];
  for (var i = 0; i < (4 + difficulty) * (4 + difficulty); i++) {
    if (difficulty == 1) {
      temp.push("10%");
    } else {
      if (difficulty == 2) {
        temp.push("20%");
      } else {
        temp.push("40%");
      }
    }
  }
  task[3].table.widths = temp;
  content_raw.push({ unbreakable: true, stack: task });
  var ans = traverse(arr, new Array(size).fill(0), 0, start, end, size, '');
  printTables(
    "rightwindow",
    tbl,
    amount,
    ans,
    path_final[ans]
  );
}
