
class Chewie {
  constructor()
  {
    this.xCoordinate = 4; // station Chewie in the middle of the board
    this.yCoordinate = 4;

    this.roars = 0;
    this.stressLevel = 0;

    // create an image for Chewie
    $(`.gameboard${this.xCoordinate}-${this.yCoordinate}`).addClass('chewie');
  }

  getXCoordinate() { return this.xCoordinate; }
  getYCoordinate() { return this.yCoordinate; }

  move(direction)
  {
    if(direction === 'left')
    {
      $(`.gameboard${this.xCoordinate}-${this.yCoordinate}`).removeClass('chewie');
      this.yCoordinate--;
      $(`.gameboard${this.xCoordinate}-${this.yCoordinate}`).addClass('chewie');
    }
    else if(direction === 'right')
    {
      $(`.gameboard${this.xCoordinate}-${this.yCoordinate}`).removeClass('chewie');
      this.yCoordinate++;
      $(`.gameboard${this.xCoordinate}-${this.yCoordinate}`).addClass('chewie');
    }
    else if(direction === 'up')
    {
      $(`.gameboard${this.xCoordinate}-${this.yCoordinate}`).removeClass('chewie');
      this.xCoordinate--;
      $(`.gameboard${this.xCoordinate}-${this.yCoordinate}`).addClass('chewie');
    }
    else if(direction === 'down')
    {
      $(`.gameboard${this.xCoordinate}-${this.yCoordinate}`).removeClass('chewie');
      this.xCoordinate++;
      $(`.gameboard${this.xCoordinate}-${this.yCoordinate}`).addClass('chewie');
    }
  }

  roar()
  {
    // Chewie roars at the porgs
    this.roars++;
    this.stressLevel++;
  }

  deleteChewie()
  {
    $(`.gameboard${this.xCoordinate}-${this.yCoordinate}`).removeClass('chewie');

    this.xCoordinate = 0;
    this.yCoordinate = 0;
    this.roars = 0;
    this.stressLevel = 0;
  }
}

class Porg {
  constructor(maxCoordinateLength)
  {
    // station the porg on a random location
    this.maxCoordinateLength = maxCoordinateLength;
    this.xCoordinate = Math.floor(Math.random() * maxCoordinateLength);
    this.yCoordinate = Math.floor(Math.random() * maxCoordinateLength);
    this.isGone = false;
    this.speed = 1;
    this.damage = 3;

    // create an image and a class for the porg
    $(`.gameboard${this.xCoordinate}-${this.yCoordinate}`).addClass('porg');
  }

  getXCoordinate() { return this.xCoordinate; }
  getYCoordinate() { return this.yCoordinate; }

  move()
  {
    if(this.isGone === false)
    {
      $(`.gameboard${this.xCoordinate}-${this.yCoordinate}`).removeClass('porg');

      const directionChoice = Math.floor(Math.random() * 4);
      //console.log("directionChoice: ", directionChoice);

      if(directionChoice === 0)
      {
        this.xCoordinate += this.speed;

        if(this.xCoordinate >= this.maxCoordinateLength)
        {
          this.xCoordinate = 9;
        }
        //console.log("move down");
      }
      else if(directionChoice === 1)
      {
        this.xCoordinate -= this.speed;

        if(this.xCoordinate < 0)
        {
          this.xCoordinate = 0;
        }
        //console.log("move up")
      }
      else if(directionChoice === 2)
      {
        this.yCoordinate -= this.speed;

        if(this.yCoordinate < 0)
        {
          this.yCoordinate = 0;
        }
        //console.log("move left");
      }
      else if(directionChoice === 3)
      {
        this.yCoordinate += this.speed;

        if(this.yCoordinate >= this.maxCoordinateLength)
        {
          this.yCoordinate = 9;
        }
        //console.log("move right");
      }

      $(`.gameboard${this.xCoordinate}-${this.yCoordinate}`).addClass('porg');
      // console.log("X Coordinate: ",this.xCoordinate);
      // console.log("Y Coordinate: ",this.yCoordinate);
    }
    else {
      this.xCoordinate = 0;
      this.yCoordinate = 0;
    }

  }

  deletePorg()
  {
    $(`.gameboard${this.xCoordinate}-${this.yCoordinate}`).removeClass('porg');

    this.isGone = true;
    this.xCoordinate = 0;
    this.yCoordinate = 0;
  }
}

class EquipmentItem {
  constructor(){
    this.images = ['item1',
                  'item2',
                  'item3'];

    this.hp = 10;
    this.isDestroyed = false;
    this.isRetrieved = false;
    this.xCoordinate = Math.floor(Math.random() * 10);
    this.yCoordinate = Math.floor(Math.random() * 10);
    this.chosenImage = Math.floor(Math.random() * 3);

    $(`.gameboard${this.xCoordinate}-${this.yCoordinate}`).addClass('equipment-item');
    $(`.gameboard${this.xCoordinate}-${this.yCoordinate}`).addClass(this.images[this.chosenImage]);

    // $(`.gameboard${this.xCoordinate}-${this.yCoordinate}`).css('background-image', this.images[2]);
    // $(`.gameboard${this.xCoordinate}-${this.yCoordinate}`).css('background-size', 'cover');
  }

  getXCoordinate() { return this.xCoordinate; }
  getYCoordinate() { return this.yCoordinate; }

  damage(thisDamage)
  {
    this.hp -= thisDamage;
    console.log("damage was done to this item!");
    if(this.hp <= 0)
    {
      this.isDestroyed = true;
      console.log("This item is destroyed! ");
    }
  }

  deleteEquipItem()
  {
    $(`.gameboard${this.xCoordinate}-${this.yCoordinate}`).removeClass('item1');
    $(`.gameboard${this.xCoordinate}-${this.yCoordinate}`).removeClass('item2');
    $(`.gameboard${this.xCoordinate}-${this.yCoordinate}`).removeClass('item3');
    $(`.gameboard${this.xCoordinate}-${this.yCoordinate}`).removeClass('equipment-item');

    this.hp = 0;
    this.xCoordinate = 0;
    this.yCoordinate = 0;
    this.isDestroyed = true;
    this.isRetrieved = false;
  }
}

// Game Logic

$(() => {

  // hide the lose message
  $('.loose-message').hide();

  // create the score board
  let $scoreboard = $(".score");

  // create the gameboard
  let $gameboard = $(".game-board");

  // append each row of squares to the game board <section> tag
  for(let i = 0; i < 10; i++)
  {
    let $row = $(`<div class='gameboard${i}'></div>`);
    $(".game-board").append($row);
    //console.log(" creating row " + i);

    for(let j = 0; j < 10; j++)
    {
      //console.log("creating column " + j);
      let $column = $(`<div class='gameboard${i}-${j}'></div>`);
      $column.css('display', 'inline-block');
      $column.addClass('game-square');
      //$column.text('0');
      $row.append($column);
    }
  }

  //initialize chewie, the porgs, and the equipment items


  const porgLevels =    [3, 5, 7, 3, 10, 10];
  const femPorgLevels = [0, 0, 0, 0, 1, 3];
  const porgletLevels = [0, 0, 0, 3, 0, 0];

  const neededItems = [5, 5, 10, 15];
  const requiredItems = [2, 4, 6, 6];
  let porgs = [];
  let fem_porgs = [];
  let porglets = [];
  let equipItems = [];

  let level = 0;
  let itemsRuined = 0;
  let itemsRetrieved = 0;
  let pointsEarned = 0;

  let timePasses = null;
  let gameEnded = false;

  let Chewbacca = new Chewie();

  for(let i = 0; i < porgLevels[level]; i++)
  {
    console.log(`creating porg ${i}`)
    porgs[i] = new Porg(10);
    console.log(porgs[i]);
  }

  for(let i = 0; i < neededItems[level]; i++)
  {
    console.log(`creating item ${i}`);
    equipItems[i] = new EquipmentItem();
    console.log(equipItems[i]);
  }

  // Jquery scope-level functions
  // function nextLevel(newLevel)
  // {
  //   level++
  // }

  //Actual Game Logic

  console.log("we're now in the game logic. ");
  $(document).keydown(function(e)
  {
      let keyPressed = e.which;
      if(e.which == 37)
      {
        Chewbacca.move('left');
        console.log("move left");
      }
      else if(e.which == 38 && gameEnded === false)
      {
        Chewbacca.move('up');
        console.log("move up");
      }
      else if(e.which == 39 && gameEnded === false)
      {
        Chewbacca.move('right');
        console.log("move right");
      }
      else if(e.which == 40 && gameEnded === false)
      {
        Chewbacca.move('down');
        console.log("move down");
      }
      else if(e.which == 32 && gameEnded === false) // Chewie roars at the porgs
      {
        document.getElementById("yes-audio").play();
        console.log("RRRROOOOOAAAARRRR!!!");

        // delete any nearby porgs that Chewie roars at
        for(let i = 0; i < porgs.length; i++)
        {
          const chewieDistanceX =
          Math.abs(porgs[i].getXCoordinate() - Chewbacca.getXCoordinate());

          const chewieDistanceY =
          Math.abs(porgs[i].getYCoordinate() - Chewbacca.getYCoordinate());
          const distanceFromChewie = chewieDistanceX + chewieDistanceY;

          if(distanceFromChewie <= 2 && porgs[i].isGone === false)
          {
            console.log("SQUUAAAKK!");
            // delete that corresponding porg from the game board
            porgs[i].isGone = true;
            $(`.gameboard${porgs[i].xCoordinate}-${porgs[i].yCoordinate}`).removeClass('porg');
            //porgs[i].roaredAt();
          }

        } // End of for loop for checking each porg

        Chewbacca.stressLevel++;
        console.log("Chewie's getting stressed... watch out!");
        $('.stress-level').empty();
        $('.stress-level').append(`<h4>Stress Level: ${Chewbacca.stressLevel}</h4>`);

        // End game when Chewie gets too stressed
        if(Chewbacca.stressLevel >= 20)
        {
          Chewbacca.deleteChewie();
          for(let i = 0; i < porgLevels[level]; i++)
          {
            porgs[i].deletePorg();
            console.log(`${porgs[i]} is nullified`);
          }

          for(let i = 0; i < neededItems[level]; i++)
          {
            equipItems[i].deleteEquipItem();
            console.log(`${equipItems[i]} is nullified`);
          }

          $('.game-board').hide();
          gameEnded = true;
        } // End of itemsRuined if statement
      }
      else{
        $(document).off();
      }

      // if Chewie encounters one of the equipment items
      // delete that item and increment the number of items
      // Chewie retrieved.
      if(gameEnded === false)
      {

      }
      for(let i = 0; i < neededItems[level]; i++)
      {
        if(Chewbacca.getXCoordinate() == equipItems[i].getXCoordinate() &&
           Chewbacca.getYCoordinate() == equipItems[i].getYCoordinate() &&
           (equipItems[i].isDestroyed === false && equipItems[i].isRetrieved
            === false))
           {
             itemsRetrieved++;
             pointsEarned += equipItems[i].hp;

             $('.retrievedItems').empty();
             $('.retrievedItems').append(`<h4>Items Retrieved : ${itemsRetrieved}</h4>`);
             $(`.gameboard${equipItems[i].xCoordinate}-${equipItems[i].yCoordinate}`).removeClass('equipment-item');
             $(`.gameboard${equipItems[i].xCoordinate}-${equipItems[i].yCoordinate}`).removeClass('item1');
             $(`.gameboard${equipItems[i].xCoordinate}-${equipItems[i].yCoordinate}`).removeClass('item2');
             $(`.gameboard${equipItems[i].xCoordinate}-${equipItems[i].yCoordinate}`).removeClass('item3');
             $('.score-board').empty();
             $('.score-board').append(`<h4>Score: ${pointsEarned}</h4>`);
             equipItems[i].isRetrieved = true;

             console.log("Hooray! You got an item");
           }
      }

      if(itemsRetrieved === requiredItems[level])
      {
        // Chewie gains 5 points for each porg he hasn't roared at
        for(let i = 0; i < porgLevels[level]; i++)
        {
          pointsEarned += 5;
        }

        $('.score-board').empty();
        $('.score-board').append(`<h4>Score: ${pointsEarned}</h4>`);

        // delete chewie, the porgs, and the equip items
        itemsRuined = 0;
        itemsRetrieved = 0;

        for(let i = 0; i < porgs.length; i++)
        {
          porgs[i].deletePorg();
        }

        for(let i = 0; i < equipItems.length; i++)
        {
          equipItems[i].deleteEquipItem();
        }

        Chewbacca.deleteChewie();

        // advance to the next level and re-establish Chewie, the items,
        // and the porgs
        level++;

        $('.level').empty();
        $('.level').append(`<h4>Level: ${level + 1}</h4>`);

        Chewbacca = new Chewie();
        let porgletCounter = 0;
        let femPorgCounter = 0;

        // recreate the porgs
        for(let i = 0; i < porgLevels[level]; i++)
        {

          console.log(`creating porg ${i}`)
          porgs[i] = new Porg(10);
          console.log(porgs[i]);
        }

        // recreate the equipment
        for(let i = 0; i < neededItems[level]; i++)
        {
          console.log(`creating item ${i}`);
          equipItems[i] = new EquipmentItem();
          console.log(equipItems[i]);
        }

      } // End of level re-establishment

      // if Chewie encounters a porg, increment his stress level
      for(let i = 0; i < porgs.length; i++)
      {
        if(Chewbacca.getXCoordinate() == porgs[i].getXCoordinate() &&
          Chewbacca.getYCoordinate() == porgs[i].getYCoordinate() &&
          gameEnded === false)
          {
            Chewbacca.stressLevel++;
            console.log("Chewie's encountered a porg and is stressed");
            $('.stress-level').empty();
            $('.stress-level').append(`<h4>Stress Level: ${Chewbacca.stressLevel}</h4>`);
          }
      }

      // End game when Chewie gets too stressed
      if(Chewbacca.stressLevel >= 20)
      {
        Chewbacca.deleteChewie();
        for(let i = 0; i < porgLevels[level]; i++)
        {
          porgs[i].deletePorg();
          console.log(`${porgs[i]} is nullified`);
        }

        for(let i = 0; i < neededItems[level]; i++)
        {
          equipItems[i].deleteEquipItem();
          console.log(`${equipItems[i]} is nullified`);
        }

        $('.game-board').hide();
        gameEnded = true;

        $('.porg-havoc').css('visibility',  'visible');
        $('.porg-havoc').get(0).play();

        setTimeout(function()
        {
          $('.porg-havoc').remove();
          $('.lose-message').css('visibility', 'visible');
        }, 9000);
      } // End of Chewbacca.stressLevel if statement

      e.preventDefault();

  }); // End of Document Jquery Document Body

  const porgMovement = setInterval(function(){
    if(gameEnded === false)
    {
      for(let i = 0; i < porgs.length; i++)
      {
        // console.log("Moving Porg #" + i);
        porgs[i].move();
      }
    }


    // if any one of the porgs encounters an equipment item
    // decrement the health points of that item
    if(gameEnded === false)
    {
      for(let i = 0; i < porgs.length; i++)
      {
        for(let j = 0; j < equipItems.length; j++)
        {
          console.log("game ended: " + gameEnded);

          if(porgs[i].getXCoordinate() === equipItems[j].getXCoordinate() &&
            porgs[i].getYCoordinate() === equipItems[j].getYCoordinate() &&
            (equipItems[j].isDestroyed === false && equipItems[j].isRetrieved
             === false))
            {
              equipItems[j].damage(porgs[i].damage);
              console.log("One of the porgs just damaged an item");
              console.log("hp: " + equipItems[j].hp)
              if(equipItems[j].hp <= 0)
              {
                // remove this item from the game board

                equipItems[j].isDestroyed = true;
                equipItems[j].hp = 0;
                itemsRuined++;

                $(`.gameboard${equipItems[j].xCoordinate}-${equipItems[j].yCoordinate}`).removeClass('equipment-item');
                $(`.gameboard${equipItems[j].xCoordinate}-${equipItems[j].yCoordinate}`).removeClass('item1');
                $(`.gameboard${equipItems[j].xCoordinate}-${equipItems[j].yCoordinate}`).removeClass('item2');
                $(`.gameboard${equipItems[j].xCoordinate}-${equipItems[j].yCoordinate}`).removeClass('item3');
                $('.ruinedItems').empty();
                $('.ruinedItems').append(`<h4>Items Ruined : ${itemsRuined}</h4>`);
                console.log("An item has been ruined...");
              }

              if(itemsRuined == requiredItems[level])
              {
                // nullify the equipment items and the porgs
                // display video clip of porg havoc

                Chewbacca.deleteChewie();
                for(let i = 0; i < porgLevels[level]; i++)
                {
                  porgs[i].deletePorg();
                  console.log(`${porgs[i]} is nullified`);
                }

                for(let i = 0; i < neededItems[level]; i++)
                {
                  equipItems[i].deleteEquipItem();
                  console.log(`${equipItems[i]} is nullified`);
                }

                $('.game-board').remove();
                gameEnded = true;

                $('.porg-havoc').css('visibility',  'visible');
                $('.porg-havoc').get(0).play();

                setTimeout(function()
                {
                  $('.porg-havoc').remove();
                  $('.lose-message').css('visibility', 'visible');
                }, 9000);


              } // End of itemsRuined if statement

            } // End of porg/item coordinate comparison
        }
      }
    } // end of gameEnded if statement for porg/item encounters
  }, 500); // End of Porg porgMovement function
}); // End of Jquery
