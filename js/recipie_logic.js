

function parserecipeJson(startpoint,breakpoint,ref_id) {
    document.getElementById("1").style.background = "grey";
    document.getElementById("2").style.background = "grey";
    document.getElementById("3").style.background = "grey";

    document.getElementById(ref_id).style.background = "#ff2a6b";
    $( "#recipe_data" ).empty();
    // document.getElementById("recipe_data").emp = ""

    $.ajax({
        url: 'db/db-recipes.json',
        type: 'GET',
        dataType: 'json',
        success: function (code, status) {
            code = code.slice(startpoint,breakpoint)
            code.forEach(addRecepies);


        }
    });
}


function addRecepies(item,index) {
    console.log("Called")

    document.getElementById("recipe_data").innerHTML+=
        " <div class=\"col-12 col-md-6 col-lg-4\" data-aos=\"fade-up\" data-aos-easing=\"ease-in-out\"\n" +
        "                        data-aos-delay=\"100\">\n" +
        "                        <div class=\"recipes-list__item\">\n" +
        "                            <a href=\"dish-recipes/Pizza.html\">\n" +
        `                            <img src=\"images/recipes/${Math.floor(Math.random() * 12)+1}.jpg\" alt=\"\">\n` +
        "                            </a>\n" +
        "                            <div class=\"recipes-list__info-background\">\n" +
        "                                <div class=\"recipes-list__info\">\n" +
        `                                   <h3>${item.name}</h3>\n` +
        "\n" +
        "                                </div>\n" +
        "                            </div>\n" +
        "                        </div>\n" +
        "                    </div>"


}




// document.getElementById("recipe_data").innerHTML = ""


setTimeout(parserecipeJson(0,12,1),3000);

