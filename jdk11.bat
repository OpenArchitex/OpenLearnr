docker-compose -f src/main/docker/mongodb.yml up -d
@echo off
echo Setting JAVA_HOME
set JAVA_HOME=C:\Users\gsw\Desktop\zulu11
echo setting PATH
set PATH=C:\Users\gsw\Desktop\zulu11\bin;%PATH%
echo Display java version
java -version
mvnw
