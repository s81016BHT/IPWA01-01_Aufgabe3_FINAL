import { Component, Input, ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'app-circular-loading',
  templateUrl: './circular-loading.component.html',
  styleUrls: ['./circular-loading.component.css']
})
export class CircularLoadingComponent {
  @Input("color") color !: any
  @Input("percentige") percentige !: number
  @ViewChild("circle") circle !: ElementRef

  private animated = false
  private animationObserver : any;

  ngAfterViewInit(){
    /* create IntersectionObserver to load up percentag view animation if visible */
    if(this.animationObserver != null)
      this.animationObserver = new IntersectionObserver((entries) =>{
        if(entries[0].isIntersecting && this.animated == false){
          let percentige = this.percentige
          this.percentige = 0;

          for(let i=0;i<percentige;i++) setTimeout( () => this.percentige += 1,i*20);
            this.animated = true
        }
        else if(!entries[0].isIntersecting){
          this.animated = false
        }
      }).observe(this.circle.nativeElement);
  }
}
