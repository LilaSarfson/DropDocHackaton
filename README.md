# DROPZONE-HACKATHON 2022

Este proyecto tiene como finalidad crear una aplicación web  capaz de cargar los archivos que el usuario le aporte. En la mejor versión, el usario puede acceder a su cuenta de Google y cargar los archivos en su propio Google Drive.
 
## Background |
 
Este proyecto forma parte de la prueba de Front End para la selección de miembros para el Hackathon Cruz Roja 2022.
 
## API |

La aplicación consigue conectarse a Google a través de las credenciales creadas en Google Cloud para este proyeto. El propio Google ofrece un código de QuickStar para implementar el acceso de los usuarios a su plataforma desde aplicaciones de terceros.
Este proyecto también está vinculado a la API de Google Drive, aunque no consigue subir los archivos con éxito al drive del usuario.
 
## Cómo probar al aplicación y recomendaciones de uso |

 Si se quiere usar sin hacer el resgistro en Google, simplemente, el usuario debe arrastrar y soltar el archivo en la zona de "Drop a File!" identificada con la iamgen de una carpeta, o bien, puede hacerlo de la manera tracional, usando el botón de "Agregar archivo".
Acto seguido debería agregarse el nombre del archivo en la parte derecha de la aplicación.

Por otro lado, si se quiere hacerlo mediante el registro en Google, debe seguir los siguientes pasos:<br/>
1: Pulsar el botón de "Acceder" y añadir el usuario y contraseña deseado.
2: Pulsar el botón de "Autorización" y permitir a la App usar y modificar datos de su Google Drive.
3: Cargar los archivos como anteriormente.
![Alt text](/assets/PASOS.png)
 
## Stack | 
Los lenguajes utiliazado han sido: JavaScript, HTML, CSS3 y la librería de Pico.css.
Para la conexión con Google drive, obviamente me he servido de la API de Google Drive, utilizando su documentación y la sabiduría de StackOverFlow.
 
## Limpieza de código
 [![CodeFactor](https://www.codefactor.io/repository/github/lilasarfson/dropdochackaton/badge)](https://www.codefactor.io/repository/github/lilasarfson/dropdochackaton)