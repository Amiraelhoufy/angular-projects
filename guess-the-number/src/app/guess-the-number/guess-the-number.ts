import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-guess-the-number',
  imports: [FormsModule,CommonModule],
  templateUrl: './guess-the-number.html',
  styleUrl: './guess-the-number.scss'
})
export class GuessTheNumber {

  genRandomNumber: number = this.generateRandomNumber();
  attemptsLeft = 10;
  guessedValue?:number;
  feedbackMessage ?: string;
  gameOver = false;

  private static readonly MAX_ATTEMPTS = 10;
  private static readonly MAX_NUM = 100;
  
  
  private generateRandomNumber(): number{
    return Math.floor(Math.random()* GuessTheNumber.MAX_NUM) +1; 
  }

  public isValidGuess(guess?:number):boolean{
    return(
      guess !== undefined &&
      guess >= 1 &&
      guess <= GuessTheNumber.MAX_NUM
    )
  }

  submitGuess():void{
    if(!this.isValidGuess(this.guessedValue)){
      this.feedbackMessage= `Enter a number between 1 and ${GuessTheNumber.MAX_NUM}.`;
      return;
    }
    this.attemptsLeft--;
    this.evaluateGuess();
    }

     private evaluateGuess(): void{
       if(this.guessedValue == this.genRandomNumber){
        this.endGame(true);
      }else if(this.attemptsLeft === 0){
        this.endGame(false);
      }else{
        this.feedbackMessage = this.guessedValue !> this.genRandomNumber
        ? 'too High! Try again.'
        : 'Too low! Try again.'
      }
     }

     private endGame(isWin:boolean): void{
     this.gameOver=true;
     this.feedbackMessage = isWin
     ? 'Congrats! you guessed the correct number.':
     `Game over! The correct number was ${this.genRandomNumber}`;
     }

     resetGame():void{
      this.genRandomNumber = this.generateRandomNumber();
      this.attemptsLeft = GuessTheNumber.MAX_ATTEMPTS;
      this.guessedValue = undefined;
      this.feedbackMessage = '';
      this.gameOver=false;
     }

}
