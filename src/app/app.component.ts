import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'drag-n-drop';
  containerWidth = 0;
  floorPlanWidth = 0;
  floorPlanContainerScaleRatio:number = 1;
  floorPlanReversScaleRatio:number = 1;
  poi:any = null;
  lastLeft = 0;
  lastTop = 0;

  @ViewChild('container')
  container!: ElementRef;

@ViewChild('floorPlanContainer')
floorPlanContainer!:ElementRef;

@ViewChild('floorPlan')
floorPlan!:ElementRef;

pois:Array<number> = [1,2,3];

fnOnPOIMouseMove = this.onPOIMouseMove.bind(this);
fnOnPOIMouseUp = this.onPOIMouseUp.bind(this);



//[style.transform]="'scale('+floorPlanContainerScaleRatio+')'"
  ngOnInit(): void {
  }
  
  ngAfterViewInit(): void {
    this.containerWidth = this.container.nativeElement.offsetWidth;
    this.floorPlanWidth = this.floorPlan.nativeElement.offsetWidth;
    this.floorPlanContainerScaleRatio = this.containerWidth/this.floorPlanWidth;
    this.floorPlanReversScaleRatio = 1/this.floorPlanContainerScaleRatio;
    console.log(this.floorPlanReversScaleRatio);
  }
  
 
  onPOIMouseDown(event:MouseEvent){
    event.preventDefault();
    this.poi = event.currentTarget;
    this.lastLeft = parseInt(this.poi.style.left);
    this.lastTop = parseInt(this.poi.style.top);
    document.addEventListener('mousemove', this.fnOnPOIMouseMove);
    document.addEventListener('mouseup', this.fnOnPOIMouseUp);
  }

  onPOIMouseMove(event:any):void{
    
   
    let movementX = event.movementX;
    let movementY = event.movementY;

    
this.lastLeft = this.lastLeft + (movementX * this.floorPlanReversScaleRatio);
this.lastTop = this.lastTop + (movementY * this.floorPlanReversScaleRatio);
   

      this.poi.style.left = this.lastLeft+ "px";
    

    

      this.poi.style.top = this.lastTop + "px";
   

  }

  onPOIMouseUp(event:Event):void{
    console.log("MouseUp");
    let poi = event.currentTarget;
    document.removeEventListener('mousemove', this.fnOnPOIMouseMove);
    document.removeEventListener('mouseup', this.fnOnPOIMouseUp);
  }

}
