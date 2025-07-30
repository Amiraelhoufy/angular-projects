import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-welcome',
  imports: [RouterModule],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css'
})
export class Welcome {
name: string = '';

  //ActivatedRoute
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    // this.route.paramMap.subscribe(params => {
    //   this.name = params.get('name') ?? '';
    // });

    this.name = this.route.snapshot.params['name'];
  }


}
