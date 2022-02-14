const prompt = require('prompt-sync')({sigint: true});
const clear = require('clear-screen');

const hat = '♛';
const hole = '◡';
const fieldFloor = '▒';
const hero = '●';
const rows = 10, cols = 10;
let check = 'true';

class Field {
        constructor() {
            this.field = Array(rows).fill().map(() => Array(cols));
            this.locationX = 0;
            this.locationY = 0;
        }//End of Constructor

    generateField(percentage) {
        for (let x = 0; x < cols; x++) {
            for (let y = 0; y < rows; y++) {
                const prob = Math.random();
                this.field[x][y] = prob > percentage ? fieldFloor : hole;
            }
        } 

        //Hat Location 
        const theHat = {
            x: Math.floor(Math.random() * cols),
            y: Math.floor(Math.random() * rows)
        };

        //Hat wont be at the starting point
        while (theHat.x == 0 && theHat.y == 0) {
            theHat.x = Math.floor(Math.random() * cols);
            theHat.y = Math.floor(Math.random() * rows);
        } //end of while-loop

        this.field[theHat.x][theHat.y] = hat;

        //Setting of home position
        this.field[0][0] = hero;

    }//end of generateField

    print() {
        const displayString = this.field.map(row => {
            return row.join('');
        }).join('\n'); //End of row function

        console.log("LETS GO! (PLAY START!)");
        console.log(displayString);
        
    } // end of print

    stepsTaken(x,y) {
        if (this.field[y][x] == fieldFloor || this.field[y][x] == hero) {
            this.field[y][x] = hero;
            clear();
            this.print();
            return check = 'true';
        }          
    }

    theHat(x,y) {
        if (this.field[y][x] == hat) {
            console.log(` !!!*FIREWORKS*!!! YOU FOUND IT! PERFECT!!`);
            return check = 'false';
            
        }
    }
 
    hitWall(x,y) {
        if(x>9 || x<0 || y>9 || y<0 ) {
            console.log(`Game Over! Thats a wall! Better luck next time!`);
            return check = 'false';
        }
    }

    hitHole(x,y) {
        if (this.field[y][x] == hole) {
            console.log(`Game Over! Thats a hole! Better luck next time!`);
            return check = 'false';
        } 
    }

    playGame() {
        let start = true;
        clear();
        //Print the field
        this.print();
        this.userControl();
    } 

    userControl() {
        let x = 0; 
        let y = 0;
        check = 'true';
        while (check == 'true') {
            const direction = prompt ('The Controls (A←) (W↑) (S↓) (D→) ').toUpperCase();
            switch (direction) {
            case 'W': //up
                y -= 1;
                this.hitWall(x,y);
                if (check == 'true'){
                    this.stepsTaken(x,y);    
                    this.hitHole(x,y);
                    this.theHat(x,y);
                }
                break;    

            case 'S': //down
                y += 1;
                this.hitWall(x,y);
                if (check == 'true'){
                    this.stepsTaken(x,y);
                    this.hitHole(x,y);
                    this.theHat(x,y);
                }
                break;

            case 'A': //left
                x -= 1;
                this.hitWall(x,y);
                this.stepsTaken(x,y);
                this.hitHole(x,y);
                this.theHat(x,y);
                break;

            case 'D': //right
                x += 1;
                this.hitWall(x,y);
                this.stepsTaken(x,y);
                this.hitHole(x,y);
                this.theHat(x,y);
                break;

            default:
                clear();
                this.print();

            }
        }// End of controls
                
    }
}// End of Class 

//Field Class objects
const myfield = new Field();
myfield.generateField(0.2);
myfield.playGame();