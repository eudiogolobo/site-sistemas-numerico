$(document).ready(()=>{

    htmlCalculo = ''
    col = '<tr><td>0</td><td>0</td><td>0</td><td>0</td></tr>'
    for(var r = 1; r <= 20; r++)
    {
        col += '<tr>'
        col+='<td>'+r+'</td>'
        col+='<td>'+divisaoFunction(r, 16)+'</td>'
        col+='<td>'+divisaoFunction(r, 8)+'</td>'
        col+='<td>'+divisaoFunction(r, 2)+'</td>'
        col+= '</tr>'
    }

    $('#datatable-numbers').html(col)

    /*---------------------------------------------------------------------------*/

   
    $('#modal-redirect').modal('show')

    

    $('#link-calculadora').addClass('active')

    $('#decimal').mask("000000000")
    $('#octal').mask("000000000")
    $('#binario').mask("000000000000")

    $('#decimal').keyup(function(){

        $('#binario').val(divisaoFunction($('#decimal').val(), 2))

        $('#octal').val(divisaoFunction($('#decimal').val(), 8))
        $('#hexadecimal').val(divisaoFunction($('#decimal').val(), 16))
        htmlCalculo = ''
      
    })



    $('#octal').keyup(function () { 
        this.value = this.value.replace(/[^0-7]/,'').replace(' ','');

        $('#decimal').val(polinomio($('#octal').val(), 8))
        groupBits('octalHexadecimal',$('#octal').val(), 3)
        $('#binario').val(groupBits('octalBinario',$('#octal').val(), 3))
        htmlCalculo = ''

    })



    $('#hexadecimal').keyup(function () { 
        this.value = this.value.replace(/[^A-Fa-f 0-9]/,'').replace(' ','');

        $('#decimal').val(polinomio($('#hexadecimal').val(), 16))

        groupBits('hexadecimalOctal',$('#hexadecimal').val(), 4)

        $('#binario').val(groupBits('hexadecimalBinario',$('#hexadecimal').val(), 4))
        htmlCalculo = ''

    })

 

    $('#binario').keyup(function (){
        
        this.value = this.value.replace(/[^0-1]/, '').replace(' ', '')

      
        $('#decimal').val(polinomio($('#binario').val(), 2)) 

        $('#hexadecimal').val(groupBits('binario',$('#binario').val(), 4))

        $('#octal').val(groupBits('binario',$('#binario').val(), 3))
        htmlCalculo = ''

    })
})

function groupBits(sistema,numberGp, bits){
   
    countBits = 0
    arrayList = []
    breaking = ''
    wordTemp = ''

    if(sistema == 'binario')
    {
        numberGp = numberGp.split('').reverse().join('')

        htmlCalculo += '<h5 class="mt-5">Vamos inverter o número binário para conseguirmos calcular</h5><hr><p>Ele vai ficar assim: '+numberGp+'</p>'

        divisao = Math.ceil(numberGp.length / bits);

        for(z = 0; z < divisao; z++)
        {
            if(numberGp.substr(countBits, bits) != ''){

                if(countBits === 0)
                {
                    arrayList.push(numberGp.substr(countBits,bits))

                }else{
                    arrayList.push(numberGp.substr(countBits, bits))
            
                }
        

                wordTemp = arrayList[z]
                wordTemp = wordTemp.split('').reverse().join('')

                arrayList[z] = wordTemp

                
                
            }

            countBits += bits
            
        }
        
        htmlCalculo += '<h5 class="mt-5">Vamos quebrar o número em binário em grupos de '+bits+'</h5><hr><p>Então vai ficar assim: '+arrayList+'</p>'


        countBits = 0

        for(let item of arrayList)
        {
            
            arrayList[countBits] = polinomio(item, 2)
            countBits += 1
        }

        if(bits == 4)
        {
            htmlCalculo += '<h5 class="mt-5">Resultado dos agrupamentos de 4 bits</h5><hr><p><strong>Resultado = </strong>'+arrayList+'</p>'
           
            arrayList = (arrayList.reverse().toString()).replaceAll('10', 'A').replaceAll('11', 'B').replaceAll('12', 'C').replaceAll('13', 'D').replaceAll('14', 'E').replaceAll('15', 'F').replaceAll(',','')

            htmlCalculo += '<h5 class="mt-5">Inverter a ordem dos resultados e substituir letras por números equivalentes</h5><hr><p>Agora iremos inverter a ordem dos resultados que havíamos invertido para realizar o cálculo e substituir as letras pelos números equivalentes.</p><p> Ficará: '+arrayList+'</p>'

        }

        if(bits == 3)
        {
            htmlCalculo += '<h5 class="mt-5">Resultado dos agrupamentos de 4 bits</h5><hr><p><strong>Resultado = </strong>'+arrayList+'</p>'
            arrayList = (arrayList.reverse().toString()).replaceAll(',','')
            htmlCalculo += '<h5 class="mt-5">Inverter a ordem dos resultados e substituir letras por números equivalentes</h5><hr><p>Agora iremos inverter a ordem dos resultados que havíamos invertido para realizar o cálculo e substituir as letras pelos números equivalentes.</p><p> Ficará: '+arrayList+'</p>'
        }


    }

    numberDecimal = 0

    if(sistema == 'octalHexadecimal')
    {
        numberDecimal = polinomio(numberGp, 8)
         $('#hexadecimal').val( divisaoFunction(numberDecimal, 16))
         return 
    }

    if(sistema == 'octalBinario')
    {
        numberDecimal = polinomio(numberGp, 8)
        arrayList = divisaoFunction(numberDecimal, 2)
    }

    if(sistema == 'hexadecimalOctal')
    {
        numberDecimal = polinomio(numberGp, 16)
       
        return $('#octal').val( divisaoFunction(numberDecimal, 8))
        
    }


    if(sistema == 'hexadecimalBinario')
    {
        numberDecimal = polinomio(numberGp, 16)
        arrayList = divisaoFunction(numberDecimal, 2)
       
    }
   
       
    return arrayList
    
}

   
    


function polinomio(number, base)
{
  
    newNumber = 0
    numberPosition = 0
    
    number = number.split("").reverse().join("")
    if(number.length > 1)
    { 
        htmlCalculo +='<h5 class="mt-5">Inverter</h5><hr><p>Podemos inverter o número, teremos então: '+number+'</p>' 
        htmlCalculo += '<h5 class="mt-5">Calcular as potências</h5><hr></hr>' 
    } else{
        htmlCalculo += '<h5 class="mt-5">Calcular a potência</h5><hr></hr>'
    }
   
    
    console.log(htmlCalculo)
   
    for(i = 0; i < number.length; i++)
    {
        numberPosition = 0

        if(isNaN(number[i]) == false){

            htmlCalculo +='<div class="col-6 col-sm-4 col-md-3"><p> '+number[i]+' X '+base+'<sup>'+i+'</sup>  = '+number[i] * Math.pow(base, i)+'</p></div>' 
            newNumber += number[i] * Math.pow(base, i)
       
           

        } else{

            numberPosition = (number[i].toUpperCase()).replaceAll('A','10').replaceAll('B','11').replaceAll('C','12').replaceAll('D',13).replaceAll('E','14').replaceAll('F','15')
            htmlCalculo +='<p> '+number[i]+' X '+base+'<sup>'+i+'</sup>  = '+numberPosition * Math.pow(base, i)+'</p>' 
            newNumber += numberPosition * Math.pow(base, i)

            
        }

       
    }

    htmlCalculo += '<h5 class="mt-5">Somar as potências</h5><hr></hr><p>Em seguida somaremos todos os resultados do passo anteriror. <b>Soma </b>= '+ newNumber +'</p>'
    
    return newNumber 
    
}




function divisaoFunction(number, base){
htmlCalculo += '<h5 class="mt-5">Divisão</h5><hr>'
newNumber = []
count = 0
resto = 0


    while(true)
    {

         if(number <= 1){

            newNumber[count] =  number;
            break

         }
            resto = (number % base);
    

            htmlCalculo += '<p> '+ number +' / '+ base +' = '+ ((number / base)|0) +' -> Resto = '+(number % base)+'</p>'

            number = (number / base)|0;

        
          

            

            newNumber[count] =  resto;

            count += 1;

    }

    htmlCalculo += '<p>Então teremos como resultado das divisões: '+newNumber+'</p>'

    if(base == 2)
    {
        newNumber =  (newNumber.reverse().toString()).replaceAll(',','')
        htmlCalculo +='<h5 class="mt-5">Inverter</h5><hr><p>Agora vamos inverter a ordem dos resultados, teremos então: '+newNumber+'</p>'
        htmlCalculo +='<h5 class="mt-5">Resultado</h5><hr><p> <strong>Resultado: </strong> '+newNumber+'</p>'
              
        return newNumber
    }
  
  

        newNumber = newNumber.reverse()

        htmlCalculo +='<h5 class="mt-5">Inverter</h5><hr><p>Agora vamos inverter a ordem dos resultados, teremos então: '+newNumber+'</p>'
        countB = 0

   
       while(true)
        {
            if(newNumber[countB] === 0)
            {
                newNumber.splice(countB, 1)

                htmlCalculo +='<h5 class="mt-5">Remover zeros à esquerda</h5><hr><p>Vamos remover os zeros à esquerda, ficará: '+newNumber+'</p>'
              
                console.log(newNumber)

            }
            if(newNumber[countB] != 0)
            { 
              
                break; 
                
            }

            countB += 1
            
        }



    if(base == 8)
    {
        newNumber = (newNumber.toString()).replaceAll(',','')
        htmlCalculo +='<h5 class="mt-5">Resultado</h5><hr><p> <strong>Resultado: </strong> '+newNumber+'</p>'
    }

    if(base == 16)
    {

        newNumber =((newNumber.toString()).replaceAll('10', 'A').replaceAll('11', 'B').replaceAll('12', 'C').replaceAll('13', 'D').replaceAll('14', 'E').replaceAll('15', 'F')).replaceAll(',','')
        htmlCalculo +='<h5 class="mt-5">Substituir números por letras equivalentes</h5><hr><p> <strong>Resultado: </strong> '+newNumber+'</p>'
    }

    return newNumber

}