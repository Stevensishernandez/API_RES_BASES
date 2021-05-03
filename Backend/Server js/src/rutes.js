const mysql = require('mysql');
const uuid = require('uuid');
const Router = require("express");
const app = Router();
const aws_keys = require('./users');


//MySQL base de datos
var connection = mysql.createPool(aws_keys.db_credentials);


app.get('/c1', async function(req, res){
  var sql="SELECT P.nombre c1, COUNT(P.nombre) c2 " +
      "FROM PROFECIONAL P " +
      "JOIN SUPERVICION S " +
      "ON S.id_profecional = P.id_profecional " +
      "GROUP BY c1 " +
      "ORDER BY c2 DESC;"
  connection.query(sql, function (error, result){
      if(error){
        res.end();
        console.log(error)
      }else{
        console.log(result)
        res.json(result);
        res.end();
      }
  });
});

app.get('/c2', async function(req, res){
  var sql="(SELECT C.nombre c1, P.nombre c2, COUNT(P.nombre) c3 " +
      "FROM PAIS P " +
      "JOIN REGION R " +
      "ON R.id_region = P.id_region " +
      "JOIN REGION C " +
      "ON C.id_region = R.id_region_padre " +
      "JOIN RESPUESTA T " +
      "ON T.id_pais = P.id_pais " +
      "GROUP BY c2 " +
      ") " +
      "UNION ALL " +
      "(SELECT C.nombre c1, P.nombre c2, 0 c3 " +
      "FROM PAIS P " +
      "JOIN REGION R " +
      "ON R.id_region = P.id_region " +
      "JOIN REGION C " +
      "ON C.id_region = R.id_region_padre " +
      "JOIN RESPUESTA T " +
      "ON T.id_pais != P.id_pais " +
      "GROUP BY c2) " +
      "ORDER BY c3 DESC;"
  connection.query(sql, function (error, result){
      if(error){
        res.end();
        console.log(error)
      }else{
        res.json(result);
        res.end();
      }
  });
});

app.get('/c3', async function(req, res){
  var sql="SELECT P.nombre c1, P.area c2 " +
      "FROM PAIS P " +
      "WHERE NOT EXISTS (SELECT * FROM FRONTERA F WHERE F.id_pais = P.id_pais) " +
      "GROUP BY P.nombre " +
      "ORDER BY P.area ASC;"
  connection.query(sql, function (error, result){
      if(error){
        res.end();
        console.log(error)
      }else{
        res.json(result);
        res.end();
      }
  });
});

app.get('/c4', async function(req, res){
  var sql="SELECT P.nombre c1, S.nombre c2, A.nombre c3 " +
      "FROM PROFECIONAL S " +
      "JOIN PROFECION F " +
      "ON F.id_profecional = S.id_profecional " +
      "JOIN (SELECT P.nombre, J.id_profecional, J.id_area FROM PROFECIONAL P, JEFE J WHERE J.id_profecional = P.id_profecional) P " +
      "ON P.id_profecional != S.id_profecional AND P.nombre != 'KING PRESIDENT' " +
      "JOIN AREA A " +
      "ON A.id_area = P.id_area AND P.id_area = F.id_area  " +
      "ORDER BY P.nombre;"
  connection.query(sql, function (error, result){
      if(error){
        res.end();
        console.log(error)
      }else{
        res.json(result);
        res.end();
      }
  });
});

app.get('/c5', async function(req, res){
  var sql="SELECT P.nombre c1, P.salario c2, A.nombre c3, M.promedio c4 " +
      "FROM PROFECIONAL P " +
      "JOIN PROFECION F " +
      "ON F.id_profecional = P.id_profecional " +
      "JOIN AREA A " +
      "ON A.id_area = F.id_area " +
      "JOIN (SELECT AVG(P.salario) PROMEDIO, A.nombre " +
      "  FROM PROFECIONAL P, PROFECION F, AREA A " +
      "  WHERE P.id_profecional = F.id_profecional AND F.id_area = A.id_area " +
      "  Group by A.nombre) M " +
      "ON M.nombre = A.nombre " +
      "WHERE P.salario > M.promedio " +
      "ORDER BY A.nombre ASC;"
  connection.query(sql, function (error, result){
      if(error){
        res.end();
        console.log(error)
      }else{
        res.json(result);
        res.end();
      }
  });
});

app.get('/c6', async function(req, res){
  var sql="SELECT P.nombre c1, COUNT(P.nombre) c2 " +
      "FROM PAIS P " +
      "JOIN RESPUESTA R " +
      "ON R.id_pais = P.id_pais " +
      "JOIN PREGUNTA E " +
      "ON E.id_pregunta = R.id_pregunta " +
      "JOIN OPCION O " +
      "ON O.id_pregunta = E.id_pregunta " +
      "JOIN CORRECTA C " +
      "ON C.id_opcion = O.id_opcion " +
      "WHERE R.respuesta = SUBSTRING(O.opcion, 1, 1) " +
      "GROUP BY P.nombre " +
      "ORDER BY c2 DESC;"
  connection.query(sql, function (error, result){
      if(error){
        res.end();
        console.log(error)
      }else{
        res.json(result);
        res.end();
      }
  });
});

app.get('/c7', async function(req, res){
  var sql="SELECT I.nombre c1, P.nombre c2, A.nombre c3 " +
      "FROM INVENTO I " +
      "JOIN SUPERVICION S " +
      "ON S.id_invento = I.id_invento " +
      "JOIN PROFECIONAL P " +
      "ON P.id_profecional = S.id_profecional " +
      "JOIN PROFECION F " +
      "ON F.id_profecional = P.id_profecional " +
      "JOIN AREA A " +
      "ON A.id_area = F.id_area " +
      "WHERE A.nombre = 'Óptica';"
  connection.query(sql, function (error, result){
      if(error){
        res.end();
        console.log(error)
      }else{
        res.json(result);
        res.end();
      }
  });
});

app.get('/c8', async function(req, res){
  var sql="SELECT SUBSTRING(P.nombre, 1, 1) c1, SUM(P.area) c2 " +
      "FROM PAIS P " +
      "GROUP BY c1 " +
      "ORDER BY c1 ASC;"
  connection.query(sql, function (error, result){
      if(error){
        res.end();
        console.log(error)
      }else{
        res.json(result);
        res.end();
      }
  });
});

app.get('/c9', async function(req, res){
  var sql="SELECT I.nombre c1, V.nombre c2 " +
      "FROM INVENTOR I " +
      "JOIN INVENCION C " +
      "ON C.id_inventor = I.id_inventor " +
      "JOIN INVENTO V " +
      "ON V.id_invento = C.id_invento " +
      "WHERE SUBSTRING(I.nombre, 1, 2) = 'BE';"
  connection.query(sql, function (error, result){
      if(error){
        res.end();
        console.log(error)
      }else{
        res.json(result);
        res.end();
      }
  });
});

app.get('/c10', async function(req, res){
  var sql="SELECT I.nombre c1, V.nombre c2, V.año c3 " +
      "FROM INVENTOR I " +
      "JOIN INVENCION C " +
      "ON C.id_inventor = I.id_inventor " +
      "JOIN INVENTO V " +
      "ON V.id_invento = C.id_invento " +
      "WHERE I.nombre LIKE 'B%' AND (I.nombre LIKE '%R' OR I.nombre LIKE '%N') AND V.año < 1901 AND V.año > 1800;"
  connection.query(sql, function (error, result){
      if(error){
        res.end();
        console.log(error)
      }else{
        res.json(result);
        res.end();
      }
  });
});

app.get('/c11', async function(req, res){
  var sql="SELECT P.nombre c1, P.area c2, F.fronteras c3 " +
      "FROM PAIS P " +
      "JOIN (SELECT F.id_pais, COUNT(F.id_pais) Fronteras FROM FRONTERA F GROUP BY F.id_pais) F " +
      "ON F.id_pais = P.id_pais " +
      "WHERE F.fronteras > 7 " +
      "ORDER BY P.area DESC;"
  connection.query(sql, function (error, result){
      if(error){
        res.end();
        console.log(error)
      }else{
        res.json(result);
        res.end();
      }
  });
});

app.get('/c12', async function(req, res){
  var sql="SELECT I.nombre c1 " +
      "FROM INVENTO I " +
      "WHERE I.nombre LIKE 'L___';"
  connection.query(sql, function (error, result){
      if(error){
        res.end();
        console.log(error)
      }else{
        res.json(result);
        res.end();
      }
  });
});

app.get('/c13', async function(req, res){
  var sql="SELECT P.nombre c1, P.salario c2, P.comision c3, (P.salario + P.comision) c4 " +
      "FROM PROFECIONAL P " +
      "WHERE P.comision > P.salario * 0.25;"
  connection.query(sql, function (error, result){
      if(error){
        res.end();
        console.log(error)
      }else{
        res.json(result);
        res.end();
      }
  });
});

app.get('/c14', async function(req, res){
  var sql="SELECT E.nombre c1, COUNT(E.nombre) c2 " +
      "FROM ENCUESTA E, " +
      "  (SELECT DISTINCT A.nombre, E.id_encuesta " +
      "    FROM ENCUESTA E " +
      "    JOIN PREGUNTA P " +
      "  ON p.id_encuesta = E.id_encuesta " +
      "  JOIN RESPUESTA R " +
      "  ON R.id_pregunta = P.id_pregunta " +
      "  JOIN PAIS A " +
      "  ON A.id_pais = R.id_pais) R " +
      "WHERE R.id_encuesta = E.id_encuesta " +
      "GROUP BY E.nombre;"
  connection.query(sql, function (error, result){
      if(error){
        res.end();
        console.log(error)
      }else{
        res.json(result);
        res.end();
      }
  });
});

app.get('/c15', async function(req, res){
  var sql="SELECT P.nombre c1, P.poblacion c2, R.total c3 " +
      "FROM PAIS P, (SELECT SUM(P.poblacion) Total FROM PAIS P, REGION R WHERE P.id_region = R.id_region AND R.nombre = 'Centro America') R " +
      "WHERE P.poblacion > R.total " +
      "ORDER BY P.poblacion ASC;"
  connection.query(sql, function (error, result){
      if(error){
        res.end();
        console.log(error)
      }else{
        res.json(result);
        res.end();
      }
  });
});

app.get('/c16', async function(req, res){
  var sql="SELECT P.nombre c1, F.nombre c2, A.nombre c3 " +
      "FROM PROFECIONAL F " +
      "JOIN PROFECION N " +
      "ON N.id_profecional = F.id_profecional " +
      "JOIN AREA A " +
      "ON A.id_area = N.id_area " +
      "JOIN (SELECT P.nombre, J.id_area " +
      "  FROM PROFECIONAL P, JEFE J " +
      "  WHERE J.id_profecional = P.id_profecional) P " +
      "ON P.id_area = A.id_area " +
      "JOIN (SELECT A.nombre, A.id_area " +
      "    FROM SUPERVICION S " +
      "    JOIN PROFECIONAL P " +
      "    ON S.id_profecional = P.id_profecional " +
      "    JOIN INVENTO I " +
      "    ON I.id_invento = S.id_invento " +
      "    JOIN INVENCION V " +
      "    ON V.id_invento = I.id_invento " +
      "    JOIN INVENTOR T " +
      "    ON T.id_inventor = V.id_inventor " +
      "    JOIN PROFECION F " +
      "    ON F.id_profecional = P.id_profecional " +
      "    JOIN AREA A " +
      "    ON A.id_area = F.id_area " +
      "    WHERE T.nombre = 'Pasteur' " +
      "    ) O " +
      "ON O.nombre != A.nombre " +
      "WHERE P.nombre != 'KING PRESIDENT';"
  connection.query(sql, function (error, result){
      if(error){
        res.end();
        console.log(error)
      }else{
        res.json(result);
        res.end();
      }
  });
});

app.get('/c17', async function(req, res){
  var sql="SELECT I.nombre c1, I.año c2 " +
      "FROM INVENTO I, ( " +
        "  SELECT I.año " +
        "  FROM INVENTO I " +
        "  JOIN INVENCION V " +
        "  ON V.id_invento = I.id_invento " +
        "  JOIN INVENTOR T " +
        "  ON T.id_inventor = V.id_inventor " +
        "  WHERE T.nombre = 'BENZ' " +
        "  ) R " +
        "WHERE I.año = R.año;"
  connection.query(sql, function (error, result){
      if(error){
        res.end();
        console.log(error)
      }else{
        res.json(result);
        res.end();
      }
  });
});

app.get('/c18', async function(req, res){
  var sql="SELECT P.nombre c1, P.poblacion c2, P.area c3, J.area c4 " +
      "FROM PAIS P " +
      "JOIN (SELECT P.area  " +
      "  FROM PAIS P " +
      "    WHERE P.nombre = 'Japón' " +
      "    ) J " +
      "ON J.area <= P.area " +
      "JOIN ( " +
        "  SELECT P.id_pais " +
        "    FROM PAIS P " +
        "    WHERE NOT EXISTS (SELECT id_pais FROM FRONTERA F WHERE P.id_pais = F.id_pais) " +
        "  ) F " +
      "ON F.id_pais = P.id_pais " +
      "WHERE P.nombre != 'Japón';"
  connection.query(sql, function (error, result){
      if(error){
        res.end();
        console.log(error)
      }else{
        res.json(result);
        res.end();
      }
  });
});

app.get('/c19', async function(req, res){
  var sql="SELECT P.nombre c1, F.nombre c2, R.total c3 " +
  "FROM PAIS P " +
  "JOIN ( " +
  "  SELECT F.id_pais, F.id_pais_frontera, COUNT(F.id_pais) Total " +
  "  FROM FRONTERA F " +
  "  GROUP BY F.id_pais, F.id_pais_frontera " +
  "  ) R " +
  "ON R.id_pais = P.id_pais " +
  "JOIN PAIS F " +
  "ON F.id_pais = R.id_pais_frontera " +
  "WHERE R.total = 1 " +
  "ORDER BY P.nombre ASC;";
  connection.query(sql, function (error, result){
      if(error){
        res.end();
        console.log(error)
      }else{
        res.json(result);
        res.end();
      }
  });
});

app.get('/c20', async function(req, res){
  var sql="SELECT P.nombre c1, P.salario c2, P.comision c3 " +
  "FROM PROFECIONAL P " +
  "WHERE P.salario > P.comision * 2;";
  connection.query(sql, function (error, result){
      if(error){
        res.end();
        console.log(error)
      }else{
        res.json(result);
        res.end();
      }
  });
});

app.get('/paises', async function(req, res){
    var sql="SELECT P.id_pais ID, P.nombre, P.capital, P.poblacion, P.area,R.id_region, R.nombre Region FROM PAIS P "+
    "INNER JOIN REGION R ON (P.id_region=R.id_region)"+ 
    "ORDER BY P.id_pais DESC ;";
    connection.query(sql, function (error, result){
        if(error){
          res.end();
          console.log(error)
        }else{
          res.json(result);
          res.end();
        }
    });
  });

  app.get('/regiones', async function(req, res){
    var sql="SELECT * FROM REGION;";
    connection.query(sql, function (error, result){
        if(error){
          res.end();
          console.log(error)
        }else{
          res.json(result);
          res.end();
        }
    });
  });

  app.post('/AddContry', async function(req, res){
    var c=req.body;
    var sql="INSERT INTO PAIS (nombre, capital, poblacion, area, id_region) VALUES(?,?,?,?,?);";
    connection.query(sql, [c.nombre,c.capital,c.poblacion,c.area,c.id_region], function (error, result){
        if(error){
          res.end();
          console.log(error)
        }else{
          res.json(result);
          res.end();
        }
    });
  });

  app.post('/DeleteContry', async function(req, res){
    var c=req.body;
    var sql="DELETE FROM PAIS WHERE pais.id_pais=?;";
    connection.query(sql, [c.id_pais], function (error, result){
        if(error){
          res.end();
          console.log(error)
        }else{
          res.json(result);
          res.end();
        }
    });
  });

  app.post('/UpdateContry', async function(req, res){
    var c=req.body;
    var sql="UPDATE PAIS SET nombre=?, capital=?, poblacion=?, area=?, id_region=? WHERE id_pais=?;";
    connection.query(sql, [c.nombre,c.capital,c.poblacion,c.area,c.id_region,c.id_pais], function (error, result){
        if(error){
          res.end();
          console.log(error)
        }else{
          res.json(result);
          res.end();
        }
    });
  });

  app.get('/Preguntas', async function(req, res){
    var sql="SELECT P.id_pregunta, P.pregunta, P.id_encuesta, E.nombre FROM PREGUNTA P "+
    "INNER JOIN ENCUESTA E ON (E.id_encuesta=P.id_encuesta) ORDER BY P.id_pregunta DESC ; ";
    connection.query(sql, function (error, result){
        if(error){
          res.end();
          console.log(error)
        }else{
          res.json(result);
          res.end();
        }
    });
  });

  app.get('/encuestas', async function(req, res){
    var sql="SELECT * FROM ENCUESTA;";
    connection.query(sql, function (error, result){
        if(error){
          res.end();
          console.log(error)
        }else{
          res.json(result);
          res.end();
        }
    });
  });

  app.post('/AddQuestion', async function(req, res){
    var c=req.body;
    var sql="INSERT INTO PREGUNTA (pregunta, id_encuesta) VALUES(?,?);";
    connection.query(sql, [c.pregunta, c.id_encuesta], function (error, result){
        if(error){
          res.end();
          console.log(error)
        }else{
          res.json(result);
          res.end();
        }
    });
  });

  app.post('/DeleteQuestion', async function(req, res){
    var c=req.body;
    var sql="DELETE FROM PREGUNTA WHERE id_pregunta=?;";
    connection.query(sql, [c.id_pregunta], function (error, result){
        if(error){
          res.end();
          console.log(error)
        }else{
          res.json(result);
          res.end();
        }
    });
  });

  app.post('/UpdateQuestion', async function(req, res){
    var c=req.body;
    var sql="UPDATE PREGUNTA SET pregunta=?, id_encuesta=? WHERE id_pais=?;";
    connection.query(sql, [c.pregunta, c.id_encuesta, c.id_pregunta ], function (error, result){
        if(error){
          res.end();
          console.log(error)
        }else{
          res.json(result);
          res.end();
        }
    });
  });

  app.get('/Inventos', async function(req, res){
    var sql="SELECT I.id_invento, I.id_inventor, IR.nombre AS Inventor, IV.nombre AS Ivento, IV.año As anio FROM INVENCION I "+
    " INNER JOIN INVENTO IV ON (IV.id_invento=I.id_invento) "+
    " INNER JOIN INVENTOR IR ON (IR.id_inventor=I.id_inventor); ";
    connection.query(sql, function (error, result){
        if(error){
          res.end();
          console.log(error)
        }else{
          res.json(result);
          res.end();
        }
    });
  });

  app.get('/Inventores', async function(req, res){
    var sql=" SELECT * FROM INVENTOR; ";
    connection.query(sql, function (error, result){
        if(error){
          res.end();
          console.log(error)
        }else{
          res.json(result);
          res.end();
        }
    });
  });

  app.post('/UpdateInvento', async function(req, res){
    var c=req.body;
    var sql="UPDATE INVENTO SET nombre=?, año=? WHERE id_invento=?;";
    connection.query(sql, [c.nombre, c.anio, c.id_invento ], function (error, result){
        if(error){
          res.end();
          console.log(error)
        }else{
          res.json(result);
          res.end();
        }
    });
  });

  app.post('/UpdateInvencion', async function(req, res){
    var c=req.body;
    var sql="UPDATE INVENCION SET id_inventor=? WHERE id_invento=? and id_inventor=?;";
    connection.query(sql, [ c.id_inventor, c.id_invento, c.new ], function (error, result){
        if(error){
          res.end();
          console.log(error)
        }else{
          res.json(result);
          res.end();
        }
    });
  });

  app.get('/Respuestas', async function(req, res){
    var sql=" SELECT P.pregunta, O.opcion, C.id_pregunta, C.id_opcion FROM CORRECTA C "+
    " INNER JOIN PREGUNTA P ON (P.id_pregunta=C.id_pregunta) "+
    " INNER JOIN OPCION O ON (O.id_opcion=C.id_opcion); ";
    connection.query(sql, function (error, result){
        if(error){
          res.end();
          console.log(error)
        }else{
          res.json(result);
          res.end();
        }
    });
  });

  app.post('/Opciones', async function(req, res){
    var c=req.body;
    var sql="SELECT * FROM OPCION WHERE id_pregunta=?;";
    connection.query(sql, [c.id_pregunta ], function (error, result){
        if(error){
          res.end();
          console.log(error)
        }else{
          res.json(result);
          res.end();
        }
    });
  });

  app.post('/UpdateAnswer', async function(req, res){
    var c=req.body;
    var sql="UPDATE CORRECTA SET id_opcion=? WHERE id_pregunta=? and id_opcion=?;";
    connection.query(sql, [ c.id_opcion, c.id_pregunta, c.old ], function (error, result){
        if(error){
          res.end();
          console.log(error)
        }else{
          res.json(result);
          res.end();
        }
    });
  });



module.exports = app;