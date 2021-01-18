document.getElementById("submit").addEventListener("click", function(){
    if (document.getElementById("loan").value == '' || document.getElementById("term").value == '' || document.getElementById("interest").value == ''){
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: "You Need To Enter Into All Blanks",
            showConfirmButton: false,
            timer: 2000
        })
    }else {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: "I'm calculating for you!!!",
        showConfirmButton: false,
        timer: 2000
    })
    let loan_amount = 0,
    term = 0,
    interest = 0,
    total_monthly_payment = 0,
    total_interest = 0;
    document.getElementById("table").innerHTML = ''

    loan_amount = parseInt(document.getElementById("loan").value)
    term = parseInt(document.getElementById("term").value)
    interest = parseFloat(document.getElementById("interest").value)
    total_monthly_payment = 0
    total_interest = 0
       
    total_monthly_payment = (loan_amount)*(interest/1200)/(1-(Math.pow(1+interest/1200,(-term))));
    total_monthly_payment = total_monthly_payment.toFixed(2);


    document.getElementById("total_payment").innerText =  total_monthly_payment
        
    let  remaining_balance = 0,
            interest_payment = 0,
            principal_payment = 0;
        for (i=1; i<=term;i++){
            
            if (i == 1){
                remaining_balance = loan_amount
                remaining_balance = remaining_balance
                interest_payment = remaining_balance*interest/1200
                principal_payment = total_monthly_payment - interest_payment
                principal_payment = principal_payment.toFixed(2)
                total_interest = interest_payment
                remaining_balance = loan_amount - principal_payment
            }else if (i == term){
                let total_monthly_payment2 = remaining_balance;
                remaining_balance = remaining_balance - principal_payment
                remaining_balance = Math.round((remaining_balance + Number.EPSILON) * 100) / 100
                interest_payment = remaining_balance*interest/1200
                interest_payment = Math.round((interest_payment + Number.EPSILON) * 100) / 100
                principal_payment = total_monthly_payment2 - interest_payment
                principal_payment = Math.round((principal_payment + Number.EPSILON) * 100) / 100
                total_interest += interest_payment
                total_interest = Math.round((total_interest + Number.EPSILON) * 100) / 100
                total_monthly_payment = total_monthly_payment2
                remaining_balance = 0
            }
            else{
                remaining_balance = remaining_balance - principal_payment
                remaining_balance = Math.round((remaining_balance + Number.EPSILON) * 100) / 100
                interest_payment = remaining_balance*interest/1200
                interest_payment = Math.round((interest_payment + Number.EPSILON) * 100) / 100
                principal_payment = total_monthly_payment - interest_payment
                principal_payment = Math.round((principal_payment + Number.EPSILON) * 100) / 100
                total_interest += interest_payment
                total_interest = Math.round((total_interest + Number.EPSILON) * 100) / 100
            } 
            document.getElementById("table").innerHTML += `<tr><th scope="row">${i}</th><th>${total_monthly_payment}</th><th>${principal_payment}</th><th>${interest_payment}</th><th>${total_interest}</th><th>${remaining_balance}</th></tr>`
            
        }
        document.getElementById("total_principal").innerText = `$${loan_amount}`
        document.getElementById("total_interest").innerText = `$${total_interest}`
        document.getElementById("total_cost").innerText = `$${loan_amount + total_interest}`
        document.getElementById("loan").value = ''
        document.getElementById("term").value = ''
        document.getElementById("interest").value = ''
}})

document.getElementById("clear").addEventListener("click", function(){
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: "Everything is clear!!!",
        showConfirmButton: false,
        timer: 1500
    })
    document.getElementById("table").innerHTML = ''
    document.getElementById("total_principal").innerText = `$0.00`
    document.getElementById("total_interest").innerText = `$0.00`
    document.getElementById("total_cost").innerText = `$0.00`
    document.getElementById("total_payment").innerText = '$0.00'
    document.getElementById("loan").value = ''
    document.getElementById("term").value = ''
    document.getElementById("interest").value = ''
})