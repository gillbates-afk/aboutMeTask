window.onload = function(){
    console.log(this + " has loaded");
    //initialise variables
    var changeBGColourButton = document.getElementById("changeBGColourButton");
    var BGColourText = document.getElementById("BGColour");
    var hobbiesHeader = document.getElementById("hobbiesHeader");
    var hobbiesContent = document.getElementById("hobbiesContent");

    function changeBackgroundColour(){
        console.log(this.id + " has been clicked");
        //----USING NOOPS HEXBOT API TO CHANGE BACKGROUND COLOUR----
        //First, we create a new XMLHttp request object. Let's name it "hexbotRequest".
        var hexbotRequest = new XMLHttpRequest();
        //Next, we need to use the open method to 'point' that request at the noops hexbot api's url:
        hexbotRequest.open('GET',"https://api.noopschallenge.com/hexbot",true);
        //and then we use the send method to send the request to the server:
        hexbotRequest.send();
        /*The readyState property of our request object will always be one of the following:

        0: "UNSENT":           XMLHttp request has been created, but no open method has been called.
        1: "OPENED":           XMLHttp request send method has been called.
        2: "HEADERS_RECEIVED": XMLHttp request send method has been called and it has returned the status and headers.
        3: "LOADING":          XMLHttp request response has been downloaded.
        4: "DONE":             XMLHttp request is completed.

        We're going to want to react to this, so we need to add an event listener for the event "readystatechange".
        However before we do this, let's define the function that we're going to call in response.*/
        function changeBackgroundFollowingHexBot(){
            /*We don't want this function to be called unless the state is "DONE", i.e the readyState property
            is equal to 4. We also however, don't want it be called if there is any error, which means its
            status property must be equal to 200. (and not one such as for example 404 -- which is not found*/
            if (hexbotRequest.readyState == 4 && hexbotRequest.status == 200){
                /*We need to parse the responseText property of our hexbotRequest request with the JSON.parse method
                because it is returned as a string and we want it to be an object!.*/
                var response = JSON.parse(hexbotRequest.responseText);
                /*The response is an object, of which it has a "colors" array, where our hex colour is stored as a string -- 
                its length is 1 because by default, we only asked for 1 colour in our request*/
                var colour = response.colors[0].value;
                BGColourText.innerHTML = "The background colour is currently: "+colour;
            };
            //Then we will change the background colour of the HTML <body> to our colour variable result!
            document.body.style.backgroundColor = colour;
        };
        /*Finally, we can add our event listener: listening for the change of hexbotRequest
        and the code will of course only run if the state is equal to 4 and there isn't an error. :-)*/
        hexbotRequest.addEventListener("readystatechange", changeBackgroundFollowingHexBot, false);
    };

    //add event listeners that control which content is being displayed
    hobbiesHeader.onclick=function(){
        hobbiesContent.style.display = "block";
        homeContent.style.display = "none";
        console.log(this.id + " has been clicked");
    };

    homeHeader.onclick=function(){
        homeContent.style.display = "block";
        hobbiesContent.style.display = "none";
        console.log(this.id + " has been clicked");
    }
    //event listener for changing the background colour
    changeBGColourButton.onclick = changeBackgroundColour;
};