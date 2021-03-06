import { Component, OnInit, Input, OnDestroy, SimpleChanges, OnChanges } from '@angular/core';
import { identifierModuleUrl } from '@angular/compiler';

export interface LifeCyleEvent{
  id: number;
  name: string;
  color: string;

}

@Component({
  selector: 'app-lifecycle-child',
  templateUrl: './lifecycle-child.component.html',
  styleUrls: ['./lifecycle-child.component.css']
})
export class LifecycleChildComponent implements OnInit, OnChanges, OnDestroy {

  @Input() name:string;
  @Input() age: number;
  @Input() food: string;

  public events: LifeCyleEvent[] = [];
  nextEventId: number =0

  colors:string[] = ["accent","warn","primary"]

  constructor() {
    console.log(this.name + " - constructor ")
    this.newEvent("constructor")
   }

  ngOnInit() {
    console.log(this.name + " - ngOnInit")
    this.newEvent("ngOnInit")
  }
  ngOnChanges(changes: SimpleChanges){
    console.log(this.name + " - ngOnChanges")
    this.newEvent("ngOnChanges")
  }
  ngAfterContentInit(){
    console.log(this.name + " - ngAfterContentChanges")
    this.newEvent("ngAfterContentChanges")
  }
  ngAfterViewInit(){
    console.log(this.name + " - ngAfterViewInit")
    this.newEvent("ngAfterViewInit")
  }
  ngOnDestroy(){
    console.log(this.name + " - ngOnDestroy")
    this.newEvent("ngOnDestroy")
  }
  newEvent(name: string){
    let id = this.nextEventId++;
    this.events.push({id: id,color: this.colors[id%this.colors.length], name: name})
    setTimeout(()=>{
      let idx = this.events.findIndex((e)=> e.id==id)
      if(idx >=0){
        this.events.splice(idx,1);
      }
    },3000 + this.events.length*2000)
  }
}
