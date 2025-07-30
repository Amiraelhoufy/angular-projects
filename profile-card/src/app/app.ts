import { Component } from '@angular/core';
import { ProfileCard } from './profile-card/profile-card';

@Component({
  selector: 'app-root',
  imports: [ProfileCard],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
