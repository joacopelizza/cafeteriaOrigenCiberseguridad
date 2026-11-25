# Reflexiones — TP4 Ciberseguridad

En este documento compartimos lo que nos dejó revisar cada una de las fallas del inventario de `VULNERABILIDADES.md`. La idea es pensar qué podríamos hacer distinto en un proyecto real para evitar problemas parecidos.

## Reflexiones por falla

### VUL-01 · Inyección SQL en el login

Aprendimos que los datos del usuario no deben mezclarse con la consulta a la base. También vimos que las contraseñas se guardan protegidas con un algoritmo como bcrypt, nunca tal cual.

### VUL-02 · Inyección SQL en los filtros del catálogo

Los filtros de búsqueda también necesitan cuidado. Hay que enviarlos como datos y aceptar solo las opciones previstas, aunque parezcan entradas simples.

### VUL-03 · Inyección SQL en el filtro por mesa

El número de mesa debe tener el formato esperado y tratarse como un dato. Así evitamos que un texto ingresado en el filtro cambie lo que consulta la aplicación.

### VUL-04 · Inyección SQL en reportes

Los filtros de los reportes deben revisarse igual que cualquier otro dato. Además, como muestran información del negocio, solo las personas autorizadas deberían poder verlos.

### VUL-05 · XSS reflejado en el buscador

Lo que alguien escribe en el buscador debe aparecer como texto en la página. Si se agrega como HTML, podría interpretarse como código en vez de mostrarse como una búsqueda.

### VUL-06 · XSS reflejado en mensajes del servidor

Los mensajes de error no deberían repetir sin cuidado lo que escribió la persona. También importa cómo se muestran en la página: deben leerse como texto, no como instrucciones para el navegador.

### VUL-07 · XSS almacenado en las reseñas

Una reseña puede verla mucha gente, así que no alcanza con confiar en quien la escribió. Hay que revisar los datos al recibirlos y mostrarlos de forma segura cada vez que se consultan.

### VUL-08 · XSS de DOM en el panel

Los valores que llegan en la dirección de la página también pueden ser engañosos. Para mostrar títulos o mensajes del panel, conviene tratarlos como texto y aceptar solo las opciones que realmente se usan.

### VUL-09 · CSRF en formularios que cambian estado

Una página externa podría intentar enviar acciones usando la sesión abierta de otra persona. Por eso, las operaciones que cambian datos deben comprobar que la solicitud viene del sitio y lleva el token esperado.

### VUL-10 · Validación insuficiente en pedidos

Antes de guardar un pedido, el servidor debe revisar cantidades, mesa y productos, y calcular el precio por su cuenta. Las comprobaciones del navegador ayudan, pero no reemplazan las del servidor.

### VUL-11 · Validación insuficiente en reseñas

Poner límites a los campos de una reseña ayuda a evitar datos incompletos, fuera de rango o demasiado largos. Esas reglas tienen que comprobarse en el servidor, aunque haya controles en la página.

### VUL-12 · Subida de archivos sin restricciones

Al subir archivos, hay que aceptar solo los tipos que necesita la aplicación, limitar su tamaño y comprobar que el contenido sea realmente una imagen permitida. También es mejor asignar nombres nuevos y evitar que los archivos subidos puedan ejecutarse como contenido activo.

### VUL-13 · Contraseñas almacenadas en texto plano

Si alguien consigue acceso a la base de datos, guardar las contraseñas tal cual pondría en riesgo las cuentas. Aprendimos que se deben guardar protegidas y comprobarse sin revelar la contraseña original.

### VUL-14 · Falta de protección contra fuerza bruta

Muchos intentos seguidos de inicio de sesión pueden ser una señal de que alguien está probando claves al azar. Limitar los intentos y evitar mensajes que revelen si una cuenta existe ayuda a reducir ese riesgo.

### VUL-15 · Cookie de sesión sin atributos de seguridad

La cookie mantiene la sesión de una persona, así que hay que protegerla. `HttpOnly` y `SameSite` ayudan en el navegador; `Secure` hace que solo viaje por conexiones HTTPS.

### VUL-16 · Identificador de sesión predecible

Un identificador fácil de adivinar podría permitir que alguien use la sesión de otra persona. Por eso debe generarse al azar y no basarse en un contador o en información conocida.

### VUL-17 · Sesiones sin expiración

Una sesión olvidada no debería seguir activa para siempre. Ponerle una duración y retirar las sesiones vencidas reduce el tiempo en que alguien podría aprovechar una sesión abandonada.

### VUL-18 · Logout que no invalida la sesión en el servidor

Cerrar sesión tiene que avisarle también al servidor que esa sesión terminó. Borrar solo la cookie del navegador no alcanza si una copia de la sesión todavía funciona.

### VUL-19 · Enumeración de usuarios

Los errores de inicio de sesión no deberían indicar si falló el usuario o la contraseña. Dar una respuesta parecida en ambos casos evita ofrecer pistas sobre quién tiene una cuenta.

### VUL-20 · Falta de autorización en el panel

Ocultar una pestaña o un botón no impide que alguien intente llamar a la API directamente. El servidor debe revisar en cada operación quién está conectado y qué permisos tiene.

### VUL-21 · Escalada de privilegios al cambiar roles

Los permisos de una cuenta no pueden depender de lo que esa misma cuenta envíe desde la pantalla. El servidor debe comprobar quién puede cambiar roles y aceptar solo los roles definidos.

### VUL-22 · Inyección de comandos del sistema operativo

Si la aplicación necesita ejecutar una herramienta del sistema, no debe armar una instrucción mezclando texto recibido. Es más seguro validar los valores permitidos y pasar cada argumento por separado; si se puede evitar esa ejecución, mejor.

### VUL-23 · Exposición de secretos en el diagnóstico

Una pantalla de diagnóstico no debería mostrar contraseñas ni variables internas. Esa información solo debe estar disponible para quien realmente la necesita, y no en una respuesta pública.

### VUL-24 · Stack traces enviados al cliente

Los detalles técnicos de un error sirven para investigar, pero no hace falta mostrárselos a quien usa la aplicación. Se pueden guardar en los registros internos y responder con un mensaje sencillo.

## Reflexión final

Este trabajo nos hizo ver que una aplicación puede funcionar bien en una demostración y aun así tener problemas que no se notan a simple vista. También aprendimos que no alcanza con poner controles en la pantalla,el servidor tiene que revisar los datos y los permisos cada vez que recibe una solicitud.

Nos quedó claro que la seguridad se construye durante todo el desarrollo y se comprueba una y otra vez. No siempre es posible anticipar cada problema, pero revisar los casos con cuidado y probar tanto lo permitido como lo que debe rechazarse ayuda a encontrar fallas antes de que afecten a alguien.
