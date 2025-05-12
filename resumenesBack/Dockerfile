FROM eclipse-temurin:17-jdk-alpine

# Instalar bash y Maven
RUN apk add --no-cache bash maven

# Directorio de trabajo
WORKDIR /app

# Copiar solo archivos de dependencias y descargarlas primero
COPY pom.xml ./
RUN mvn dependency:go-offline -B

# Ahora copiamos el resto del proyecto
COPY . .

# Compilamos el jar y lo renombramos
RUN mvn clean package -DskipTests && \
    cp target/*.jar app.jar

# Exponer el puerto
EXPOSE 8080

# Verificamos que exista app.jar y lo ejecutamos
ENTRYPOINT ["sh", "-c", "if [ -f app.jar ]; then java -jar app.jar; else echo '❌ No se encontró app.jar' && exit 1; fi"]