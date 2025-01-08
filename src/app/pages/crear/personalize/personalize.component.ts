import { AfterViewInit, Component, NgZone, OnInit } from '@angular/core';
import { fabric } from 'fabric';
import { StripeService } from 'src/app/pages/crear/personalize/services/stripe.service';
import { Order } from 'src/app/pages/crear/personalize/interfaces/order';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkOrderService } from 'src/app/pages/crear/personalize/services/work-order.service';
import { Payload, UserDetails } from 'src/app/pages/crear/personalize/interfaces/payload';

@Component({
  selector: 'app-personalize',
  templateUrl: './personalize.component.html',
  styleUrls: ['./personalize.component.css']
})
export class PersonalizeComponent implements AfterViewInit {
  canvas!: fabric.Canvas;
  finalCanvas!: fabric.Canvas; // Canvas para el segundo paso
  isImageUploaded: boolean = false;
  firstFormGroup: any;
  secondFormGroup: any;
  phoneTemplateImage!: fabric.Image;
  order: Order = null;
  generatedImage: string = '';
  redirecting = false
  currentOrientation: 'horizontal' | 'vertical' = 'vertical';
  user:UserDetails
  uploadedRawImage: string = ''; // Imagen en bruto cargada por el usuario

  constructor(private ngZone: NgZone, 
              private stripeService: StripeService,
              private workOrderService: WorkOrderService) { }

  ngOnInit(): void {
    this.loadOrder();
   
  }
  handleFormSubmitted(data: any) {
    this.user = data;
    console.log('Datos recibidos del formulario:', this.user);
  }
  loadOrder(): void {
    //obtener los datos de la orden, estos se graban en el localstorage cuando el usuario elige en las secciones de elegir phone case
    const orderData = localStorage.getItem('order');
    console.log(orderData)
    if (orderData) {
      this.order = JSON.parse(orderData);
      console.log(this.order)
    }

  }
  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.initializeCanvas();
      this.loadPhoneTemplate();

      // Configurar el input para subir imágenes
      const uploadInput = document.getElementById('upload') as HTMLInputElement;
      uploadInput.addEventListener('change', (event) => this.uploadImage(event));
    });
  }

  initializeCanvas(): void {
    // Lienzo principal
    this.canvas = new fabric.Canvas('canvas', {
      width: 400,
      height: 400,
      selection: true,
    });

    // Lienzo final
    this.finalCanvas = new fabric.Canvas('finalCanvas', {
      width: 152,
      height: 300,
      selection: false,
    });


  }


  loadPhoneTemplate(): void {
    const phoneImageURL = 'assets/proyecto-nuevo.png'; // Ruta de la plantilla del celular
    fabric.Image.fromURL(phoneImageURL, (img) => {
      const canvasWidth = this.canvas.width!;
      const canvasHeight = this.canvas.height!;
      const scaleX = canvasWidth / img.width!;
      const scaleY = canvasHeight / img.height!;
      const scale = Math.min(scaleX, scaleY); // Mantener proporción

      img.scale(scale);
      img.set({
        left: (canvasWidth - img.getScaledWidth()) / 2,
        top: (canvasHeight - img.getScaledHeight()) / 2,
        selectable: false,
        evented: false,
      });

      // Marcar la imagen como plantilla del celular
      (img as any).isPhoneTemplate = true;

      // Agregar la plantilla al lienzo principal
      this.canvas.add(img);
      this.canvas.bringToFront(img);
      this.canvas.preserveObjectStacking = true;
      this.canvas.renderAll();
    });
  }

  uploadImage(event: Event): void {
    this.ngZone.runOutsideAngular(() => {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const userImage = new Image();
          userImage.src = e.target?.result as string;

          // Guardar la imagen en bruto
          this.uploadedRawImage = userImage.src;

          userImage.onload = () => {
            const img = new fabric.Image(userImage);
            img.scaleToWidth(250);
            img.set({
              left: 75,
              top: 0,
              selectable: true
            });

            this.removeUserUploadedImages();

            const clipPath = new fabric.Rect({
              left: 0,
              top: 0,
              width: 400,
              height: 400,
              absolutePositioned: true,
            });

            img.set({ clipPath });
            this.canvas.add(img);
            this.canvas.sendToBack(img);
            this.canvas.renderAll();

             
          };
        };
        reader.readAsDataURL(input.files[0]);
      }
    });
  }
  
  
  
  moveImageToFinalCanvas(): void {
    //aca esta la clave para realizar el recorte, necesito saber el ancho y alto del case en px
    //y necesito saber la imagen del celular o sea su relleno que tanto esta alejado
    //de left y de top del borde del liezo
    // Definir un área de recorte: la pantalla del celular en el primer lienzo

    if (this.currentOrientation === 'horizontal') {
      this.createCanvasForHorizontal();
      
        const clipRect = new fabric.Rect({
          left: 50,
          top: 124,
          width: 300,
          height: 152,
          absolutePositioned: true,
          rx: 25,
          ry: 25,
        });
  
        this.canvas.clipPath = clipRect;
        this.canvas.renderAll();
  
        const croppedImageDataURL = this.canvas.toDataURL({
          format: 'png',
          left: clipRect.left,
          top: clipRect.top,
          width: clipRect.width,
          height: clipRect.height,
        });
  
        fabric.Image.fromURL(croppedImageDataURL, (img) => {
          img.set({
            left: 0,
            top: 0,
            selectable: false,
            evented: false,
          });
  
          this.finalCanvas.add(img);
          this.finalCanvas.renderAll();
  
          this.canvas.clipPath = null;
          this.canvas.renderAll();
        });
      
    } else {
      this.createCanvasForVertical();
     
        const clipRect = new fabric.Rect({
          left: 124,
          top: 50,
          width: 152,
          height: 300,
          absolutePositioned: true,
          rx: 25,
          ry: 25,
        });
  
        this.canvas.clipPath = clipRect;
        this.canvas.renderAll();
  
        const croppedImageDataURL = this.canvas.toDataURL({
          format: 'png',
          left: clipRect.left,
          top: clipRect.top,
          width: clipRect.width,
          height: clipRect.height,
        });
  
        fabric.Image.fromURL(croppedImageDataURL, (img) => {
          img.set({
            left: 0,
            top: 0,
            selectable: false,
            evented: false,
          });
  
          this.finalCanvas.add(img);
          this.finalCanvas.renderAll();
  
          this.canvas.clipPath = null;
          this.canvas.renderAll();
        });
      
    }

    
  }


  removeUserUploadedImages(): void {
    this.ngZone.runOutsideAngular(() => {
      const objectsToRemove = this.canvas.getObjects('image').filter((obj) => {
        return !(obj as any).isPhoneTemplate;
      });

      objectsToRemove.forEach((obj) => {
        this.canvas.remove(obj);
      });

      this.canvas.renderAll();
    });
  }

  

  loadToCanvasTresFinal() {
    const sourceCanvas = document.getElementById('finalCanvas') as HTMLCanvasElement;
    const targetCanvas = document.getElementById('canvasTresFinal') as HTMLCanvasElement;

    if (sourceCanvas && targetCanvas) {
      const sourceContext = sourceCanvas.getContext('2d');
      const targetContext = targetCanvas.getContext('2d');

      if (sourceContext && targetContext) {
        targetContext.clearRect(0, 0, targetCanvas.width, targetCanvas.height);
        targetContext.drawImage(sourceCanvas, 0, 0, targetCanvas.width, targetCanvas.height);
      }
    }
  }

  
  

alignPhoneTemplate(orientation: 'horizontal' | 'vertical'): void {
  const phoneTemplate = this.canvas.getObjects().find((obj) => (obj as any).isPhoneTemplate) as fabric.Image;

  if (!phoneTemplate) {
    console.error('No se encontró la plantilla del celular en el lienzo.');
    return;
  }

  this.ngZone.runOutsideAngular(() => {
    phoneTemplate.set({
      angle: 0, // Reiniciar ángulo
      left: 0,
      top: 0,
    });

    if (orientation === 'horizontal') {
      phoneTemplate.rotate(90);
      
    } else if (orientation === 'vertical') {
      phoneTemplate.rotate(0);
      
    }

    this.canvas.renderAll();

    // Guardar la orientación actual
    this.currentOrientation = orientation;
  });
}

  
  
  
 

  createCanvasForHorizontal(): void {
    // Configurar el lienzo para orientación horizontal
    this.finalCanvas.setWidth(300); // Ejemplo: ancho mayor para horizontal
    this.finalCanvas.setHeight(152);
    console.log('Lienzo configurado para horizontal');
  }
  
  createCanvasForVertical(): void {
    // Configurar el lienzo para orientación vertical
    this.finalCanvas.setWidth(152); // Ejemplo: alto mayor para vertical
    this.finalCanvas.setHeight(300);
    console.log('Lienzo configurado para vertical');
  }

  isNextButtonEnabled(): boolean {
    return this.canvas.getObjects('image').length > 0;
  }
  async pay() {
    this.redirecting = true;
    try {
      // Enviar la orden al backend
      this.workOrderService.addOrder().subscribe({
        next: (response) => {
          console.log('Orden enviada exitosamente:', response);
          this.initiateStripePayment();
        },
        error: (error) => {
          console.error('Error al enviar la orden:', error);
          
        },
        complete: () => console.log('Solicitud completada.'),
      });
      
      
      
      
    } catch (error) {
      console.error('Error en el proceso de pago:', error);
      
    } finally {
      this.redirecting = false; // Restaurar estado
    }
  }
  

  
  initiateStripePayment() {
    const productName = this.order.namePhone;
    const productPrice = this.order.price; // Precio en centavos
    const productQuantity = this.order.quantity;
    const borderColor = ''; // Color del borde
    const imageBase64 = this.finalCanvas.toDataURL();
  
    this.stripeService
      .createCheckoutSession(productName, productPrice, productQuantity, borderColor)
      .subscribe({
        next: (response) => {
          console.log('Sesión creada:', response);
          this.stripeService.redirectToCheckout(response.id).subscribe({
            next: () => console.log('Redirigiendo a Stripe...'),
            error: (err) => console.error('Error en la redirección:', err),
          });
        },
        error: (err) => console.error('Error al crear la sesión:', err),
      });
  }
  }
  
  
  
  
  
  
  


