Hola, necesito hacer el codigo de las siguientes interfaces que se encuentran en el figma. Te anexo una pequeña explicación de cada una, voy por orden de arriba hacia abajo:

-	las primeras dos interfaces son Login y Register, 

-	Al iniciar la sesión se muestra la interfaz de Main, el cual es un dashboard principal. En la barra de la izquierda se muestra las diferentes opciones 

	Inicio: es la pantalla del Main
	Data: va a mostrar la interfaz de selección
	Busqueda: se redirige a un url en especifico, eso lo coloco yo
	Chatbot: se redirige a un url en especifico, eso lo coloco yo
o	Se tiene una barra de búsqueda, la cual se coloca por ahora inahbilitada
o	El pie chart, recibe ciertos parámetros de una HTTP request los cuales contienen un total y su nombre. Cada porción es calculada en base al total, y el label es con el nombre recibido
o	A la derecha del pie chart, se encuentra una tabla. La cual recibe multiples filas a ser mostrada, es decir que debe tener un scroll. 
o	Por ultimo en la parte inferior, van a aparecer dos graficas las cuales reciben por JSON el valor numerico y la fecha correspondiente. Cada una debe tener diferewntes filtros de rangos de tiempo.

-	En la pantalla de selección, van a aparecer los botones correspondientes los cuales ejecutan o redirigen a nuevas pestanas a url en específicos.

-	Por ultimo se tiene la pantalla de Opciones Admin, la cual muestra las diferentes opciones de administrados. Para ello se pone nuevamente un Log in para que el administrador vuelva a ingresar. Ademas de colocar la opción de registro de Usuario (register). la única característica adicional es el QR que aparece en el Register. Este aparece al hacer el registro satisfactorio del usuario. Yo tengo el código que genera el registro y la imagen del QR. Solamente necesito que se muestre en la pantalla. El register puede estar como un enlace desde la pantalla del login.

Esto solo seria el código en react

el repositorio que estoy usando es privado, pero no te preocupes porque no tiene ningun tipo de relacion con este frontend. son procesos que se ejecutan de formas separadas. Las llamadas HTTP para la data a usar, los puedes colocar con datos de prueba y dejas marcado donde van cada uno. Yo me encargo de colocar las llamadas y adaptar las respuestas de las solicitudes

https://www.figma.com/design/kfCfHPv2lkDZ7IYT8XnApD/Portfolio-(Copy)?node-id=296-1150&t=teTajvskAyIvfg72-1