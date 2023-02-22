FROM nginx:1.22.1

# Installazione di Python 2.7 e 3.5
RUN apt-get update && \
    apt-get install -y python2.7 python3.5

# Installazione di NodeJS v14e npm
RUN apt-get install -y nodejs

# Installazione di Git v1.9
RUN apt-get update && \
    apt-get install -y git

# Installazione JDK versione 17
RUN apt-get update && \
    apt-get install -y openjdk-17-jdk-headless

# Imposta la directory di lavoro
WORKDIR /app

# Copia i file del progetto nella directory dell'immagine Docker
COPY . '/usr/share/nginx/html/'

# Esposizione della porta 80 per il server web
EXPOSE 80
# Esegui il comando di avvio
#CMD ["nginx", "index.html"]
