let totalSales = {
    premium: 0,
    diesel: 0,
    unleaded: 0,
    total: 0
};

let totalLiters = {
    premium: 0,
    diesel: 0,
    unleaded: 0
};

let totalTankCapacity = {
    premium: 0,
    diesel:0 ,
    unleaded: 0
};
//getting date
const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString();
//button save data
const SaveGasToDatabasedPremium=document.getElementById("SaveDataBtnPremium");
SaveGasToDatabasedPremium.style.display ="none";
const SaveGasToDatabasedDiesel=document.getElementById("SaveDataBtnDiesel");
SaveGasToDatabasedDiesel.style.display ="none";
const SaveGasToDatabasedUnleaded=document.getElementById("SaveDataBtnUnleaded");
SaveGasToDatabasedUnleaded.style.display ="none";

//main function of the system
function calculateTotal(gasType) {
    const price = parseFloat(document.getElementById(`${gasType}-price`).value);
    const quantity = parseFloat(document.getElementById(`${gasType}-quantity`).value);//current quatitiy liters
    const previousQuantity = parseFloat(document.getElementById(`${gasType}-previous`).value);//previous quantity

    //authentication
    if(!isNaN(price) && !isNaN(quantity) && !isNaN(previousQuantity)){

        const currentLiters = quantity - previousQuantity;
        
        if (currentLiters < 0) {
            alert("Current quantity must be greater than or equal to previous quantity.");
            return;
        }
    
        const total = (currentLiters * price).toFixed(2);

        document.getElementById(`${gasType}-total`).innerText = total;
        // Clear the current quantity in liters
        document.getElementById(`${gasType}-quantity`).value = "";
        // Update previous quantity
        document.getElementById(`${gasType}-previous`).value = quantity;
        // Update total sales
        totalSales[gasType] += parseFloat(total);
        totalSales.total += parseFloat(total);

        // Update total liters
        totalLiters[gasType] += currentLiters;

        // Update display
        document.getElementById('Totalbalance').innerText = `${totalSales.total.toFixed(2)}`;
        document.getElementById('Premium').innerText = `${totalSales.premium.toFixed(2)}`;
        document.getElementById('Diesel').innerText = `${totalSales.diesel.toFixed(2)}`;
        document.getElementById('Unleaded').innerText = `${totalSales.unleaded.toFixed(2)}`;

        // Update and display total/overall liters sold
        document.getElementById(`premium-total-liters-slide`).innerText = `${totalLiters.premium.toFixed(2)}`;
        document.getElementById(`diesel-total-liters-slide`).innerText = `${totalLiters.diesel.toFixed(2)}`;
        document.getElementById(`unleaded-total-liters-slide`).innerText = `${totalLiters.unleaded.toFixed(2)}`;

        //update and display today liter sold
       document.getElementById(`premium-today-litersold`).innerText = `${currentLiters.toFixed(2)}`;
       document.getElementById(`diesel-today-litersold`).innerText = `${currentLiters.toFixed(2)}`;
       document.getElementById(`unleaded-today-litersold`).innerText = `${currentLiters.toFixed(2)}`;
    

        // Update tank capacities
        updateTankCapacities();
        //show the button save to the database
        SaveGasToDatabasedPremium.style.display ="inline-block";
        SaveGasToDatabasedDiesel.style.display ="inline-block";
        SaveGasToDatabasedUnleaded.style.display ="inline-block";

    }else{
        alert("Something is missing");
        SaveGasToDatabasedPremium.style.display ="none";
        SaveGasToDatabasedDiesel.style.display ="none";
        SaveGasToDatabasedUnleaded.style.display ="none";
    }

}

function updateTankCapacities() {
    const premiumRemaining = totalTankCapacity.premium - totalLiters.premium;
    const dieselRemaining = totalTankCapacity.diesel - totalLiters.diesel;
    const unleadedRemaining = totalTankCapacity.unleaded - totalLiters.unleaded;

    document.getElementById("%premium").innerText = `${premiumRemaining.toFixed(2)} liters`;
    document.querySelector('.premiumBar').style.width = `${(premiumRemaining / totalTankCapacity.premium * 100).toFixed(2)}%`;

    document.getElementById("%diesel").innerText = `${dieselRemaining.toFixed(2)} liters`;
    document.querySelector('.dieselBar').style.width = `${(dieselRemaining / totalTankCapacity.diesel * 100).toFixed(2)}%`;

    document.getElementById("%unleaded").innerText = `${unleadedRemaining.toFixed(2)} liters`;
    document.querySelector('.unleadedBar').style.width = `${(unleadedRemaining / totalTankCapacity.unleaded * 100).toFixed(2)}%`;
}

document.getElementById("GSPremium").onclick = function() {
    const GSPremiumTank = Number(window.prompt("Enter Premium Total Tank Liters:"));

    if (!isNaN(GSPremiumTank) && GSPremiumTank >= 0 && GSPremiumTank <= 5000) {
        totalTankCapacity.premium = GSPremiumTank;
        updateTankCapacities();
    } else {
        alert("Invalid input. Please enter a number between 0 and 5000.");
    }
};

document.getElementById("GSDiesel").onclick = function() {
    const GSDieselTank = Number(window.prompt("Enter Diesel Total Tank Liters:"));
    if (!isNaN(GSDieselTank) && GSDieselTank >= 0 && GSDieselTank <= 5000) {
        totalTankCapacity.diesel = GSDieselTank;
        updateTankCapacities();
    } else {
        alert("Invalid input. Please enter a number between 0 and 5000.");
    }
};

document.getElementById("GSUnleaded").onclick = function() {
    const GSUnleadedTank = Number(window.prompt("Enter Unleaded Total Tank Liters:"));
    if (!isNaN(GSUnleadedTank) && GSUnleadedTank >= 0 && GSUnleadedTank <= 5000) {
        totalTankCapacity.unleaded = GSUnleadedTank;
        updateTankCapacities();
    } else {
        alert("Invalid input. Please enter a number between 0 and 5000.");
    }
};

function displayCurrentDate() {
  
    document.getElementById('current-date').innerText = formattedDate;
}

document.addEventListener('DOMContentLoaded', (event) => {
    displayCurrentDate();
});

function saveData(gasType) {
    const totalSalesElement = document.getElementById(`${gasType}-total`).innerText;
    const totalLitersElement = document.getElementById(`${gasType}-total-liters-slide`).innerText;
    const TodayliterSold= document.getElementById(`${gasType}-today-litersold`).innerText;
    const price = parseFloat(document.getElementById(`${gasType}-price`).value);

    if(!isNaN(totalLitersElement)&& !isNaN(totalLitersElement)){
        //display current reciepts
        alert(`Data saved for ${gasType}:\nDate: ${formattedDate}\nToday Liter Sold:${TodayliterSold} L\nPer Liter:${price}\nTotal Sales:${totalSalesElement}\n____________________________
        \nTotal Liters: ${totalLitersElement} L`);

        // Update and display total liters
        document.getElementById(`${gasType}-total`).innerText = "";
        //update total liter per gas type
        document.getElementById(`premium-today-litersold`).innerText = "";
        document.getElementById(`diesel-today-litersold`).innerText = "";
        document.getElementById(`unleaded-today-litersold`).innerText = "";
        //btn save display none
        SaveGasToDatabasedPremium.style.display ="none";
        SaveGasToDatabasedDiesel.style.display ="none";
        SaveGasToDatabasedUnleaded.style.display ="none";
    }else{
        alert("Error to save data, Something is missing");
    }
   
}

