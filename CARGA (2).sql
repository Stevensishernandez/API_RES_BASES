-- SHOW VARIABLES LIKE "secure_file_priv";

-- D:/USAC/8 semestre/BASES 1/Lab/Proyecto 2/Archivos/A.csv
-- C:\ProgramData\MySQL\MySQL Server 8.0\Uploads\

-- SHOW GRANTS FOR 'root'@'localhost';
-- GRANT FILE ON *.* TO 'root'@'localhost';
-- FLUSH PRIVILEGES;

/*
SET FOREIGN_KEY_CHECKS=0;
TRUNCATE FRONTERA;
SET FOREIGN_KEY_CHECKS=1;
*/

-- mysql -u root --password=admin --local-infile=1
-- USE py2;

-- SET GLOBAL local_infile = true;
-- SHOW GLOBAL VARIABLES LIKE 'local_infile';

use proyecto2;

/***************************************temporal 2 y carga / areas***************************************/
-- DROP TABLE TEMPORAL2; -- ELIMINA TABLA
-- TRUNCATE TABLE TEMPORAL2; -- LIMPIA TABLA
-- SELECT * FROM TEMPORAL2; -- VER TABLA

CREATE TABLE IF NOT EXISTS TEMPORAL2(
	region VARCHAR(100),
    padre VARCHAR(100)
);

/*TEMPORAL2 21 - BIEN*/
LOAD DATA LOCAL INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\A2.csv' INTO TABLE TEMPORAL2 CHARACTER SET latin1 FIELDS terminated by ';' LINES terminated by '\r\n' IGNORE 1 LINES; 

/*REGION 5/16 - BIEN*/
INSERT INTO REGION(nombre) SELECT T.region FROM TEMPORAL2 AS T WHERE T.padre = '';
INSERT INTO REGION(nombre, id_region_padre) SELECT T.region, R.id_region FROM TEMPORAL2 AS T, REGION AS R WHERE T.padre = R.nombre;




/***************************************temporal 1 y carga***************************************/
-- DROP TABLE TEMPORAL1; -- ELIMINA TABLA
-- TRUNCATE TABLE TEMPORAL1; -- LIMPIA TABLA
-- SELECT * FROM TEMPORAL1; -- VER TABLA

CREATE TABLE TEMPORAL1(
	invento VARCHAR(100),
    inventor  VARCHAR(100),
    profecional  VARCHAR(100),
    jefe  VARCHAR(100),
    fecha  VARCHAR(100),
    salario FLOAT,
    comision FLOAT,
    area  VARCHAR(100),
    ranking INT,
    año INT,
    paisinvento  VARCHAR(100),
    paisinventor  VARCHAR(100),
    region  VARCHAR(100),
    capital  VARCHAR(100),
    poblacion INT,
    territorio FLOAT,
    frontera  VARCHAR(100),
    norte  VARCHAR(1),
    sur VARCHAR(1),
    este VARCHAR(1),
    oeste VARCHAR(1)
);

/*TEMPORAL1 1397 - BIEN*/
LOAD DATA LOCAL INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\A1.csv' INTO TABLE TEMPORAL1 CHARACTER SET latin1 FIELDS terminated by ';' LINES terminated by '\r\n' IGNORE 1 LINES; 

/*AREA 8 - BIEN*/
-- SELECT * FROM AREA;
INSERT INTO  AREA(nombre, ranking) SELECT DISTINCT T.area, T.ranking FROM TEMPORAL1 AS T WHERE area != '';

/*PROFECIONAL 12 - BIEN*/
INSERT INTO PROFECIONAL(nombre, contrato, salario, comision) SELECT DISTINCT T.profecional, T.fecha, T.salario, T.comision FROM TEMPORAL1 AS T WHERE T.profecional != '';

/*PROFECION 25 - BIEN*/
INSERT INTO PROFECION(id_area, id_profecional) SELECT DISTINCT A.id_area, P.id_profecional FROM TEMPORAL1 AS T, AREA AS A, PROFECIONAL AS P WHERE A.nombre = T.area AND P.nombre = T.profecional;

/*JEFE 6/8 - BIEN*/
INSERT INTO JEFE(id_profecional, id_area) SELECT DISTINCT P.id_profecional, A.id_area FROM TEMPORAL1 AS T, AREA AS A, PROFECIONAL AS P WHERE A.nombre = T.jefe AND P.nombre = T.profecional;
INSERT INTO JEFE(id_profecional, id_area) SELECT N.pf, A.id_area FROM AREA as A, (SELECT DISTINCT P.id_profecional as pf FROM TEMPORAL1 AS T, PROFECIONAL AS P WHERE T.jefe = 'TODAS' AND P.nombre = T.profecional) AS N;

/*PAIS 168 - BIEN 169*/
INSERT INTO PAIS(nombre, capital, poblacion, area, id_region) SELECT DISTINCT  T.paisinventor, T.capital, T.poblacion, T.territorio, R.id_region FROM TEMPORAL1 AS T, REGION as R WHERE R.nombre = T.region;

/*FRONTERA 539 - 482 - BIEN 488*/
-- INSERT INTO FRONTERA(cardinalida, id_pais, id_pais_frontera) SELECT DISTINCT IF(T.norte='X', 'Norte', IF(T.sur='X', 'Sur', IF(T.este='X', 'Este', 'Oeste'))), P.id_pais, F.id_pais FROM TEMPORAL1 AS T, PAIS AS P, PAIS AS F WHERE T.paisinventor = P.nombre AND T.frontera = F.nombre;
INSERT INTO FRONTERA(cardinalida, id_pais, id_pais_frontera) SELECT DISTINCT 'Norte', P.id_pais, F.id_pais FROM TEMPORAL1 AS T, PAIS AS P, PAIS AS F WHERE T.paisinventor = P.nombre AND T.frontera = F.nombre AND T.norte = 'X';
INSERT INTO FRONTERA(cardinalida, id_pais, id_pais_frontera) SELECT DISTINCT 'Sur', P.id_pais, F.id_pais FROM TEMPORAL1 AS T, PAIS AS P, PAIS AS F WHERE T.paisinventor = P.nombre AND T.frontera = F.nombre AND T.sur = 'X';
INSERT INTO FRONTERA(cardinalida, id_pais, id_pais_frontera) SELECT DISTINCT 'Este', P.id_pais, F.id_pais FROM TEMPORAL1 AS T, PAIS AS P, PAIS AS F WHERE T.paisinventor = P.nombre AND T.frontera = F.nombre AND T.este = 'X';
INSERT INTO FRONTERA(cardinalida, id_pais, id_pais_frontera) SELECT DISTINCT 'Oeste', P.id_pais, F.id_pais FROM TEMPORAL1 AS T, PAIS AS P, PAIS AS F WHERE T.paisinventor = P.nombre AND T.frontera = F.nombre AND T.oeste = 'X';

/*INVENTO 154 - BIEN*/
INSERT INTO INVENTO(nombre, año, id_pais) SELECT DISTINCT T.invento, T.año, P.id_pais FROM TEMPORAL1 AS T, PAIS AS P WHERE P.nombre = T.paisinvento;

/*SUPERVICION 154 - BIEN*/
INSERT INTO SUPERVICION(id_profecional, id_invento) SELECT DISTINCT P.id_profecional, I.id_invento FROM TEMPORAL1 AS T, PROFECIONAL AS P, INVENTO AS I WHERE T.invento = I.nombre AND T.profeCional = P.nombre;

/*INVENTOR 145 - BIEN*/
INSERT INTO INVENTOR(nombre, id_pais) SELECT DISTINCT T.inventor, P.id_pais FROM TEMPORAL1 AS T, PAIS AS P WHERE T.paisinventor = P.nombre AND T.inventor != '';

/*INVENCION 156 - BIEN*/
INSERT INTO INVENCION(id_inventor, id_invento) SELECT DISTINCT I.id_inventor, C.id_invento FROM TEMPORAL1 AS T, INVENTOR AS I, INVENTO AS C WHERE I.nombre = T.inventor AND C.nombre = T.invento;




/***************************************temporal 3 y carga / encuestas***************************************/
DROP TABLE TEMPORAL3; -- ELIMINA TABLA
TRUNCATE TABLE TEMPORAL3; -- LIMPIA TABLA
SELECT * FROM TEMPORAL3; -- VER TABLA

create  table TEMPORAL3(
	nombre VARCHAR(100),
    pregunta VARCHAR(100),
    respuesta VARCHAR(100),
    respuestaCorrecta VARCHAR(100),
    pais VARCHAR(100),
    respuestaPais VARCHAR(100)
);

/*TEMPORAL3 1154 - BIEN*/
LOAD DATA LOCAL INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\A3.csv' INTO TABLE TEMPORAL3 CHARACTER SET latin1 FIELDS terminated by ';' LINES terminated by '\r\n' IGNORE 1 LINES; 

/*ENCUESTA 2 - BIEN*/
INSERT INTO ENCUESTA(nombre) SELECT DISTINCT nombre FROM TEMPORAL3 as T;

/*PREGUNTA 14 - BIEN*/
-- SELECT * FROM PREGUNTA;
INSERT INTO PREGUNTA(pregunta, id_encuesta) SELECT DISTINCT T.pregunta, E.id_encuesta FROM TEMPORAL3 AS T, ENCUESTA AS E WHERE T.nombre = E.nombre;

/*OPCION 53 - BIEN*/
INSERT INTO OPCION(opcion, id_pregunta) SELECT DISTINCT T.respuesta, P.id_pregunta FROM TEMPORAL3 AS T, PREGUNTA AS P WHERE P.pregunta = T.pregunta;

/*CORRECTA 12 - BIEN*/
INSERT INTO CORRECTA(id_pregunta, id_opcion) SELECT DISTINCT P.id_pregunta, O.id_opcion FROM TEMPORAL3 AS T, PREGUNTA AS P, OPCION AS O WHERE P.pregunta = T.pregunta AND O.opcion = T.respuestacorrecta;

/*RESPUESTA 287 - BIEN 1412*/
INSERT INTO RESPUESTA(respuesta, id_pais, id_pregunta) SELECT DISTINCT T.respuestapais, P.id_pais, G.id_pregunta FROM TEMPORAL3 AS T, PAIS AS P, PREGUNTA AS G WHERE REPLACE(P.nombre,' ','') = REPLACE(T.pais,' ','') AND G.pregunta = T.pregunta;






