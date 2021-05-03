CREATE SCHEMA IF NOT EXISTS `proyecto2` DEFAULT CHARACTER SET utf8 ;
USE `proyecto2` ;


--create region 

CREATE TABLE IF NOT EXISTS `REGION` (
  `id_region` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `id_region_padre` INT NULL,
  PRIMARY KEY (`id_region`),
  UNIQUE INDEX `id_region_UNIQUE` (`id_region` ASC) VISIBLE,
  INDEX `fk_REGION_REGION1_idx` (`id_region_padre` ASC) VISIBLE,
  CONSTRAINT `fk_REGION_REGION1`
    FOREIGN KEY (`id_region_padre`)
    REFERENCES `REGION` (`id_region`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

CREATE TABLE IF NOT EXISTS `PAIS` (
  `id_pais` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `capital` VARCHAR(100) NOT NULL,
  `poblacion` INT NOT NULL,
  `area` FLOAT NOT NULL,
  `id_region` INT NOT NULL,
  PRIMARY KEY (`id_pais`),
  UNIQUE INDEX `id_pais_UNIQUE` (`id_pais` ASC) VISIBLE,
  INDEX `fk_PAIS_REGION1_idx` (`id_region` ASC) VISIBLE,
  CONSTRAINT `fk_PAIS_REGION1`
    FOREIGN KEY (`id_region`)
    REFERENCES `REGION` (`id_region`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
;


-- -----------------------------------------------------
-- Table `FRONTERA`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `FRONTERA` (
  `id_frontera` INT NOT NULL AUTO_INCREMENT,
  `cardinalida` VARCHAR(100) NOT NULL,
  `id_pais` INT NOT NULL,
  `id_pais_frontera` INT NOT NULL,
  PRIMARY KEY (`id_frontera`),
  INDEX `fk_FRONTERA_PAIS1_idx` (`id_pais_frontera` ASC) VISIBLE,
  UNIQUE INDEX `id_frontera_UNIQUE` (`id_frontera` ASC) VISIBLE,
  CONSTRAINT `fk_FRONTERA_PAIS`
    FOREIGN KEY (`id_pais`)
    REFERENCES `PAIS` (`id_pais`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_FRONTERA_PAIS1`
    FOREIGN KEY (`id_pais_frontera`)
    REFERENCES `PAIS` (`id_pais`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
;


-- -----------------------------------------------------
-- Table `INVENTOR`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `INVENTOR` (
  `id_inventor` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `id_pais` INT NOT NULL,
  PRIMARY KEY (`id_inventor`),
  INDEX `fk_INVENTOR_PAIS1_idx` (`id_pais` ASC) VISIBLE,
  UNIQUE INDEX `id_inventor_UNIQUE` (`id_inventor` ASC) VISIBLE,
  CONSTRAINT `fk_INVENTOR_PAIS1`
    FOREIGN KEY (`id_pais`)
    REFERENCES `PAIS` (`id_pais`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
;


-- -----------------------------------------------------
-- Table `INVENTO`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `INVENTO` (
  `id_invento` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `año` INT NOT NULL,
  `id_pais` INT NOT NULL,
  PRIMARY KEY (`id_invento`),
  UNIQUE INDEX `id_invento_UNIQUE` (`id_invento` ASC) VISIBLE,
  INDEX `fk_INVENTO_PAIS1_idx` (`id_pais` ASC) VISIBLE,
  CONSTRAINT `fk_INVENTO_PAIS1`
    FOREIGN KEY (`id_pais`)
    REFERENCES `PAIS` (`id_pais`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
;


-- -----------------------------------------------------
-- Table `INVENCION`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `INVENCION` (
  `id_inventor` INT NOT NULL,
  `id_invento` INT NOT NULL,
  PRIMARY KEY (`id_inventor`, `id_invento`),
  INDEX `fk_INVENCION_INVENTO1_idx` (`id_invento` ASC) VISIBLE,
  CONSTRAINT `fk_INVENCION_INVENTOR1`
    FOREIGN KEY (`id_inventor`)
    REFERENCES `INVENTOR` (`id_inventor`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_INVENCION_INVENTO1`
    FOREIGN KEY (`id_invento`)
    REFERENCES `INVENTO` (`id_invento`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
;


-- -----------------------------------------------------
-- Table `ENCUESTA`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `ENCUESTA` (
  `id_encuesta` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id_encuesta`),
  UNIQUE INDEX `id_encuesta_UNIQUE` (`id_encuesta` ASC) VISIBLE)
;


-- -----------------------------------------------------
-- Table `PROFECIONAL`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `PROFECIONAL` (
  `id_profecional` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `contrato` VARCHAR(100) NOT NULL,
  `salario` FLOAT NOT NULL,
  `comision` FLOAT NULL,
  PRIMARY KEY (`id_profecional`),
  UNIQUE INDEX `id_profecional_UNIQUE` (`id_profecional` ASC) VISIBLE)
;


-- -----------------------------------------------------
-- Table `SUPERVICION`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `SUPERVICION` (
  `id_profecional` INT NOT NULL,
  `id_invento` INT NOT NULL,
  PRIMARY KEY (`id_invento`, `id_profecional`),
  INDEX `fk_SUPERVICION_INVENTO1_idx` (`id_invento` ASC) VISIBLE,
  CONSTRAINT `fk_SUPERVICION_PROFECIONAL1`
    FOREIGN KEY (`id_profecional`)
    REFERENCES `PROFECIONAL` (`id_profecional`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_SUPERVICION_INVENTO1`
    FOREIGN KEY (`id_invento`)
    REFERENCES `INVENTO` (`id_invento`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
;


-- -----------------------------------------------------
-- Table `AREA`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `AREA` (
  `id_area` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `ranking` INT NOT NULL,
  PRIMARY KEY (`id_area`))
;


-- -----------------------------------------------------
-- Table `JEFE`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `JEFE` (
  `id_profecional` INT NOT NULL,
  `id_area` INT NOT NULL,
  INDEX `fk_JEFE_PROFECIONAL1_idx` (`id_profecional` ASC) VISIBLE,
  INDEX `fk_JEFE_AREA1_idx` (`id_area` ASC) VISIBLE,
  PRIMARY KEY (`id_area`, `id_profecional`),
  CONSTRAINT `fk_JEFE_PROFECIONAL1`
    FOREIGN KEY (`id_profecional`)
    REFERENCES `PROFECIONAL` (`id_profecional`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_JEFE_AREA1`
    FOREIGN KEY (`id_area`)
    REFERENCES `AREA` (`id_area`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
;


-- -----------------------------------------------------
-- Table `PROFECION`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `PROFECION` (
  `id_area` INT NOT NULL,
  `id_profecional` INT NOT NULL,
  PRIMARY KEY (`id_area`, `id_profecional`),
  INDEX `fk_table1_PROFECIONAL1_idx` (`id_profecional` ASC) VISIBLE,
  CONSTRAINT `fk_table1_AREA1`
    FOREIGN KEY (`id_area`)
    REFERENCES `AREA` (`id_area`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_table1_PROFECIONAL1`
    FOREIGN KEY (`id_profecional`)
    REFERENCES `PROFECIONAL` (`id_profecional`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
;


-- -----------------------------------------------------
-- Table `PREGUNTA`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `PREGUNTA` (
  `id_pregunta` INT NOT NULL AUTO_INCREMENT,
  `pregunta` VARCHAR(100) NOT NULL,
  `id_encuesta` INT NOT NULL,
  PRIMARY KEY (`id_pregunta`),
  UNIQUE INDEX `id_pregunta_UNIQUE` (`id_pregunta` ASC) VISIBLE,
  INDEX `fk_PREGUNTA_ENCUESTA1_idx` (`id_encuesta` ASC) VISIBLE,
  CONSTRAINT `fk_PREGUNTA_ENCUESTA1`
    FOREIGN KEY (`id_encuesta`)
    REFERENCES `ENCUESTA` (`id_encuesta`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
;


-- -----------------------------------------------------
-- Table `OPCION`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `OPCION` (
  `id_opcion` INT NOT NULL AUTO_INCREMENT,
  `opcion` VARCHAR(100) NOT NULL,
  `id_pregunta` INT NOT NULL,
  PRIMARY KEY (`id_opcion`),
  UNIQUE INDEX `id_opcion_UNIQUE` (`id_opcion` ASC) VISIBLE,
  INDEX `fk_OPCION_PREGUNTA1_idx` (`id_pregunta` ASC) VISIBLE,
  CONSTRAINT `fk_OPCION_PREGUNTA1`
    FOREIGN KEY (`id_pregunta`)
    REFERENCES `PREGUNTA` (`id_pregunta`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
;


-- -----------------------------------------------------
-- Table `CORRECTA`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `CORRECTA` (
  `id_pregunta` INT NOT NULL,
  `id_opcion` INT NOT NULL,
  PRIMARY KEY (`id_pregunta`, `id_opcion`),
  INDEX `fk_CORRECTA_OPCION1_idx` (`id_opcion` ASC) VISIBLE,
  CONSTRAINT `fk_CORRECTA_PREGUNTA1`
    FOREIGN KEY (`id_pregunta`)
    REFERENCES `PREGUNTA` (`id_pregunta`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_CORRECTA_OPCION1`
    FOREIGN KEY (`id_opcion`)
    REFERENCES `OPCION` (`id_opcion`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
;


-- -----------------------------------------------------
-- Table `RESPUESTA`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `RESPUESTA` (
  `id_respuesta` INT NOT NULL AUTO_INCREMENT,
  `respuesta` VARCHAR(100) NOT NULL,
  `id_pais` INT NOT NULL,
  `id_pregunta` INT NOT NULL,
  PRIMARY KEY (`id_respuesta`),
  INDEX `fk_RESPUESTA_PAIS1_idx` (`id_pais` ASC) VISIBLE,
  INDEX `fk_RESPUESTA_PREGUNTA1_idx` (`id_pregunta` ASC) VISIBLE,
  CONSTRAINT `fk_RESPUESTA_PAIS1`
    FOREIGN KEY (`id_pais`)
    REFERENCES `PAIS` (`id_pais`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_RESPUESTA_PREGUNTA1`
    FOREIGN KEY (`id_pregunta`)
    REFERENCES `PREGUNTA` (`id_pregunta`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
