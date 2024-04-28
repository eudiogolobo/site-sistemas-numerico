$(document).ready(()=>{

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
      
    })



    $('#octal').keyup(function () { 
        this.value = this.value.replace(/[^0-7]/,'').replace(' ','');

        $('#decimal').val(polinomio($('#octal').val(), 8))

        $('#binario').val(groupBits('octal',$('#octal').val(), 3))

    })



    $('#hexadecimal').keyup(function () { 
        this.value = this.value.replace(/[^A-Fa-f 0-9]/,'').replace(' ','');

        $('#decimal').val(polinomio($('#hexadecimal').val(), 16))

        $('#binario').val(groupBits('hexadecimal',$('#hexadecimal').val(), 4))

    })

 

    $('#binario').keyup(function (){
        
        this.value = this.value.replace(/[^0-1]/, '').replace(' ', '')

      
        $('#decimal').val(polinomio($('#binario').val(), 2)) 

        $('#hexadecimal').val(groupBits('binario',$('#binario').val(), 4))

        $('#octal').val(groupBits('binario',$('#binario').val(), 3))

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



        countBits = 0

        for(let item of arrayList)
        {
            
            arrayList[countBits] = polinomio(item, 2)
            countBits += 1
        }

        if(bits == 4)
        {
            arrayList = (arrayList.reverse().toString()).replaceAll('10', 'A').replaceAll('11', 'B').replaceAll('12', 'C').replaceAll('13', 'D').replaceAll('14', 'E').replaceAll('15', 'F').replaceAll(',','')
            
        }

        if(bits == 3)
        {
            arrayList = (arrayList.reverse().toString()).replaceAll(',','')
        }


    }

    numberDecimal = 0

    if(sistema == 'octal')
    {
        numberDecimal = polinomio(numberGp, 8)
        arrayList = divisaoFunction(numberDecimal, 2)

        $('#hexadecimal').val( divisaoFunction(numberDecimal, 16))
    }

    if(sistema == 'hexadecimal')
    {
        numberDecimal = polinomio(numberGp, 16)
        arrayList = divisaoFunction(numberDecimal, 2)
    

        $('#octal').val( divisaoFunction(numberDecimal, 8))
    }
   
       
    return arrayList
    
}

   
    


function polinomio(number, base)
{
    newNumber = 0
    numberPosition = 0
    number = number.split("").reverse().join("")

    

    for(i = 0; i < number.length; i++)
    {
        numberPosition = 0

        if(isNaN(number[i]) == false){

            newNumber += number[i] * Math.pow(base, i)

           

        } else{

            numberPosition = (number[i].toUpperCase()).replaceAll('A','10').replaceAll('B','11').replaceAll('C','12').replaceAll('D',13).replaceAll('E','14').replaceAll('F','15')
            
            newNumber += numberPosition * Math.pow(base, i)

            
        }

       
    }

    
    return newNumber 
    
}




function divisaoFunction(number, base){

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

            number = (number / base)|0;

          

            

            newNumber[count] =  resto;

            count += 1;

    }

   
    console.log(newNumber)
    if(base == 2)
    {
        newNumber =  (newNumber.reverse().toString()).replaceAll(',','')
        return newNumber
    }
  

        newNumber = newNumber.reverse()

        countB = 0

       while(true)
        {
            if(newNumber[countB] === 0)
            {
                newNumber.splice(countB, 1)

              
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
    }

    if(base == 16)
    {
        newNumber =((newNumber.toString()).replaceAll('10', 'A').replaceAll('11', 'B').replaceAll('12', 'C').replaceAll('13', 'D').replaceAll('14', 'E').replaceAll('15', 'F')).replaceAll(',','')
    }

    return newNumber

}