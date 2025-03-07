import { AfterViewInit, ChangeDetectorRef, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { fabric } from 'fabric';
import { StripeService } from 'src/app/pages/crear/personalize/services/stripe.service';
import { Order } from 'src/app/pages/crear/personalize/interfaces/order';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Payload, UserDetails } from 'src/app/pages/crear/personalize/interfaces/payload';
import { Router } from '@angular/router';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-personalize',
  templateUrl: './personalize.component.html',
  styleUrls: ['./personalize.component.css']
})
export class PersonalizeComponent implements AfterViewInit {
  canvas!: fabric.Canvas;
  finalCanvas!: fabric.Canvas; // Canvas para el segundo paso
  originalImage: string | null = null; // URL base64 de la imagen original
  savedImage2: File | null = null;     // Archivo original cargado por el usuario
  
  dataURL2

  croppedImageclonado
  isImageUploaded: boolean = false;
  firstFormGroup: any;
  secondFormGroup: any;
  phoneTemplateImage!: fabric.Image;
  order: Order = null;
  generatedImage: string = '';
  redirecting = false
  currentOrientation: 'horizontal' | 'vertical' = 'vertical';
  user:UserDetails
  croppedImage
  savedImage
  imageWithoutPhone
  imageWithPhone
  urlimagenphone=''
  isLinear = true;
  habilitarSteptwo=false
  habilitarSteptree=false

  @ViewChild(MatStepper) stepper!: MatStepper;
  isFormValid = false;
  constructor(//private ngZone: NgZone, 
              private stripeService: StripeService,
              private _formBuilder: FormBuilder,
              private router: Router,
              private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadOrder();
   
  }
  handleFormValid(valid: boolean) {
    this.isFormValid = valid;
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
    // Verifica si `namePhone` existe en `this.order`
    if (this.order?.namePhone) {
      // Elimina los espacios en blanco y asigna a la nueva propiedad
      this.urlimagenphone = this.order.namePhone.replace(/\s+/g, '');
    }
  }
  ngAfterViewInit(): void {
    //this.ngZone.runOutsideAngular(() => {
      this.initializeCanvas();
      this.loadPhoneTemplate();

      // Configurar el input para subir imágenes
      const uploadInput = document.getElementById('upload') as HTMLInputElement;
      uploadInput.addEventListener('change', (event) => this.uploadImage(event));
    //});
  }
  avanzarPaso() {
    this.stepper.next(); // Avanza al siguiente paso
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
    const phoneImageURL =  `assets/${this.urlimagenphone}personalizar.png` // Ruta de la plantilla del celular
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

    // Asignar una propiedad personalizada para identificar que esta es la plantilla del celular
    img.set({ name: 'phoneImage' });
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
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0]; // Archivo original
      const reader = new FileReader();
  
      // Guardar el archivo original
      this.savedImage2 = file;
  
      reader.onload = (e) => {
        // Guardar la URL base64 original para referencia (si es necesario)
        const originalBase64 = e.target?.result as string;
        this.originalImage = originalBase64;
  
        const userImage = new Image();
        userImage.src = originalBase64;
  
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
  
      reader.readAsDataURL(file); // Leer como base64 para usarla en el canvas
    }
  }
  
  
  
  moveImageToFinalCanvas(): void {
    //aca esta la clave para realizar el recorte, necesito saber el ancho y alto del case en px
    //y necesito saber la imagen del celular o sea su relleno que tanto esta alejado
    //de left y de top del borde del liezo
    // Definir un área de recorte: la pantalla del celular en el primer lienzo
    this.habilitarSteptwo=true
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
      
        
        

        const croppedImageDataURL = this.canvas.toDataURL({
          format: 'png',
          left: clipRect.left,
          top: clipRect.top,
          width: clipRect.width,
          height: clipRect.height,
        });
        // Guardar la imagen recortada en una propiedad del componente
        this.croppedImage = croppedImageDataURL;
        fabric.Image.fromURL(croppedImageDataURL, (img) => {
          img.set({
            left: 0,
            top: 0,
            selectable: false,
            evented: false,
          });
       
          this.finalCanvas.add(img);
         
          
          this.finalCanvas.renderAll();
          
          
          this.dataURL2 = this.finalCanvas.toDataURL({
            format: 'png', // También puede ser 'jpeg'
            quality: 1,   // Calidad de la imagen (1 = máxima)
          }); 
         
          
          // Restaurar el estado del lienzo original
      this.canvas.clipPath = null;
   
      this.canvas.renderAll();
          
        });
        setTimeout(() => {
          this.avanzarPaso()
        }, 0);
      
    } else {
      this.createCanvasForVertical();
     
        const clipRect = new fabric.Rect({
          left: 123,
          top: 50,
          width: 152,
          height: 300,
          absolutePositioned: true,
          rx: 25,
          ry: 25,
        });
  
        this.canvas.clipPath = clipRect;

        
        //this.canvas.renderAll();
  
        const croppedImageDataURL = this.canvas.toDataURL({
          format: 'png',
          left: clipRect.left,
          top: clipRect.top,
          width: clipRect.width,
          height: clipRect.height,
        });
        // Guardar la imagen recortada en una propiedad del componente
        this.croppedImage = croppedImageDataURL;
        fabric.Image.fromURL(croppedImageDataURL, (img) => {
          img.set({
            left: 0,
            top: 0,
            selectable: false,
            evented: false,
          });
          
  
          this.finalCanvas.add(img);
          this.finalCanvas.renderAll();
         
          
          
          this.dataURL2 = this.finalCanvas.toDataURL({
            format: 'png', // También puede ser 'jpeg'
            quality: 1,   // Calidad de la imagen (1 = máxima)
          }); 
         
          
          // Restaurar el estado del lienzo original
      this.canvas.clipPath = null;
      
        
      this.canvas.renderAll();
        });
      
    }

    setTimeout(() => {
      this.avanzarPaso()
    }, 0);
  }


  removeUserUploadedImages(): void {
  //  this.ngZone.runOutsideAngular(() => {
      const objectsToRemove = this.canvas.getObjects('image').filter((obj) => {
        return !(obj as any).isPhoneTemplate;
      });

      objectsToRemove.forEach((obj) => {
        this.canvas.remove(obj);
      });

      this.canvas.renderAll();
   // });
  }

  generateImages() {
    // Verifica que el canvas exista
    if (!this.canvas) {
      console.error('Canvas no está inicializado.');
      return;
    }
  
    // Función para generar un DataURL sin modificar el estado original
    const generateImage = (showPhone: boolean): string => {
      // Clona el canvas para evitar modificar el original
      const tempCanvas = new fabric.Canvas(null);
      tempCanvas.loadFromJSON(this.canvas.toJSON(), () => {
        const phoneImage = tempCanvas.getObjects('image').find(img => img.name === 'phoneImage');
  
        // Configura la visibilidad del celular según el parámetro
        if (phoneImage) {
          phoneImage.set('visible', showPhone);
        }
  
        tempCanvas.renderAll(); // Renderiza la imagen ajustada
      });
  
      // Genera el dataURL
      const dataURL = tempCanvas.toDataURL({
        format: 'png',
        quality: 1,
      });
  
      return dataURL;
    };
  
    // Generar ambas imágenes
    const imageWithoutPhone = generateImage(false); // Sin celular
    const imageWithPhone = generateImage(true);    // Con celular
  
    // Guardar o utilizar las imágenes según sea necesario
    console.log('Imagen sin celular:', imageWithoutPhone);
    console.log('Imagen con celular:', imageWithPhone);
  
    // Si necesitas almacenar los resultados
    this.imageWithoutPhone = imageWithoutPhone;
    this.imageWithPhone = imageWithPhone;
  }
  
  loadToCanvasTresFinal() {
    this.habilitarSteptree=true
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
    setTimeout(() => {
      this.avanzarPaso()
    }, 0);
  }

  
  

alignPhoneTemplate(orientation: 'horizontal' | 'vertical'): void {
  const phoneTemplate = this.canvas.getObjects().find((obj) => (obj as any).isPhoneTemplate) as fabric.Image;

  if (!phoneTemplate) {
    console.error('No se encontró la plantilla del celular en el lienzo.');
    return;
  }

 // this.ngZone.runOutsideAngular(() => {
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
 // });
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
    
    // Cambiar el estado para mostrar el GIF de redirección
    this.redirecting =true
  
    try {
   

  
  
    
      // Enviar la orden al backend
      this.stripeService
      .createCheckoutSession(this.user.name,
        this.user.lastName,
        this.user.email,
        this.user.phone,
        this.user.address.streetName,
        this.user.address.streetNumber,
        this.user.address.city,
        this.user.address.state,
        this.user.address.zipCode,
        this.croppedImage,
        this.originalImage).subscribe({
        next: (response) => {
          console.log('Sesión creada:', response);
          this.stripeService.redirectToCheckout(response.id).subscribe({
            next: () => console.log('Redirigiendo a Stripe...'),
            error: (err) => console.error('Error en la redirección:', err),
          });
        },
        error: (error) => {
          console.error('Error al enviar la orden:', error);
          this.router.navigate(['/server-error']);
        },
        complete: () => console.log('Solicitud completada.'),
      });
      
      
      
      
    } catch (error) {
      console.error('Error en el proceso de pago:', error);
      this.router.navigate(['/server-error']);
      
    } finally {
       // Restaurar estado// Restaurar estado
    }
  }
  showRedirecting(){
    this.redirecting = true;
    this.cdr.detectChanges();
  }

    onStepChange(event:  StepperSelectionEvent) {
    // Verifica el índice del paso seleccionado y ejecuta el método correspondiente
    switch (event.selectedIndex) {
      case 0: 
        // Llama al método de carga de la imagen para el primer paso
        this.moveImageToFinalCanvas();
        break;
      case 1:
        // Aquí puedes poner el código para cargar el canvas final si es necesario
        this.loadToCanvasTresFinal();
        break;
      case 2:
        // Cualquier acción para el tercer paso
        break;
      case 3:
        // Cualquier acción para el cuarto paso
        break;
    }
  }

  
  }
  
  

  

  
  


