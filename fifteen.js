/*

Course: INFO2180 Project 2
Title: 15 Puzzle Assignment 
Student: Ajani Bissick


The additional feature implemented is Multiple backgrounds

*/

var eSpaceX = '300px';
var eSpaceY = '300px';

window.onload = function(){
    var puzzleArea = document.getElementById('puzzlearea');
	var shuffleButton = document.getElementById('shufflebutton');
    tiles = puzzleArea.getElementsByTagName('div');
    
    // Direct links to the available background images
    var bg_urls = ["eeyore.jpg",
    "https://i.imgur.com/z3i39Pa.jpg",
    "https://i.imgur.com/OVievLa.jpg",
    "https://i.imgur.com/mvhnJj2.jpg" ];
    

    //Names of the characters available for the background
    var bg_names = [ "Eeyore",
        "Piglet",
        "Rabbit",
        "Winnie"];
    
    
    //Randomly selects a background image 
    $(tiles).css({'background-image': 'url(' + bg_urls[Math.floor(Math.random() * bg_urls.length)] + ')'});

    for (var i=0; i<tiles.length; i++)                              
    {
        //PuzzleArea initialization : background image is setup beneath the fifteen tiles 
        
        tiles[i].className = "puzzlepiece";                         
        tiles[i].style.left = (i%4*100)+"px";
        tiles[i].style.top = (parseInt(i/4)*100) + "px";
        tiles[i].style.backgroundPosition= "-" + tiles[i].style.left + " " + "-" + tiles[i].style.top;
		
        
        //Highlights the current puzzle piece if there are moves available
        tiles[i].onmouseover = function()
        {
            if (validMove(parseInt(this.innerHTML)))
				
            {
				this.className = this.className + " movablepiece";
            }
        };

        //Changes the puzzle piece back to its standard appearance once the mouse is no longer hovering over it
        tiles[i].onmouseout = function()
        {
            this.className = this.classList.remove(" movablepiece");
        };


        //If a move is available, this function moves the puzzle piece to the available space 
        tiles[i].onclick = function()
        {
            if (validMove(parseInt(this.innerHTML)))
            {
                swap(this.innerHTML-1);
                
            }
        };
    }

    //Shuffles the playing area eight seconds after the page has been loaded
    setTimeout(function () {
        shufflePieces();
    }, 8000);
    
    //Shuffles playing area whens shuffle button is pressed
	shuffleButton.onclick = function(){
		shufflePieces();
	};

	// add selector for different backgrounds
	var select_bg = $("<select id='select_bg'>").css({"margin":"8px"});
	for(i=0; i<bg_urls.length; i++){
		$("<option>").val(bg_urls[i]).html(bg_names[i]).appendTo(select_bg);
	}
	$("#shufflebutton").before(select_bg);

	// changes the background to the new image selected and reshuffles the titles
	$(select_bg).change(function(){
		var background = $(this).val();
        $(tiles).css({ "background-image" : "url(" + background + ")" });
        shufflePieces();
	});
    
};
 
//This function is used to shuffle the pieces of the Puzzle Area
function shufflePieces(){
		
        for (var i=0; i<250; i++)
        {
            var ran_puzzlepiece = parseInt(Math.random()* 100) %4;
            switch (ran_puzzlepiece){
            
                case 0:
                    var tmp = moveUp(eSpaceX, eSpaceY);
                    if ( tmp != -1)
                    {
                        swap(tmp);
                    }
                break;

                case 1:
                    var tmp = moveDown(eSpaceX, eSpaceY);
                    if ( tmp != -1) 
                    {
                        swap(tmp);
                    }
                break;

                case 2:
                    var tmp = moveLeft(eSpaceX, eSpaceY);
                    if ( tmp != -1)
                    {
                        swap(tmp);
                    }
                break;

                case 3:
                    var tmp = moveRight(eSpaceX, eSpaceY);
                    if (tmp != -1)
                    {
                        swap(tmp);
                    }
                break;
            }
        }
	};

//Using the current position of the puzzle piece, this function checks if the tile can be moved in the specified direction
function validMove(position)
{
    if (moveLeft(eSpaceX, eSpaceY) == (position-1))
    {
        return true;
    }

    if (moveDown(eSpaceX, eSpaceY) == (position-1))
    {
        return true;
    }

    if (moveUp(eSpaceX, eSpaceY) == (position-1))
    {
        return true;
    }

    if (moveRight(eSpaceX, eSpaceY) == (position-1))
    {
        return true;
    }
}


// Function used to move a Puzzle Piece to the Left
function moveLeft(x, y)
{
    var xx = parseInt(x);
    var yy = parseInt(y);

    if (xx > 0)
    {
        for (var i = 0; i < tiles.length; i++) 
        {
            if (parseInt(tiles[i].style.left) + 100 == xx && parseInt(tiles[i].style.top) == yy)
            {
                return i;
            } 
        }
    }
    else 
    {
        return -1;
    }
}

// Function used to move a Puzzle Piece to the Right
function moveRight(x, y)
{
    var xx = parseInt(x);
    var yy = parseInt(y);
    if (xx < 300)
    {
        for (var i =0; i<tiles.length; i++){
            if (parseInt(tiles[i].style.left) - 100 == xx && parseInt(tiles[i].style.top) == yy) 
            {
                return i;
            }
        }
    }
    else
    {
        return -1;
    } 
}

// Function used to move a Puzzle Piece Upward
function moveUp(x, y)
{
    var xx = parseInt(x);
    var yy = parseInt(y);
    if (yy > 0)
    {
        for (var i=0; i<tiles.length; i++)
        {
            if (parseInt(tiles[i].style.top) + 100 == yy && parseInt(tiles[i].style.left) == xx) 
            {
                return i;
            }
        } 
    }
    else 
    {
        return -1;
    }
}

//Function used to move a Puzzle Piece downward
function moveDown(x, y)
{
    var xx = parseInt(x);
    var yy = parseInt(y);
    if (yy < 300)
    {
        for (var i=0; i<tiles.length; i++)
        {
            if (parseInt(tiles[i].style.top) - 100 == yy && parseInt(tiles[i].style.left) == xx) 
            {
                return i;
            }
        }
    }
    else
    {
        return -1;
    } 
}


function swap(x)
{
    var temp = tiles[x].style.top;
    tiles[x].style.top = eSpaceY;
    eSpaceY = temp;

    temp = tiles[x].style.left;
    tiles[x].style.left = eSpaceX;
    eSpaceX = temp;
}

 



	
	



