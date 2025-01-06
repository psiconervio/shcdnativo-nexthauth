FROM node
#carpeta donde queremos meter nuestra aplicacion node
RUN mkdir -p /home/app
# ruta para sacar el codigo fuente de nuestra app
COPY . /home/app
#exponer puerto para poder conextarme a ese contenedor 
EXPOSE 3001
#COMANDO PARA EJECUTAR LA APLICACION
CMD ["node", "/home/app/index.js"]