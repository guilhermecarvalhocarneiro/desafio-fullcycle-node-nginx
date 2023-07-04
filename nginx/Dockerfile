FROM nginx

# Apagando o arquivo de configuração padrão do nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copiando o arquivo de configuração do nginx
COPY ./nginx.conf /etc/nginx/conf.d/
