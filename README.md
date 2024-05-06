Prototipo de Tickets

Este repositorio contiene dos proyectos relacionados: uno de backend desarrollado con Laravel 11 y otro de frontend desarrollado con Next.js 14.

BACKEND

El proyecto de backend está ubicado en la carpeta my-project. Utiliza Laravel 11 como framework de PHP para la creación de APIs RESTful y gestión de la base de datos MySQL con MariaDB. Para ejecutar el backend, sigue estos pasos:

1.- Asegúrate de tener Docker instalado en tu sistema.
2.- En la carpeta raíz del proyecto, ejecuta el siguiente comando para levantar el servicio de Laravel y la base de datos MariaDB:

docker-compose up -d

3.- Una vez que los contenedores estén en funcionamiento, accede al contenedor de Laravel ejecutando el siguiente comando:

docker exec -it <nombre_del_contenedor> bash

Sustituye <nombre_del_contenedor> por el nombre de tu contenedor de Laravel. Por lo general, este será algo como 'prototipo-tikets-myapp-1'

4.- Dentro del contenedor, ejecuta las migraciones y los seeders con el siguiente comando:

php artisan migrate --seed

5.- El backend estará disponible en http://localhost:8000.

FRONTEND

El proyecto de frontend se encuentra en la carpeta front. Está desarrollado con Next.js 14 y se utiliza para interactuar con el backend mediante llamadas a la API. Para ejecutar el frontend en modo de desarrollo, sigue estos pasos:

1.- Asegúrate de tener Node.js y npm instalados en tu sistema.
2.- Navega a la carpeta front desde la línea de comandos.
3.- Ejecuta el siguiente comando para instalar las dependencias:

npm install

npm run dev

5.- El frontend estará disponible en http://localhost:3000.
