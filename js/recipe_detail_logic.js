const urlParams = new URLSearchParams(window.location.search);
const index_data = urlParams.get('index');

if (`${index_data}_savedComments` in localStorage) {
    table = JSON.parse(window.localStorage.getItem(`${index_data}_savedComments`))
    document.getElementById("comments").innerHTML = table

}

function add_comment(){
    var comment = document.getElementById("subject").value
    var tbodyRef = document.getElementById('comments').getElementsByTagName('tbody')[0];

    var index = tbodyRef.rows.length +1
    // Insert a row at the end of table
    var newRow = tbodyRef.insertRow();
    // Insert a cell at the end of the row
    var newCell = newRow.insertCell();
    var newText = document.createTextNode(index.toString()+") "+comment);
    newCell.appendChild(newText);
    var table = $('#table_comments').wrap('<table/>').parent().html();
    table = JSON.stringify(table);
    window.localStorage.setItem(`${index_data}_savedComments`, table);


}


function createRecepieDetail(){


    console.log(index_data)
    $( "#instructions" ).empty();
    $( "#ingredients" ).empty();

    $.ajax({
        url: 'db/db-recipes.json',
        type: 'GET',
        dataType: 'json',
        success: function (code, status) {

            document.getElementById("title").innerText = code[index_data].name
            var ingre = code[index_data].ingredients



            var inst = code[index_data].instructions.replace("\r","").split("\n");
            console.log(inst);
            var cook_time = code[index_data].cooktime
            var prep_time = code[index_data].preptime
            var yields = code[index_data].servings

            document.getElementById("prep_time").innerText = `Prep: ${prep_time/60} mins`;
            document.getElementById("cook_time").innerText = `Cook: ${cook_time/60} mins`;
            document.getElementById("yields").innerText = `Yields: ${yields} Serving`;


            const filter_inst = inst.filter(el => {
                return el != null && el !== '';
            });
            filter_inst.forEach(addInstructions)

            const filter_ingre = ingre.filter(el => {
                return el != null && el !== '' && el !== "<hr>";
            });
            console.log(filter_ingre)
            filter_ingre.forEach(addIngredients)



        }
    });
}

    // document.getElementById("title").innerText = data.name

function addInstructions(item,index) {
    console.log(item, index)

    const dec = "<li data-aos=\"fade-left\" data-aos-easing=\"linear\" data-aos-delay=\"400\">\n" +
        "                            <div class=\"recipe-detail__item\">\n" +
        `                                <h2 class=\"recipe-detail__number\">0${index+1}.</h2>\n` +
        `                                <p class=\"recipe-detail__description\">${item}\n` +
        "                                </p>\n" +
        "                            </div>\n" +
        "                        </li>";

    document.getElementById("instructions").innerHTML += dec;
}

function addIngredients(item,index){

    const ing = " <li class=\"recipe-detail__check-box-item\">\n" +
        "                                    <div class=\"form-group\">\n" +
        "                                        <input type=\"checkbox\" name=\"checkbox\">\n" +
        `                                        <label for=\"box-1\" class=\"square\">${item}</label>\n` +
        "                                    </div>\n" +
        "                                </li>"

    document.getElementById("ingredients").innerHTML += ing;

}



createRecepieDetail()


