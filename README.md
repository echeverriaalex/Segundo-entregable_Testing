- ¿Qué diferencias hay entre bases de datos no relacionales y relacionales?

Las bases de datos no relacionales son un sistema de almacenamiento de información que se caracteriza por no usar el lenguaje SQL para las consultas y demas, no trabajan con estructuras definidas, la información no se almacena en tablas sino a través de documentos, y la información tampoco se organiza en registros o campos, tienen una gran escalabilidad y están pensadas para la gestión de grandes volúmenes de datos. Por otro lado, a diferencia de las bases de datos relacionales no cumple con el estándar ACID de atomicidad, consistencia, aislamiento y durabilidad.
En las bases de datos relacionales la información se organiza de forma estructurada en tablas; en las no relacionales no es así.
Las bases de datos no relacionales se emplean sobre todo para almacenar datos no estructurados o semiestructurados.
La escalabilidad es mayor en una base de datos no relacional, y también están preparadas para soportar mayor volumen de datos.
Las bases de datos no relacionales o NoSQL también ofrecen una mayor flexibilidad y escalabilidad horizontal.
A diferencia de las relacionales, las bases de datos no relacionales todavía no disponen de un lenguaje estandarizado (SQL).
El soporte de la comunidad es mejor en el caso de las bases no relacionales.

- ¿Qué diferencias hay entre JWT y cookies, qué ventajas da cada uno?

    -La autenticación basada en cookies presenta un estado (es stateful).

Al iniciar sesión, luego que un usuario envía sus credenciales (y estas se validan), el servidor registra datos (con el fin de recordar que el usuario se ha identificado correctamente). Estos datos que se registran en el backend, en correspondencia con el identificador de sesión, es lo que se conoce como estado.
En el lado del cliente una cookie es creada para almacenar el identificador de sesión, mientras que los datos se almacenan en el servidor (y son llamados variables de sesión).

    -La autenticación basada en tokens carece de estado (es stateless).

El servidor ya no guarda información de qué usuarios están conectados o qué tokens se han emitido. Esto es así porque cada solicitud realizada al servidor va acompañada de un token, y el servidor verifica la autenticidad de la solicitud basándose únicamente en el token. JWT define un formato para los tokens, pero no nos ata a ningún mecanismo de persistencia de datos en el lado del cliente y tampoco a ninguna regla de cómo se debe transportar el token. Los tokens se envían generalmente como un Authorization header, con el valor Bearer {JWT}; pero pueden enviarse también en el cuerpo de una petición POST o incluso como un query parameter.


- ¿Para qué sirve el protocolo OAuth?

OAuth hoy en día permite la autorización segura mediante el uso de un API. En la actualidad se usa su versión OAuth 2.0, sus mejoras proporciona flujos de autorización para aplicaciones web, de escritorio y teléfonos móviles. Actualmente servicios como Google, Facebook, Azure Active Directory, Github solo admiten el protocolo OAuth 2.0 que es un framework de autorización, que lo que hace es permitir que las aplicaciones obtengan acceso limitado a las cuentas de usuario de algunos servicios mencionados anteriormente. Su funcionamiento es delegar el permiso de autenticación del usuario al servicio que gestiona dichas cuentas, de modo que es el propio servicio el que otorga acceso a las aplicaciones de terceros. En el protocolo OAuth se podría definir roles Cliente, Usuario y Servidor.