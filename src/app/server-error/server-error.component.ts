import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css']
})
export class ServerErrorComponent implements OnInit {
  errorMessage: string = 'We could not process your order. Please try again later. If the problem persists, contact us.';
  constructor() { }

  ngOnInit(): void {
  }

}
