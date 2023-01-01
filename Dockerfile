FROM adoptopenjdk:11-jdk-hotspot as builder
ARG DECRYPTION_SECRET_ARG
ADD . /code/
RUN \
    apt-get update && \
    apt-get install build-essential -y && \
    apt-get install nodejs -y && \
    cd /code/ && \
    rm -Rf target node_modules && \
    chmod +x /code/mvnw && \
    sleep 1 && \
    export GPG_TTY=$(tty) && \
    gpg --yes --batch --passphrase=${DECRYPTION_SECRET_ARG} secrets.tar.gpg && \
    tar xvf secrets.tar && \
    ./mvnw package -Pprod -DskipTests && \
    mv /code/target/*.jar /

FROM adoptopenjdk:11-jre-hotspot
ENV SPRING_OUTPUT_ANSI_ENABLED=ALWAYS \
    JHIPSTER_SLEEP=0
CMD echo "The application will start in ${JHIPSTER_SLEEP}s..." && \
    sleep ${JHIPSTER_SLEEP} && \
    java -Djava.security.egd=file:/dev/./urandom -jar /open-learnr*.jar
EXPOSE 8080
COPY --from=builder /*.jar .
