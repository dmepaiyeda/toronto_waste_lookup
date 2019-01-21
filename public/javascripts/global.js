
$(document).ready(function(){
   
    $(document).on('keypress',function(e) {
        if(e.which == 13) {
            getData();
        }
    });

    $(".searchbtn").click(function(){
        getData();
    });
});

/*Removes the html tags from the data*/
function strip(html)
{
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}

/* Creates an object that stores the description, title and keyword based on the keyword
the user enters */

function wasteInfo(title, description, keyword){
    this.wasteKeywrd = keyword;
    this.wasteTitle = title;
    this.wasteDescr = strip (description);


}

/* Gets the results based on the keyword the user enters*/
function getData(){
    var dataUrl = "https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000";

    $.ajax({
        url: dataUrl,
        type: 'GET',
        dataType: 'json' ,
        success: function(response){
            var input = document.getElementById("userinfo").value;
            for(var i=0; i<response.length; i++){
                var obj = new wasteInfo(response[i].title, response[i].body, response[i].keywords);
                var key = obj.wasteKeywrd;
                if(key.search(input) !== -1){
                    var item = itemTemplate(obj);
                    document.getElementById("data").appendChild(item);                   
                }
            }
        },
        error: function (request, status, error) {
            console.log(request.responseText);
        }
    });

}

/* Styles the search results */
function itemTemplate(item){
   const template = `<p>
   <div class="container"> 
        <div class="row">
            <div class="col-8">
                <span class="left"> <i class= "fa fa-star star"></i> ${item.wasteTitle} </span>
            </div>
            <div class="col-8">
                <span class="descrip"> ${item.wasteDescr}</span>
            </div>
        </div>
    </div>
  </p>`;

  
  return document.createRange().createContextualFragment(template);


}


