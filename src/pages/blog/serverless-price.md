---
templateKey: blog-post
title: 'Serverless: ¿Es tan barato como dicen?'
date: 2019-09-20T15:04:10.000Z
description: >-
  A no ser que estés operando a escala masiva, la tecnológia Serverless no solo es barata, sino que es casi gratis. En este articulo exponemos y calculamos costaría una solución así.
featuredpost: true
featuredimage: /img/cloud-computing-blog.png
tags:
  - serverless
---

>En resumen: A no ser que estés operando a escala masiva, Serverless no solo es barata, sino que es casi gratis.
Una de las principales razones para usar Serverless es el coste, si eso te preocupa deberías empezar hoy mismo con esta tecnología.

En una app Serverless solo se paga cuando la app se está ejecutando, lo cuál es genial. ¿Porqué pagar por una app todo el tiempo cuando puede pagar solo por el tiempo que se está ejecutando?

Seguramente en tu casa no dejes el agua corriendo. La cierras y abres cuando la necesitas. Pues hoy en día ya se puede hacer lo mismo con los servidores de una app.


Running faucet
La tecnología Serverless suena bien. Pero, ¿Cómo es de barata realmente?

A continuación vamos a desgranar su precio en detalle.

Cuando ves el precio de un servicio Serverless parece demasiado barato y piensas ¿Cómo pueden hacer dinero de esto siendo tan barato?. Por ejemplo el precio de las ejecuciones de Azure Functions te hace pagar por tres cosas:

Ejecuciones
Tiempo de Ejecución
Almacenamiento

Las ejecuciones son bastante fáciles de entender: Se trata de cuantas veces se ha ejecutado la función. Cuesta 20 centímos por millon de ejecuciones. Parece practicamente gratís, y además te regalan el primer millón de ejecuciones de forma gratuita.

Para ponerlo en pespectiva, tu función podría ejecutarse una vez al día y te costaría nada. Eso son 22 veces por minuto. Si ejecutas tu función una vez cada segundo eso sería 2.628.000 ejecuciones, osea ni siquiera 40 centimos.

Pero de las ejecuciones además hay que pagar el Tiempo de de ejecución.

Es basicamente pagar por cuantos recursos usa tu función mientras se está ejecutando. Esto se llama GB-s o "Gigabyte Segundo"

Aquí está como funciona: Cuando ejecutas una función, Azure calcula cuanta memoría usa redondeado hacia arriba al múltiplo de 128MB más cercano. Por eso si tu función usa solo 25MB de memoría, cuenta como 128MB. Además cacula cuanto tiempo se ha ejecutado y lo redondea al alza hasta los 100 milisegundos más cercanos.

Por lo tanto si tienes un simple "Hello World" en una función Serverless va a contar como 128MB cada vez que se ejecute. Para obtener el coste de ejecución tomamos el número total de ejecuciones y lo multiplicamos por cuanto tiempo le tomó a la función la ejecución. Para algo tan simple como el "Hello World" va a ser 100ms ya que es la menor cantidad posible.

Ahora asumiendo que tenemos una función que se ejecuta una vez cada segundo (arriba dijimos que eran 2.628.000 veces) y lo multiplicamos por los segundos que tarda la función en ejecutarse (100ms)

2.628.000 * 0,1 = 262.280

Ahora tenemos que tomar este número y multiplicarlo por la memoria que la función usa cada vez que se ejecuta, que ya hemos dicho que es 128MB o 0.125GB

262.800 * 0,125 = 32.850

Entonces el tiempo de ejecución mensual total es 32.850 GB-s. ¿Cuanto nos costaría?

Nada, ya que Azure te da los primeros 400.000 GB-s de forma gratuita.

En resumen, todas esas ejecuciones nos cuestan unos 40 centimos.

El almacenamiento es cuanto almacenamiento usa tu código. Si solo almacenas tú código, este coste es totalmente gratuito, ya que no hay coste hasta el primer GB. Si tu aplicación sigue creciendo y usa más y más almacenamiendo solo recuerda que este no es gratis, sino casi gratis.

#El coste real de una aplicación Serverless

Hemos visto y calculado que cuesta muy poco el hosting y la ejecución de este tipo de aplicaciones. Y hasta que alcanzan un tamaño considerable pagarás muy poco o nada, además esta tecnología es completamente escalable, siendo la tecnología perfecta para startups que están empezando o negocios establecidos que debido al bajo coste de estas soluciones podrían ahorrar bastante en sus gastos mensuales.

En definitiva, Serverless es una de las tecnologías más reseñables de los últimos tiempos y eso combinado a su escalabilidad infinita de manera autómatica y el hecho de no tener que que lidiar con servidores nunca más lo convierten en la apuesta ganadora de cualquier nuevo desarrollo tecnológico
