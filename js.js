$(document).ready(function () {    
    $.getJSON("sluzba.json",
    function (jsonArray) {        

        function printTable(g) {
            tbody = $('tbody');
            tbody.append("<tr>" + "<td>" + currentArray[g].id + "</td>" + "<td>" + currentArray[g].firstName + "</td>" + "<td>" + currentArray[g].lastName + "</td>" + "<td>" + currentArray[g].dateOfBirth + "</td>" + "<td>" + currentArray[g].function + "</td>" + "<td>" + currentArray[g].experience + "</td>" + "</tr>");
        };

        function swap(s,i, sortArray) {
            var tmp = sortArray[s];
            sortArray[s] = sortArray[i];
            sortArray[i] = tmp;

            var tmp2 = currentArray[s];
            currentArray[s] = currentArray[i];
            currentArray[i] = tmp2;
        };

        function quickSort(d, g, sortArray, asc) {
            var t;
            var s;
            if(d < g) {
                t = sortArray[d];
                s = d;

                for(var i = d + 1; i <= g; i++) {
                    if(asc) {
                        if(sortArray[i]<t) {
                            s = s + 1;
                            swap(s, i, sortArray);
                        }
                    } 
                    else {
                        if(sortArray[i]>t) {
                            s = s + 1;
                            swap(s, i, sortArray);
                        }                       
                    };
                };

                swap(d, s, sortArray);

                quickSort(d, s - 1, sortArray, asc);
                quickSort(s + 1, g, sortArray, asc);           
            };
        };

        function sortAndPrint(asc) {
            quickSort(0,currentArray.length-1, tempArray, asc);                  
            jQuery('tbody').html('');
            for (var i = 0; i < 5; i++) {
                printTable(i);
            };

            if(paginationCount<3) {
                var tempActive = document.querySelector(".active");
                tempActive.classList.remove("active");
                document.querySelector(".paginationLink").className += " active";
            };
        };

        function sortAttribute(direction, asc) {
            for(var k = 0; k < direction.length; k++) {
                if(k==0) {
                    direction[k].addEventListener("click", function() {
                        for (var i = 0; i < currentArray.length; i++) {
                            tempArray[i] = currentArray[i].id;
                        };
                        sortAndPrint(asc);
                    }, false);
                };
                if(k==1) {                
                    direction[k].addEventListener("click", function() {
                        for (var i = 0; i < currentArray.length; i++) {
                            tempArray[i] = currentArray[i].firstName;
                        };
                        sortAndPrint(asc);
                     }, false);
                };
                if(k==2) {
                    direction[k].addEventListener("click", function() {
                        for (var i = 0; i < currentArray.length; i++) {
                            tempArray[i] = currentArray[i].lastName;
                        };
                        sortAndPrint(asc);
                    }, false);
                };
                if(k==3) {
                    direction[k].addEventListener("click", function() {
                        for (var i = 0; i < currentArray.length; i++) {
                            tempArray[i] = currentArray[i].dateOfBirth;
                        };
                        sortAndPrint(asc);
                    }, false);
                };
                if(k==4) {
                    direction[k].addEventListener("click", function() {
                        for (var i = 0; i < currentArray.length; i++) {
                            tempArray[i] = currentArray[i].function;
                        };
                        sortAndPrint(asc);
                    }, false);
                };
                if(k==5) {                
                    direction[k].addEventListener("click", function() {
                        for (var i = 0; i < currentArray.length; i++) {
                            tempArray[i] = currentArray[i].experience;
                        };
                        sortAndPrint(asc);
                    }, false);
                };            
            };
        };

        function createPaginationLinks() {
            paginationCount = Math.ceil(currentArray.length/5);

            if(paginationCount<3) {
                jQuery('.paginationContainer').html('');
                if(paginationCount>1) {
                    for(var i = 0; i < paginationCount; i++) {
                        paginationContainer= document.querySelector(".paginationContainer");
                        newA = document.createElement("a");
                        paginationContainer.appendChild(newA);
                        newA.textContent = i + 1;
                        if (i==0) {
                            newA.className = "paginationLink active";
                        } 
                        else {
                            newA.className = "paginationLink";    
                        };
                    };
                };
 
                var paginationLinks = document.querySelectorAll(".paginationLink");
                var n = 1;

                if (5>currentArray.length) {
                    for (var i = 0; i < currentArray.length; i++) {
                        printTable(i);
                    };
                }
                else {
                    for (var i = 0; i < 5; i++) {
                        printTable(i);
                    };
                };

                for (var i = 0; i < paginationLinks.length; i++) {
                    paginationLinks[i].addEventListener("click", function (e) {
                        n = e.target.innerHTML;
                        jQuery('tbody').html('');
                        for (var i = 5*(n-1); i < 5*(n-1)+5; i++) {
                            if(currentArray[i] == undefined) break;
                            printTable(i);
                        };
                        var tempActive = document.querySelector(".active");
                        tempActive.classList.remove("active");
                        e.target.className += " active";
                    }, false);
                };
            }
            else {
                var paginationLinks = document.querySelectorAll(".paginationLink");
                var n = 1;

                if (5>currentArray.length) {
                    for (var i = 0; i < currentArray.length; i++) {
                        printTable(i);
                    };
                }
                else {
                    for (var i = 0; i < 5; i++) {
                        printTable(i);
                    };
                }

                paginationContainer= document.querySelector(".paginationContainer");
                paginationContainer.innerHTML = '<input type="text" class="toPagination" placeholder="1" > of ' + paginationCount + ' <span class="go"> Go</span> ';

                go = document.querySelector(".go");
                toPagination = document.querySelector(".toPagination");

                go.addEventListener("click", function() {
                    var t = toPagination.value;
                    jQuery('tbody').html('');
                    for (var i = 5*(t-1); i < 5*(t-1)+5; i++) {
                        if(currentArray[i] == undefined) break;
                        printTable(i);
                    };
                }, false);
            };
        };

        var currentArray = jsonArray;
        createPaginationLinks();

        tempArray = new Array(currentArray.length);

        var sortIdDesc = document.querySelectorAll(".arrowDown");
        var sortIdAsc = document.querySelectorAll(".arrowUp");

        sortAttribute(sortIdDesc, false);
        sortAttribute(sortIdAsc, true);

        var pokojowka = document.querySelector(".filterPokojowka");
        var kamerdyner = document.querySelector(".filterKamerdyner");
        var kucharka = document.querySelector(".filterKucharka");
        var lokaj = document.querySelector(".filterLokaj");

        pokojowka.addEventListener("click", function () {
            if(pokojowka.innerHTML=='pokojówka') {
                pokojowka.innerHTML='pokojówka <img src="close.png" alt="close">';
            }
            else {
                pokojowka.innerHTML='pokojówka';
            };
        }, false);

        kamerdyner.addEventListener("click", function () {
            if(kamerdyner.innerHTML=="kamerdyner") {
                kamerdyner.innerHTML='kamerdyner <img src="close.png" alt="close">';
            }
            else {
                kamerdyner.innerHTML='kamerdyner';
            };
        }, false);

        kucharka.addEventListener("click", function () {
            if(kucharka.innerHTML=="kucharka") {
                kucharka.innerHTML='kucharka <img src="close.png" alt="close">';
            }
            else {
                kucharka.innerHTML='kucharka';
            };
        }, false);

        lokaj.addEventListener("click", function () {
            if(lokaj.innerHTML=="lokaj") {
                lokaj.innerHTML='lokaj <img src="close.png" alt="close">';
            }
            else {
                lokaj.innerHTML='lokaj';
            };
        }, false);

        var filterButton = document.querySelector(".filterButton");

        filterButton.addEventListener("click", function() {
            currentArray = [];
            datePicker = document.getElementById("datepicker");
            jQuery('tbody').html('');

            for (var i = 0; i < jsonArray.length; i++) {
               
                var firstDot = parseInt(jsonArray[i].dateOfBirth.indexOf("."));
                var day = parseInt(jsonArray[i].dateOfBirth.slice(0, firstDot));

                var secondDot = parseInt(jsonArray[i].dateOfBirth.indexOf(".", firstDot+1));
                var month = parseInt(jsonArray[i].dateOfBirth.slice(firstDot+1, secondDot));

                var space = parseInt(jsonArray[i].dateOfBirth.indexOf(" ", secondDot+1));
                var year = parseInt(jsonArray[i].dateOfBirth.slice(secondDot+1, space));

                var firstDotPicker = parseInt(datePicker.value.indexOf("/"));
                var dayPicker = parseInt(datePicker.value.slice(0, firstDotPicker));

                var secondDotPicker = parseInt(datePicker.value.indexOf("/", firstDotPicker+1));
                var monthPicker = parseInt(datePicker.value.slice(firstDotPicker+1, secondDotPicker));

                var yearPicker = parseInt(datePicker.value.slice(secondDotPicker+1, 10));

                var idExact = document.getElementById("idExact");
                var idFrom = document.getElementById("idFrom");
                var idTo = document.getElementById("idTo");

                var nameInput = document.getElementById("nameExact");
                var lastNameInput = document.getElementById("lastNameExact");

                var experienceExact = document.getElementById("experienceExact");
                var experienceFrom = document.getElementById("experienceFrom");
                var experienceTo = document.getElementById("experienceTo");

                
                if((day==dayPicker||datePicker.value=='')&&
                    (month==monthPicker||datePicker.value=='')&&
                    (year==yearPicker||datePicker.value=='')&&                    
                    (nameInput.value.toLowerCase()==jsonArray[i].firstName.toLowerCase()||nameInput.value=='')&&
                    (lastNameInput.value.toLowerCase()==jsonArray[i].lastName.toLowerCase()||lastNameInput.value=='')&&
                    (idExact.value==jsonArray[i].id||idExact.value=='')&&
                    ((idFrom.value<=jsonArray[i].id && jsonArray[i].id<=idTo.value)||(idFrom.value=='' && idTo.value==''))&&                    
                    (experienceExact.value==jsonArray[i].experience||experienceExact.value=='')&&
                    ((experienceFrom.value<=jsonArray[i].experience && jsonArray[i].experience<=experienceTo.value)||(experienceFrom.value=='' && experienceTo.value==''))&&                    
                    ((pokojowka.innerHTML==jsonArray[i].function + ' <img src="close.png" alt="close">') || (kamerdyner.innerHTML==jsonArray[i].function + ' <img src="close.png" alt="close">') || (lokaj.innerHTML==jsonArray[i].function + ' <img src="close.png" alt="close">') || (kucharka.innerHTML==jsonArray[i].function + ' <img src="close.png" alt="close">') || ((pokojowka.innerHTML=="pokojówka") && (kamerdyner.innerHTML=="kamerdyner") && (lokaj.innerHTML=="lokaj") && (kucharka.innerHTML=="kucharka")))
                    ){
                    currentArray.push(jsonArray[i]);
                };
            };
            createPaginationLinks();            
        }, false);
    });
});
