import { Component, OnInit } from '@angular/core';

import { GamesService } from '../../services/games.service'

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements OnInit {

  constructor(private consultaService: GamesService) { }
  thead1;
  thead2;
  thead3;
  thead4;
  valor;

  opcion="";
  c1;
  c2;
  c3;
  c4;
  tabla = false;
  consulta;

  ngOnInit(): void {
   
  }

  
  cambio(){
    this.c1=this.c2=this.c3=this.c4=null;
    this.valor=null;
    console.log(this.opcion);
    this.tabla = true;
    if(this.opcion == "1"){
      this.consultaService.getC1().subscribe((res)=>{
        this.valor = <Reporte>res;
        this.c1 = "Profesional";
        this.c2 = "Inventos";
        this.consulta = "1. Desplegar cada profesional, y el número de inventos que tiene asignados ordenados de mayor a menor";
      });

    }else if(this.opcion == "2"){
      this.consultaService.getC2().subscribe((res)=>{
        this.valor = <Reporte>res;
        this.c1 = "Continente";
        this.c2 = "Pais";
        this.c3 = "Contestadas";
        this.consulta = "2. Desplegar los países de cada continente y el número de preguntas que han contestado de cualquier encuesta. Si hay países que no han contestado ninguna encuesta, igual debe aparecer su nombre el la lista";
      });

    }else if(this.opcion == "3"){
      this.consultaService.getC3().subscribe((res)=>{
        this.valor = <Reporte>res;
        this.c1 = "Pais";
        this.c2 = "Area";
        this.consulta = "3. Desplegar todos los países que no tengan ningún inventor y que no tengan ninguna frontera con otro país ordenados por su área";
      });
      
    }else if(this.opcion == "4"){
      this.consultaService.getC4().subscribe((res)=>{
        this.valor = <Reporte>res;
        this.c1 = "Jefe";
        this.c2 = "Subalterno";
        this.c3 = "Area";
        this.consulta = "4. Desplegar el nombre de cada jefe seguido de todos sus subalternos, para todos los profesionales ordenados por el jefe alfabéticamente"
      });
      
    }else if(this.opcion == "5"){
      this.consultaService.getC5().subscribe((res)=>{
        this.valor = <Reporte>res;
        this.c1 = "Profecional";
        this.c2 = "Salario";
        this.c3 = "Area";
        this.c4 = "Promedio";
        this.consulta = "5. Desplegar todos los profesionales, y su salario cuyo salario es mayor al promedio del salario de los profesionales en su misma área"
      });
      
    }else if(this.opcion == "6"){
      this.consultaService.getC6().subscribe((res)=>{
        this.valor = <Reporte>res;
        this.c1 = "Pais";
        this.c2 = "Aciertos";
        this.consulta = "6. Desplegar los nombres de los países que han contestado encuestas, ordenados del país que más aciertos ha tenido hasta el que menos aciertos ha tenido"
      });
      
    }else if(this.opcion == "7"){
      this.consultaService.getC7().subscribe((res)=>{
        this.valor = <Reporte>res;
        this.c1 = "Invento";
        this.c2 = "Profecional";
        this.c3 = "Area";
        this.consulta = "7. Desplegar los inventos documentados por todos los profesionales expertos en Óptica"
      });
      
    }else if(this.opcion == "8"){
      this.consultaService.getC8().subscribe((res)=>{
        this.valor = <Reporte>res;
        this.c1 = "Inicial";
        this.c2 = "Suma";
        this.consulta = "8. Desplegar la suma del área de todos los países agrupados por la inicial de su nombre"
      });
      
    }else if(this.opcion == "9"){
      this.consultaService.getC9().subscribe((res)=>{
        this.valor = <Reporte>res;
        this.c1 = "Inventor";
        this.c2 = "Invento";
        this.consulta = "9. Desplegar todos los inventores y sus inventos cuyo nombre del inventor inicie con las letras BE"
      });
      
    }else if(this.opcion == "10"){
      this.consultaService.getC10().subscribe((res)=>{
        this.valor = <Reporte>res;
        this.c1 = "Inventor";
        this.c2 = "Invento";
        this.c3 = "Año";
        this.consulta = "10 Desplegar el nombre de todos los inventores que Inicien con B y terminen con r o con n que tengan inventos del siglo 19"
      });
      
    }else if(this.opcion == "11"){
      this.consultaService.getC11().subscribe((res)=>{
        this.valor = <Reporte>res;
        this.c1 = "Pais";
        this.c2 = "Area";
        this.c3 = "Fronteras";
        this.consulta = "11. Desplegar el nombre del país y el área de todos los países que tienen mas de siete fronteras ordenarlos por el de mayor área"
      });
      
    }else if(this.opcion == "12"){
      this.consultaService.getC12().subscribe((res)=>{
        this.valor = <Reporte>res;
        this.c1 = "Invento";
        this.consulta = "12. Desplegar todos los inventos de cuatro letras que inicien con L"
      });
      
    }else if(this.opcion == "13"){
      this.consultaService.getC13().subscribe((res)=>{
        this.valor = <Reporte>res;
        this.c1 = "Profecional";
        this.c2 = "Salario";
        this.c3 = "Comision";
        this.c4 = "Total";
        this.consulta = "13. Desplegar el nombre del profesional, su salario, su comisión y el total de salario (sueldo mas comisión) de todos los profesionales con comisión mayor que el 25% de su salario"
      });
      
    }else if(this.opcion == "14"){
      this.consultaService.getC14().subscribe((res)=>{
        this.valor = <Reporte>res;
        this.c1 = "Encuesta";
        this.c2 = "Total";
        this.consulta = "14. Desplegar cada encuesta y el número de países que las han contestado, ordenadas de mayor a menor"
      });
      
    }else if(this.opcion == "15"){
      this.consultaService.getC15().subscribe((res)=>{
        this.valor = <Reporte>res;
        this.c1 = "Pais";
        this.c2 = "Poblacion";
        this.c3 = "Poblacion de Centro America";
        this.consulta = "15. Desplegar los países cuya población sea mayor a la población de los países centroamericanos juntos"
      });
      
    }else if(this.opcion == "16"){
      this.consultaService.getC16().subscribe((res)=>{
        this.valor = <Reporte>res;
        this.c1 = "Jefe";
        this.c2 = "Profecional";
        this.c3 = "Area";
        this.consulta = "16. Desplegar todos los Jefes de cada profesional que no este en el mismo departamento que el del profesional que atiende al inventor Pasteur"
      });
      
    }else if(this.opcion == "17"){
      this.consultaService.getC17().subscribe((res)=>{
        this.valor = <Reporte>res;
        this.c1 = "Invento";
        this.c2 = "Año";
        this.consulta = "17. Desplegar el nombre de todos los inventos inventados el mismo año que BENZ invento algún invento"
      });
      
    }else if(this.opcion == "18"){
      this.consultaService.getC18().subscribe((res)=>{
        this.valor = <Reporte>res;
        this.c1 = "Pais";
        this.c2 = "Poblacion";
        this.c3 = "Area";
        this.c4 = "Area de Japon";
        this.consulta = "18. Desplegar los nombres y el número de habitantes de todas las islas que tiene un área mayor o igual al área de Japón"
      });
      
    }else if(this.opcion == "19"){
      this.consultaService.getC19().subscribe((res)=>{
        this.valor = <Reporte>res;
        this.c1 = "Pais";
        this.c2 = "Frontera";
        this.c3 = "Total";
        this.consulta = "19. Desplegar todos los países con el nombre de cada país con el cual tiene una frontera"
      });
      
    }else if(this.opcion == "20"){
      this.consultaService.getC20().subscribe((res)=>{
        this.valor = <Reporte>res;
        this.c1 = "Profecional";
        this.c2 = "Salario";
        this.c3 = "Comision";
        this.consulta = "20. Desplegar el nombre del profesional su salario y su comisión de los empleados cuyo salario es mayor que el doble de su comisión"
      });
      
    }else{
      alert("Opcion no valida, intente de nuevo");
      this.opcion = this.consulta = "";
      this.tabla = false;
    }

  }
}

interface Reporte{
  c1?:any;
  c2?:any;
  c3?:any;
  c4?:any;
}
