//funcion donde se calcula el valor de y
const calcularValorY = (paramValorY) => {
  const array = [];
  for (let i = 0; i < paramValorY.length; i++) {
    y = 3 * paramValorY[i] + 2;
    array.push(y);
  }

  return array;
};

//funcion donde se crea el modelo
const funcionLineal = async (paramValor) => {
  const modelo = tf.sequential();
  modelo.add(
    tf.layers.dense({
      units: 1,
      inputShape: [1],
    })
  );

  modelo.compile({
    loss: "meanSquaredError",
    optimizer: "sgd",
  });

  const valoresX = [-1, 0, 1, 2, 3];

  const valorAproxY = calcularValorY(valoresX);

  console.log(valoresX);
  console.log(valorAproxY);

  const xs = tf.tensor2d(valoresX, [5, 1]);
  const ys = tf.tensor2d(valorAproxY, [5, 1]);

  await modelo.fit(xs, ys, {
    epochs: 450,
  });
  console.log(parseInt(paramValor));
  const result = modelo
    .predict(tf.tensor2d([parseInt(paramValor)], [1, 1]))
    .arraySync();
  return result[0][0];
};

//Evento que ejecuta su contenido luego de que se complete la carga de la página
window.addEventListener("DOMContentLoaded", (event) => {
  document.getElementById("divAlert").innerText =
    "Ahora puedes ingresar los valores";
  document.getElementById("divAlert").style.color = "green";

  document.getElementById("boton").addEventListener("click", (event) => {
    const valor = document.getElementById("valor");

    if (valor.value == "") {
      document.getElementById("divAlert").innerText = "debe ingresar un valor";
      document.getElementById("divAlert").style.color = "red";
      return;
    }

    const valorAproximado = funcionLineal(valor.value);

    console.log(
      valorAproximado.then((result) => {
        console.log(result);
        document.getElementById("divAlert").style.color = "green";
        document.getElementById(
          "divAlert"
        ).innerText = `El valor de 'y' tomando como referencia el valor de 'x' que ingreso seria: ${result}`;
      })
    );
  });
});
