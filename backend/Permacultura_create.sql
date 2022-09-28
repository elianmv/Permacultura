-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2022-09-26 13:17:45.495

-- tables
-- Table: categoria
CREATE TABLE categoria (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    CONSTRAINT categoria_pk PRIMARY KEY (id)
);

-- Table: ciudad
CREATE TABLE ciudad (
    zip_code int NOT NULL,
    name varchar(255) NOT NULL,
    pais_name varchar(255) NOT NULL,
    CONSTRAINT ciudad_pk PRIMARY KEY (zip_code)
);

-- Table: direccion
CREATE TABLE direccion (
    id int NOT NULL AUTO_INCREMENT,
    street varchar(255) NOT NULL,
    number int NOT NULL,
    ciudad_zip_code int NOT NULL,
    CONSTRAINT direccion_pk PRIMARY KEY (id)
);

-- Table: pais
CREATE TABLE pais (
    name varchar(255) NOT NULL,
    CONSTRAINT pais_pk PRIMARY KEY (name)
);

-- Table: publicacion
CREATE TABLE publicacion (
    id int NOT NULL AUTO_INCREMENT,
    tiempo_estimado int NOT NULL,
    precio decimal(10,2) NOT NULL,
    usuario_id int NOT NULL,
    servicio_id int NOT NULL,
    description varchar(500) NOT NULL,
    CONSTRAINT publicacion_pk PRIMARY KEY (id)
);

-- Table: servicio
CREATE TABLE servicio (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    categoria_id int NOT NULL,
    CONSTRAINT servicio_pk PRIMARY KEY (id)
);

-- Table: tipo_usuario
CREATE TABLE tipo_usuario (
    name varchar(255) NOT NULL,
    CONSTRAINT tipo_usuario_pk PRIMARY KEY (name)
);

-- Table: usuario
CREATE TABLE usuario (
    id int NOT NULL AUTO_INCREMENT,
    dni bigint NULL,
    username varchar(255) NOT NULL,
    name varchar(255) NULL,
    lastname varchar(255) NULL,
    password varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    phone varchar(255) NULL,
    tipo_usuario_name varchar(255) NOT NULL,
    direccion_id int NULL,
    UNIQUE INDEX unique_uname_email (username,email),
    CONSTRAINT usuario_pk PRIMARY KEY (id)
);

-- foreign keys
-- Reference: ciudad_pais (table: ciudad)
ALTER TABLE ciudad ADD CONSTRAINT ciudad_pais FOREIGN KEY ciudad_pais (pais_name)
    REFERENCES pais (name);

-- Reference: direccion_ciudad (table: direccion)
ALTER TABLE direccion ADD CONSTRAINT direccion_ciudad FOREIGN KEY direccion_ciudad (ciudad_zip_code)
    REFERENCES ciudad (zip_code);

-- Reference: proveedor_usuario (table: publicacion)
ALTER TABLE publicacion ADD CONSTRAINT proveedor_usuario FOREIGN KEY proveedor_usuario (usuario_id)
    REFERENCES usuario (id);

-- Reference: publicacion_servicio (table: publicacion)
ALTER TABLE publicacion ADD CONSTRAINT publicacion_servicio FOREIGN KEY publicacion_servicio (servicio_id)
    REFERENCES servicio (id);

-- Reference: servicio_categoria (table: servicio)
ALTER TABLE servicio ADD CONSTRAINT servicio_categoria FOREIGN KEY servicio_categoria (categoria_id)
    REFERENCES categoria (id);

-- Reference: usuario_direccion (table: usuario)
ALTER TABLE usuario ADD CONSTRAINT usuario_direccion FOREIGN KEY usuario_direccion (direccion_id)
    REFERENCES direccion (id);

-- Reference: usuario_tipo_usuario (table: usuario)
ALTER TABLE usuario ADD CONSTRAINT usuario_tipo_usuario FOREIGN KEY usuario_tipo_usuario (tipo_usuario_name)
    REFERENCES tipo_usuario (name);

-- End of file.
