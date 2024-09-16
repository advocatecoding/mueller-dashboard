# Verwende ein Node-Image als Basis
FROM node:18 AS build

# Setze das Arbeitsverzeichnis
WORKDIR /app

# Kopiere package.json und package-lock.json
COPY package*.json ./

# Installiere die Abhängigkeiten
RUN npm install

# Kopiere den Rest des Codes
COPY . .

# Baue das Projekt
RUN npm run build

# Verwende ein Nginx-Image für den Produktionsserver
FROM nginx:alpine

# Kopiere die Build-Ausgabe aus dem vorherigen Schritt
COPY --from=build /app/dist /usr/share/nginx/html

# Exponiere den Port 80
EXPOSE 80

# Starte Nginx
CMD ["nginx", "-g", "daemon off;"]
