import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  annoncesForm!: FormGroup;
  title = ""; // champ du formulaire
  price : number | undefined;
  description = "";
  dateCreated?:Date;
  status = false;

  public illustrations: any[] = [];

  addIllustration() {
    this.illustrations.push({
      id: this.illustrations.length + 1,
      filename: '',
    });
    this.annoncesForm.value['illustrations'] = this.illustrations;
  }
  removeIllustration(i: number) {
    this.illustrations.splice(i, 1);
    this.annoncesForm.value['illustrations'] = this.illustrations;
  }
  logValue(){
    console.log(this.illustrations);
  }

  constructor(private assignmentsService:AssignmentsService,
              private router:Router,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.annoncesForm = this.formBuilder.group({
      title : ['', Validators.required,],
      description : ['', Validators.required],
      status : ['', Validators.required],
      price : ['', Validators.required],
      illustrations : [[]]
    });
  }

  onFormSubmit() {
    this.logValue();
    console.log(this.annoncesForm)
    if (this.annoncesForm) {
      const newAssignment:Assignment = new Assignment();
      newAssignment.title = this.title;
      newAssignment.price = this.price;
      newAssignment.description = this.description;
      newAssignment.dateCreated = this.dateCreated;
      newAssignment.status = this.status;

      //this.assignments.push(newAssignment);
      // On envoie le nouvel assignment sous la forme d'un événement
      //this.nouvelAssignment.emit(newAssignment);

      // On utilise directement le service.
      this.assignmentsService.addAssignment(this.annoncesForm.value)
        .subscribe(reponse => {
          console.log(reponse.message);

          // On re-affiche la liste

          this.router.navigate(['/home']);
        })
    }

  }
}
