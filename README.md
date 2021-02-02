# onlyFriends 🚀

_Onlyfriends es una app basada en Tinder con el objetivo de conocer gente con la que entablar amistad. La app funciona de la siguiente manera, una vez te crees una cuenta introduciendo tus datos (usuario, email y contraseña) tendrás que seleccionar tus gustos en la pestaña del perfil, una vez los introduzcas, aparecerán personas que compartan tus mismos gustos._

_Ahora podrás elegir si quieres entablar amistad con estas personas o no. En el caso de que quieras, le darás a like y cuando la persona te dé like de vueltas, podrás ver su perfil y abrir chat con ella._

_La idea original era distanciarnos de la app de Tinder, pero realmente la fórmula inicial es muy fuerte y creímos que no se podría mejorar más._

### Pre-requisitos 📋

_Para instalar el repositorio necesitamos tener algún software previo, acontinución os dejaré los links necesarios para descargar cada uno y el comando necesario para iniciarlo una vez lo tengamos descargado._ 

```
**npm***: npm es el Node Package Manager que viene incluido y ayuda a cada desarrollo asociado a Node. Para instalarlo 
debemos descargar el propio node.js en el siguiente link.

https://nodejs.org/en/
```

_Por otro lado, debemos descargar el angular cli:_

```
npm install -g @angular/cli
```

### Despliegue 📦

_Para hacer el deploy debemos tener en cuenta dos cosas, la primera es que el front y el back se ejecutan por separado, en mi caso, uso dos terminales._

_Primero vamos a iniciar el front en una terminal:_

```
ng serve
```

_Una vez inicie, accedemos a la url generada y veremos el proyecto._

_Por otro lado, tenemos el back, para ello, deberemos crear anteriormente la base de datos y la conexión necesaria modificando en los archivos backend/server.js, línea 14_

_Una vez tengamos esto, introducimos el siguiente comando y ya podremos ejecutar el backend._

```
node server.js
```


