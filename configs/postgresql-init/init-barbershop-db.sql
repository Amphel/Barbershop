-- default ROLE with type 'LOGIN' named as the username is automatically created
CREATE USER barber WITH PASSWORD 'barbershop';

-- template is required for collation setup
CREATE DATABASE barbershop_db
        WITH OWNER barber
        ENCODING 'UTF8' 
        CONNECTION LIMIT = 100
        TEMPLATE template0;
        
GRANT ALL PRIVILEGES ON DATABASE barbershop_db TO barber;