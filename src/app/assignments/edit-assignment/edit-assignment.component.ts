import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css'],
})
export class EditAssignmentComponent implements OnInit {
  annoncesForm!: FormGroup;
  assignment!: Assignment | undefined;
  // nomAssignment?: string;
  // dateDeRendu?: Date;
  title: string | undefined = ""; // champ du formulaire
  price : number | undefined;
  description: string | undefined = "";
  dateCreated?:Date;
  status: boolean | undefined = false;


  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    console.log("-----------")
    // Récupération des queryParams et fragment (ce qui suit le ? et le # dans l'URL)
    console.log("Query Params :");
    console.log(this.route.snapshot.queryParams);
    console.log("Fragment d'URL (ce qui suit le #) :");
    console.log(this.route.snapshot.fragment);
    console.log("-----------")

    this.getAssignment();
    this.annoncesForm = this.formBuilder.group({
      title : ['', Validators.required,],
      description : ['', Validators.required],
      status : ['', Validators.required],
      price : ['', Validators.required]
    });
  }

  getAssignment() {
    // on récupère l'id dans le snapshot passé par le routeur
    // le "+" force l'id de type string en "number"
    const id = +this.route.snapshot.params['id'];
    this.assignmentsService
      .getAssignment(id)
      .subscribe((assignment) => {
        this.assignment = assignment;

        this.title = assignment?.title;
        this.price = assignment?.price;
        this.description = assignment?.description;
        this.status = assignment?.status;

        this.dateCreated = assignment?.dateCreated;
      });
  }

  onSaveAssignment() {
    if (!this.assignment) return;

    if (this.title) {
      this.assignment.title = this.title;
    }

    if (this.price) {
      this.assignment.price = this.price;
    }
    if (this.description) {
      this.assignment.description = this.description;
    }
    if (this.status) {
      this.assignment.status = this.status;
    }
    if (this.dateCreated) {
      this.assignment.dateCreated = this.dateCreated;
    }
    this.assignmentsService
      .updateAssignment(this.assignment)
      .subscribe(reponse => {
        console.log(reponse.message);

        // navigation vers la home page
        this.router.navigate(['/home']);
      });
  }
}
