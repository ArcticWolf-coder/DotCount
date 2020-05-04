let a = 1;

const closure1 = function() {
  console.log(a);
  a = 2
}

a = 3;

const closure2 = function() {
  console.log(a);
}

closure1(); // 3
closure2(); //2