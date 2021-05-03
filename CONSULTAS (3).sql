use py2;

/*CONSULTA 1*/
/*Desplegar cada profesional, y el número de inventos que tiene asignados ordenados de mayor a menor.*/
SELECT P.nombre Nombre, COUNT(P.nombre) Asignados
FROM PROFECIONAL P
JOIN SUPERVICION S
ON S.id_profecional = P.id_profecional
GROUP BY P.nombre
ORDER BY Asignados DESC;


/*CONSULTA 2*/
/*Desplegar los países de cada continente y el número de preguntas que han contestado de cualquier encuesta. Si hay países que no han contestado ninguna encuesta, igual debe aparecer su nombre el la lista*/
(SELECT C.nombre Continente, P.nombre Pais, COUNT(P.nombre) Contestadas
FROM PAIS P
JOIN REGION R
ON R.id_region = P.id_region
JOIN REGION C
ON C.id_region = R.id_region_padre
JOIN RESPUESTA T
ON T.id_pais = P.id_pais
GROUP BY Pais
)
UNION ALL
(SELECT C.nombre Continente, P.nombre Pais, 0 Contestadas
FROM PAIS P
JOIN REGION R
ON R.id_region = P.id_region
JOIN REGION C
ON C.id_region = R.id_region_padre
JOIN RESPUESTA T
ON T.id_pais != P.id_pais
GROUP BY Pais)
ORDER BY Contestadas DESC;

select distinct E.nombre, P.pregunta from Encuesta E
join pregunta p
on p.id_encuesta = e.id_encuesta;

/*CONSULTA 3*/
/*Desplegar todos los países que no tengan ningún inventor y que no tengan ninguna frontera con otro país ordenados por su área.*/
SELECT P.nombre Pais, P.area Area
FROM PAIS P
WHERE NOT EXISTS (SELECT * FROM FRONTERA F WHERE F.id_pais = P.id_pais)
GROUP BY P.nombre
ORDER BY P.area DESC;


/*CONSULTA 4*/
/*Desplegar el nombre de cada jefe seguido de todos sus subalternos, para todos los profesionales ordenados por el jefe alfabéticamente.*/
SELECT P.nombre Jefe, S.nombre Subalterno, A.nombre Area
FROM PROFECIONAL S, PROFECION F, AREA A, (SELECT P.nombre, J.id_profecional, J.id_area FROM PROFECIONAL P, JEFE J WHERE J.id_profecional = P.id_profecional) P
WHERE F.id_profecional = S.id_profecional AND A.id_area = P.id_area AND P.id_profecional != S.id_profecional AND P.id_area = F.id_area AND P.nombre != 'KING PRESIDENT'
ORDER BY P.nombre;

SELECT P.nombre Jefe, S.nombre Subalterno, A.nombre Area
FROM PROFECIONAL S
JOIN PROFECION F
ON F.id_profecional = S.id_profecional
JOIN (SELECT P.nombre, J.id_profecional, J.id_area FROM PROFECIONAL P, JEFE J WHERE J.id_profecional = P.id_profecional) P
ON P.id_profecional != S.id_profecional AND P.nombre != 'KING PRESIDENT'
JOIN AREA A
ON A.id_area = P.id_area AND P.id_area = F.id_area 
ORDER BY P.nombre;



/*CONSULTA 5*/
/*Desplegar todos los profesionales, y su salario cuyo salario es mayor al promedio del salario de los profesionales en su misma área.*/
SELECT P.nombre Profecional, P.salario Salario, A.nombre Area, M.promedio Promedio
FROM PROFECIONAL P
JOIN PROFECION F
ON F.id_profecional = P.id_profecional
JOIN AREA A
ON A.id_area = F.id_area
JOIN (SELECT AVG(P.salario) PROMEDIO, A.nombre
	FROM PROFECIONAL P, PROFECION F, AREA A
	WHERE P.id_profecional = F.id_profecional AND F.id_area = A.id_area
	Group by A.nombre) M
ON M.nombre = A.nombre
WHERE P.salario > M.promedio
ORDER BY A.nombre ASC;



/*CONSULTA 6*/
/*Desplegar los nombres de los países que han contestado encuestas, ordenados del país que más aciertos ha tenido hasta el que menos aciertos ha tenido.*/
SELECT P.nombre Pais, COUNT(P.nombre) Aciertos
FROM PAIS P
JOIN RESPUESTA R
ON R.id_pais = P.id_pais
JOIN PREGUNTA E
ON E.id_pregunta = R.id_pregunta
JOIN OPCION O
ON O.id_pregunta = E.id_pregunta
JOIN CORRECTA C
ON C.id_opcion = O.id_opcion
WHERE R.respuesta = SUBSTRING(O.opcion, 1, 1)
GROUP BY P.nombre
ORDER BY Aciertos DESC;



/*CONSULTA 7*/
/*Desplegar los inventos documentados por todos los profesionales expertos en Óptica.*/
SELECT I.nombre Invento, P.nombre Profecional, A.nombre Area
FROM INVENTO I
JOIN SUPERVICION S
ON S.id_invento = I.id_invento
JOIN PROFECIONAL P
ON P.id_profecional = S.id_profecional
JOIN PROFECION F
ON F.id_profecional = P.id_profecional
JOIN AREA A
ON A.id_area = F.id_area
WHERE A.nombre = 'Óptica';



/*CONSULTA 8*/
/*Desplegar la suma del área de todos los países agrupados por la inicial de su nombre.*/
SELECT SUBSTRING(P.nombre, 1, 1) Letra, SUM(P.area) Suma
FROM PAIS P
GROUP BY Letra
ORDER BY Letra ASC;



/*CONSULTA 9*/
/*Desplegar todos los inventores y sus inventos cuyo nombre del inventor inicie con las letras BE.*/
SELECT I.nombre Inventor, V.nombre Invento
FROM INVENTOR I
JOIN INVENCION C
ON C.id_inventor = I.id_inventor
JOIN INVENTO V
ON V.id_invento = C.id_invento
WHERE SUBSTRING(I.nombre, 1, 2) = 'BE';



/*CONSULTA 10*/
/*Desplegar el nombre de todos los inventores que Inicien con B y terminen con r o con n que tengan inventos del siglo 19*/
SELECT I.nombre Inventor, V.nombre Invento, V.año Año
FROM INVENTOR I
JOIN INVENCION C
ON C.id_inventor = I.id_inventor
JOIN INVENTO V
ON V.id_invento = C.id_invento
WHERE I.nombre LIKE 'B%' AND (I.nombre LIKE '%R' OR I.nombre LIKE '%N') AND V.año < 1901 AND V.año > 1800;



/*CONSULTA 11*/
/*Desplegar el nombre del país y el área de todos los países que tienen mas de siete fronteras ordenarlos por el de mayor área,*/
SELECT P.nombre Pais, P.area Area, F.fronteras Fronteras
FROM PAIS P
JOIN (SELECT F.id_pais, COUNT(F.id_pais) Fronteras FROM FRONTERA F GROUP BY F.id_pais) F
ON F.id_pais = P.id_pais
WHERE F.fronteras > 7
ORDER BY P.area DESC;



/*CONSULTA 12*/
/*Desplegar todos los inventos de cuatro letras que inicien con L*/
SELECT I.nombre Invento
FROM INVENTO I
WHERE I.nombre LIKE 'L___';



/*CONSULTA 13*/
/*Desplegar el nombre del profesional, su salario, su comisión y el total de salario (sueldo mas comisión) de todos los profesionales con comisión mayor que el 25% de su salario.*/
SELECT P.nombre Profecional, P.salario Salario, P.comision Comision, (P.salario + P.comision) Total
FROM PROFECIONAL P
WHERE P.comision > P.salario * 0.25;



/*CONSULTA 14*/
/*Desplegar cada encuesta y el número de países que las han contestado, ordenadas de mayor a menor.*/
SELECT E.nombre Encuesta, COUNT(E.nombre) Total
FROM ENCUESTA E,
	(SELECT DISTINCT A.nombre, E.id_encuesta
    FROM ENCUESTA E
    JOIN PREGUNTA P
	ON p.id_encuesta = E.id_encuesta
	JOIN RESPUESTA R
	ON R.id_pregunta = P.id_pregunta
	JOIN PAIS A
	ON A.id_pais = R.id_pais) R
WHERE R.id_encuesta = E.id_encuesta
GROUP BY E.nombre;



/*CONSULTA 15*/
/*Desplegar los países cuya población sea mayor a la población de los países centroamericanos juntos.*/
SELECT P.nombre Pais, P.poblacion Poblacion, R.total CentroAmerica
FROM PAIS P, (SELECT SUM(P.poblacion) Total FROM PAIS P, REGION R WHERE P.id_region = R.id_region AND R.nombre = 'Centro America') R
WHERE P.poblacion > R.total
ORDER BY P.poblacion ASC;



/*CONSULTA * 16*/
/*Desplegar todos los Jefes de cada profesional que no este en el mismo departamento que el del profesional que atiende al inventor Pasteur.*/
SELECT P.nombre Jefe, F.nombre Profecional, A.nombre Area
FROM PROFECIONAL F
JOIN PROFECION N
ON N.id_profecional = F.id_profecional
JOIN AREA A
ON A.id_area = N.id_area
JOIN (SELECT P.nombre, J.id_area
	FROM PROFECIONAL P, JEFE J
	WHERE J.id_profecional = P.id_profecional) P
ON P.id_area = A.id_area
JOIN (SELECT A.nombre, A.id_area
	FROM SUPERVICION S
    JOIN PROFECIONAL P
    ON S.id_profecional = P.id_profecional
    JOIN INVENTO I
    ON I.id_invento = S.id_invento
    JOIN INVENCION V
    ON V.id_invento = I.id_invento
    JOIN INVENTOR T
    ON T.id_inventor = V.id_inventor
    JOIN PROFECION F
    ON F.id_profecional = P.id_profecional
    JOIN AREA A
    ON A.id_area = F.id_area
    WHERE T.nombre = 'Pasteur'
    ) O
ON O.nombre != A.nombre
WHERE P.nombre != 'KING PRESIDENT';



/*CONSULTA 17*/
/*Desplegar el nombre de todos los inventos inventados el mismo año que BENZ invento algún invento.*/
SELECT I.nombre Invento, I.año Año
FROM INVENTO I, (
	SELECT I.año
	FROM INVENTO I
	JOIN INVENCION V
	ON V.id_invento = I.id_invento
	JOIN INVENTOR T
	ON T.id_inventor = V.id_inventor
	WHERE T.nombre = 'BENZ'
	) R
WHERE I.año = R.año;



/*CONSULTA * 18*/
/*Desplegar los nombres y el número de habitantes de todas las islas que tiene un área mayor o igual al área de Japón*/
SELECT P.nombre Pais, P.poblacion Poblacion, P.area Area, J.area AreaJapon
FROM PAIS P
JOIN (SELECT P.area 
	FROM PAIS P
    WHERE P.nombre = 'Japón'
    ) J
ON J.area <= P.area
JOIN (
	SELECT P.id_pais
    FROM PAIS P
    WHERE NOT EXISTS (SELECT id_pais FROM FRONTERA F WHERE P.id_pais = F.id_pais)
	) F
ON F.id_pais = P.id_pais
WHERE P.nombre != 'Japón';



/*CONSULTA * 19*/
/*Desplegar todos los países con el nombre de cada país con el cual tiene una frontera.*/
SELECT P.nombre, F.nombre, R.total Total
FROM PAIS P
JOIN (
	SELECT F.id_pais, F.id_pais_frontera, COUNT(F.id_pais) Total
	FROM FRONTERA F
	GROUP BY F.id_pais, F.id_pais_frontera
	) R
ON R.id_pais = P.id_pais
JOIN PAIS F
ON F.id_pais = R.id_pais_frontera
WHERE R.total = 1
ORDER BY P.nombre ASC;


/*CONSULTA 20*/
/*Desplegar el nombre del profesional su salario y su comisión de los empleados cuyo salario es mayor que el doble de su comisión.*/
SELECT P.nombre Profecional, P.salario Salario, P.comision Comision
FROM PROFECIONAL P
WHERE P.salario > P.comision * 2;



