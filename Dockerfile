# Base Apache
FROM httpd:latest

# Copia os arquivos do site para dentro do container
COPY ./website/ /usr/local/apache2/htdocs/

# Configura ServerName para evitar aviso
RUN echo "ServerName localhost" >> /usr/local/apache2/conf/httpd.conf

# Expõe porta 80 do container
EXPOSE 80

# Comando padrão do Apache
CMD ["httpd-foreground"]
