var ddl = document.getElementById("customerType");
if (ddl != undefined) {
    ddl.onchange = newCustomerType;
    function newCustomerType() {
        var ddl = document.getElementById("customerType");
        var selectedValue = ddl.options[ddl.selectedIndex].value;


        if (selectedValue == "4") {
            document.getElementById("newType").style.display = "block";
            document.getElementById("label").style.display = "block";
        }
        else {
            document.getElementById("newType").style.display = "none";
            document.getElementById("label").style.display = "none";
        }
    }
}