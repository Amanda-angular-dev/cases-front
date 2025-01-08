import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-personalize-button-case',
  templateUrl: './personalize-button-case.component.html',
  styleUrls: ['./personalize-button-case.component.css']
})
export class PersonalizeButtonCaseComponent implements OnInit {
  @Input() url: string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
