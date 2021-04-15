CREATE DATABASE prueba2;
use prueba2;
DROP  TABLE temp1;
CREATE TABLE temp1(
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


-- SET GLOBAL local_infile = true;
-- SHOW GLOBAL VARIABLES LIKE 'local_infile';

SELECT * FROM temp1;

LOAD DATA LOCAL INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\Carga.csv' INTO TABLE temp1 FIELDS TERMINATED BY ';'  LINES TERMINATED BY '\n' IGNORE 1 ROWS;
